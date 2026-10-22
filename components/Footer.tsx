import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-term-line">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-6 text-xs text-term-faint sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="flex gap-4">
          <a href="/privacy" className="hover:text-term-red">
            privacy
          </a>
          <a href="/terms" className="hover:text-term-red">
            terms
          </a>
          <a href="#top" className="hover:text-term-red">
            cd ~
          </a>
        </p>
      </div>
    </footer>
  );
}
