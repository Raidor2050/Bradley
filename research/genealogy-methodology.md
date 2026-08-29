# Genealogical Proof Methodology

How this investigation decides whether a person, relationship, or ancestor claim
is accepted. Based on established genealogical practice.

## The Genealogical Proof Standard (GPS) as applied here

1. **Reasonably exhaustive search** — for each research question we search public
   surname databases, Banglapedia, gazetteers, cemetery indexes, government lists,
   and archival portals. Searches are logged (see `research/source-index/` and
   `GITHUB_RESEARCH.md`). Stopping rules are recorded — a branch stops only when
   the evidence is insufficient, and the stopping reason is stated.
2. **Complete and accurate citation** — every source records publisher, type,
   URL/archive, retrieval date, and confidence contribution (`Source` in
   `src/lib/types.ts`).
3. **Analysis and correlation** — each piece of information is weighed for
   reliability (primary vs secondary, contemporary vs retrospective,
   institutional authority) and correlated across independent sources.
4. **Resolution of conflicts** — when sources disagree, the conflict is exposed
   openly rather than resolved by majority vote. The two family claims challenged
   by adverse evidence ("Dr Horen Mukherjee — Assam Governor"; "Wells Mission",
   Shillong) remain **conflicting** in the dataset.
5. **Written proof argument / confidence assessment** — every significant claim
   carries an evidence level and a 0–1 confidence score with an explainable basis
   (family knowledge vs documented research vs inference).

## Evidence levels

| Level | Meaning | How reached |
|-------|---------|-------------|
| `verified` | Confirmed by reliable, independent sources | Documentary confirmation + correlation |
| `supported` | Multiple supporting sources agree | Corroborated without primary document |
| `probable` | Strong circumstantial evidence | Consistent indirect evidence, no primary record |
| `possible` | Some evidence; needs verification | Plausible, single or weak indicator |
| `unverified` | Claimed; unconfirmed | Family/claimed only |
| `conflicting` | Sources disagree / disproven | Adverse evidence outweighs claim |

## What is NOT treated as proof

- Name similarity alone is **never** an identity match (entity resolution rule).
- A copied/syndicated page is **not** an independent source.
- "Jomidar Boro Bari" is a generic genre label for landlord mansions; a place
  mention is not family ownership.
- A surname connection (Mukhuti → Mukherjee) is a **leads signal**, not a merge.
- No AI-generated image, portrait, or document is ever presented as a real
  ancestor.

## Scoring method

Confidence (0–1) blends, per claim:

- Source reliability (document > government list > encyclopedia > aggregation > oral)
- Source independence (mutually independent count once)
- Corroboration across categories (location + occupation + era + name pattern)
- Evidence level floor (a claim can be "possible" at most unless corroborated)

The score is a **research judgement**, not arithmetic truth. Ranges are documented
in `METHODOLOGY.md`.