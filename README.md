# Tamara · Terminal Portfolio

My portfolio, with a dark, red-team terminal theme. One scrolling page with an interactive shell in
the hero (type `help`), a port-scan style skills section and a `git log` timeline.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where to edit things

| What | File |
| --- | --- |
| Name, role, red-team focus line, intro lines, links, projects, experience, skills, achievements | `lib/content.ts` |
| "Currently training" card in Arsenal | `training` in `lib/content.ts` |
| Hero shell commands | `HELP` and `run()` in `components/Hero.tsx` |
| Colors | `tailwind.config.ts` (`term.*`) |
| Fonts | `app/layout.tsx` (JetBrains Mono + Space Grotesk) |

## Contact form

`app/api/superchat/route.ts` emails each message through Resend. Set `RESEND_API_KEY` and
`CONTACT_TO_EMAIL` in Vercel (optionally `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to also store them).

## Stack

Next.js (App Router), React, Tailwind CSS. No other runtime dependencies.
