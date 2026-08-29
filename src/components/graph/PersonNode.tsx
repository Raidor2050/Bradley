"use client";

import { Handle, Position, NodeProps } from "@xyflow/react";
import { Person } from "@/lib/types";

interface PersonNodeData {
  person: Person;
  isSelected: boolean;
  isHighlighted: boolean;
  isCandidate?: boolean;
  onSelect: () => void;
  onHover: (hovering: boolean) => void;
}

export default function PersonNode({ data }: NodeProps & { data: PersonNodeData }) {
  const { person, isSelected, isHighlighted, isCandidate, onSelect, onHover } = data;

  const glowClass = isSelected
    ? "shadow-lg shadow-gold-500/25 border-gold-400/60"
    : isHighlighted
    ? "shadow-md shadow-gold-500/15 border-gold-500/40"
    : isCandidate
    ? "border-blue-700/30 hover:border-blue-600/50"
    : "border-gold-700/20 hover:border-gold-600/40";

  const genDisplay = person.generation < 0
    ? `D${Math.abs(person.generation)}`
    : person.generation === 0
    ? "YOU"
    : `G${person.generation}`;

  const borderColor = person.generation === 0
    ? "border-gold-400/60"
    : person.generation > 0 && person.generation <= 2
    ? "border-gold-500/30"
    : person.generation >= 3
    ? "border-gold-700/20"
    : isCandidate
    ? "border-blue-600/30"
    : "border-gold-700/20";

  return (
    <div
      className={`relative cursor-pointer transition-all duration-300 ${isSelected ? "scale-105 z-10" : "z-0"}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onSelect}
    >
      {person.generation >= 0 && (
        <Handle
          type="target"
          position={Position.Top}
          className="!bg-gold-500 !border-gold-400 !w-2 !h-2"
        />
      )}

      <div
        className={`w-[160px] sm:w-[200px] rounded-xl bg-charcoal/90 backdrop-blur-sm border-2 p-2.5 sm:p-3 transition-all duration-300 ${glowClass} ${borderColor}`}
      >
        <div className="flex items-center gap-2.5 mb-2">
          {person.imageUrl ? (
            <div className={`w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2 ${
              person.generation === 0 ? "border-gold-400" : isCandidate ? "border-blue-500/40" : "border-gold-600/30"
            }`}>
              <img
                src={person.imageUrl}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
              person.generation === 0
                ? "bg-gradient-to-br from-gold-500 to-gold-600 text-black"
                : isCandidate
                ? "bg-blue-600/30 text-blue-300"
                : "bg-gold-700/30 text-gold-300"
            }`}>
              {genDisplay}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-pearl truncate leading-tight">
              {person.name}
            </div>
            <div className="text-[11px] text-mist truncate">
              {person.birthYear ? `~${person.birthYear}` : ""}
              {person.deathYear ? ` – ${person.deathYear}` : ""}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-mono uppercase ${
            person.evidenceLevel === "verified"
              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
              : person.evidenceLevel === "supported"
              ? "bg-blue-500/15 text-blue-400 border-blue-500/20"
              : person.evidenceLevel === "probable"
              ? "bg-purple-500/15 text-purple-400 border-purple-500/20"
              : "bg-orange-500/15 text-orange-400 border-orange-500/20"
          }`}>
            {person.evidenceLevel}
          </span>
          {person.occupation && (
            <span className="text-[9px] text-mist truncate max-w-[120px]">
              {person.occupation}
            </span>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-gold-500 !border-gold-400 !w-2 !h-2"
      />
    </div>
  );
}
