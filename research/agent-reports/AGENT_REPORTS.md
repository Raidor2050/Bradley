# Agent Reports — Bradley Mukhuti Deep Ancestry Investigation

Summary of the specialized research roles and their key findings. Full cited
detail lives in `../GITHUB_RESEARCH.md`, `../DATA_SOURCES.md`, `../RESEARCH.md`
and the dataset in `../src/lib/data/genealogy.ts`.

## Role roster

| Agent | Mission | Key result |
|-------|---------|------------|
| Genealogical proof specialist | Apply the Genealogical Proof Standard | Framework documented in `genealogy-methodology.md` |
| Mukhuti family researcher | Surname variants + distribution | ~854 "Mukhuti" (plus Mukhuty/Mukhati/Mukhoti); older form of Mukherjee/Mukhopadhyay (village origin); Bankura "langla bamun" hypothesis |
| Barisal historical researcher | Barisal Sadar localities | Notun Para, Bogura Road, Bangla Bazar, Kazipara, "Jomidar Boro Bari" — generic labels, no estate records found |
| Shillong/Assam/Bengal historian | Das & Mukherjee claims | Resolved "Wells Mission" → **Welsh Mission** (Mawkhar Presbyterian mother church; first chapel 1874; last missionary 1969). Priest named Das not found |
| Identity-resolution specialist | Named-people disambiguation | H.C. Mookerjee ≠ any Assam governor; "Horen" tradition = fusion of H.C. Mookerjee + Syama Prasad Mookerjee; no merges on name similarity |
| Source-criticism specialist | Independence + reliability | Etymology sources share one scholarly lineage → counted once; see source-index (now 26 sources) |
| OSINT research specialist | Public web discovery | Searched surname DBs, Banglapedia, gazetteers, cemetery indexes; no public tree for the named direct-line relatives |
| Archival document researcher | Digitized records | Locate + verify primary records: Chopra & Chopra *Who's Who* (secret-police sheets), SSA Numident record, ICJ 1965 report |
| GitHub / open-source researcher | Tooling review | See ARCHITECTURE for stack choice (React Flow + ELK.js selected for tree layout) |
| Adversarial verification agent | Break the lineage | Challenged both family claims; "Assam Governor" remains `conflicting`, "Wells/Welsh-Das priest" remains `unverified` in dataset |

## Audit incident log

- **Claim: "Dr Horen Mukherjee — Assam Governor".** Confronted with the official
  Government of Assam governors list → no Mookerjee ever governed Assam. H.C.
  Mookerjee was Governor of West Bengal; Syama Prasad Mookerjee was the
  "Mukherjee + Assam + undivided Bengal" minister. Marked `conflicting` (fusion
  interpretation added Round 2).
- **Claim: "Wells Mission, Shillong."** Round 1: no documented "Wells Mission".
  Round 2: resolved as the phonetic **Welsh Mission** (Presbyterian Church of
  Wales) — mission identification now `supported`; the priest (Bashonto Das)
  remains `unverified`.
- **Round 2 collateral findings (context, NOT merged into the direct tree):**
  - Hemendra Nath Mukhuti — discharged in the Barisal Conspiracy Case (1913).
  - Dwijendra Mukhuti — Sonarang National School headmaster, Anushilan Samiti
    (1910–11).
  - Basanti K Mukhuti + Manindra Nath Dass (Bisharkandi, Barisal district) — US
    SSA record; also documents a Mukhuti–Das marriage pattern in Barisal.
- **Placeholder cleanup:** removed 5 "branch placement unknown" candidates
  (Putu/Putul/Monu/Dolly/Tumi) — no meaningful data.
- **Candidate merges refused:** no Mukhuti–Mukherjee name-only merges; no
  document-less promotion above `possible`.