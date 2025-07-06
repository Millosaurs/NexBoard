"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Code, Github, Twitter, Mail, User, Globe } from "lucide-react";

const socialProviders = [
	{
		name: "Google",
		icon: <Globe className="w-5 h-5" />,
	},
	{
		name: "GitHub",
		icon: <Github className="w-5 h-5" />,
	},
	{
		name: "Twitter",
		icon: <Twitter className="w-5 h-5" />,
	},
];

export default function AuthPage() {
	const [isSignIn, setIsSignIn] = useState(true);

	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<Card className="w-full max-w-md shadow-lg border border-border">
				<CardContent className="py-10 px-8">
					<div className="flex flex-col items-center mb-8">
						<div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-2">
							<Code className="w-5 h-5 text-foreground" />
						</div>
						<Badge variant="secondary" className="mb-2">
							{isSignIn ? "Sign In" : "Sign Up"}
						</Badge>
						<h2 className="text-2xl font-semibold text-foreground">
							{isSignIn ? "Welcome Back" : "Create an Account"}
						</h2>
						<p className="text-sm text-muted-foreground mt-1">
							{isSignIn
								? "Sign in to your account"
								: "Sign up to get started"}
						</p>
					</div>
					<div className="mb-6">
						<div className="flex flex-col gap-3">
							{socialProviders.map((provider) => (
								<Button
									key={provider.name}
									variant="outline"
									className="w-full flex items-center justify-center gap-2"
								>
									{provider.icon}
									<span className="text-sm">
										Continue with {provider.name}
									</span>
								</Button>
							))}
						</div>
						<div className="flex items-center my-6">
							<div className="flex-1 h-px bg-border" />
							<span className="mx-3 text-xs text-muted-foreground">or</span>
							<div className="flex-1 h-px bg-border" />
						</div>
					</div>
					<form className="space-y-5">
						<Input
							type="email"
							placeholder="Email"
							className="bg-background border-border"
							required
						/>
						<Input
							type="password"
							placeholder="Password"
							className="bg-background border-border"
							required
						/>
						{!isSignIn && (
							<Input
								type="password"
								placeholder="Confirm Password"
								className="bg-background border-border"
								required
							/>
						)}
						<Button type="submit" className="w-full">
							{isSignIn ? "Sign In" : "Sign Up"}
						</Button>
					</form>
					<div className="mt-6 text-center">
						<span className="text-sm text-muted-foreground">
							{isSignIn
								? "Don't have an account?"
								: "Already have an account?"}
						</span>
						<Button
							variant="link"
							className="ml-1 text-primary p-0 h-auto"
							onClick={() => setIsSignIn((v) => !v)}
						>
							{isSignIn ? "Sign Up" : "Sign In"}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
