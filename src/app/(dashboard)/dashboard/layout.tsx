// dashboard/layout.tsx
import { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"; // Your server action
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-conter h-screen text-center">
        Please log in to view the dashboard.
      </div>
    );
  }
  const user = session.user;
  return (
    <SidebarProvider>
      <AppSidebar user={user}/>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
