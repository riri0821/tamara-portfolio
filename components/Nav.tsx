"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

export const NAV = [
  { id: "about", label: "whoami" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "log" },
  { id: "arsenal", label: "arsenal" },
  { id: "contact", label: "contact" },
];

export default function Nav() {
  // The prompt's path follows the section you're reading, like cd-ing around a shell.
  const [path, setPath] = useState("~");
  const [cmd, setCmd] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typing "cd projects", "projects" or "~" jumps there.
  function jump(e: FormEvent) {
    e.preventDefault();
    const target = cmd.trim().toLowerCase().replace(/^cd\s*/, "").replace(/^(\.\/|~\/)/, "");
    setCmd("");
    if (["", "~", "/", "..", "top"].includes(target)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const n = NAV.find((x) => x.label === target || x.id === target);
    if (n) document.getElementById(n.id)?.scrollIntoView({ behavior: "smooth" });
    else setError(true);
    inputRef.current?.blur();
  }

  useEffect(() => {
    const update = () => {
      let current = "~";
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top < 140) current = `~/${n.label}`;
      }
      setPath(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-term-line bg-term-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-3 sm:px-8 lg:px-12 md:flex-row md:items-center md:justify-between">
        <form onSubmit={jump} className="flex items-center text-sm" onClick={() => inputRef.current?.focus()}>
          <a href="#top" className="shrink-0">
            <span className="prompt">tamara@portfolio</span>
            <span className="text-term-faint">:</span>
            <span className="prompt-path">{path}</span>
            <span className="text-term-faint">$</span>
          </a>
          <label htmlFor="nav-shell" className="sr-only">
            Jump to a section
          </label>
          <input
            id="nav-shell"
            ref={inputRef}
            value={cmd}
            onChange={(e) => {
              setCmd(e.target.value);
              setError(false);
            }}
            autoComplete="off"
            spellCheck={false}
            placeholder={error ? "not found, try cd projects" : "cd projects"}
            className={`ml-2 w-44 min-w-0 bg-transparent caret-term-red outline-none placeholder:text-term-faint ${error ? "placeholder:text-term-red" : ""}`}
          />
        </form>
        <ul className="-mx-1 flex gap-1 overflow-x-auto text-sm [scrollbar-width:none]">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className="block whitespace-nowrap rounded px-2 py-1 text-term-dim transition hover:bg-term-raised hover:text-term-red"
              >
                <span className="text-term-faint">./</span>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
