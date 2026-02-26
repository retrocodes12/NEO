import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      <div className="pointer-events-none absolute -left-28 top-8 h-72 w-72 orb opacity-90" />
      <div className="pointer-events-none absolute -right-28 top-28 h-80 w-80 orb opacity-70" />
      <div className="pointer-events-none absolute inset-0 hex-overlay" />

      <section className="glass relative w-full max-w-md rounded-3xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Welcome Back</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold">Sign in to ElevateWeb</h1>
        <div className="mt-6 flex justify-center">
          <SignIn />
        </div>
      </section>
    </main>
  );
}
