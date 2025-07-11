"use client";
import { ArrowRight, Code, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Session, User } from "better-auth";

interface MainNavProps {
  session: { session: Session | null; user: User | null } | null;
}

export function MainNav({ session }: MainNavProps) {
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
              href={session?.user ? "/dashboard" : "/login"}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Button size="sm" className="group">
                {session?.user ? "Dashboard" : "Get Started"}
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
                  href={session?.user ? "/dashboard" : "/login"}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Button size="sm" className="group">
                    {session ? "Dashboard" : "Get Started"}
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
