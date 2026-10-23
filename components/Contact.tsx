"use client";

import { useState, type FormEvent } from "react";
import { contact, contactTopics, links } from "@/lib/content";
import Section from "./Section";
import TermWindow from "./TermWindow";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [topic, setTopic] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/superchat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message: form.get("message"),
          topic: contactTopics[topic].id,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("sent");
      formEl.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <Section id="contact" index="05" title="Contact" command="./contact.sh --interactive">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h3 className="font-display text-3xl font-bold text-white">{contact.heading}</h3>
          <p className="mt-3 leading-relaxed text-term-dim">{contact.intro}</p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>
              <a href={links.github} target="_blank" rel="noreferrer" className="text-term-text hover:text-term-red">
                <span className="text-term-red">→</span> github
              </a>
            </li>
            <li>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="text-term-text hover:text-term-red">
                <span className="text-term-red">→</span> linkedin
              </a>
            </li>
            <li>
              <a href={links.resume} download="Tamara-Valencia-Resume.pdf" className="text-term-text hover:text-term-red">
                <span className="text-term-red">→</span> resume.pdf
              </a>
            </li>
          </ul>
        </div>

        <TermWindow title="contact.sh" bodyClassName="p-5 sm:p-6">
          <form onSubmit={submit} className="space-y-4 text-sm">
            <fieldset>
              <legend className="text-term-faint">--topic</legend>
              <div className="mt-1 flex flex-wrap gap-2">
                {contactTopics.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTopic(i)}
                    aria-pressed={topic === i}
                    className={`rounded border px-3 py-1 transition ${topic === i ? "border-term-red bg-term-red/15 text-term-red" : "border-term-line text-term-dim hover:text-term-text"}`}
                  >
                    {t.label.toLowerCase()}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-term-faint">--name</span>
                <input name="name" required maxLength={80} className="field" placeholder="Your name" />
              </label>
              <label className="block">
                <span className="text-term-faint">--email</span>
                <input name="email" type="email" required maxLength={120} className="field" placeholder="you@example.com" />
              </label>
            </div>
            <label className="block">
              <span className="text-term-faint">--message</span>
              <textarea name="message" required maxLength={1000} rows={5} className="field resize-none" placeholder="Share your thoughts..." />
            </label>
            <button type="submit" disabled={status === "sending"} className="btn btn-red w-full justify-center disabled:opacity-60">
              {status === "sending" ? "sending..." : "[ execute ]"}
            </button>
            <p role="status" className="min-h-[1.25rem] text-xs">
              {status === "sent" && <span className="text-term-green">[+] message delivered. I&apos;ll get back to you soon.</span>}
              {status === "error" && <span className="text-term-red">[-] {error}</span>}
            </p>
          </form>
        </TermWindow>
      </div>
    </Section>
  );
}
