import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { bids, auctions, user, balanceTransactions } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const auctionId = parseInt(id);
    const { amount } = await request.json();

    if (isNaN(auctionId) || !amount || amount <= 0) {
      return NextResponse.json(
        { message: "Invalid auction ID or bid amount" },
        { status: 400 }
      );
    }

    const auction = await db
      .select()
      .from(auctions)
      .where(eq(auctions.id, auctionId))
      .limit(1);

    if (!auction.length) {
      return NextResponse.json(
        { message: "Auction not found" },
        { status: 404 }
      );
    }

    const auctionData = auction[0];

    if (
      !auctionData.isActive ||
      auctionData.isLocked ||
      new Date() > new Date(auctionData.closingDate)
    ) {
      return NextResponse.json(
        { message: "Bidding is closed for this auction" },
        { status: 400 }
      );
    }

    if (amount <= parseFloat(auctionData.currentPrice)) {
      return NextResponse.json(
        { message: "Bid must be higher than current price" },
        { status: 400 }
      );
    }

    const userData = await db
      .select()
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    if (!userData.length || parseFloat(userData[0].balance!) < amount) {
      return NextResponse.json(
        { message: "Insufficient balance" },
        { status: 400 }
      );
    }

    // Check if user already has an active bid
    const existingUserBid = await db
      .select()
      .from(bids)
      .where(
        and(
          eq(bids.auctionId, auctionId),
          eq(bids.userId, session.user.id),
          eq(bids.refunded, false) // Assuming you have a refunded boolean column
        )
      )
      .limit(1);

    // Get previous highest bid (excluding user's existing bid if replacing)
    const previousHighestBidQuery = db
      .select({
        id: bids.id,
        userId: bids.userId,
        amount: bids.amount,
      })
      .from(bids)
      .where(eq(bids.auctionId, auctionId))
      .orderBy(desc(bids.createdAt));

    const previousHighestBidResult = await previousHighestBidQuery;
    const previousHighestBid =
      existingUserBid.length > 0
        ? previousHighestBidResult.filter(
            (bid) => bid.id !== existingUserBid[0].id
          )[0]
        : previousHighestBidResult[0];

    await db.transaction(async (tx) => {
      // If user has existing bid, refund it
      if (existingUserBid.length > 0) {
        const existingBid = existingUserBid[0];
        const refundAmount = parseFloat(existingBid.amount);

        // Mark existing bid as refunded
        await tx
          .update(bids)
          .set({
            refunded: true,
            updatedAt: new Date(),
          })
          .where(eq(bids.id, existingBid.id));

        // Refund the amount to user's balance
        await tx
          .update(user)
          .set({
            balance: (
              parseFloat(userData[0].balance!) + refundAmount
            ).toString(),
            updatedAt: new Date(),
          })
          .where(eq(user.id, session.user.id));

        // Record refund transaction
        await tx.insert(balanceTransactions).values({
          userId: session.user.id,
          auctionId,
          bidId: existingBid.id,
          type: "bid_refund",
          amount: refundAmount.toString(),
          description: `Previous bid refunded on auction: ${auctionData.title}`,
        });
      }

      // Create new bid
      const newBid = await tx
        .insert(bids)
        .values({
          auctionId,
          userId: session.user.id,
          amount: amount.toString(),
        })
        .returning();

      // Deduct new bid amount from user's balance
      await tx
        .update(user)
        .set({
          balance: (
            parseFloat(userData[0].balance!) -
            amount +
            (existingUserBid.length > 0
              ? parseFloat(existingUserBid[0].amount)
              : 0)
          ).toString(),
          updatedAt: new Date(),
        })
        .where(eq(user.id, session.user.id));

      // Record new bid transaction
      await tx.insert(balanceTransactions).values({
        userId: session.user.id,
        auctionId,
        bidId: newBid[0].id,
        type: "bid_hold",
        amount: amount.toString(),
        description: `Bid placed on auction: ${auctionData.title}`,
      });

      // Refund previous highest bidder (if different user)
      if (previousHighestBid && previousHighestBid.userId !== session.user.id) {
        const prevBidder = await tx
          .select()
          .from(user)
          .where(eq(user.id, previousHighestBid.userId))
          .limit(1);

        if (prevBidder.length > 0) {
          const refundAmount = parseFloat(previousHighestBid.amount);

          await tx
            .update(user)
            .set({
              balance: (
                parseFloat(prevBidder[0].balance!) + refundAmount
              ).toString(),
              updatedAt: new Date(),
            })
            .where(eq(user.id, previousHighestBid.userId));

          await tx.insert(balanceTransactions).values({
            userId: previousHighestBid.userId,
            auctionId,
            bidId: previousHighestBid.id,
            type: "bid_refund",
            amount: refundAmount.toString(),
            description: `Bid refunded - outbid on auction: ${auctionData.title}`,
          });
        }
      }

      // Update auction's current price
      await tx
        .update(auctions)
        .set({
          currentPrice: amount.toString(),
          updatedAt: new Date(),
        })
        .where(eq(auctions.id, auctionId));
    });

    return NextResponse.json({ message: "Bid placed successfully" });
  } catch (error) {
    console.error("Place bid error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// New endpoint to get user's current bid on an auction
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const auctionId = parseInt(id);

    if (isNaN(auctionId)) {
      return NextResponse.json(
        { message: "Invalid auction ID" },
        { status: 400 }
      );
    }

    const userBid = await db
      .select()
      .from(bids)
      .where(
        and(
          eq(bids.auctionId, auctionId),
          eq(bids.userId, session.user.id),
          eq(bids.refunded, false)
        )
      )
      .limit(1);

    return NextResponse.json({
      bid: userBid.length > 0 ? userBid[0] : null,
    });
  } catch (error) {
    console.error("Get user bid error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
