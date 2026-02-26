import Link from "next/link";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10 md:px-10">
      <div className="pointer-events-none absolute -left-28 top-8 h-72 w-72 orb opacity-90" />
      <div className="pointer-events-none absolute -right-28 top-28 h-80 w-80 orb opacity-70" />
      <div className="pointer-events-none absolute inset-0 hex-overlay" />

      <div className="relative mx-auto max-w-6xl space-y-8">
        <header className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/35 px-5 py-4 backdrop-blur-xl">
          <Link href="/" className="font-heading text-2xl font-semibold neon-text">
            ElevateWeb
          </Link>
          <nav className="hidden gap-5 text-sm text-muted-foreground md:flex">
            <Link href="/product">Product</Link>
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/docs">Docs</Link>
          </nav>
          <Link href="/dashboard" className="neon-ring rounded-lg bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground">
            Start Building
          </Link>
        </header>

        {children}
      </div>
    </div>
  );
}
