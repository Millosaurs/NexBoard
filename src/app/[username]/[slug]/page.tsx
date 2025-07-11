import { getNoteBySlug } from "@/server/notes";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/markdown-renderer";

export default async function PublicNotePage({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}) {
  const { username, slug } = await params;
  const result = await getNoteBySlug(username, slug);

  if (result && "error" in result) {
    notFound();
  }

  const note = result.note;

  return (
    <div className="py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{note.title}</h1>
        <MarkdownRenderer content={note.content} />
        <p className="text-sm text-muted-foreground mt-8">
          Published on: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
