"use client";

import { useEffect, useState } from "react";
import { links, projects, type Project } from "@/lib/content";
import Section from "./Section";
import TermWindow from "./TermWindow";

const live = (url: string) => url && url !== "#";

const CORNERS = [
  "-left-2 -top-2 border-l-2 border-t-2",
  "-right-2 -top-2 border-r-2 border-t-2",
  "-bottom-2 -left-2 border-b-2 border-l-2",
  "-bottom-2 -right-2 border-b-2 border-r-2",
];

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <Section id="projects" index="02" title="Selected Projects" command="ls -la ~/projects">
      <div className="-mt-4 mb-8 flex justify-end">
        <a href={links.github} target="_blank" rel="noreferrer" className="text-sm text-term-text underline-offset-4 hover:text-term-red hover:underline">
          View all projects →
        </a>
      </div>
      <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.slot} className="group relative">
            {/* corner brackets that light up on hover */}
            {CORNERS.map((c) => (
              <span
                key={c}
                className={`pointer-events-none absolute h-5 w-5 border-term-line transition-colors group-hover:border-term-red group-focus-within:border-term-red ${c}`}
              />
            ))}

            <button type="button" onClick={() => setOpen(p)} className="block w-full text-left outline-none" aria-label={`Open details for ${p.title}`}>
              <article className="term-window">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-term-line bg-term-bg">
                  {p.preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.preview}
                      alt={`Screenshot of ${p.title}`}
                      className="h-full w-full object-cover object-top opacity-85 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[repeating-linear-gradient(45deg,#111317_0px,#111317_10px,#0d0f12_10px,#0d0f12_20px)] text-xs text-term-faint">
                      [ screenshot pending ]
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm text-term-dim">{p.summary}</p>
                </div>
              </article>

              {/* small pop-up in the upper right corner, shown on hover (always shown on touch screens) */}
              <span
                aria-hidden="true"
                className="absolute -right-3 -top-4 z-10 flex items-center gap-1.5 rounded border border-term-red bg-term-bg px-2.5 py-1 text-xs text-term-red shadow-[0_8px_24px_-6px_rgba(0,0,0,0.9)] transition duration-200 md:pointer-events-none md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-term-red" />
                view details ↗
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </Section>
  );
}

function ProjectModal({ project: p, onClose }: { project: Project; onClose: () => void }) {
  // Close on Escape and stop the page behind from scrolling.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-h-[90dvh] w-full max-w-3xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <TermWindow title={`cat ${p.file.replace(/\.exe$/, "")}/README.md`} bodyClassName="p-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-0 top-0 z-10 h-8 w-10 text-term-faint hover:bg-term-red hover:text-black"
            aria-label="Close"
          >
            ✕
          </button>
          {p.preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.preview} alt={`Screenshot of ${p.title}`} className="aspect-[21/9] w-full border-b border-term-line object-cover object-top" />
          )}
          <div className="p-6 sm:p-8">
            <p className="text-xs" style={{ color: p.accent }}>
              {p.file}
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">{p.title}</h3>
            <p className="mt-1 text-sm text-term-red">{p.summary}</p>
            <p className="mt-4 leading-relaxed text-term-dim">{p.description}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <li key={t} className="tag">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              {live(p.demo) && (
                <a href={p.demo} target="_blank" rel="noreferrer" className="btn btn-red">
                  {p.demoLabel ?? "live demo"} ↗
                </a>
              )}
              {live(p.source) && (
                <a href={p.source} target="_blank" rel="noreferrer" className="btn">
                  source code ↗
                </a>
              )}
              {!live(p.demo) && !live(p.source) && <span className="text-sm text-term-faint">[ links coming soon ]</span>}
            </div>
          </div>
        </TermWindow>
      </div>
    </div>
  );
}
