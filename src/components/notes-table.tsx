"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteNote } from "@/server/notes";

interface Note {
  id: number;
  title: string;
  content: string;
  status: "draft" | "published";
  slug: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface NotesTableProps {
  notes: Note[];
  username: string | null;
}

export function NotesTable({ notes, username }: NotesTableProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleDeleteNote = useCallback(
    async (id: number) => {
      setIsDeleting(id);
      try {
        const result = await deleteNote(id);
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success("Note deleted successfully.");
          router.refresh();
        }
      } catch (error) {
        console.error("Error deleting note:", error);
        toast.error("Failed to delete note.");
      } finally {
        setIsDeleting(null);
      }
    },
    [router]
  );

  return (
    <div className="overflow-x-auto bg-card rounded-xl shadow border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-3 min-w-[180px]">Title</TableHead>
            <TableHead className="px-6 py-3">Status</TableHead>
            <TableHead className="px-6 py-3">Created At</TableHead>
            <TableHead className="px-6 py-3 text-right min-w-[120px]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.map((note, idx) => (
            <TableRow
              key={note.id}
              className={
                idx % 2 === 0
                  ? "bg-background group hover:bg-accent/40 transition-colors"
                  : "bg-muted/40 group hover:bg-accent/40 transition-colors"
              }
            >
              <TableCell className="px-6 py-4 font-medium">
                <Link
                  href={`/dashboard/${note.id}`}
                  className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  {note.title}
                </Link>
              </TableCell>
              <TableCell className="px-6 py-4">
                <Badge
                  variant={
                    note.status === "published" ? "default" : "secondary"
                  }
                  className={
                    note.status === "published"
                      ? "bg-green-500/10 text-green-700 dark:text-green-400"
                      : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                  }
                >
                  {note.status.charAt(0).toUpperCase() + note.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{note.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <TooltipProvider>
                    {note.status === "published" && username && note.slug && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            aria-label="View"
                            className="rounded-full"
                          >
                            <Link
                              href={`/${username}/${note.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View</TooltipContent>
                      </Tooltip>
                    )}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          aria-label="Edit"
                          className="rounded-full"
                        >
                          <Link href={`/dashboard/${note.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label="Delete"
                              className="rounded-full text-destructive hover:bg-destructive/10"
                              disabled={isDeleting === note.id}
                            >
                              {isDeleting === note.id ? (
                                <span className="w-4 h-4 animate-pulse">
                                  ...
                                </span>
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your note and remove its data
                                from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteNote(note.id)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TooltipTrigger>
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
