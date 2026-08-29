import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { people } from "@/lib/data/genealogy";
import type { Person } from "@/lib/types";

const directLine = [
  "person-bradley",
  "person-bernard",
  "person-nishi",
];

const discoveryFrontier = [
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

const getPerson = (id: string) => people.find((p) => p.id === id);

const SectionDivider: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const slideUp = interpolate(frame, [0, 20], [30, 0], {
    extrapolateRight: "clamp",
  });
  const scaleIn = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, #0a0808 0%, #000000 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeIn,
      }}
    >
      <div
        style={{
          textAlign: "center",
          transform: `translateY(${slideUp}px) scale(${interpolate(scaleIn, [0, 1], [0.85, 1])})`,
        }}
      >
        <div
          style={{
            width: 60,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #d4940a, transparent)",
            margin: "0 auto 24px",
          }}
        />
        <div
          style={{
            fontSize: 14,
            fontFamily: "monospace",
            color: "#996600",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            fontSize: 52,
            fontFamily: "Georgia, serif",
            color: "#d4940a",
            fontWeight: 400,
          }}
        >
          {title}
        </div>
        <div
          style={{
            width: 60,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #d4940a, transparent)",
            margin: "24px auto 0",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const PersonSlide: React.FC<{
  person: Person;
  sectionLabel?: string;
}> = ({ person, sectionLabel }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const slideUp = interpolate(frame, [0, 18], [50, 0], {
    extrapolateRight: "clamp",
  });
  const scaleIn = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const shimmer = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const hasImage = !!person.imageUrl;
  const genLabel =
    person.generation < 0
      ? `Discovery ${Math.abs(person.generation)}`
      : person.generation === 0
        ? "Subject"
        : `Generation ${person.generation}`;

  const bgGradient = hasImage
    ? "radial-gradient(ellipse at 30% 50%, #1a1208 0%, #000000 70%)"
    : "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)";

  return (
    <AbsoluteFill
      style={{
        background: bgGradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeIn,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 80,
          maxWidth: 1600,
          padding: "0 100px",
          transform: `translateY(${slideUp}px) scale(${interpolate(scaleIn, [0, 1], [0.9, 1])})`,
          opacity: fadeIn,
        }}
      >
        {hasImage && (
          <div
            style={{
              flexShrink: 0,
              width: 320,
              height: 320,
              borderRadius: 20,
              overflow: "hidden",
              border: `2px solid rgba(212, 148, 10, ${0.3 + shimmer * 0.3})`,
              boxShadow: `0 0 ${30 + shimmer * 20}px rgba(212, 148, 10, ${0.15 + shimmer * 0.1})`,
              position: "relative",
            }}
          >
            <img
              src={person.imageUrl}
              alt={person.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "sepia(0.15) contrast(1.05)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
                background:
                  "linear-gradient(transparent, rgba(0,0,0,0.8))",
              }}
            />
          </div>
        )}

        <div style={{ flex: 1, textAlign: hasImage ? "left" : "center" }}>
          {sectionLabel && (
            <div
              style={{
                fontSize: 12,
                fontFamily: "monospace",
                color: "#996600",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              {sectionLabel}
            </div>
          )}

          <div
            style={{
              fontSize: 13,
              fontFamily: "monospace",
              color: "#996600",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {genLabel}
          </div>

          <div
            style={{
              fontSize: hasImage ? 56 : 72,
              fontFamily: "Georgia, serif",
              color: "#e0e0e0",
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: 12,
            }}
          >
            {person.name}
          </div>

          {person.nameBengali && (
            <div
              style={{
                fontSize: 22,
                color: "#888888",
                marginBottom: 12,
              }}
            >
              {person.nameBengali}
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
              justifyContent: hasImage ? "flex-start" : "center",
            }}
          >
            {person.birthYear && (
              <span
                style={{
                  fontSize: 16,
                  fontFamily: "monospace",
                  color: "#d4940a",
                }}
              >
                b. ~{person.birthYear}
              </span>
            )}
            {person.deathYear && (
              <span
                style={{
                  fontSize: 16,
                  fontFamily: "monospace",
                  color: "#d4940a",
                }}
              >
                d. {person.deathYear}
              </span>
            )}
          </div>

          {person.occupation && (
            <div
              style={{
                fontSize: 18,
                fontFamily: "Georgia, serif",
                color: "#d4940a",
                marginBottom: 8,
              }}
            >
              {person.occupation}
            </div>
          )}

          {person.location && (
            <div
              style={{
                fontSize: 14,
                fontFamily: "monospace",
                color: "#666666",
                marginBottom: 16,
              }}
            >
              {person.location}
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              justifyContent: hasImage ? "flex-start" : "center",
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color:
                  person.evidenceLevel === "verified"
                    ? "#34d399"
                    : person.evidenceLevel === "supported"
                      ? "#60a5fa"
                      : person.evidenceLevel === "probable"
                        ? "#c084fc"
                        : "#fb923c",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                padding: "3px 10px",
                border: `1px solid ${person.evidenceLevel === "verified" ? "rgba(52,211,153,0.3)" : person.evidenceLevel === "supported" ? "rgba(96,165,250,0.3)" : person.evidenceLevel === "probable" ? "rgba(192,132,252,0.3)" : "rgba(251,146,60,0.3)"}`,
                borderRadius: 4,
              }}
            >
              {person.evidenceLevel}
            </span>
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: "#996600",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              {Math.round(person.confidence * 100)}% confidence
            </span>
          </div>

          {person.notes && (
            <div
              style={{
                fontSize: 13,
                fontFamily: "Georgia, serif",
                color: "#777777",
                marginTop: 20,
                maxWidth: 500,
                lineHeight: 1.5,
                fontStyle: "italic",
              }}
            >
              {person.notes.length > 140
                ? person.notes.substring(0, 140) + "..."
                : person.notes}
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const GenerationSlide: React.FC<{
  person: Person;
  index: number;
}> = ({ person, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const slideUp = interpolate(frame, [0, 18], [40, 0], {
    extrapolateRight: "clamp",
  });
  const scaleIn = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const shimmer = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const hasImage = !!person.imageUrl;
  const genLabel =
    person.generation === 0
      ? "SUBJECT"
      : `GENERATION ${person.generation}`;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeIn,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          transform: `translateY(${slideUp}px) scale(${interpolate(scaleIn, [0, 1], [0.85, 1])})`,
          opacity: fadeIn,
        }}
      >
        {hasImage ? (
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              overflow: "hidden",
              border: `3px solid rgba(212, 148, 10, ${0.4 + shimmer * 0.3})`,
              boxShadow: `0 0 ${40 + shimmer * 20}px rgba(212, 148, 10, ${0.2 + shimmer * 0.1})`,
            }}
          >
            <img
              src={person.imageUrl}
              alt={person.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "sepia(0.1) contrast(1.05)",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
              border: "2px solid rgba(212, 148, 10, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontFamily: "Georgia, serif",
              color: "#d4940a",
            }}
          >
            {person.generation}
          </div>
        )}

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 13,
              fontFamily: "monospace",
              color: "#996600",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            {genLabel}
          </div>

          <div
            style={{
              fontSize: 60,
              fontFamily: "Georgia, serif",
              color: "#e0e0e0",
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: 10,
            }}
          >
            {person.name}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginTop: 8,
            }}
          >
            {person.birthYear && (
              <span
                style={{
                  fontSize: 15,
                  fontFamily: "monospace",
                  color: "#d4940a",
                }}
              >
                ~{person.birthYear}
              </span>
            )}
            <span style={{ color: "#333333", fontSize: 15 }}>·</span>
            <span
              style={{
                fontSize: 15,
                fontFamily: "monospace",
                color: "#666666",
              }}
            >
              {person.occupation || "Mukhuti"}
            </span>
          </div>
        </div>

        {index === directLine.length - 1 && (
          <div
            style={{
              marginTop: 32,
              padding: "8px 24px",
              border: "1px dashed #996600",
              borderRadius: 8,
              fontSize: 12,
              fontFamily: "monospace",
              color: "#d4940a",
            }}
          >
            DISCOVERY FRONTIER →
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

export const JourneyVideo: React.FC = () => {
  const frame = useCurrentFrame();

  const introEnd = 55;
  const genDuration = 70;
  const sectionDividerDuration = 40;
  const discoveredDuration = 55;
  const relatedDuration = 45;
  const outroDuration = 65;

  const directEnd = introEnd + directLine.length * genDuration;
  const discoveryStart = directEnd + sectionDividerDuration;
  const discoveryEnd = discoveryStart + discoveryFrontier.length * discoveredDuration;
  const relatedStart = discoveryEnd + sectionDividerDuration;
  const relatedEnd = relatedStart + relatedPeople.length * relatedDuration;
  const outroStart = relatedEnd;

  const introOpacity = interpolate(
    frame,
    [0, 15, introEnd - 10, introEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const outroOpacity = interpolate(
    frame,
    [outroStart, outroStart + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: "#000000" }}>
      <Sequence durationInFrames={introEnd}>
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: introOpacity,
            background:
              "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 12,
                fontFamily: "monospace",
                color: "#996600",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                marginBottom: 28,
              }}
            >
              DEEP ANCESTRY INVESTIGATION
            </div>
            <div
              style={{
                fontSize: 68,
                fontFamily: "Georgia, serif",
                color: "#e0e0e0",
                fontWeight: 300,
                lineHeight: 1.1,
              }}
            >
              How Far Back
            </div>
            <div
              style={{
                fontSize: 68,
                fontFamily: "Georgia, serif",
                color: "#d4940a",
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              Can We Trace?
            </div>
            <div
              style={{
                marginTop: 32,
                fontSize: 16,
                fontFamily: "Georgia, serif",
                color: "#666666",
              }}
            >
              The Mukhuti Lineage of Bradley Mukhuti
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {directLine.map((id, i) => {
        const person = getPerson(id);
        if (!person) return null;
        return (
          <Sequence
            key={id}
            from={introEnd + i * genDuration}
            durationInFrames={genDuration}
          >
            <GenerationSlide person={person} index={i} />
          </Sequence>
        );
      })}

      <Sequence
        from={directEnd}
        durationInFrames={sectionDividerDuration}
      >
        <SectionDivider
          title="Discovery Frontier"
          subtitle="Research Findings"
        />
      </Sequence>

      {discoveryFrontier.map((id, i) => {
        const person = getPerson(id);
        if (!person) return null;
        return (
          <Sequence
            key={id}
            from={discoveryStart + i * discoveredDuration}
            durationInFrames={discoveredDuration}
          >
            <PersonSlide
              person={person}
              sectionLabel="Inferred Relatives"
            />
          </Sequence>
        );
      })}

      <Sequence
        from={discoveryEnd}
        durationInFrames={sectionDividerDuration}
      >
        <SectionDivider
          title="Das & Mukherjee Line"
          subtitle="Unverified Heritage"
        />
      </Sequence>

      {relatedPeople.map((id, i) => {
        const person = getPerson(id);
        if (!person) return null;
        return (
          <Sequence
            key={id}
            from={relatedStart + i * relatedDuration}
            durationInFrames={relatedDuration}
          >
            <PersonSlide
              person={person}
              sectionLabel="Das / Mukherjee Line"
            />
          </Sequence>
        );
      })}

      <Sequence from={outroStart} durationInFrames={outroDuration}>
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: outroOpacity,
            background:
              "radial-gradient(ellipse at center, #0a0808 0%, #000000 100%)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 60,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, #d4940a, transparent)",
                margin: "0 auto 28px",
              }}
            />
            <div
              style={{
                fontSize: 12,
                fontFamily: "monospace",
                color: "#996600",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              THE INVESTIGATION CONTINUES
            </div>
            <div
              style={{
                fontSize: 44,
                fontFamily: "Georgia, serif",
                color: "#e0e0e0",
                fontWeight: 300,
                marginBottom: 12,
              }}
            >
              3 Family-Known Generations
            </div>
            <div
              style={{
                fontSize: 28,
                fontFamily: "Georgia, serif",
                color: "#d4940a",
                marginBottom: 12,
              }}
            >
              250+ Years of Context · 25 People · 18 Sources
            </div>
            <div
              style={{
                fontSize: 18,
                fontFamily: "Georgia, serif",
                color: "#666666",
              }}
            >
              The Mukhuti surname traces to the older forms of the Bengali Brahmin
              <br />
              Mukherjee lineage — and the research frontier remains honest and open.
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
