# PROMPT FOR EXTERNAL AI — Implement Tier‑1 upgrades for tatianinden.ru

Copy everything below the line into the implementing AI (Cursor / Claude / Codex). Attach the project folder as the workspace. Do not invent business facts; follow this brief and verify against live sources named below.

---

## Role

You are a senior SEO + conversion engineer implementing a finalized audit for **Детский театр танца «Татьянин День»** (https://tatianinden.ru/).

Your job is **implementation**, not another strategy essay. Change the live site source files, keep design/brand intact unless a change is required for semantics/SEO/conversion, and ship in priority order.

## Business context (locked)

- **Brand:** Татьянин День — детский театр танца since 2014
- **Audience (LOCKED):** girls ages **3–14** (groups «Звёздочки» 3–5, «Премьера» 6–9, «Бенефис» 10–14). Adult side project: «Умный фитнес» for women
- **Geo:** ЖК «Суханово Парк», Ленинский г.о., Московская область. Marketing geo keyword cluster includes **Видное** + nearby: Развилка, Расторгуево, Бутово, Дроздово, Молоково
- **Phone:** +7 (963) 671-99-83 · Telegram `https://t.me/+79636719983`
- **Yandex Business / Maps:** https://yandex.ru/maps/org/tatyanin_den/108175150878/ (ID `108175150878`)
- **Yandex Metrika:** counter `109457377` (load only after cookie consent — keep this)
- **Stack:** static HTML on GitHub Pages; many pages are self-contained monoliths (inline CSS/JS). No backend form — copy-to-clipboard + open Telegram/Max
- **Priority channel:** Yandex (Metrika, Webmaster, Business, Maps) over Google
- **Goal:** Tier‑1 visibility on commercial local queries (children’s dance / girls’ dance + Vidnoe / Leninsky district) + higher usable conversion (trial signups)

## Source of truth for address (NAP)

Open the live Yandex org card before editing schema:

- Official Maps locality line (as of audit):  
  `Московская область, Ленинский городской округ, деревня Суханово`
- Phone on card: `+7 (963) 671-99-83`
- Studio unit used in posts / smart-fitness: `ЖК «Суханово Парк», 127/2`
- Marketing city keyword «Видное» stays in **content, titles, areaServed** — but structured `address` must not contradict the card.

**Canonical PostalAddress to use everywhere in JSON-LD + microdata:**

```json
{
  "@type": "PostalAddress",
  "streetAddress": "ЖК «Суханово Парк», 127/2",
  "addressLocality": "деревня Суханово",
  "addressRegion": "Московская область",
  "postalCode": "142702",
  "addressCountry": "RU"
}
```

Also set visible contacts block to the same facts (street + house), while keeping “удобно из Видного…” in prose. Do **not** leave `addressLocality: "Суханово"` without «деревня», do **not** put «ЖК…» into `addressLocality`, do **not** leave Event schema on a different locality than Org schema on the same page.

If the live Yandex card shows a different street string when you check, **copy the card exactly** and note the difference in the PR summary.

## Live card facts that the site currently gets wrong

As of 2026-08-05, Yandex Maps card shows approximately:

- Rating **4.8**, **57** ratings / reviews section active (site schema still hardcodes **4.5 / 11**)
- News/posts still promote “набор с 3 августа” (expired relative to today)
- Category: школа танцев

Update static `aggregateRating` in HTML to match the card (and/or `/yandex-rating.json`), then keep the existing client updater. Prefer truthful static HTML for crawlers.

## Non-negotiables (do NOT break)

1. **152‑FZ cookie/consent flow** — Metrika loads only after consent; form submit locked until personal-data checkbox; ad consent separate; honeypot kept
2. **No Google Fonts** remote load (self-host or system stack only)
3. **Existing Metrika goals / `data-goal` attributes** — do not rename casually; add only if needed
4. **Visual brand** (tiffany/gold, hero layout) — SEO text changes inside existing structure where possible
5. **Do not** invent fake reviews, awards, or prices
6. **Do not** touch backup/archive files unless asked: `index 26:05:2026.html`, `smart-fitness19.06.26.html`, `deploy-ready/` (or sync deploy-ready only if that folder is what actually publishes — check which tree is the GitHub Pages source of truth first)

## Discover publish root first

Before editing, determine which directory is the real published site (repo root vs `deploy-ready/`). Apply all changes to the **published** tree. If both are maintained, sync critical pages or document that only one is canonical.

---

## Implementation order (strict)

Work top-down. Commit or checkpoint after each phase. Prefer small, reviewable diffs.

### PHASE 0 — Inventory (30 min)

1. List all published HTML that contain any of: `2026-08-03`, `DanceSchool`, `addressLocality`, enroll countdown, `aggregateRating`, `Набор с 3 августа`
2. Confirm publish root
3. Snapshot current homepage title/description/H1/enroll banner text

Known hot files (minimum):

- `index.html`
- `zvezdochki.html`, `premiera.html`, `benefis.html`
- `prices.html`, `0-nas.html` / `o-nas.html` (verify real filename used in nav), `pedagogi.html`, `Partners.html`
- `smart-fintess.html` (note spelling), `summer-intensiv.html`, `summer-letter.html`, `online-fitness.html`
- `estradnye-tantsy-dlya-devochek.html`
- `blog/index.html` + blog articles with JSON-LD
- `yandex-rating.json` if present

---

### PHASE 1 — P0 conversion kill-switch (same day)

**Problem:** Deadline `2026-08-03T00:00:00+03:00` has passed. Live banner still says future tense (“3 августа откроется дверь”) while timer shows `00:00:00:00`. Same timer appears on group pages. Event JSON-LD still has `startDate: 2026-08-03`. Yandex Business posts also mention Aug 3 — update those manually in Business cabinet (out of code; leave a checklist for the owner).

**Do:**

1. On `index.html`, `zvezdochki.html`, `premiera.html`, `benefis.html`:
   - Remove countdown JS **or** replace with evergreen “Открыт набор” UI without zeros
   - Rewrite enroll banner headline/copy to **present** tense: набор открыт, места ограничены, первое занятие бесплатно — **no expired date**
2. Update all meta that mention 3 августа:
   - `<meta name="description">`
   - `og:title`, `og:description`
   - `twitter:title`, `twitter:description`
3. Fix JSON-LD `Event` for enrollment: either update `startDate`/`endDate` to a real upcoming window **provided by owner**, or convert to evergreen `Offer` / remove obsolete Event. Do not leave a past `startDate` as if upcoming.
4. Shorten homepage meta description to ~150–160 characters, evergreen, no date.
5. Keep title evergreen (good idea already in code comments).

**Suggested homepage snippets (edit lightly for length):**

- Title: `Танцы для девочек 3–14 лет · Видное · Набор в группы · Татьянин День`
- Description example: `Детский театр танца «Татьянин День» в Видном (ЖК «Суханово Парк»). Эстрада, классика, акробатика для девочек 3–14 лет. Топ-100 России. Первое занятие — бесплатно.`
- OG/Twitter title: `Открыт набор в группы танца · Татьянин День · Видное`

---

### PHASE 2 — P0 positioning lock: girls, not generic “дети”

**Decision is already made in body copy** (“Ваша дочь…”, “девочкам”, CTA «Записать дочку», `prices.html` H1, landing `estradnye-tantsy-dlya-devochek.html`). Snippets still say «дети» → irrelevant clicks + bounce risk (Yandex behavioral).

**Do across commercial pages (homepage + groups + prices + key landings):**

1. Align `title` / `description` / OG / Twitter / main Org schema `description` to **девочки 3–14 лет** where the page is about the dance school
2. Keep “дети/ребёнок” only where natural in FAQ answers or blog posts aimed at parents generally — but primary commercial snippets = girls
3. Do not change adult fitness pages to “girls”

---

### PHASE 3 — P0 NAP + schema consistency

**Do:**

1. Replace every Org/LocalBusiness/DanceSchool/Event/Course `address` with the canonical PostalAddress above
2. Fix footer microdata blocks that currently put ЖК name into `addressLocality`
3. Unify `@type` for the organization to:

```json
"@type": ["DanceSchool", "LocalBusiness"]
```

   (Already done on some pages like `prices.html` / blog — replicate everywhere. **Do not delete DanceSchool** — it is valid schema.org; dual type is the standard.)

4. Ensure `telephone`, `name`, `url`, `hasMap` (`https://yandex.ru/profile/108175150878`) identical sitewide
5. Keep `areaServed` including Видное + nearby settlements for geo coverage
6. Update visible Contacts address to include **127/2** and match schema
7. Refresh `aggregateRating` static values from live card (rating + review/rating count). Update `/yandex-rating.json` if used.

**Validate:** run Rich Results / Яндекс валидатор mentally — no conflicting localities on one URL.

---

### PHASE 4 — P0 SEO infrastructure checklist (owner + you)

Code:

1. If Yandex Webmaster / GSC are **not** already verified via DNS or file, add real verification meta (no placeholders like `ВСТАВЬТЕ_КОД`). If already verified another way, leave comments explaining that and do not publish fake meta.
2. Confirm `sitemap.xml` lists all indexable commercial + blog URLs; submit/recheck in Webmaster
3. Confirm `robots.txt` allows crawl

Owner (document as TODO if you cannot access cabinets):

- Update Yandex Business news/posts that still say “с 3 августа”
- Align Business categories/services with girls’ dance + ages
- Continue review generation (see Phase 6)

---

### PHASE 5 — P1 on-page SEO (homepage)

1. Expand `<h1>` without breaking hero design, e.g. keep brand large and add keyphrase inside same `h1` via `<span>` / `<br>`:

   - Visual brand: «Татьянин День»
   - Semantic full H1 text should include: детский театр танца + Видное (or «для девочек в Видном»)

2. Keep single H1. Do not promote `.hero-kicker` to H1.
3. Ensure first viewport still has one primary CTA to trial form.

---

### PHASE 6 — P1 trust / local pack (process + light site support)

Code/site support:

1. Prominent link to Yandex reviews / profile (already partly present — ensure rating numbers are truthful)
2. Optional: short “Как оставить отзыв” blurb for parents (blog or FAQ) — no dark patterns

Owner process (write a one-page checklist in repo `REVIEWS-PLAYBOOK.md`):

- Goal: grow from stale on-site 11 → match/exceed live card momentum; target **30 honest reviews in 60 days**, then 50+
- Ask after successful recital / 1–2 months attendance
- Direct link to Maps reviews tab

---

### PHASE 7 — P1 performance (high impact files only)

Do **not** boil the ocean.

1. Recompress/replace:
   - `galary3.JPG` (~7.8 MB)
   - `galary4.JPG` (~5.1 MB)
   - `galary7.jpeg` (~3.6 MB)
   Target: roughly **≤250–400 KB** each at display size; provide WebP (+ jpeg fallback) for these and optionally hero
2. `hero-bg.jpg` is ~179 KB — leave unless easy win
3. Add `width`/`height` if missing; keep `loading="lazy"` below fold; keep hero preload
4. Defer full `srcset` system to later unless cheap

---

### PHASE 8 — P2 architecture (only after P0–P1)

1. Extract shared CSS/JS to cached `/assets/site.css` + `/assets/site.js` across the main 9 commercial pages (long-term). Preserve cookie/Metrika behavior.
2. Move `aggregateRating` refresh to deploy-time (GitHub Action updating HTML + `yandex-rating.json`) so crawlers see fresh numbers without JS
3. Finish or delete the unfinished self-hosted fonts instruction in `<head>` comments — no half-done state

---

### PHASE 9 — UX conversion polish (data-aware; implement safe defaults now)

Safe now:

1. Enroll CTAs: after removing dead timer, ensure primary button still scrolls/opens trial form
2. On homepage, optional soft price cue near CTA: “абонементы — на странице Цены” (link) without redesigning into a price table if owner prefers prices on `/prices.html`
3. Form Telegram flow: keep clipboard approach, but make the success modal ultra-clear (already exists — verify copy doesn’t mention expired dates)

Defer until Metrika exports exist:

- Which `data-goal` CTAs convert
- Whether form→messenger drop-off needs a Formspree/serverless endpoint

---

## Explicit out of scope (unless owner asks)

- Paid Yandex Direct campaigns setup
- Full redesign / new design system
- Migrating off GitHub Pages
- Building a CMS
- Changing legal entity / public offer text except address consistency typos
- Fake schema Review objects not present on page

---

## Definition of done

A change set is done when:

1. No published page shows countdown zeros or “с 3 августа” / future-tense August 3 enrollment copy
2. Commercial titles/descriptions say **девочки** consistently with hero
3. All organization schema + microdata share one NAP (street 127/2 + деревня Суханово + phone)
4. Org `@type` is `["DanceSchool","LocalBusiness"]` on commercial pages
5. Homepage H1 includes brand + commercial keyphrase
6. Static aggregateRating matches Yandex card (± sync script)
7. Three huge gallery images no longer multi‑MB
8. You provide a short CHANGELOG + owner checklist for Webmaster verification status + Business post cleanup + reviews playbook
9. Visual regression: hero, colors, consent, Metrika consent gate still work

## How to report back

Return:

1. Files changed (list)
2. Before/after for title, description, H1, address schema
3. Anything blocked on owner input (exact new enrollment end date, if they insist on a timer)
4. Remaining P2 items not done

## Priority mantra

> Fix active conversion damage first → lock girls positioning → unify NAP/schema to Yandex card → on-page H1 → reviews ops → compress fat images → only then refactor CSS/JS.

If time is limited, stop after Phase 7. That already removes the biggest Tier‑1 blockers found in audit v1+v2.

---

## Appendix — audit consensus (why these tasks)

| Finding | Severity | Action |
|---|---|---|
| Expired Aug 3 timer + metas + Event | Critical conversion | Phase 1 |
| Snippet “дети” vs site “девочки” | High behavioral | Phase 2 |
| NAP / locality conflict across schema+UI | High local SEO | Phase 3 |
| Stale rating 4.5/11 vs live ~4.8/57 | Trust / CTR | Phase 3 |
| Brand-only H1 | Medium SEO | Phase 5 |
| Reviews volume historically thin on site signal | High local pack | Phase 6 |
| Gallery files 3.6–7.8 MB | Mobile UX / behavior | Phase 7 |
| Inline CSS×N pages | Medium perf debt | Phase 8 |
| DanceSchool type itself | Not invalid | Keep + pair with LocalBusiness |

End of prompt.
