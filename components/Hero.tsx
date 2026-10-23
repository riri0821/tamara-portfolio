"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { links, profile, profileCard, projects } from "@/lib/content";
import { NAV } from "./Nav";
import TermWindow from "./TermWindow";

type Line = { kind: "in" | "out" | "err"; text: ReactNode };

const HELP = [
  "available commands:",
  "  whoami        about me",
  "  projects      what I've built",
  "  log           work experience",
  "  arsenal       skills and tools",
  "  contact       send me a message",
  "  github        open my GitHub",
  "  linkedin      open my LinkedIn",
  "  clear         clear the screen",
];

function Prompt() {
  return (
    <span className="select-none">
      <span className="prompt">tamara@portfolio</span>
      <span className="text-term-faint">:</span>
      <span className="prompt-path">~</span>
      <span className="text-term-faint">$ </span>
    </span>
  );
}

export default function Hero() {
  // Intro lines appear one at a time, then the prompt becomes interactive.
  const [shown, setShown] = useState(0);
  const [history, setHistory] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const done = shown >= profile.intro.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(profile.intro.length);
      return;
    }
    if (done) return;
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 700 : 550);
    return () => clearTimeout(t);
  }, [shown, done]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history, shown]);

  function run(e: FormEvent) {
    e.preventDefault();
    const cmd = input.trim().toLowerCase().replace(/^\.\//, "");
    setInput("");
    if (!cmd) return;
    if (cmd === "clear") {
      setHistory([]);
      return;
    }
    const out: Line[] = [{ kind: "in", text: input.trim() }];
    const section = NAV.find((n) => n.label === cmd || n.id === cmd);
    if (cmd === "help" || cmd === "ls") {
      HELP.forEach((h) => out.push({ kind: "out", text: h }));
    } else if (section) {
      out.push({ kind: "out", text: `[+] jumping to ${section.label}...` });
      setTimeout(() => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" }), 250);
    } else if (cmd === "github" || cmd === "linkedin") {
      out.push({ kind: "out", text: `[+] opening ${cmd} in a new tab` });
      window.open(links[cmd], "_blank", "noopener");
    } else if (cmd.startsWith("sudo")) {
      out.push({ kind: "err", text: "tamara is not in the sudoers file. This incident will be reported." });
    } else if (cmd === "cat flag.txt" || cmd === "flag") {
      out.push({ kind: "out", text: "FLAG{y0u_f0und_m3_n0w_h1r3_m3}" });
    } else {
      out.push({ kind: "err", text: `command not found: ${cmd}. Try 'help'.` });
    }
    setHistory((h) => [...h, ...out]);
  }

  return (
    <section id="top" className="grid scroll-mt-24 items-center gap-10 pt-6 md:pt-12 lg:grid-cols-[1.25fr_1fr]">
      <div>
        <Typewriter text="Hi, I'm" />
        <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {profile.name}
          <span className="text-term-red">.</span>
        </h1>
        <p className="mt-4 text-lg text-term-text">{profile.role}</p>
        <p className="mt-1 text-lg text-term-red">{profile.focus}</p>

        <TermWindow title="tamara@portfolio: ~ (bash)" className="mt-8" bodyClassName="p-0">
          <div
            ref={scrollRef}
            className="h-64 overflow-y-auto p-5 text-[13px] leading-relaxed sm:text-sm"
            onClick={() => inputRef.current?.focus()}
          >
            <p>
              <Prompt />
              <span className="cmd">cat intro.txt</span>
            </p>
            {profile.intro.slice(0, shown).map((l, i) => (
              <p key={i} className="text-term-dim">
                <span className="text-term-red">&gt; </span>
                {l}
              </p>
            ))}
            {done && (
              <p className="mt-2 text-term-faint">
                # {projects.length} projects loaded. type <span className="text-term-amber">help</span> to look around.
              </p>
            )}
            {history.map((l, i) => (
              <p
                key={i}
                className={`whitespace-pre-wrap ${l.kind === "err" ? "text-term-red" : l.kind === "out" ? "text-term-dim" : ""}`}
              >
                {l.kind === "in" && <Prompt />}
                {l.text}
              </p>
            ))}
            {done && (
              <form onSubmit={run} className="flex items-center gap-2">
                <Prompt />
                <label htmlFor="shell" className="sr-only">
                  Type a command
                </label>
                <input
                  id="shell"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                  className="min-w-0 flex-1 bg-transparent text-term-text caret-term-red outline-none"
                  placeholder="help"
                />
              </form>
            )}
          </div>
        </TermWindow>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href={links.resume} download="Tamara-Valencia-Resume.pdf" className="btn btn-red">
            download resume ↓
          </a>
          <a href={links.github} target="_blank" rel="noreferrer" className="btn">
            github ↗
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn">
            linkedin ↗
          </a>
        </div>
      </div>

      <Portrait />
    </section>
  );
}

// Types the greeting, holds it, deletes it, and starts over.
function Typewriter({ text }: { text: string }) {
  const [n, setN] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(text.length);
      return;
    }
    let delay = deleting ? 60 : 120;
    if (!deleting && n === text.length) delay = 2200; // hold the full word
    if (deleting && n === 0) delay = 500; // short pause before retyping
    const t = setTimeout(() => {
      if (!deleting && n === text.length) setDeleting(true);
      else if (deleting && n === 0) setDeleting(false);
      else setN((c) => c + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(t);
  }, [n, deleting, text]);

  return (
    <p className="mb-2 h-8 font-mono text-xl text-term-dim sm:text-2xl" aria-label={text}>
      <span aria-hidden="true">
        <span className="text-term-red">&gt; </span>
        {text.slice(0, n)}
        <span className="ml-1 inline-block h-5 w-2.5 translate-y-0.5 animate-blink bg-term-red sm:h-6" />
      </span>
    </p>
  );
}

function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
      <div className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-term-line bg-[radial-gradient(circle_at_50%_35%,#2a0d12,#0a0b0d_70%)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.portrait}
          alt={`Portrait of ${profile.name}`}
          className="absolute inset-x-0 bottom-0 h-[92%] w-full object-cover object-top grayscale contrast-125 transition duration-500 group-hover:grayscale-0"
        />
        {/* red tint that lifts on hover */}
        <div className="pointer-events-none absolute inset-0 bg-term-red/25 mix-blend-multiply transition duration-500 group-hover:opacity-0" />
        {/* scanlines */}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.25)_0px,rgba(0,0,0,0.25)_1px,transparent_1px,transparent_3px)]" />
        <div className="pointer-events-none absolute inset-x-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-term-red/10 to-transparent" />
        {/* targeting brackets */}
        {["left-3 top-3 border-l-2 border-t-2", "right-3 top-3 border-r-2 border-t-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map(
          (c) => (
            <span key={c} className={`absolute h-6 w-6 border-term-red ${c}`} />
          ),
        )}
        <p className="absolute left-5 top-5 rounded bg-black/70 px-2 py-1 text-[11px] text-term-red">● REC target: {profile.name.toLowerCase()}</p>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-term-line bg-term-line text-xs">
        {profileCard.map((f) => (
          <div key={f.label} className={`bg-term-panel px-3 py-2 ${f.wide ? "col-span-2" : ""}`}>
            <dt className="text-term-faint">{f.label}</dt>
            <dd className="text-term-text">
              {f.label === "status" && <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-term-green" />}
              {f.href ? (
                <a href={f.href} target="_blank" rel="noreferrer" className="hover:underline">
                  {f.value} ↗
                </a>
              ) : (
                f.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
