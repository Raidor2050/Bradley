# Architecture — Bradley Mukhuti Deep Ancestry

This document describes the system architecture of the Bradley Mukhuti deep
ancestry platform. The design is a mature evolution of the "Saads Amcestry"
reference project (which remains the mandatory design foundation).

## System overview

A **single-page static application** (Next.js `output: "export"`) that renders an
evidence-scored genealogy investigation. All research data lives in typed,
version-controlled TypeScript; all components are data-driven. There is no
backend and no database — the "backend" is the dataset itself.

```
┌──────────────────────────────────────────────────────┐
│ .github/workflows/deploy.yml                          │
│   pull → npm ci → next build → gh-pages               │
└──────────────────────────┬───────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────┐
│ Next.js 16 static export (basePath: /Bradley)        │
│  page.tsx assembles sections in narrative order      │
└──────────────────────────┬───────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────┐
│ Data layer (single source of truth)                  │
│  src/lib/data/genealogy.ts                           │
│  src/lib/types.ts · src/lib/utils.ts                 │
└─────────────────────┬────────────────────────────────┘
       ┌──────────────┼───────────────┬─────────────────┐
       ▼              ▼               ▼                 ▼
  FamilyGraph     Timeline       SourceExplorer     Frontier
  (React Flow+ELK) (d3-style)    (filters)          (cards)
       │              │               │                 │
       ▼              ▼               ▼                 ▼
  PersonNode /  AncestralDepthViz  GeographicMap  Methodology
  detail panel (reveal anim)       (SVG map)       (scoring doc)
```

## Data model (`src/lib/types.ts`)

| Type | Purpose |
|---|---|
| `Person` | Individuals. Carries `generation`, `gender`, `dataSource`, `evidenceLevel`, `confidence`, name variants, notes. |
| `Relationship` | Directed edge `fromPersonId → toPersonId` (descendant → ancestor). Type: father, mother, spouse, grandfather, possible-relative, ... |
| `Source` | Provenance record: name, type (oral, website, academic, government, genealogy-database, cemetery, book...), url, publisher, retrieved date, confidence contribution. |
| `Evidence` | A claim linking a person (+ optional related person) to a source, with an evidence type and a confidence score. |
| `FrontierCandidate` | An unresolved branch: candidate person, target, relationship, current evidence, sources needed, confidence. |
| `TimelineEvent` / `HistoricalEra` | Time-anchored family/historical events and era bands. |
| `MapLocation` | Geographic anchor: coordinates, type, linked person ids, period, notes. |
| `ResearchStats` / `AncestorBranch` | Aggregate metrics and per-branch summaries. |

### Generation convention

- `0` = subject (Bradley). Positive = parent generations going back.
- Negative = historical/context figures **not** asserted as ancestors
  (e.g. `person-hcmookerjee`, generation `-1`, shown purely as an
  identity-resolution reference for a conflated family claim).

## The honesty engine (core discipline)

1. **Evidence levels** — `verified` > `supported` > `probable` > `possible` >
   `unverified` > `conflicting`. Displayed on every node, card, and profile.
2. **Confidence scoring** — `0..1` per person, relationship, evidence, and
   frontier candidate. `user-provided` data maxes out around `0.8`
   (family document) unless independently corroborated.
3. **Entity resolution** — name similarity is a *leads* signal only. Two people
   are merged only with independent corroboration. The `person-horen` vs
   `person-hcmookerjee` pair demonstrates the canonical example of **not**
   merging on name similarity.
4. **Adverse evidence** — sources that *refute* a family claim are included and
   visibly scored (e.g. the official list of Assam governors showing no
   Mookerjee). Frontier confidence drops accordingly.

## Component map

| Section | Component | Data used | Notes |
|---|---|---|---|
| Hero | `HeroSection` | hardcoded + `people` | Particle canvas, ancestral line |
| Stats | `ResearchStats` | `researchStats` | Animated counters + legend |
| Depth | `AncestralDepthViz` | `people` | Reveal-on-scroll down the generations |
| Map | `GeographicMap` | `mapLocations`, `people` | SVG projection, clickable markers |
| Tree | `FamilyGraph` + `PersonNode` | `people`, `relationships`, `evidences`, `sources` | React Flow + ELK; Evidence Mode in detail panel |
| Cinematic | `CinematicSection` + `RemotionPlayer` | `JourneyVideo` | `dynamic` import, `ssr:false` |
| Carousel | `Carousel3D` | `people` | Perspective carousel, sorted by birth year |
| Timeline | `TimelineSection` | `timelineEvents`, `historicalEras`, `people` | Alternating rail with era bands |
| Sources | `SourceExplorer` | `sources` | Type filters + provenance |
| Frontier | `FrontierSection` | `frontierCandidates`, `people` | Data-driven claim cards |
| Methodology | `MethodologySection` | static | Scoring + name rules |

## State (`src/stores/useAncestryStore.ts`)

Zustand store holds: `selectedPersonId`, `highlightedPersonId`, `activeSection`,
search query and filters, graph zoom. Selection changes re-render the graph's
detail panel.

## Styling

Tailwind 4 `@theme` tokens in `globals.css` define the AMOLED + archival gold
system (see DESIGN_BRIEF.md). Reusable primitives: `glass-panel`,
`glass-panel-subtle`, `glass-panel-strong`, `gold-text`, `gold-glow`,
`neon-line`, `metric-card`, `animate-fade-in-up`.

## Static export + deploy

- `next.config.ts`: `output: "export"`, `basePath: "/Bradley"`,
  `assetPrefix: "/Bradley/"`, images unoptimized.
- `.github/workflows/deploy.yml`: installs deps, `next build`, uploads `./out`
  and publishes to the `gh-pages` branch (or Pages artifact depending on repo
  config). Node 20.

## Key constraints / notes

- Next.js 16 has breaking changes vs. older training data; consult
  `node_modules/next/dist/docs/` when writing Next.js code (see AGENTS.md).
- Remotion compositions run client-side in-page via `@remotion/player`;
  the composition duration is defined in both `Root.tsx` and `RemotionPlayer.tsx`.
- Never fabricate genealogical facts; never present AI-generated images as real
  ancestors; never treat a copy as an independent source.