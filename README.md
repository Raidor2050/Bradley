# Bradley Mukhuti — Deep Ancestry Discovery

**How far back can we trace Bradley Mukhuti?**

A production-quality, deep-ancestry research platform. It turns family-provided
knowledge + genuine public research into an **honest, evidence-scored** genealogy
interface — a family tree, evidence graph, animated timeline, geographic trail,
source provenance explorer, and a clearly-marked research frontier.

Built as a mature evolution of the "Saads Amcestry" design line: AMOLED black +
archival-gold glassmorphism, a single-page static app, fully data-driven
components.

> **Live site:** https://Raidor2050.github.io/Bradley/
>
> **Repo:** https://github.com/Raidor2050/Bradley

---

## The honest central question

The entire platform is built to answer one question with **rigour, not hype**:

> How far back can we **verify** Bradley Mukhuti's ancestry?

The answer, honestly, curves into a frontier faster than a traditional
"12-generation" tree would suggest:

| Generation | Individual | Evidence |
|---|---|---|
| G0 | Bradley Mukhuti | Subject (family) |
| G1 | Bernard Bonoj Mukhuti | Father — **probable** (family knowledge) |
| G2 | Nishi Kanta Mukhuti | Grandfather — **supported** (family knowledge) |
| G2 | Neel / Laxmi / Nalini Kanta | Grandfather's brothers — **inferred** |
| G3+ | Great-grandparents | **Unverified frontier** |

Below the family-known baseline, the **surname itself** is historically
verifiable: *Mukhuti* is a real, rare (~845 people worldwide) Bengali Brahmin
surname — the older village-derived form of **Mukherjee / Mukhopadhyay**. But
**no specific Barisal ancestor beyond the family's own knowledge is confirmed by
public records**, and the platform is transparent about that.

## What makes this honest (not just "pretty")

- **Family-provided data is never auto-promoted to "verified line"**. Every person
  and relationship carries one of: `verified · supported · probable · possible ·
  unverified · conflicting`.
- **Entity resolution discipline** — matching on a common surname (Das, Mukherjee)
  is a leads-signal only, never a merge.
- **Adverse evidence is shown openly**:
  - The family tradition "Dr Horen Mukherjee — **Assam** Governor" is flagged
    **conflicting/disproven**: no Mookerjee ever governed Assam; the closest
    documented figure (H.C. Mookerjee) was Governor of **West Bengal**.
  - The claimed "**Wells Mission**" in Shillong has **no documented existence**;
    likely a misremembered local church compound.
  - "Jomidar Boro Bari" is a **generic** zamindar-house term — no record ties a
    specific Barisal estate to a Mukhuti family.
- **No fabricated ancestors, no AI images presented as real ancestors, no copied
  content treated as an independent source.**

## Signature features

- **Interactive family tree** — React Flow + ELK auto-layout; node click opens a
  full person profile.
- **Evidence Mode** — per-person toggle showing structured evidence, source(s),
  and confidence bars for every claim.
- **Geographic Trail** — SVG-based map of Barisal Sadar's localities, Shillong,
  undivided Bengal and Calcutta, with the people linked to each place.
- **Animated Timeline + Historical Eras** — Mughal Bengal → British Raj → East
  Pakistan → Bangladesh, with family and historical events.
- **Research Frontier** — every branch that *could* still be traced, the current
  evidence, an honest confidence score, and exactly which sources are needed.
- **Cinematic Journey** — a Remotion-generated walk back through the lineage.
- **Source Explorer** — 17 catalogued sources with provenance, type, and
  confidence contribution.

## Tech stack

- Next.js 16.3.2 (static export) · React 19 · TypeScript 5
- React Flow (`@xyflow/react`) + ELK.js graph layout
- Tailwind CSS 4 (AMOLED + archival-gold design tokens)
- Zustand 5 state · framer-motion · recharts · d3
- Remotion 4 (cinematic journey)
- Deployed to GitHub Pages via GitHub Actions

## Project structure

```
src/
  app/            layout.tsx (metadata), page.tsx (single-page assembly), globals.css
  lib/
    types.ts      Person, Relationship, Source, Evidence, FrontierCandidate, ...
    data/
      genealogy.ts  The full honest Mukhuti dataset (people, relationships,
                    evidences, sources, timeline, map, frontier, stats)
    utils.ts      confidence/evidence helpers, source labels, ancestry walkers
  components/
    hero/         HeroSection, ResearchStats, AncestralDepthViz
    graph/        FamilyGraph, PersonNode
    map/          GeographicMap
    timeline/     TimelineSection
    sources/      SourceExplorer
    frontier/     FrontierSection, MethodologySection
    carousel/     Carousel3D
    motion/       CinematicSection, RemotionPlayer, ParticleBackground
    layout/       Navigation, Footer
  remotion/       JourneyVideo, Root (cinematic ancestry film)
  stores/         useAncestryStore (selection, filters, active section)
research/         investigation deliverables (see RESEARCH.md)
```

## Getting started

```bash
npm install
npm run dev      # local development
npm run build    # static export to ./out
npm run lint
```

The production export uses `basePath: "/Bradley"` (GitHub Pages subpath).

## Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) — system design and data model
- [RESEARCH.md](RESEARCH.md) — the actual research findings and honest verdicts
- [GITHUB_RESEARCH.md](GITHUB_RESEARCH.md) — web/OSINT citations
- [METHODOLOGY.md](METHODOLOGY.md) — confidence scoring and classification rules
- [DATA_SOURCES.md](DATA_SOURCES.md) — source-by-source breakdown
- [PROGRESS.md](PROGRESS.md) — status of the investigation and the build
- [DESIGN_BRIEF.md](DESIGN_BRIEF.md) — design system and constraints
- [AGENTS.md](AGENTS.md) — agent guardrails (includes Next.js 16 notes)

## Honesty statement

This project's value is in *not* overstating what is known. Ancestors named from
family knowledge are labelled as family knowledge. The surname's deep Brahmin
history is separately labelled as historical research. Everything in between is
an open, honestly-scored frontier awaiting primary records.
