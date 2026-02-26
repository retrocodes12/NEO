import { AppShellHeader } from "@/components/shared/app-shell-header";

export default async function AppShellLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-4 md:px-8 md:py-6">
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 orb opacity-60" />
      <div className="pointer-events-none absolute -right-20 top-14 h-64 w-64 orb opacity-50" />
      <div className="pointer-events-none absolute inset-0 hex-overlay" />

      <AppShellHeader />

      <main className="relative mx-auto mt-6 w-full max-w-7xl">{children}</main>
    </div>
  );
}
