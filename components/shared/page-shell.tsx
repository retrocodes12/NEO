import type { ReactNode } from "react";

interface PageShellProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <section className="glass rounded-2xl p-6">
      <h1 className="font-heading text-3xl font-semibold">{title}</h1>
      {description ? <p className="mt-3 text-muted-foreground">{description}</p> : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}
