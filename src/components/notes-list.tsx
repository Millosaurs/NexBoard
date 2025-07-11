"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getNotes, deleteNote } from "@/server/notes";
import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Note {
  id: number;
  title: string;
  content: string;
  status: "draft" | "published";
  slug: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      const result = await getNotes();
      if (result && 'error' in result) {
        toast.error(result.error);
      } else if (result && 'notes' in result) {
        setNotes(result.notes);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast.error("Failed to load notes.");
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleDeleteNote = useCallback(async (id: number) => {
    setIsDeleting(id);
    try {
      const result = await deleteNote(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Note deleted successfully.");
        fetchNotes();
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error("Failed to delete note.");
    } finally {
      setIsDeleting(null);
    }
  }, [fetchNotes]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/dashboard/new">Add New Note</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground">
            No notes yet. Add one to get started!
          </p>
        ) : (
          notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Status: {note.status.charAt(0).toUpperCase() + note.status.slice(1)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>{note.content.substring(0, 100)}...</p>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/${note.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" disabled={isDeleting === note.id}>
                        {isDeleting === note.id ? "Deleting..." : <Trash2 className="h-4 w-4" />}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your note
                          and remove its data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteNote(note.id)}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}