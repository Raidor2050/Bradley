# Data Sources — Bradley Mukhuti Ancestry Investigation

Source-by-source breakdown behind the `sources` array in
`src/lib/data/genealogy.ts`. Each entry records publisher, type, what it was used
for, its confidence contribution, and its independence status.

**Independence key:** two sources are only treated as independent when they do not
derive from the same underlying data. Copied/syndicated pages are grouped and
counted once.

**Current total: 26 sources** (verified against `sources` in genealogy.ts).

## Family-provided (seed data)

| ID | Source | Type | Confidence | Notes |
|----|--------|------|-----------|-------|
| `src-family-oral` | Family oral tradition — Mukhuti household | oral | 0.55 | Establishes Bradley + the "Kanta" brother generation in Barisal Sadar. Primary but unverified. |
| `src-family-documents` | Family documents & records | family-record | 0.70 | Private certificates/registers/photos. Not yet digitized; highest-value source if consulted. |

## Surname & etymology

| ID | Source | Type | Confidence | Independence |
|----|--------|------|-----------|--------------|
| `src-forebears-mukhuti` | Forebears.io — Mukhuti surname distribution | website | 0.70 | Independent aggregation. ~854 "Mukhuti" (plus ~239 Mukhuty, ~33 Mukhati, ~140 Mukhoti); ~92% India West Bengal. |
| `src-wikipedia-mukherjee-surname` | Wikipedia — Mukhopadhyay/Mukherjee etymology | academic | 0.80 | Village-origin (Mukhuti/Mukhati + *upadhyaya*); older form of Mukherjee. Rarhi Kulin Brahmin. |
| `src-wiki-mukherjee-langla` | Wikipedia — Mukherjee (langla bamun / Bankura hypothesis) | academic | 0.70 | Mukhati/Mukhuti as older forms; "langla bamun" ploughman hypothesis; "Mukhoti village near Bankura" possible origin (per Niharranjan Ray). |
| `src-behindthename-mukhopadhyay` | Behind the Name — Mukhopadhyay (submitted) | academic | 0.75 | Corroborates the village-origin etymology. Partially overlapping encyclopedia lineage. |
| `src-mukhopadhaya-tree` | Mukhopadhaya family tree — "Mukhuti gram" node | genealogy-database | 0.55 | Published Bengali Brahmin tree titled "alt. Mukherjee, Mukhuti" with a "Mukhuti gram" village node. |
| `src-banglapedia-kayastha` | Wikipedia/EPW — Bengali Kayastha surname system | academic | 0.75 | Confirms Mukhuti/Mukherjee falls in the Brahmin surname category, not Kayastha. |
| `src-imeuswe-mukhuti` | iMeUsWe — "Mukhuti" surname community data | website | 0.35 | Bengali Brahmin label + gotras (aatreya, dadhich, kashyap, mudgal, raghu-kula). Low-reliability prediction, consistent context only. |
| `src-ancestry-mukhopadhyay` | Ancestry.com — Mukhopadhyay name history | genealogy-database | 0.55 | Name-history page. Weak — consumer genealogy marketing, low independence. |
| `src-locatefamily-mukhuty` | LocateFamily — Mukhuty individuals (India) | genealogy-database | 0.30 | 18 named "Mukhuty" people; distribution only, no genealogical proof. |

## Primary records of the surname in the Barisal region (Round 2 findings)

| ID | Source | Type | Confidence | Notes |
|----|--------|------|-----------|-------|
| `src-whoswho-mukhuti` | Chopra & Chopra — *Forgotten Heroes of India's Freedom Struggle — A Who's Who* (1992; secret-police sheets c.1913–14) | archival | 0.85 | **Hemendra Nath Mukhuti** (son of Ramanath, Brahmin; Sonarang, Tangibari, Dacca) "Discharged in the Barisal conspiracy case"; **Dwijendra Mukhuti** (son of Ray Mohan; Routhbog) — Sonarang National School headmaster, Anushilan Samiti, convicted 1911. Collateral same-surname context. |
| `src-ssa-sortedbyname` | US Social Security Numident record (via SortedByName) | government | 0.70 | **Basanti K Mukhuti** (mother) + **Manindra Nath Dass** → son **Sudhir Kumar Dass** (b. 1 Feb 1923, Bisharkandi, Barisal district; d. 2007). Documents Mukhuti families + a Mukhuti–Das marriage in Barisal district. |
| `src-icj-1965` | ICJ — 1965 report on exodus of minorities from East Pakistan | document | 0.85 | Contemporary primary account; dedicated Bakarganj (Barisal/Patuakhali) evidence chapter. Verifies 1950 riots and Hindu migration context. |

