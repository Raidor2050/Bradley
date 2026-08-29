# Research Methodology

## How Ancestry Is Verified

### Evidence-Based Approach

Every person and relationship in the system must have supporting evidence. No relationship is asserted without at least one source. The system classifies all data into four categories:

1. **User-Provided Data** — Directly provided by the family. The starting point.
2. **Discovered Data** — Found through research in public databases and archives.
3. **Inferred Data** — Deduced from patterns, demographics, and historical context.
4. **Candidate Data** — Potential matches requiring further verification.

### Evidence Levels

| Level | Definition | Visual |
|-------|-----------|--------|
| **Verified** | Directly confirmed by reliable sources | Green |
| **Supported** | Multiple supporting sources agree | Blue |
| **Probable** | Strong circumstantial evidence | Amber |
| **Possible** | Some evidence, needs verification | Orange |
| **Unverified** | Claimed but unconfirmed | Gray |
| **Conflicting** | Sources disagree | Red |

## Confidence Scoring

### Multi-Signal Weighted Model

Confidence scores are calculated using a weighted combination of evidence signals:

| Signal | Weight | Method |
|--------|--------|--------|
| Name Similarity | 35% | Jaro-Winkler on normalized name fields |
| Father's Name | 20% | Patronymic chain verification |
| Location Match | 15% | Geographic consistency with historical aliases |
| Spouse Match | 15% | Cross-referencing spouse names |
| Date Compatibility | 10% | Plausible age ranges and generational spacing |
| Source Quality | 5% | Official records weighted higher than oral tradition |

### Score Interpretation

| Score Range | Interpretation | Action |
|-------------|---------------|--------|
| 90-100% | Strongly supported | Auto-link |
| 70-89% | Highly probable | Suggest for review |
| 50-69% | Probable | Low-priority suggestion |
| 30-49% | Possible | Flag for investigation |
| 0-29% | Weak candidate | No match proposed |

## Bengali Name Normalization

### Transliteration Standards

Bangladesh uses the **Hunterian System** (no diacritics) for official transliteration. The system normalizes all names to this standard before comparison.

### Common Variants Handled

```
Talukder → Talukdar → Taluqder → Taluqdar → তালুকদার
Mohammad → Muhammad → Mohd → Mohamed → Muhammed
```

### Honorifics Stripped

```
Md, Mohammad, Mohd, Muhammad, Muhammed, Mohamed
Sri, Shri, Smt, Srimati
Bibi, Begum, Khatun, Khatoon
```

### Matching Algorithm

- **Primary:** Jaro-Winkler distance (best for transliteration variants)
- **Secondary:** Token Set Ratio (handles word reordering)
- **Phonetic:** Soundex/Metaphone (handles sound-alike variants)
- **Blocking:** First 3 characters of surname + Soundex of given name

## Source Provenance

Every source record contains:
- Source name, type, and publisher
- URL (when available)
- Archive location
- Record date and publication date
- Retrieval date
- Person referenced
- Relationship supported
- Evidence summary
- Confidence contribution score

## Historical Context Integration

Each generation is enriched with:
- Historical period (Mughal, British East India Company, British Raj, East Pakistan, Bangladesh)
- Major events during the person's estimated lifetime
- Regional history and political context
- Social and economic context of the Talukdar class
- Migration patterns and demographic changes
