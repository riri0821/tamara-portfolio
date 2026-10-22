import type { ReactNode } from "react";

// Title bar in the Linux / Windows Terminal style: app icon and title on the left,
// minimize, maximize and close on the right.
export default function TermWindow({
  title,
  children,
  className = "",
  bodyClassName = "p-5",
}: {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={`term-window ${className}`}>
      <div className="term-bar">
        <span className="rounded-sm bg-term-bg px-1 text-[10px] font-bold leading-4 text-term-red">&gt;_</span>
        <span className="truncate">{title}</span>
        <span className="ml-auto flex shrink-0 items-center" aria-hidden="true">
          <span className="win-btn">
            <svg viewBox="0 0 10 10" className="h-2.5 w-2.5">
              <path d="M1 5h8" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </span>
          <span className="win-btn">
            <svg viewBox="0 0 10 10" className="h-2.5 w-2.5">
              <rect x="1.5" y="1.5" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </span>
          <span className="win-btn hover:bg-term-red hover:text-black">
            <svg viewBox="0 0 10 10" className="h-2.5 w-2.5">
              <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </span>
        </span>
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
