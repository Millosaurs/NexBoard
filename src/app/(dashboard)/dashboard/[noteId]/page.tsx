"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  createNote,
  updateNote,
  getNoteById,
  getCurrentUsername,
} from "@/server/notes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { marked } from "marked";
import DOMPurify from "dompurify";
import Link from "next/link";
import { Bold, Italic, Heading1, Heading2, Heading3, Code } from "lucide-react";

interface Note {
  id: number;
  title: string;
  content: string;
  status: "draft" | "published";
  slug: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function NoteEditPage() {
  const router = useRouter();
  const params = useParams();
  const noteId = params.noteId as string;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [slug, setSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [originalNote, setOriginalNote] = useState<Note | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const fetchUsername = async () => {
      const result = await getCurrentUsername();
      if (result && "username" in result) {
        setUsername(result.username || null);
      } else if (result && "error" in result) {
        setUsername(null); // Set to null on error
      }
    };
    fetchUsername();

    if (noteId !== "new") {
      const fetchNote = async () => {
        const result = await getNoteById(parseInt(noteId));
        if (result && "error" in result) {
          toast.error(result.error);
          router.push("/dashboard");
        } else if (result && "note" in result) {
          const foundNote = result.note;
          setOriginalNote(foundNote);
          setTitle(foundNote.title);
          setContent(foundNote.content);
          setStatus(foundNote.status);
          setSlug(foundNote.slug || "");
        } else {
          toast.error("Note not found.");
          router.push("/dashboard");
        }
      };
      fetchNote();
    }
  }, [noteId, router]);

  const handleSave = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("status", status);
    formData.append("slug", slug);

    let result;
    if (noteId === "new") {
      result = await createNote(formData);
    } else {
      formData.append("id", noteId);
      result = await updateNote(formData);
    }

    if (result && "error" in result) {
      toast.error(result.error);
    } else {
      toast.success("Note saved successfully.");
      if (noteId === "new" && result && "id" in result) {
        router.push(`/dashboard/${result.id}`);
      }
    }
    setIsLoading(false);
  };

  const handlePublish = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("status", "published");
    formData.append("slug", slug);

    let result;
    if (noteId === "new") {
      result = await createNote(formData);
    } else {
      formData.append("id", noteId);
      result = await updateNote(formData);
    }

    if (result && "error" in result) {
      toast.error(result.error);
    } else {
      toast.success("Note published successfully.");
      router.refresh(); // Revalidate data
      if (noteId === "new" && result && 'id' in result) {
        router.push(`/dashboard/${result.id}`);
      }
    }
    setIsLoading(false);
  };

  const getMarkdownPreview = (): string => {
    const html = marked.parse(content) as string;
    return DOMPurify.sanitize(html);
  };

  const insertMarkdown = (syntax: string, placeholder: string = "", closingSyntax: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    const newContent = 
      value.substring(0, start) +
      syntax +
      value.substring(start, end) +
      closingSyntax +
      value.substring(end);

    setContent(newContent);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + syntax.length, start + syntax.length + (end - start) + closingSyntax.length);
    }, 0);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-end gap-2">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Draft"}
        </Button>
        <Button onClick={handlePublish} disabled={isLoading}>
          {isLoading ? "Publishing..." : "Publish"}
        </Button>
      </div>
      {originalNote &&
        originalNote.status === "published" &&
        username &&
        originalNote.slug && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Public URL</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={`/${username}/${originalNote.slug}`}
                className="text-blue-500 hover:underline break-all"
                target="_blank"
              >{`/${username}/${originalNote.slug}`}</Link>
            </CardContent>
          </Card>
        )}
      <Card>
        <CardHeader>
          <CardTitle>
            {noteId === "new" ? "Create New Note" : "Edit Note"}
            <Input
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold border-none focus-visible:ring-0"
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 items-center gap-4 mb-4">
            <Label htmlFor="slug" className="text-right">
              Slug
            </Label>
            <Input
              id="slug"
              placeholder="note-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="note-status"
                checked={status === "published"}
                onCheckedChange={(checked) =>
                  setStatus(checked ? "published" : "draft")
                }
              />
              <Label htmlFor="note-status">
                {status === "published" ? "Published" : "Draft"}
              </Label>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? "Edit" : "Preview"}
            </Button>
          </div>
          {!showPreview && (
            <div className="flex gap-2 mb-2">
              <Button variant="outline" size="icon" onClick={() => insertMarkdown("# ", "Heading 1")}>
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => insertMarkdown("## ", "Heading 2")}>
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => insertMarkdown("### ", "Heading 3")}>
                <Heading3 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => insertMarkdown("**", "bold text", "**")}>
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => insertMarkdown("_", "italic text", "_")}>
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => insertMarkdown("`", "code", "`")}>
                <Code className="h-4 w-4" />
              </Button>
            </div>
          )}
          {showPreview ? (
            <div
              className="prose lg:prose-xl dark:prose-invert min-h-[400px] p-4 border rounded-md max-w-screen-xl "
              dangerouslySetInnerHTML={{ __html: getMarkdownPreview() }}
            />
          ) : (
            <Textarea
              ref={textareaRef}
              placeholder="Write your note content here... (Markdown supported)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[400px] border-none focus-visible:ring-0"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
