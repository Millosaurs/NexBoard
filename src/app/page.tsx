"use client";
import {
  ArrowRight,
  CheckCircle,
  Code,
  Database,
  ExternalLink,
  Github,
  Menu,
  Palette,
  Shield,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import menu2 from "react-useanimations/lib/menu2";

// Navbar Component
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Code className="w-4 h-4 text-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              NexBoard
            </span>
          </div>

          {/* Desktop CTA */}

          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Button size="sm" className="group">
                Get Started
                <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/40 py-4">
            <div className="flex flex-col space-y-4">
              {/* Theme Toggle in mobile menu */}
              <ThemeToggle />
              <div className="flex flex-col space-y-2 pt-4 border-t border-border/40">
                <Link
                  href="/login"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Button size="sm" className="group">
                    Get Started
                    <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default function Home() {
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

  const features = [
    {
      title: "Type Safe",
      description: "Full TypeScript support with type-safe database queries",
      icon: CheckCircle,
    },
    {
      title: "Modern Auth",
      description: "Secure authentication with better-auth integration",
      icon: Shield,
    },
    {
      title: "Production Ready",
      description: "Optimized for performance and scalability",
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-32 pt-48">
        <div className="max-w-4xl mx-auto">
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
              <Button className="group">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
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
                      <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-lg flex items-center justify-center group-hover:from-blue-500/20 group-hover:to-purple-600/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-blue-600" />
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

          {/* Features */}
          <div className="mb-24">
            <h2 className="text-sm font-medium text-muted-foreground mb-8 text-center uppercase tracking-wider">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <div key={feature.title} className="text-center group">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-lg flex items-center justify-center group-hover:from-green-500/20 group-hover:to-emerald-600/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-medium text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="border-t border-border pt-12">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-medium text-foreground mb-1">
                  5min
                </div>
                <div className="text-sm text-muted-foreground">Setup</div>
              </div>
              <div>
                <div className="text-2xl font-medium text-foreground mb-1">
                  100%
                </div>
                <div className="text-sm text-muted-foreground">Type Safe</div>
              </div>
              <div>
                <div className="text-2xl font-medium text-foreground mb-1">
                  0 Config
                </div>
                <div className="text-sm text-muted-foreground">Ready to Go</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
