import { create } from "zustand";

interface AncestryState {
  selectedPersonId: string | null;
  highlightedPersonId: string | null;
  activeSection: string;
  showConfidence: boolean;
  showSources: boolean;
  filterGeneration: number | null;
  filterMinConfidence: number;
  searchQuery: string;
  graphZoom: number;
  setSelectedPerson: (id: string | null) => void;
  setHighlightedPerson: (id: string | null) => void;
  setActiveSection: (section: string) => void;
  toggleConfidence: () => void;
  toggleSources: () => void;
  setFilterGeneration: (gen: number | null) => void;
  setFilterMinConfidence: (conf: number) => void;
  setSearchQuery: (query: string) => void;
  setGraphZoom: (zoom: number) => void;
}

export const useAncestryStore = create<AncestryState>((set) => ({
  selectedPersonId: null,
  highlightedPersonId: null,
  activeSection: "home",
  showConfidence: true,
  showSources: false,
  filterGeneration: null,
  filterMinConfidence: 0,
  searchQuery: "",
  graphZoom: 1,
  setSelectedPerson: (id) => set({ selectedPersonId: id }),
  setHighlightedPerson: (id) => set({ highlightedPersonId: id }),
  setActiveSection: (section) => set({ activeSection: section }),
  toggleConfidence: () => set((s) => ({ showConfidence: !s.showConfidence })),
  toggleSources: () => set((s) => ({ showSources: !s.showSources })),
  setFilterGeneration: (gen) => set({ filterGeneration: gen }),
  setFilterMinConfidence: (conf) => set({ filterMinConfidence: conf }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setGraphZoom: (zoom) => set({ graphZoom: zoom }),
}));
