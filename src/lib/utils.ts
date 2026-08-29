import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Person, Source, Evidence, EvidenceLevel } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 0.9) return "text-emerald-400";
  if (confidence >= 0.7) return "text-amber-400";
  if (confidence >= 0.5) return "text-orange-400";
  if (confidence >= 0.3) return "text-red-400";
  return "text-red-600";
}

export function getConfidenceBadgeColor(confidence: number): string {
  if (confidence >= 0.9) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
  if (confidence >= 0.7) return "bg-amber-500/20 text-amber-400 border-amber-500/30";
  if (confidence >= 0.5) return "bg-orange-500/20 text-orange-400 border-orange-500/30";
  if (confidence >= 0.3) return "bg-red-500/20 text-red-400 border-red-500/30";
  return "bg-red-600/20 text-red-500 border-red-600/30";
}

export function getEvidenceLevelColor(level: EvidenceLevel): string {
  switch (level) {
    case "verified": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "supported": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "probable": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "possible": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "unverified": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    case "conflicting": return "bg-red-500/20 text-red-400 border-red-500/30";
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
}

export function getDataSourceLabel(source: "user-provided" | "discovered" | "inferred" | "candidate"): string {
  switch (source) {
    case "user-provided": return "User-Provided Data";
    case "discovered": return "Discovered Data";
    case "inferred": return "Inferred Data";
    case "candidate": return "Candidate Data";
    default: return "Unknown";
  }
}

export function getDataSourceColor(source: "user-provided" | "discovered" | "inferred" | "candidate"): string {
  switch (source) {
    case "user-provided": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "discovered": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "inferred": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "candidate": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
}

export function getSourceTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    "genealogy-database": "Genealogy Database",
    "archival": "Archival Record",
    "census": "Census Record",
    "book": "Book / Publication",
    "newspaper": "Newspaper",
    "land-record": "Land Record",
    "government": "Government Record",
    "website": "Website",
    "academic": "Academic / Reference",
    "oral": "Oral Tradition",
    "family-record": "Family Record",
    "document": "Document",
    "cemetery": "Cemetery Record",
  };
  return labels[type] || type;
}

export function getSourceTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    "genealogy-database": "database",
    "archival": "archive",
    "census": "users",
    "book": "book-open",
    "newspaper": "newspaper",
    "land-record": "map-pin",
    "government": "landmark",
    "website": "globe",
    "academic": "graduation-cap",
    "oral": "mic",
    "family-record": "heart",
    "document": "file-text",
    "cemetery": "cross",
  };
  return icons[type] || "file";
}

export function calculateGenerationYear(generation: number): number {
  const baseYear = 2000;
  const yearsPerGeneration = 30;
  return baseYear - generation * yearsPerGeneration;
}

export function getEraForYear(year: number): string {
  if (year >= 1971) return "Bangladesh";
  if (year >= 1947) return "East Pakistan";
  if (year >= 1858) return "British Raj";
  if (year >= 1757) return "British East India Company";
  if (year >= 1576) return "Mughal Bengal";
  if (year >= 1352) return "Bengal Sultanate";
  return "Medieval Bengal";
}

export function formatYear(year?: number): string {
  if (!year) return "Unknown";
  return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
}

export function getPersonById(people: Person[], id: string): Person | undefined {
  return people.find((p) => p.id === id);
}

export function getAncestors(people: Person[], personId: string): Person[] {
  const ancestors: Person[] = [];
  let current = people.find((p) => p.id === personId);
  while (current?.fatherId) {
    const father = people.find((p) => p.id === current!.fatherId);
    if (father) {
      ancestors.push(father);
      current = father;
    } else {
      break;
    }
  }
  return ancestors;
}

export function getSourceById(sources: Source[], id: string): Source | undefined {
  return sources.find((s) => s.id === id);
}

export function getEvidencesForPerson(evidences: Evidence[], personId: string): Evidence[] {
  return evidences.filter((e) => e.personId === personId || e.relatedPersonId === personId);
}
