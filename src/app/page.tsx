import {
  ArrowRight,
  CheckCircle,
  Code,
  Database,
  ExternalLink,
  Github,
  Palette,
  Shield,
  Zap,
  Moon,
  Sun,
  Folder,
  FileText,
  Layout,
  Users,
  Timer,
  Sparkles,
  Layers,
  Globe,
  Key,
  Smartphone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { MainNav } from "@/components/main-nav";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const techStack = [
    {
      name: "Next.js 15+",
      description: "React Framework",
      icon: Code,
    },
    {
      name: "Tailwind CSS",
      description: "Utility-First CSS",
      icon: Palette,
    },
    {
      name: "Drizzle ORM",
      description: "Type-Safe Database",
      icon: Database,
    },
    {
      name: "Better Auth",
      description: "Modern Authentication",
      icon: Shield,
    },
  ];

  const projectStructure = `tamplet/
├── .next/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── signup/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── [noteId]/
│   │   │   │       └── page.tsx
│   │   │   └── [username]/
│   │   │       └── [slug]/
│   │   │           └── page.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...all]/
│   │   │   │       └── route.ts
│   │   │   └── notes/
│   │   │       └── [id]/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── app-sidebar.tsx
│   │   ├── login-form.tsx
│   │   ├── main-nav.tsx
│   │   ├── markdown-renderer.tsx
│   │   ├── nav-main.tsx
│   │   ├── nav-projects.tsx
│   │   ├── nav-secondary.tsx
│   │   ├── nav-user.tsx
│   │   ├── notes-list.tsx
│   │   ├── notes-table.tsx
│   │   ├── signup-form.tsx
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── db/
│   │   ├── index.ts
│   │   └── schema.ts
│   ├── hooks/
│   │   └── use-mobile.ts
│   ├── lib/
│   │   ├── auth-client.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   └── server/
│       ├── notes.ts
│       └── user.ts
├── .gitignore
├── bun.lock
├── components.json
├── drizzle.config.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json`;

  return (
    <div className="min-h-screen bg-background">
      <MainNav session={session} />

      <div className="container mx-auto px-4 py-32 pt-48">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-24">
            <Badge variant="secondary" className="mb-6">
              <Code className="w-3 h-3 mr-2" />
              Next.js Boilerplate
            </Badge>

            <h1 className="text-5xl md:text-6xl font-medium text-foreground mb-6 tracking-tight">
              Ship faster with
              <br />
              <span className="text-muted-foreground">modern tooling</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              A minimal, production-ready Next.js boilerplate with
              authentication, database, and modern development tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={session ? "/dashboard" : "/login"}>
                <Button className="group">
                  {session ? "Dashboard" : "Get Started"}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline">
                <Github className="mr-2 w-4 h-4" />
                GitHub
              </Button>
              <Button variant="ghost">
                Docs
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-24" id="features">
            <h2 className="text-sm font-medium text-muted-foreground mb-8 text-center uppercase tracking-wider">
              Tech Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {techStack.map((tech) => {
                const IconComponent = tech.icon;
                return (
                  <Card
                    key={tech.name}
                    className="hover:bg-accent/50 transition-colors group"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-medium text-foreground mb-1">
                        {tech.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tech.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Bento Grid Features */}
          <div className="mb-24">
            <h2 className="text-sm font-medium text-muted-foreground mb-8 text-center uppercase tracking-wider">
              Features & Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Modern UI */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                      <Palette className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Modern UI</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4">
                    Built with shadcn/ui and Tailwind CSS 4, using only design
                    tokens and variables for consistent theming.
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="text-xs">
                      shadcn/ui
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Tailwind CSS
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Authentication */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Secure Auth</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4">
                    Pre-built authentication with better-auth, including login,
                    signup, and session management.
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="text-xs">
                      better-auth
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Sessions
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Database */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                      <Database className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Type-Safe ORM</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4">
                    Drizzle ORM provides full TypeScript support with type-safe
                    database queries and migrations.
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="text-xs">
                      Drizzle ORM
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      TypeScript
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Responsive Design */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                      <Smartphone className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Responsive</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4">
                    Collapsible sidebar, mobile-friendly navigation, and
                    responsive layouts for all screen sizes.
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="text-xs">
                      Mobile First
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Adaptive
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Theme Support */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                      <Moon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Dark/Light Mode</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4">
                    Seamless theme switching with next-themes and persisted user
                    preferences.
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="text-xs">
                      next-themes
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Persistent
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Accessibility */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Accessible</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4">
                    Built with Radix UI primitives for keyboard navigation and
                    screen reader support.
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="text-xs">
                      Radix UI
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      WCAG
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Performance */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Production Ready</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4">
                    Optimized for performance with Next.js 15 App Router,
                    SSR/SSG, and efficient bundling.
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="text-xs">
                      App Router
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      SSR/SSG
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Developer Experience */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                      <Code className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">
                      Developer Experience
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4">
                    Full TypeScript support, ESLint configuration, and hot
                    reloading for optimal development workflow.
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="text-xs">
                      TypeScript
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      ESLint
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Componentized */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                      <Layers className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Componentized</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4">
                    Modular component architecture that's easy to extend,
                    maintain, and customize for your needs.
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="text-xs">
                      Modular
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Reusable
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Notes Management */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Notes Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4">
                    Create, edit, publish, and manage your notes with a rich
                    text editor and public sharing options.
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="text-xs">
                      Markdown Support
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Public Links
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* User Profiles */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                      <Key className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">User Profiles</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4">
                    Dedicated public profile pages for users to showcase their
                    published notes.
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="text-xs">
                      Dynamic Routes
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Personalized URLs
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* API Routes */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">API Routes</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4">
                    Secure API endpoints for authentication and note management,
                    built with Next.js API routes.
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="text-xs">
                      Next.js API
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Server Actions
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Project Structure */}
          <div className="mb-24">
            <h2 className="text-sm font-medium text-muted-foreground mb-8 text-center uppercase tracking-wider">
              Project Architecture
            </h2>
            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                    <Folder className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      Well-Organized Structure
                    </CardTitle>
                    <p className="text-muted-foreground text-sm mt-1">
                      Clear separation of concerns with modular components and
                      logical file organization
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="bg-muted/30 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-sm font-mono text-muted-foreground leading-relaxed">
                    {projectStructure}
                  </pre>
                </div>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-xs text-muted-foreground">
                      Auth Routes
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
                    <span className="text-xs text-muted-foreground">
                      Dashboard
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary/40 rounded-full"></div>
                    <span className="text-xs text-muted-foreground">
                      Components
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary/20 rounded-full"></div>
                    <span className="text-xs text-muted-foreground">
                      Database
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Stats */}
          <div className="border-t border-border pt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="flex items-center justify-center mb-2">
                  <Timer className="w-5 h-5 text-primary mr-2" />
                  <div className="text-2xl font-medium text-foreground">
                    5min
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Quick Setup</div>
              </div>
              <div className="group">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <div className="text-2xl font-medium text-foreground">
                    100%
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Type Safe</div>
              </div>
              <div className="group">
                <div className="flex items-center justify-center mb-2">
                  <Sparkles className="w-5 h-5 text-primary mr-2" />
                  <div className="text-2xl font-medium text-foreground">
                    0 Config
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Ready to Go</div>
              </div>
              <div className="group">
                <div className="flex items-center justify-center mb-2">
                  <Layers className="w-5 h-5 text-primary mr-2" />
                  <div className="text-2xl font-medium text-foreground">
                    10+
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Components</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
