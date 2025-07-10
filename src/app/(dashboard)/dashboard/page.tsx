import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DollarSign, Users, Folder, Activity, TrendingUp } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const stats = [
  {
    label: "Revenue",
    value: "$12,400",
    icon: DollarSign,
    growth: "+4.2%",
  },
  {
    label: "Users",
    value: "1,230",
    icon: Users,
    growth: "+2.1%",
  },
  {
    label: "Projects",
    value: "8",
    icon: Folder,
    growth: "+1",
  },
];

const recentActivity = [
  {
    id: 1,
    icon: <Activity className="w-4 h-4 text-primary" />,
    description: "Deployed new version of Acme App",
    user: {
      name: "Alex Smith",
      avatar: "/avatars/alex.jpg",
    },
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: <Activity className="w-4 h-4 text-primary" />,
    description: "Added new user: Jane Doe",
    user: {
      name: "Jane Doe",
      avatar: "/avatars/jane.jpg",
    },
    time: "5 hours ago",
  },
  {
    id: 3,
    icon: <Activity className="w-4 h-4 text-primary" />,
    description: "Completed project: Redesign Website",
    user: {
      name: "Chris Lee",
      avatar: "/avatars/chris.jpg",
    },
    time: "1 day ago",
  },
];

const topProjects = [
  {
    name: "Acme App",
    progress: 80,
    team: [
      { name: "Alex", avatar: "/avatars/alex.jpg" },
      { name: "Jane", avatar: "/avatars/jane.jpg" },
    ],
  },
  {
    name: "Redesign Website",
    progress: 60,
    team: [
      { name: "Chris", avatar: "/avatars/chris.jpg" },
      { name: "Sam", avatar: "/avatars/sam.jpg" },
    ],
  },
  {
    name: "Marketing Campaign",
    progress: 35,
    team: [
      { name: "Taylor", avatar: "/avatars/taylor.jpg" },
      { name: "Jordan", avatar: "/avatars/jordan.jpg" },
    ],
  },
];

const teamMembers = [
  {
    name: "Alex Smith",
    role: "Developer",
    avatar: "/avatars/alex.jpg",
  },
  {
    name: "Jane Doe",
    role: "Designer",
    avatar: "/avatars/jane.jpg",
  },
  {
    name: "Chris Lee",
    role: "Project Manager",
    avatar: "/avatars/chris.jpg",
  },
  {
    name: "Sam Green",
    role: "QA Engineer",
    avatar: "/avatars/sam.jpg",
  },
];

export default function Dashboard() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center border-b border-border bg-background rounded-t-xl">
        <div className="flex flex-row justify-between items-center w-full mx-4">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-4 bg-background">
        {/* Stat Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="flex flex-row items-center p-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent mr-4">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-600 font-medium">
                  {stat.growth}
                </span>
              </div>
            </Card>
          ))}
        </div>
        {/* Main Content Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Recent Activity */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentActivity.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    {item.icon}
                    <Avatar className="h-7 w-7">
                      <AvatarImage
                        src={item.user.avatar}
                        alt={item.user.name}
                      />
                      <AvatarFallback>
                        {item.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm text-foreground">
                        {item.description}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.time}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          {/* Top Projects */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                Top Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {topProjects.map((project) => (
                  <li key={project.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">
                        {project.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {project.progress}%
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-2 mb-2" />
                    <div className="flex -space-x-2">
                      {project.team.map((member) => (
                        <Avatar
                          key={member.name}
                          className="h-6 w-6 border-2 border-background"
                        >
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {teamMembers.map((member) => (
                <li key={member.name} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {member.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {member.role}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
