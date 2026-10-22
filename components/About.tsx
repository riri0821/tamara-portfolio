import { bioHighlights, profile } from "@/lib/content";
import Section from "./Section";

export default function About() {
  return (
    <Section id="about" index="01" title="whoami" command="cat about.md">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <p className="text-base leading-relaxed text-term-text sm:text-lg">{profile.about}</p>
        <dl className="grid gap-px overflow-hidden rounded-lg border border-term-line bg-term-line text-sm sm:grid-cols-2">
          {bioHighlights.map((b, i) => (
            <div
              key={b.label}
              className={`bg-term-panel px-4 py-3 ${i === bioHighlights.length - 1 && bioHighlights.length % 2 === 1 ? "sm:col-span-2" : ""}`}
            >
              <dt className="text-xs text-term-faint">{b.label.toLowerCase()}</dt>
              <dd className="mt-0.5 leading-snug text-term-text">{b.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
