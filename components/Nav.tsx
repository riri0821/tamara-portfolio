export const NAV = [
  { id: "about", label: "whoami" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "log" },
  { id: "arsenal", label: "arsenal" },
  { id: "achievements", label: "loot" },
  { id: "contact", label: "contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-term-line bg-term-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-3 sm:px-8 lg:px-12 md:flex-row md:items-center md:justify-between">
        <a href="#top" className="text-sm">
          <span className="prompt">tamara@redteam</span>
          <span className="text-term-faint">:</span>
          <span className="prompt-path">~</span>
          <span className="text-term-faint">$</span>
          <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-term-red" />
        </a>
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
