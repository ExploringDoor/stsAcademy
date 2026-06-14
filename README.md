# Small Town Sports Academy — website

A premium, fast, static marketing + offerings site for **Small Town Sports Academy**
(baseball & softball training · Stephenville, TX). Mirrors the academy's live UpperHand
offerings; every "Register / Enroll" button deep-links to the real UpperHand booking flow,
so payments and signups keep running through the academy's existing system.

## Pages
- `index.html` — home (hero, marquee, editorial program rows, stats, facility, coaches, CTA)
- `programs.html` — camps, clinics & training (live UpperHand programs)
- `schedule.html` — **live** upcoming-session calendar pulled straight from UpperHand
- `lessons.html` — private & small-group lessons (inquiry form → email)
- `memberships.html` — membership tiers (facility, team, season/showcase)
- `facility.html` — the three Stephenville facilities + map
- `coaches.html` — leadership + instructors (reachable from the footer)
- `about.html` — story, mission, stats
- `contact.html` — visit info, contact form (mailto), map, register

## Live schedule
`schedule.html` + `js/schedule.js` fetch upcoming sessions **directly from the UpperHand API
in the browser** (it's CORS-open and needs only an `X-Customer-Id` header — no key, no backend).
New camps/clinics appear automatically the moment they're published. `data/schedule.json` is an
offline fallback snapshot used only if the live fetch fails. Times render in the academy's
timezone (`STSA.upperhand.tz`, Central).

## Architecture
Plain HTML/CSS/vanilla JS — no build step.
- `js/config.js` — **single source of truth** (`window.STSA`): all programs, memberships,
  locations, coaches, contact, stats. Edit content here and every page updates.
- `css/site.css` — the **"cinematic athletic"** design system: near-black + warm cream +
  red + gold, with Anton (display) / Oswald (labels) / Manrope (body), full-bleed photo
  bands, editorial program rows, film-grain texture, and a dark/light section rhythm.
- `js/chrome.js` — injects the shared nav + footer, icon library (`window.icon`),
  scroll-reveal, count-up, and the mobile nav.
- Each page loads `config.js` + `chrome.js` then one small inline script that builds its
  sections from `window.STSA`.
- `assets/img/` — real (placeholder) photography; see `assets/img/IMAGE-CREDITS.md`. Swap
  these for the academy's own photos to make it fully authentic.

## Run locally
```
npx serve -l 8013 .
# → http://localhost:8013
```

## Deploy (Vercel)
Static — no framework. `vercel.json` is configured (`outputDirectory: "."`). Push the repo and
import to Vercel, or `vercel deploy`.

## Updating content
- **New camp/clinic** → add an object to `STSA.programs` in `js/config.js` (copy an existing one,
  set the UpperHand `url`). It appears on the home + programs pages automatically.
- **Membership change** → edit `STSA.membershipGroups`.
- **Hours / contact / address** → `STSA.contact`.

## Data source
Content was pulled from the academy's UpperHand customer (id 1830). The raw API snapshot lives in
`data/raw-upperhand/` and is **gitignored** (it contains non-public membership/staff detail).
