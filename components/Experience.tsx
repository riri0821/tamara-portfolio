"use client";

import { useEffect, useRef, useState } from "react";
import { posts } from "@/lib/content";
import Section from "./Section";

// A stable fake commit hash per role, purely decorative.
function hash(s: string) {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

export default function Experience() {
  // A red line grows down the timeline as you scroll; dots it reaches fill in,
  // and the role you're reading glows.
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.45;
      let next = 0;
      items.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < line) next = i;
      });
      setActive(next);
      const box = list.current?.getBoundingClientRect();
      if (box) setProgress(Math.min(Math.max(line - box.top, 0), box.height));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Section id="experience" index="03" title="Experience" command="git log --graph career">
      <ol ref={list} className="relative border-l border-dashed border-term-line pl-6 sm:pl-8">
        <span
          aria-hidden="true"
          className="absolute -left-px top-0 w-0.5 -translate-x-[0.5px] bg-term-red shadow-[0_0_8px_rgba(255,59,78,0.7)] transition-[height] duration-150 ease-out"
          style={{ height: progress }}
        />
        {posts.map((p, i) => (
          <li key={p.id} ref={(el) => { items.current[i] = el; }} className="relative pb-10 last:pb-0">
            <span
              className={`absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-term-red transition-all duration-300 sm:-left-[39px] ${i === active ? "scale-125 bg-term-red shadow-[0_0_12px_rgba(255,59,78,0.8)]" : i < active ? "bg-term-red" : "bg-term-bg"}`}
            />
            <p className="text-xs">
              <span className="text-term-amber">commit {hash(p.title)}</span>
              {i === 0 && <span className="ml-2 text-term-cyan">(HEAD -&gt; main)</span>}
              <span className="ml-2 text-term-faint">{p.dates}</span>
            </p>
            <h3 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">{p.title}</h3>
            <div className="mt-2 max-w-3xl space-y-2 text-sm leading-relaxed text-term-dim">
              {p.text.split("\n\n").map((para, j) => (
                <p key={j}>
                  <span className="text-term-red">+ </span>
                  {para}
                </p>
              ))}
            </div>
            {p.tags.length > 0 && (
              <ul className="mt-2 flex gap-1.5">
                {p.tags.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
