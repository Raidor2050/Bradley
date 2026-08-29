# Data Sources — Bradley Mukhuti Ancestry Investigation

Source-by-source breakdown behind the `sources` array in
`src/lib/data/genealogy.ts`. Each entry records publisher, type, what it was used
for, its confidence contribution, and its independence status.

**Independence key:** two sources are only treated as independent when they do not
derive from the same underlying data. Copied/syndicated pages are grouped and
counted once.

## Family-provided (seed data)

| ID | Source | Type | Confidence | Notes |
|----|--------|------|-----------|-------|
| `src-family-oral` | Family oral tradition — Mukhuti household | oral | 0.55 | Establishes Bradley + the "Kanta" brother generation in Barisal Sadar. Primary but unverified. |
| `src-family-documents` | Family documents & records | family-record | 0.70 | Private certificates/registers/photos. Not yet digitized; highest-value source if consulted. |

## Surname & etymology

| ID | Source | Type | Confidence | Independence |
|----|--------|------|-----------|--------------|
| `src-forebears-mukhuti` | Forebears.io — Mukhuti surname distribution | website | 0.70 | Independent aggregation of phone/directory records. ~845 people, ~92% West Bengal. |
| `src-wikipedia-mukherjee-surname` | Wikipedia — Mukhopadhyay/Mukherjee etymology | academic | 0.80 | Village-origin (Mukhuti/Mukhati + *upadhyaya*); older form of Mukherjee. Rarhi Kulin Brahmin. |
| `src-behindthename-mukhopadhyay` | Behind the Name — Mukhopadhyay (submitted) | academic | 0.75 | Corroborates the village-origin etymology. Partially overlapping encyclopedia lineage. |
| `src-banglapedia-kayastha` | Wikipedia/EPW — Bengali Kayastha surname system | academic | 0.75 | Confirms Mukhuti/Mukherjee falls in the Brahmin surname category, not Kayastha. |
| `src-ancestry-mukhopadhyay` | Ancestry.com — Mukhopadhyay name history | genealogy-database | 0.55 | Name-history page. Weak — consumer genealogy marketing, low independence. |
| `src-locatefamily-mukhuty` | LocateFamily — Mukhuty individuals (India) | genealogy-database | 0.30 | 18 named "Mukhuty" people; distribution only, no genealogical proof. |

## Geography & history

| ID | Source | Type | Confidence | Notes |
|----|--------|------|-----------|-------|
| `src-banglapedia-barisal` | Banglapedia — Barisal District | academic | 0.85 | Chandradwip/Bakla; Mughal conquest 1611; Bakerganj 1797 → Barisal. |
| `src-wikipedia-shillong` | Wikipedia — Shillong history | academic | 0.85 | Capital of Assam 1874–1972; large Bengali settler community. |
| `src-shillong-times-history` | The Shillong Times — History of Shillong | academic | 0.80 | Missions in Shillong (Welsh Presbyterian 1841, Baptist, Catholic). |
| `src-wikipedia-lakutia` | Lakutia / Lakhutia Zamindar Bari (Barisal) | academic | 0.70 | Roy dynasty zamindari ~8 km north of Barisal. "Jomidar Boro Bari" is a generic term. |
| `src-internet-archive-gazetteer` | Bengal District Gazetteers (Internet Archive) | book | 0.65 | Digitized gazetteers; page-level OCR search needed for Barisal. |

## Adverse-evidence sources (claim challenges)

| ID | Source | Type | Confidence | Notes |
|----|--------|------|-----------|-------|
| `src-wikipedia-hcmookerjee` | Wikipedia — Harendra Coomar Mookerjee | academic | 0.90 | Governor of **West Bengal** (1951–56), not Assam. Disproves "Assam Governor" claim. |
| `src-assam-governors` | Government of Assam — List of Governors | government | 0.90 | Official list; no Mookerjee ever governed Assam. Strong documentary evidence. |
| `src-wells-mission-review` | Wanderlog — Mawkhar Presbyterian Church review | website | 0.20 | Only "Wells Mission" occurrence is anecdotal; no documented mission. Weak, flagged. |

## Records worth pursuing

| ID | Source | Type | Confidence | Notes |
|----|--------|------|-----------|-------|
| `src-familysearch-bengal` | FamilySearch — Bengal Genealogy | genealogy-database | 0.60 | Bengal Presidency registers, India Office B/M/D 1712–1965. Login required. |
| `src-bacsa` | BACSA — Bangladesh Cemetery Records | cemetery | 0.50 | Barisal cemetery registers from 1726; burial records may yield names. |

## Source-independence grouping

- Wikipedia etymology, Behind the Name, and the Ancestry name-history share a
  common scholarly lineage on the Mukhopadhyay etymology — treated as **one
  corroborated etymology claim**, not three independent discoveries.
- Forebears and LocateFamily are independent surname-frequency aggregations.
- Banglapedia, The Shillong Times and the Government of Assam list are mutually
  independent institutional sources.
- No source currently ties a specific Mukhuti family to a Barisal estate or
  connects any named relative (Nishi/Neel/Laxmi/Nalini/Omio, etc.) to public
  records. That remains the honest research frontier.