import { stats } from "@/lib/content";
import Section from "./Section";

export default function Achievements() {
  return (
    <Section id="achievements" index="05" title="Achievements" command="ls ~/loot">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.id} className="term-window flex items-center gap-4 p-5 transition hover:border-term-red/60">
            {s.icon && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.icon} alt="" className="h-16 w-16 shrink-0 rounded border border-term-line object-cover [image-rendering:pixelated]" />
            )}
            <div className="min-w-0">
              <p className="text-xs text-term-green">[+] unlocked</p>
              <h3 className="font-display text-lg font-bold leading-tight text-white">{s.label}</h3>
              <p className="mt-1 text-sm">
                <span className="text-term-red">{s.value}</span>
                {s.suffix && <span className="text-term-text"> {s.suffix}</span>}
                {s.unit && <span className="text-term-faint"> · {s.unit}</span>}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