## Geography & history

| ID | Source | Type | Confidence | Notes |
|----|--------|------|-----------|-------|
| `src-banglapedia-barisal` | Banglapedia — Barisal District | academic | 0.85 | Chandradwip/Bakla; Mughal conquest 1611; Bakerganj 1797 → Barisal. |
| `src-wikipedia-shillong` | Wikipedia — Shillong history | academic | 0.85 | Capital of Assam 1874–1972; large Bengali settler community. |
| `src-shillong-times-history` | The Shillong Times — History of Shillong | academic | 0.80 | Missions in Shillong (Welsh Presbyterian 1841, Baptist, Catholic). |
| `src-wikipedia-lakutia` | Lakutia / Lakhutia Zamindar Bari (Barisal) | academic | 0.70 | Roy dynasty zamindari ~8 km north of Barisal. "Jomidar Boro Bari" is a generic term. |
| `src-internet-archive-gazetteer` | Bengal District Gazetteers (Internet Archive) | book | 0.65 | Digitized gazetteers; page-level OCR search needed for Barisal. |

## Shillong mission & "Wells Mission" resolution

| ID | Source | Type | Confidence | Notes |
|----|--------|------|-----------|-------|
| `src-pcis-welsh-mission` | PCI Shillong / Welsh Mission (Presbyterian Church of Wales) history | archival | 0.80 | Mawkhar Presbyterian = mother church of the Welsh Mission; first chapel 1874 (Rev. Griffith Hughes); last Welsh missionary left 1969. **Resolves "Wells Mission" → "Welsh Mission"**. |
| `src-wells-mission-review` | Wanderlog — Mawkhar Presbyterian Church review ("Wells Mission compound") | website | 0.20 | Anecdotal recollection of "Pastor Welborn" c.1965–78 — consistent with the final Welsh Mission years. Weak, flagged anecdotal. |

## Adverse-evidence sources (claim challenges)

| ID | Source | Type | Confidence | Notes |
|----|--------|------|-----------|-------|
| `src-wikipedia-hcmookerjee` | Wikipedia — Harendra Coomar Mookerjee | academic | 0.90 | Governor of **West Bengal** (1951–56), not Assam. |
| `src-assam-governors` | Government of Assam — List of Governors | government | 0.90 | Official list; no Mookerjee ever governed Assam. Strong documentary evidence. |
| `src-wiki-spm` | Wikipedia — Syama Prasad Mookerjee | academic | 0.85 | The real "Mukherjee + Assam + undivided Bengal" figure (Finance Minister 1941–42; kept Assam in India; 1950 refugee relief; **never a governor**). Part of the documented fusion behind the "Horen" tradition. |

## Records worth pursuing

| ID | Source | Type | Confidence | Notes |
|----|--------|------|-----------|-------|
| `src-familysearch-bengal` | FamilySearch — Bengal Genealogy | genealogy-database | 0.60 | Bengal Presidency registers, India Office B/M/D 1712–1965. Login required. |
| `src-bacsa` | BACSA — Bangladesh Cemetery Records | cemetery | 0.50 | Barisal cemetery registers from 1726; burial records may yield names. |

## Source-independence grouping

- Wikipedia etymology, Behind the Name, and the Ancestry name-history share a
  common scholarly lineage on the Mukhopadhyay etymology — treated as **one
  corroborated etymology claim**, not three independent discoveries.
- Forebears, LocateFamily and iMeUsWe are independent surname-frequency
  aggregations (the latter is the weakest).
- The Who's Who compilation and the SSA Numident record are **primary,
  independent** documents of the surname in the Barisal region (Round 2).
- Banglapedia, The Shillong Times, the Government of Assam list and ICJ 1965 are
  mutually independent institutional sources.
- No source connects any named direct-line relative (Nishi / Neel / Laxmi /
  Nalini / Bernard / Das line) to public records — that remains the honest
  direct-line frontier. All Round-2 Mukhuti findings are **collateral context**,
  explicitly not merged into the direct tree.