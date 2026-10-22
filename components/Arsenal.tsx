import { skillGroups, training } from "@/lib/content";
import Section from "./Section";
import TermWindow from "./TermWindow";

// Logos drawn in black need a light chip to show up on the dark background.
const DARK_ICONS = ["github", "nextjs", "vercel", "chatgpt", "capcut"];
const isDark = (icon: string) => DARK_ICONS.some((d) => icon.includes(`/${d}.`));

const initials = (name: string) => name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase();

export default function Arsenal() {
  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0);
  return (
    <Section id="arsenal" index="04" title="Arsenal" command="nmap -sV --open tamara.dev">
      <p className="mb-6 text-sm text-term-dim">
        Nmap scan report for tamara.dev. <span className="text-term-green">{total} services open</span> across{" "}
        {skillGroups.length} groups.
      </p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <TermWindow key={g.id} title={`# ${g.label.toLowerCase()}`} bodyClassName="p-4">
            <div className="mb-2 grid grid-cols-[1fr_auto] text-[11px] uppercase tracking-wider text-term-faint">
              <span>service</span>
              <span>state</span>
            </div>
            <ul className="space-y-1.5">
              {g.skills.map((s) => (
                <li key={s.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded px-1 py-1 text-sm hover:bg-term-raised">
                  {s.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.icon}
                      alt=""
                      className={`h-5 w-5 object-contain ${isDark(s.icon) ? "rounded-sm bg-term-text p-px" : ""}`}
                    />
                  ) : (
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-term-raised text-[9px] text-term-dim">
                      {initials(s.name)}
                    </span>
                  )}
                  <span className="text-term-text">{s.name}</span>
                  <span className="text-xs text-term-green">open</span>
                </li>
              ))}
            </ul>
          </TermWindow>
        ))}
        <TermWindow title="# in progress" className="border-term-red/50" bodyClassName="p-4 text-sm leading-7">
          <p className="text-term-red">[*] currently training</p>
          {training.map((t) => (
            <p key={t} className="text-term-dim">
              {t}
            </p>
          ))}
          <p className="mt-2 text-term-faint"># state: filtered (for now)</p>
        </TermWindow>
      </div>
    </Section>
  );
}
