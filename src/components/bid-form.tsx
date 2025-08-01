"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BidFormProps {
  auctionId: number;
  currentPrice: number;
}

interface UserBid {
  id: number;
  amount: number;
  refunded: boolean;
}

export function BidForm({ auctionId, currentPrice }: BidFormProps) {
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userBalance, setUserBalance] = useState<string>("0.00");
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [userBid, setUserBid] = useState<UserBid | null>(null);
  const [showOverrideDialog, setShowOverrideDialog] = useState(false);
  const [pendingBidAmount, setPendingBidAmount] = useState<number | null>(null);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      fetchUserBalance();
      fetchUserBid();
    }
  }, [session]);

  const fetchUserBalance = async () => {
    setBalanceLoading(true);
    try {
      const response = await fetch("/api/user/balance");
      if (response.ok) {
        const data = await response.json();
        setUserBalance(data.balance);
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      setUserBalance("1000.00");
    } finally {
      setBalanceLoading(false);
    }
  };

  const fetchUserBid = async () => {
    try {
      const response = await fetch(`/api/auctions/${auctionId}/user-bid`);
      if (response.ok) {
        const data = await response.json();
        setUserBid(data.bid);
      }
    } catch (error) {
      console.error("Failed to fetch user bid:", error);
    }
  };

  const placeBid = async (amount: number) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/auctions/${auctionId}/bids`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (response.ok) {
        router.refresh();
        setBidAmount("");
        fetchUserBalance();
        fetchUserBid();
      } else {
        const data = await response.json();
        setError(data.message || "Failed to place bid");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      setPendingBidAmount(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(bidAmount);

    if (isNaN(amount) || amount <= currentPrice) {
      setError(`Bid must be higher than current price of $${currentPrice}`);
      return;
    }

    if (amount > parseFloat(userBalance)) {
      setError("Insufficient balance for this bid");
      return;
    }

    // Check if user already has an active bid
    if (userBid && !userBid.refunded) {
      setPendingBidAmount(amount);
      setShowOverrideDialog(true);
      return;
    }

    placeBid(amount);
  };

  const handleOverrideConfirm = () => {
    if (pendingBidAmount !== null) {
      placeBid(pendingBidAmount);
      setShowOverrideDialog(false);
    }
  };

  if (isPending || balanceLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-600">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (!session?.user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-600 mb-4">
            Please log in to place a bid
          </p>
          <Button onClick={() => router.push("/login")} className="w-full">
            Login to Bid
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Place Your Bid</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded">
                {error}
              </div>
            )}

            {userBid && !userBid.refunded && (
              <div className="p-3 text-sm text-blue-600 bg-blue-50 rounded">
                You have an active bid of ${userBid.amount.toFixed(2)}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="bidAmount">Your Bid ($)</Label>
              <Input
                id="bidAmount"
                type="number"
                step="0.01"
                min={currentPrice + 0.01}
                max={parseFloat(userBalance)}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder={`Minimum: $${(currentPrice + 0.01).toFixed(2)}`}
                required
              />
            </div>

            <div className="text-sm text-gray-600">
              Your balance: ${userBalance}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Placing bid..." : "Place Bid"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <AlertDialog
        open={showOverrideDialog}
        onOpenChange={setShowOverrideDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Replace Existing Bid?</AlertDialogTitle>
            <AlertDialogDescription>
              You already have an active bid of ${userBid?.amount.toFixed(2)}.
              Placing a new bid will replace your current bid and refund $
              {userBid?.amount.toFixed(2)} to your balance.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleOverrideConfirm}>
              Confirm Replacement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
