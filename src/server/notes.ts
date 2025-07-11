"use server";

import { db } from "@/db";
import { notes } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/dist/server/request/headers";

// Helper function to generate a slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes
}

export async function getNotes() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { error: "Unauthorized", notes: [] };
  }

  const userNotes = await db.query.notes.findMany({
    where: (notes, { eq }) => eq(notes.userId, session.user.id),
  });

  return { notes: userNotes };
}

export async function createNote(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { error: "Unauthorized" };
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const status = (formData.get("status") as "draft" | "published") || "draft";
  const slug = generateSlug(title);

  if (!title || !content) {
    return { error: "Title and content are required" };
  }

  await db.insert(notes).values({
    title,
    content,
    status,
    slug,
    userId: session.user.id,
  });

  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateNote(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "Unauthorized" };
  }

  const id = parseInt(formData.get("id") as string);
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const status = (formData.get("status") as "draft" | "published") || "draft";

  if (!title) {
    return { error: "Title is required" };
  }
  const slug = generateSlug(title); // Always regenerate slug from title

  if (!id || !content) {
    return { error: "ID and content are required" };
  }

  await db
    .update(notes)
    .set({ title, content, status, slug, updatedAt: new Date() })
    .where(eq(notes.id, id));

  revalidatePath("/dashboard");
  revalidatePath(`/${session.user.name}/${slug}`); // Revalidate public page
  return { success: true };
}

export async function deleteNote(id: number) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { error: "Unauthorized" };
  }

  await db.delete(notes).where(eq(notes.id, id));

  revalidatePath("/dashboard");
  return { success: true };
}

export async function getNoteById(id: number) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { error: "Unauthorized" };
  }

  const note = await db.query.notes.findFirst({
    where: (notes, { eq, and }) =>
      and(eq(notes.id, id), eq(notes.userId, session.user.id)),
  });

  if (!note) {
    return { error: "Note not found" };
  }

  return { note };
}

export async function getCurrentUsername() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "Unauthorized" };
  }
  return { username: session.user.name };
}

export async function getNoteBySlug(username: string, slug: string) {
  const user = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.name, username),
  });

  if (!user) {
    return { error: "User not found" };
  }

  const note = await db.query.notes.findFirst({
    where: (notes, { eq, and }) =>
      and(
        eq(notes.userId, user.id),
        eq(notes.slug, slug),
        eq(notes.status, "published")
      ),
  });

  if (!note) {
    return { error: "Note not found or not published" };
  }

  return { note };
}
