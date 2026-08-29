# Agent Reports — Bradley Mukhuti Deep Ancestry Investigation

Summary of the specialized research roles and their key findings. Full cited
detail lives in `../GITHUB_RESEARCH.md`, `../DATA_SOURCES.md`, `../RESEARCH.md`
and the dataset in `../src/lib/data/genealogy.ts`.

## Role roster

| Agent | Mission | Key result |
|-------|---------|------------|
| Genealogical proof specialist | Apply the Genealogical Proof Standard | Framework documented in `genealogy-methodology.md` |
| Mukhuti family researcher | Surname variants + distribution | ~845 people worldwide, ~92% West Bengal; older form of Mukherjee/Mukhopadhyay (village origin) |
| Barisal historical researcher | Barisal Sadar localities | Notun Para, Bogura Road, Bangla Bazar, Kazipara, "Jomidar Boro Bari" — generic labels, no estate records found |
| Shillong/Assam/Bengal historian | Das & Mukherjee claims | No Bashonto Das "Wells Mission" priest record found; no documented "Wells Mission" |
| Identity-resolution specialist | Named-people disambiguation | H.C. Mookerjee ≠ any Assam governor; no merges made on name similarity |
| Source-criticism specialist | Independence + reliability | Etymology sources share one scholarly lineage → counted once; see source-index |
| OSINT research specialist | Public web discovery | Searched surname DBs, Banglapedia, gazetteers, cemetery indexes; no public family tree for the named relatives |
| GitHub / open-source researcher | Tooling review | See `../docs`/ARCHITECTURE for stack choice (React Flow + ELK.js selected for tree layout) |
| Archival document researcher | Digitized records | Bengal District Gazetteers on Internet Archive; BACSA cemetery books; FamilySearch Bengal registers (login) |
| Adversarial verification agent | Break the lineage | Challenged both family claims; both remain conflicting/unverified in dataset |

## Audit incident log

- **Claim: "Dr Horen Mukherjee — Assam Governor".** Confronted with the official
  Government of Assam governors list → no Mookerjee ever governed Assam. H.C.
  Mookerjee was Governor of West Bengal. Marked `conflicting`.
- **Claim: "Wells Mission, Shillong".** Shillong mission history searched →
  Welsh Presbyterian (1841), Baptist, Catholic only. Marked `unverified`/adverse.
- **Candidate merges refused:** no Mukhuti–Mukherjee name-only merges; no
  Living-name candidate promoted above `possible`.