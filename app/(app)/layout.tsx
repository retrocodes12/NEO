import Link from "next/link";

import { requireUser } from "@/lib/auth";

export default async function AppShellLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await requireUser();

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-4 md:px-8 md:py-6">
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 orb opacity-60" />
      <div className="pointer-events-none absolute -right-20 top-14 h-64 w-64 orb opacity-50" />

      <header className="glass relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-2xl px-5">
        <Link href="/" className="font-heading text-xl font-semibold neon-text">
          Alvent Console
        </Link>
        <div className="rounded-md border border-border/70 bg-background/20 px-3 py-1 text-sm text-muted-foreground">{user.email}</div>
      </header>

      <main className="relative mx-auto mt-6 w-full max-w-7xl">{children}</main>
    </div>
  );
}
