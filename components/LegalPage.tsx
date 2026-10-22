import type { ReactNode } from "react";
import TermWindow from "./TermWindow";
import Footer from "./Footer";

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <main className="mx-auto max-w-2xl px-4 py-16">
        <TermWindow title={`less ${title}`} bodyClassName="flex flex-col gap-3 p-6 text-sm leading-relaxed text-term-dim">
          {children}
          <a href="/" className="btn mt-4 self-start">
            cd ~
          </a>
        </TermWindow>
      </main>
      <Footer />
    </>
  );
}
