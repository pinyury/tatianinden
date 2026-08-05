# CHANGELOG — Tier‑1 implementation (2026-08-05)

Publish root: **repository root** (GitHub Pages). `deploy-ready/` left untouched (archive / alternate pack).

## Before → After (homepage)

| Field | Before | After |
|---|---|---|
| `<title>` | Танцы для **детей** 3–14… | Танцы для **девочек** 3–14… |
| `description` | …Набор **с 3 августа**… (199 симв.) | Evergreen, ~155–160 симв., без даты |
| OG/Twitter | «Набор … **с 3 августа**» | «Открыт набор в группы танца» |
| H1 | Только бренд «Татьянин День» | Бренд + `Детский театр танца для девочек в Видном` |
| Enroll banner | «3 августа откроется дверь» + timer `00:00` | «Открыт набор» + badge, без countdown |
| Org `@type` | `DanceSchool` | `["DanceSchool","LocalBusiness"]` |
| Address | street без дома, locality «Суханово»/«Видное» mixed | `ЖК «Суханово Парк», 127/2` · `деревня Суханово` |
| Rating schema | 4.5 / 11 | 4.8 / 57 (+ `yandex-rating.json`) |
| Enrollment Event | past `startDate` 2026-08-03 | evergreen `Offer` |
| Concert Event | `EventScheduled` (past) | `EventCompleted` |

## Files touched (main)

- `index.html` — P0–P5 core
- `zvezdochki.html`, `premiera.html`, `benefis.html` — dead timer removed, girls copy
- `prices.html`, `o-nas.html`, `0-nas.html`, `pedagogi.html`, `partners.html` / `Partners.html`
- `smart-fintess.html` — NAP; fitness reviewCount kept at 4 (own reviews)
- `summer-intensiv.html`, `summer-letter.html`, `Cookies.html`, blog articles with JSON-LD
- `yandex-rating.json` — **created**
- `sitemap.xml` — partners lowercase, group + o-nas URLs, homepage lastmod
- `galary3.JPG`, `galary4.JPG`, `galary7.jpeg` — recompressed (~7.8/5.1/3.6 MB → ~329/291/340 KB); originals as `*.origbak`
- `REVIEWS-PLAYBOOK.md`, this changelog

## Restored from live (local were Cocoa HTML dumps)

- `pedagogi.html`, `o-nas.html`, `partners.html` — then NAP/schema aligned

## Intentionally not done (P2 / blocked)

- Full CSS/JS extraction to shared assets
- Deploy-time rating injection via GitHub Action
- WebP/`srcset` system (JPEG compression done; `cwebp` not available)
- `estradnye-tantsy-dlya-devochek.html` — 404 on live; local was corrupted Cocoa dump (kept as `*.cocoabak`)
- Inserting fake Webmaster meta codes
- Editing Yandex Business posts (owner must do in cabinet)

## Owner checklist after deploy

1. Push/publish GitHub Pages from repo root
2. Confirm https://www.tatianinden.ru/ shows new title + no timer zeros
3. Confirm https://www.tatianinden.ru/yandex-rating.json returns 4.8/57
4. Check Yandex Webmaster verification status (DNS/file/meta)
5. Clean Business posts still saying «с 3 августа»
6. Start reviews playbook

## Definition of done status

1. No published commercial page with Aug 3 countdown — **done** (in source)
2. Commercial titles say девочки — **done** (home + groups + prices)
3. NAP unified — **done** on commercial/schema pages
4. Dual `@type` — **done**
5. H1 keyphrase — **done**
6. Static rating matches Maps card — **done** (4.8/57)
7. Fat gallery images compressed — **done**
8. CHANGELOG + reviews playbook + Webmaster note — **done**
9. Consent/Metrika gate preserved — **not intentionally altered**
