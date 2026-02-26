"use client";

import Link from "next/link";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function AppShellHeader() {
  return (
    <header className="glass relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-2xl px-5">
      <Link href="/" className="font-heading text-xl font-semibold neon-text">
        ElevateWeb Console
      </Link>

      <SignedOut>
        <SignInButton mode="modal">
          <button className="rounded-md border border-border/70 bg-background/20 px-3 py-1.5 text-sm font-semibold">Sign in</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </header>
  );
}
