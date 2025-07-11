import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { getNotes, getCurrentUsername } from "@/server/notes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NotesTable } from "@/components/notes-table";
import { FilePlus2, User2 } from "lucide-react"; // For icons

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-4 bg-card rounded-lg shadow-sm border border-border px-6 py-4 min-w-[180px]">
      <div className="p-2 rounded-full bg-muted text-muted-foreground">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="text-lg font-bold text-foreground">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

export default async function Dashboard() {
  const notesResult = await getNotes();
  const notes = notesResult && "notes" in notesResult ? notesResult.notes : [];

  const usernameResult = await getCurrentUsername();
  const username =
    usernameResult && "username" in usernameResult
      ? usernameResult.username
      : null;

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/80 backdrop-blur-md rounded-t-xl shadow-sm">
        <div className="flex flex-row justify-between items-center w-full mx-auto px-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-2" />
            <Separator orientation="vertical" className="h-6" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center bg-background">
        <div className="w-full max-w-6xl mx-auto py-8 px-4">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <StatCard
              icon={FilePlus2}
              label="Total Notes"
              value={notes.length}
            />
            <StatCard
              icon={User2}
              label="User"
              value={username || "Anonymous"}
            />
            {/* Add more StatCards here if needed */}
          </div>

          {notes.length === 0 ? (
            <section className="flex flex-col items-center justify-center h-[60vh] bg-card rounded-xl shadow-md border border-border">
              <FilePlus2 className="w-14 h-14 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2 text-foreground">
                No notes yet!
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                You haven&apos;t created any notes. Click below to get started!
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-lg font-semibold shadow focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Link href="/dashboard/new">Create New Note</Link>
              </Button>
            </section>
          ) : (
            <section className="bg-card rounded-xl shadow-md border border-border p-4">
              <NotesTable notes={notes} username={username || null} />
            </section>
          )}
        </div>
      </main>
    </>
  );
}
