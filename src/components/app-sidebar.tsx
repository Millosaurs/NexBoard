import * as React from "react";
import { CheckCircle, Code, FileText } from "lucide-react";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { getNotes } from "@/server/notes";
import { Button } from "./ui/button";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user:
    | {
        name: string;
        email: string;
        image?: string | null | undefined;
      }
    | undefined;
}

export async function AppSidebar({ user, ...props }: AppSidebarProps) {
  const result = await getNotes();
  const notes = result && "notes" in result ? result.notes : [];

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Code className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">NexBoard</span>
                  <span className="truncate text-xs"></span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem className="my-auto space-y-2">
            <SidebarMenuButton asChild>
              <Link
                href="/dashboard"
                className="flex flex-row justify-center items-center"
              >
                <Button variant="outline" className="w-full h-8 ">
                  Dashboard
                </Button>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <Link
                href="/dashboard/new"
                className="flex flex-row justify-center items-center"
              >
                <Button variant="default" className="w-full h-8 ">
                  New note
                </Button>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {notes.map((note) => (
            <SidebarMenuItem key={note.id} className="space-y-4 mt-2">
              <SidebarMenuButton asChild>
                <Link href={`/dashboard/${note.id}`}>
                  {note.status === "published" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <FileText className="h-4 w-4 text-gray-500" />
                  )}
                  {note.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
