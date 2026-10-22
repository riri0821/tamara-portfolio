import type { ReactNode } from "react";

// Every section opens with the shell command that "prints" it.
export default function Section({
  id,
  index,
  title,
  command,
  children,
}: {
  id: string;
  index: string;
  title: string;
  command: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <header className="mb-8">
        <p className="text-sm text-term-dim">
          <span className="prompt">tamara@portfolio</span>
          <span className="text-term-faint">:</span>
          <span className="prompt-path">~</span>
          <span className="text-term-faint">$ </span>
          <span className="cmd">{command}</span>
        </p>
        <h2 className="mt-3 flex items-baseline gap-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span className="font-mono text-base font-normal text-term-red">{index}</span>
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}
