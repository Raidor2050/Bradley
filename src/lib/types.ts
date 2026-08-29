export type DataSource =
  | "user-provided"
  | "discovered"
  | "inferred"
  | "candidate";

export type EvidenceLevel =
  | "verified"
  | "supported"
  | "probable"
  | "possible"
  | "unverified"
  | "conflicting";

export type PersonRelation =
  | "self"
  | "father"
  | "mother"
  | "spouse"
  | "sibling"
  | "child"
  | "grandfather"
  | "grandmother"
  | "ancestor"
  | "possible-relative";

export interface Source {
  id: string;
  name: string;
  type:
    | "genealogy-database"
    | "archival"
    | "census"
    | "book"
    | "newspaper"
    | "land-record"
    | "government"
    | "website"
    | "academic"
    | "oral"
    | "family-record"
    | "document"
    | "cemetery";
  url?: string;
  archive?: string;
  publisher?: string;
  recordDate?: string;
  publicationDate?: string;
  retrievedDate: string;
  description: string;
  confidenceContribution: number;
}

export interface Evidence {
  id: string;
  sourceId: string;
  personId: string;
  relatedPersonId?: string;
  relationshipSupported?: string;
  evidenceType:
    | "name-match"
    | "father-match"
    | "mother-match"
    | "spouse-match"
    | "location-match"
    | "date-compatibility"
    | "occupation"
    | "source-confirmation"
    | "historical-consistency"
    | "patronymic-chain"
    | "land-record"
    | "census"
    | "document";
  summary: string;
  confidence: number;
}

export interface Person {
  id: string;
  name: string;
  nameVariants: string[];
  nameBengali?: string;
  fatherId?: string;
  motherId?: string;
  spouseIds?: string[];
  childIds?: string[];
  generation: number;
  birthYear?: number;
  deathYear?: number;
  birthPlace?: string;
  deathPlace?: string;
  occupation?: string;
  gender: "male" | "female" | "unknown";
  dataSource: DataSource;
  evidenceLevel: EvidenceLevel;
  confidence: number;
  location?: string;
  district?: string;
  division?: string;
  historicalContext?: string;
  notes?: string;
  imageUrl?: string;
}

export interface Relationship {
  id: string;
  fromPersonId: string;
  toPersonId: string;
  type: PersonRelation;
  evidenceIds: string[];
  confidence: number;
  dataSource: DataSource;
  evidenceLevel: EvidenceLevel;
}

export interface AncestorBranch {
  id: string;
  rootPersonId: string;
  depth: number;
  earliestYear?: number;
  latestYear?: number;
  confidence: number;
  evidenceLevel: EvidenceLevel;
  sources: string[];
  frontierCandidates: FrontierCandidate[];
}

export interface FrontierCandidate {
  id: string;
  candidatePersonId: string;
  targetPersonId: string;
  relationship: PersonRelation;
  confidence: number;
  evidence: string[];
  sourcesNeeded: string[];
}

export interface HistoricalEra {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  description: string;
  keyEvents: string[];
  region: string;
}

export interface ResearchStats {
  knownGenerations: number;
  discoveredGenerations: number;
  candidateGenerations: number;
  totalPeople: number;
  verifiedPeople: number;
  candidatePeople: number;
  totalRelationships: number;
  verifiedRelationships: number;
  unresolvedRelationships: number;
  totalSources: number;
  documentsFound: number;
  locationsDiscovered: number;
  historicalYearsCovered: number;
  oldestVerifiedAncestor: string;
  oldestCandidateAncestor: string;
  branchesInvestigated: number;
  branchesUnresolved: number;
}

export interface MapLocation {
  id: string;
  name: string;
  historicalName?: string;
  lat: number;
  lng: number;
  type: "birthplace" | "residence" | "ancestral-village" | "migration" | "historical";
  personIds: string[];
  period?: string;
  notes?: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  endYear?: number;
  title: string;
  description: string;
  type: "person" | "historical" | "family" | "record" | "migration";
  personIds?: string[];
  locationId?: string;
  sourceIds?: string[];
  confidence?: number;
}
