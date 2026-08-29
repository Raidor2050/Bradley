"use client";

import { useMemo, useCallback, useState, useEffect } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { people, relationships, evidences, sources } from "@/lib/data/genealogy";
import { useAncestryStore } from "@/stores/useAncestryStore";
import { getSourceById, getEvidencesForPerson } from "@/lib/utils";
import PersonNode from "./PersonNode";

const nodeTypes = { personNode: PersonNode };

const directLine = [
  "person-bradley",
  "person-bernard",
  "person-nishi",
];

const discoveryPeople = [
  "person-neel",
  "person-laxmi",
  "person-nalini",
  "person-omio",
  "person-swaraj",
  "person-pankaj",
];

const relatedPeople = [
  "person-shudira",
  "person-bashonto",
  "person-moni",
  "person-bhutu",
  "person-roma",
  "person-ronju",
  "person-horen",
];

export default function FamilyGraph() {
  const { selectedPersonId, setSelectedPerson, highlightedPersonId, setHighlightedPerson } =
    useAncestryStore();
  const [showDetail, setShowDetail] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);

  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const nodeW = 220;
    const nodeH = 90;
    const vGap = 60;
    const hGap = 40;

    directLine.forEach((id, i) => {
      const person = people.find((p) => p.id === id);
      if (!person) return;
      const x = 0;
      const y = i * (nodeH + vGap);
      nodes.push({
        id: person.id,
        type: "personNode",
        position: { x, y },
        data: {
          person,
          isSelected: person.id === selectedPersonId,
          isHighlighted: person.id === highlightedPersonId,
          isCandidate: false,
          onSelect: () => setSelectedPerson(person.id === selectedPersonId ? null : person.id),
          onHover: (h: boolean) => setHighlightedPerson(h ? person.id : null),
        },
      });
    });

    for (let i = 0; i < directLine.length - 1; i++) {
      const parent = directLine[i];
      const child = directLine[i + 1];
      const rel = relationships.find(
        (r) => r.fromPersonId === child && r.toPersonId === parent
      );
      const isHighlighted = parent === highlightedPersonId || child === highlightedPersonId;
      edges.push({
        id: rel?.id || `edge-${parent}-${child}`,
        source: parent,
        target: child,
        type: "smoothstep",
        animated: isHighlighted,
        style: {
          stroke: isHighlighted ? "#e6a817" : "#d4940a",
          strokeWidth: isHighlighted ? 3 : 2,
          opacity: isHighlighted ? 1 : 0.6,
        },
      });
    }

    const discoveryStartY = (directLine.length - 1) * (nodeH + vGap);
    const discoveryRowY = discoveryStartY + nodeH + vGap + 30;
    const discoveryTotalW = discoveryPeople.length * nodeW + (discoveryPeople.length - 1) * hGap;
    const discoveryStartX = -discoveryTotalW / 2;

    discoveryPeople.forEach((id, i) => {
      const person = people.find((p) => p.id === id);
      if (!person) return;
      const x = discoveryStartX + i * (nodeW + hGap);
      nodes.push({
        id: person.id,
        type: "personNode",
        position: { x, y: discoveryRowY },
        data: {
          person,
          isSelected: person.id === selectedPersonId,
          isHighlighted: person.id === highlightedPersonId,
          isCandidate: true,
          onSelect: () => setSelectedPerson(person.id === selectedPersonId ? null : person.id),
          onHover: (h: boolean) => setHighlightedPerson(h ? person.id : null),
        },
      });
    });

    const relatedRowY = discoveryRowY + nodeH + vGap + 30;
    const relatedTotalW = relatedPeople.length * nodeW + (relatedPeople.length - 1) * hGap;
    const relatedStartX = -relatedTotalW / 2;

    relatedPeople.forEach((id, i) => {
      const person = people.find((p) => p.id === id);
      if (!person) return;
      const x = relatedStartX + i * (nodeW + hGap);
      nodes.push({
        id: person.id,
        type: "personNode",
        position: { x, y: relatedRowY },
        data: {
          person,
          isSelected: person.id === selectedPersonId,
          isHighlighted: person.id === highlightedPersonId,
          isCandidate: true,
          onSelect: () => setSelectedPerson(person.id === selectedPersonId ? null : person.id),
          onHover: (h: boolean) => setHighlightedPerson(h ? person.id : null),
        },
      });
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, [selectedPersonId, highlightedPersonId]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]);

  const selectedPerson = people.find((p) => p.id === selectedPersonId);

  return (
    <section id="graph" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl text-pearl mb-3">
            Family <span className="gold-text">Tree</span>
          </h2>
          <p className="text-sm text-mist max-w-xl mx-auto">
            The Mukhuti lineage of Bradley — 3 known generations from family knowledge;
            the father link is probable and deeper ancestry sits at the research frontier.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
            <div className="w-2 h-2 rounded-full bg-gold-400" />
            <span className="text-gold-400">Family Lineage</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-blue-400">Inferred Brothers & Children</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-purple-400">Das / Mukherjee Line (Unverified)</span>
          </div>
        </div>

        <div className="glass-panel overflow-hidden h-[500px] sm:h-[700px] lg:h-[900px]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            proOptions={{ hideAttribution: true }}
            minZoom={0.2}
            maxZoom={2}
            className="bg-void"
          >
            <Background color="rgba(212, 148, 10, 0.04)" gap={50} />
            <Controls
              className="!bg-charcoal !border-gold-700/30 !rounded-lg"
              showInteractive={false}
            />
            <MiniMap
              nodeColor={() => "#996600"}
              maskColor="rgba(0,0,0,0.7)"
              className="!bg-charcoal !border-gold-700/30"
            />
          </ReactFlow>
        </div>

        {selectedPerson && (
          <div className="mt-6 glass-panel-strong p-6 animate-fade-in-up">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                {selectedPerson.imageUrl ? (
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 border-gold-500/30">
                    <img
                      src={selectedPerson.imageUrl}
                      alt={selectedPerson.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gold-700/40 to-gold-800/40 flex items-center justify-center border border-gold-700/30 flex-shrink-0">
                    <span className="text-lg font-mono font-bold text-gold-400">
                      {selectedPerson.generation < 0 ? `D${Math.abs(selectedPerson.generation)}` : `G${selectedPerson.generation}`}
                    </span>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${
                      selectedPerson.generation < 0
                        ? "bg-blue-500/15 text-blue-400 border-blue-500/25"
                        : "bg-gold-500/15 text-gold-400 border-gold-500/25"
                    }`}>
                      {selectedPerson.generation < 0 ? `DISCOVERED` : selectedPerson.generation === 0 ? "SUBJECT" : `GEN ${selectedPerson.generation}`}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-mono uppercase ${
                      selectedPerson.evidenceLevel === "verified"
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                        : selectedPerson.evidenceLevel === "supported"
                        ? "bg-blue-500/15 text-blue-400 border-blue-500/25"
                        : selectedPerson.evidenceLevel === "probable"
                        ? "bg-purple-500/15 text-purple-400 border-purple-500/25"
                        : "bg-orange-500/15 text-orange-400 border-orange-500/25"
                    }`}>
                      {selectedPerson.evidenceLevel}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-pearl">{selectedPerson.name}</h3>
                  {selectedPerson.nameBengali && (
                    <p className="text-sm text-mist">{selectedPerson.nameBengali}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowEvidence(!showEvidence)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-mono transition-all ${
                    showEvidence
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : "text-mist border-white/10 hover:text-pearl hover:border-white/20"
                  }`}
                >
                  {showEvidence ? "Hide Evidence" : "View Evidence"}
                </button>
                <button
                  onClick={() => setSelectedPerson(null)}
                  className="text-mist hover:text-pearl transition-colors p-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              {selectedPerson.birthYear && (
                <div className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-xs text-mist mb-1">Born</div>
                  <div className="text-sm text-pearl font-medium">~{selectedPerson.birthYear}</div>
                </div>
              )}
              {selectedPerson.deathYear && (
                <div className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-xs text-mist mb-1">Died</div>
                  <div className="text-sm text-pearl font-medium">{selectedPerson.deathYear}</div>
                </div>
              )}
              {selectedPerson.occupation && (
                <div className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-xs text-mist mb-1">Occupation</div>
                  <div className="text-sm text-pearl font-medium">{selectedPerson.occupation}</div>
                </div>
              )}
              {selectedPerson.location && (
                <div className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-xs text-mist mb-1">Location</div>
                  <div className="text-sm text-pearl font-medium">{selectedPerson.location}</div>
                </div>
              )}
              <div className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <div className="text-xs text-mist mb-1">Confidence</div>
                <div className="text-sm text-emerald-400 font-medium font-mono">
                  {Math.round(selectedPerson.confidence * 100)}%
                </div>
              </div>
            </div>

            {selectedPerson.notes && (
              <div className="p-4 rounded-lg bg-gold-500/5 border border-gold-700/20">
                <div className="text-xs text-gold-400 uppercase tracking-wider mb-2 font-mono">
                  Research Notes
                </div>
                <p className="text-sm text-fog leading-relaxed">{selectedPerson.notes}</p>
              </div>
            )}

            {showEvidence && (
              <div className="mt-4 space-y-3 animate-fade-in-up">
                <div className="text-xs text-mist uppercase tracking-wider mb-1 font-mono">
                  Evidence for this person
                </div>
                {getEvidencesForPerson(evidences, selectedPerson.id).length === 0 ? (
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                    <p className="text-sm text-fog">
                      No structured evidence recorded for this person. This indicates a
                      family-provided or unresolved identity that needs further documentation.
                    </p>
                  </div>
                ) : (
                  getEvidencesForPerson(evidences, selectedPerson.id).map((evi) => {
                    const source = getSourceById(sources, evi.sourceId);
                    return (
                      <div key={evi.id} className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 font-mono uppercase">
                            {evi.evidenceType.replace(/-/g, " ")}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="h-1 w-16 rounded-full bg-graphite overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
                                style={{ width: `${evi.confidence * 100}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-mono text-gold-400">
                              {Math.round(evi.confidence * 100)}%
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-fog leading-relaxed">{evi.summary}</p>
                        {source && (
                          <div className="mt-2 text-[10px] text-mist">
                            Source: <span className="text-gold-500/80">{source.name}</span>
                            {source.url && (
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold-500 hover:text-gold-400 ml-2 font-mono"
                              >
                                VIEW →
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
