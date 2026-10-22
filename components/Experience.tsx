import { posts } from "@/lib/content";
import Section from "./Section";

// A stable fake commit hash per role, purely decorative.
function hash(s: string) {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

export default function Experience() {
  return (
    <Section id="experience" index="03" title="Experience" command="git log --graph career">
      <ol className="relative border-l border-dashed border-term-line pl-6 sm:pl-8">
        {posts.map((p, i) => (
          <li key={p.id} className="relative pb-10 last:pb-0">
            <span
              className={`absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 sm:-left-[39px] ${i === 0 ? "border-term-red bg-term-red" : "border-term-red bg-term-bg"}`}
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
