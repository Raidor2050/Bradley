# PREMIUM GENEALOGY PLATFORM — DESIGN BRIEF
## "Cinematic Documentary + Forensic Investigation" Aesthetic

---

## 1. DESIGN PATTERNS TO ADOPT

### From Genealogy Platforms
- **Interactive Family Tree View** (Ancestry.com, FamilySearch): Hierarchical tree with expand/collapse, person cards with photo + vital dates, source citations inline
- **Ancestry Composition Ring/Chromosome Painting** (23andMe): Circular percentage breakdown + interactive chromosome segment visualization
- **Ancestry Timeline Visualization** (23andMe): Horizontal bars estimating when ethnic ancestors lived (generations ago)
- **DNA Match Clustering** (23andMe, Ancestry): Color-coded relationship groups, shared DNA percentages
- **Photo Restoration Tools** (MyHeritage): AI colorization, enhancement, animation of old photos — integrate as a feature

### From OSINT/Investigation Dashboards
- **Node-Link Graph Visualization** (Maltego): Force-directed graph mapping relationships between people, places, documents, events
- **Entity Relationship Mapping**: Start with a person, run "transforms" to discover connected records, places, people
- **Progressive Disclosure** (SpiderFoot): Start high-level, drill down into data modules on demand
- **Search + Scan Interface**: Input a name/place → automated cross-referencing across multiple databases simultaneously
- **Correlation Rules Engine**: Automated pattern matching across record sets

### From Historical Archives
- **Gigapixel Deep Zoom** (Google Arts & Culture): High-res document/artifact exploration
- **Curated Story Narratives** (Google Arts & Culture "Stories"): Editorial content weaving artifacts into narratives
- **3D Object Exploration** (Google Arts & Culture): Interactive 3D historical artifacts
- **AR "Pocket Gallery"** (Google Arts & Culture): Augmented reality museum experiences
- **Search-by-Color/Time/Place** faceted filtering (Library of Congress, National Archives)

### From Data-Heavy Dashboards
- **Edward Tufte's Data-Density-First**: High information per pixel, minimal chartjunk
- **Monospace Labels Everywhere** (Bloomberg Terminal / Grafana): Operator-console feel for data labels
- **Multi-Series Chart Panels** (Grafana): Dense chart grids with hover-to-inspect
- **Real-Time Ticker Bar** (Bloomberg): Streaming data feel — generation counts, record matches, DNA updates
- **Panel-Based Layout** (Grafana): Each data view in its own bordered panel with consistent chrome

---

## 2. COLOR PALETTE (Exact Hex Values)

### Primary — AMOLED Black Foundation
```css
--black-pure:       #000000;    /* AMOLED true black */
--black-deep:       #0A0A0A;    /* Slightly lifted for depth */
--surface:          #111111;    /* Card/panel backgrounds */
--surface-elevated: #1A1A1A;    /* Elevated surfaces */
--surface-hover:    #222222;    /* Hover states */
--border:           #2A2A2A;    /* Subtle borders */
--border-strong:    #3A3A3A;    /* Emphasized borders */
```

### Gold / Amber Accent System
```css
--gold-bright:  #D4AF37;    /* Primary gold — "archival gold" */
--gold-warm:    #C9A84C;    /* Slightly muted gold */
--gold-light:   #E8C547;    /* Hover/highlight gold */
--gold-dim:     #8B7335;    /* Muted gold for secondary elements */
--amber:        #FFBF00;    /* Active/alert amber */
--amber-soft:   #F5C842;    /* Soft amber for badges */
--copper:       #B87333;    /* Warm copper for tertiary accents */
```

### Text Hierarchy
```css
--text-primary:   #F5F0E8;    /* Warm white — parchment feel */
--text-secondary: #B8B0A0;    /* Muted warm gray */
--text-tertiary:  #6B6358;    /* Disabled/meta text */
--text-gold:      #D4AF37;    /* Emphasized gold text */
```

### Semantic / Data Visualization
```css
--data-lineage:   #D4AF37;    /* Direct lineage */
--data-migration: #4A90D9;    /* Migration routes */
--data-record:    #6BCB77;    /* Verified records */
--data-pending:   #FFBF00;    /* Unverified/pending */
--data-conflict:  #E74C3C;    /* Conflicting records */
--chart-teal:     #4ECDC4;    /* Chart series 1 */
--chart-blue:     #45B7D1;    /* Chart series 2 */
--chart-purple:   #96CEB4;    /* Chart series 3 */
--chart-pink:     #DDA0DD;    /* Chart series 4 */
```

### Gradient Accents
```css
--gradient-gold: linear-gradient(135deg, #D4AF37 0%, #E8C547 50%, #C9A84C 100%);
--gradient-dark: linear-gradient(180deg, #000000 0%, #111111 100%);
--gradient-glow: radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 70%);
```

---

## 3. TYPOGRAPHY RECOMMENDATIONS

### Display / Headline — Cinematic Serif
**Primary:** `Cormorant Garamond` (Google Fonts)
- Elegant, high-contrast serif with historical/archival feel
- Use for: Page titles, section headers, ancestor names, dramatic reveals
- Weights: 300 (Light), 400 (Regular), 600 (SemiBold), 700 (Bold)

**Alternative:** `Playfair Display` — More geometric, slightly bolder drama
**Alternative:** `EB Garamond` — Classic book typography, scholarly feel

### Body / UI — Clean Sans
**Primary:** `Inter` (Google Fonts)
- Structured calm sans-serif, excellent readability at small sizes
- Use for: Body text, UI labels, navigation, descriptions
- Weights: 400 (Regular), 500 (Medium), 600 (SemiBold)

**Alternative:** `DM Sans` — Slightly warmer, good for premium feel

### Data / Metadata — Monospace
**Primary:** `JetBrains Mono` (Google Fonts)
- Monospace for data-dense panels, dates, coordinates, reference numbers
- Use for: Dates, source citations, DNA percentages, record IDs, timelines
- Weights: 400 (Regular), 500 (Medium)

**Alternative:** `Roboto Mono` — Grafana's choice, operator-console feel
**Alternative:** `IBM Plex Mono` — Clean, technical feel

### Accent / Decorative
**Primary:** `Cinzel` (Google Fonts)
- Classical Roman-inspired capitals
- Use for: Section dividers, ceremonial elements, "CASE FILE" headers
- Weights: 400 (Regular), 700 (Bold)

### Typography Scale (Tailwind Config)
```js
fontFamily: {
  display: ['"Cormorant Garamond"', 'serif'],
  body: ['Inter', 'sans-serif'],
  mono: ['"JetBrains Mono"', 'monospace'],
  accent: ['Cinzel', 'serif'],
}
```

---

## 4. LAYOUT PATTERNS

### Primary Layout: Investigation Dashboard
```
┌─────────────────────────────────────────────────┐
│  HEADER BAR (glassmorphism, backdrop-blur)      │
│  Logo | Search | Navigation | User              │
├──────────┬──────────────────────────────────────┤
│          │                                      │
│  LEFT    │  MAIN CONTENT AREA                   │
│  SIDEBAR │                                      │
│  (Tree   │  ┌──────────┐ ┌──────────┐          │
│  Nav,    │  │ Panel 1  │ │ Panel 2  │          │
│  Filters │  │ (Graph   │ │ (Timeline│          │
│  Saved   │  │  View)   │ │  View)   │          │
│  Searches│  └──────────┘ └──────────┘          │
│  Record  │  ┌──────────┐ ┌──────────┐          │
│  Counts) │  │ Panel 3  │ │ Panel 4  │          │
│          │  │ (Map)    │ │ (Records)│          │
│          │  └──────────┘ └──────────┘          │
│          │                                      │
├──────────┴──────────────────────────────────────┤
│  BOTTOM BAR — DNA ticker / Status / Generation  │
│  Counter / Last Updated                         │
└─────────────────────────────────────────────────┘
```

### Key Layout Principles
- **Panel-based grid** (Grafana-inspired): Each data view in its own bordered container
- **Progressive disclosure**: Start with overview, drill into details on click
- **F-pattern scanning**: Key KPIs top-left, drill-down bottom-right
- **Persistent left sidebar** for navigation (family tree nav, search filters)
- **Glassmorphism header**: `backdrop-blur-xl bg-black/60 border-b border-white/5`
- **Ample negative space** around panels (luxury feel)
- **Responsive breakpoints**: Collapse sidebar → bottom sheet on mobile

### View Modes
1. **Tree View**: Traditional family tree (expand/collapse)
2. **Graph View**: Force-directed knowledge graph (D3.js)
3. **Timeline View**: Horizontal scrollable timeline with event markers
4. **Map View**: Interactive world map with migration paths
5. **Gallery View**: Photo/document grid with lightbox
6. **Dashboard View**: Multi-panel overview (default)
7. **Source View**: Document scanner / record viewer

---

## 5. ANIMATION APPROACHES

### Micro-Interactions (Framer Motion)
- **Card hover**: Subtle `scale(1.02)` + gold border glow transition
- **Panel focus**: Gold border pulse on active panel
- **Button press**: `scale(0.97)` tactile feedback
- **Page transitions**: Crossfade with slight upward slide (200ms ease-out)
- **Loading states**: Pulsing gold skeleton screens (not spinners)
- **Notification entrance**: Slide in from top-right with backdrop-blur

### Graph / Node Animations (D3.js + Framer Motion)
- **Force-directed graph**: Nodes settle with gentle spring physics
- **Edge connections**: Animated path drawing (stroke-dashoffset technique)
- **Node expansion**: Ripple effect outward when drilling into a node
- **Relationship highlight**: Connected edges pulse gold, unconnected fade to 10% opacity
- **Drag interaction**: Nodes reposition with magnetic snap-back

### Timeline Animations
- **Scroll-triggered reveal**: Events fade in from bottom as timeline scrolls
- **Era highlighting**: Background gradient shifts as you move through time periods
- **Event marker pulse**: Active event marker emits subtle radial glow
- **Horizontal scroll**: Momentum-based inertial scrolling with rubber-band edges

### Map Animations (Leaflet + D3)
- **Migration path draw**: Animated line tracing ancestor migration routes
- **Marker cluster expansion**: When zooming, clusters break apart with spring physics
- **Geofence pulse**: Radius glow around significant locations
- **Historical map overlay**: Crossfade between modern and historical map layers

### Ambient / Atmospheric
- **Subtle particle drift**: Very slow-moving particles in background (gold-tinted, low opacity)
- **Vignette overlay**: Dark radial gradient at screen edges (cinematic framing)
- **Film grain texture**: Optional subtle noise overlay (0.02-0.04 opacity)
- **Gold shimmer**: CSS `@keyframes` shimmer on gold text elements (subtle, slow)

### Transition Timing
```css
/* Framer Motion config */
const transitions = {
  subtle: { duration: 0.2, ease: "easeOut" },
  moderate: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  dramatic: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  spring: { type: "spring", stiffness: 300, damping: 30 },
};
```

---

## 6. GLASSMORPHISM IMPLEMENTATION (Tailwind CSS)

### Base Glass Effect
```jsx
<div className="
  bg-black/60
  backdrop-blur-xl
  border border-white/[0.08]
  rounded-2xl
  shadow-[0_8px_32px_rgba(0,0,0,0.4)]
">
  {/* Content */}
</div>
```

### Glass Variants
```jsx
// Header glass (darker, more opaque)
className="bg-black/80 backdrop-blur-2xl border-b border-white/[0.05]"

// Card glass (lighter, more transparent)
className="bg-white/[0.03] backdrop-blur-lg border border-white/[0.06] rounded-xl"

// Sidebar glass (medium)
className="bg-black/70 backdrop-blur-xl border-r border-white/[0.05]"

// Modal glass (heavy blur)
className="bg-black/80 backdrop-blur-2xl border border-gold/20 rounded-2xl"

// Gold-tinted glass (special feature panels)
className="bg-gradient-to-br from-[#D4AF37]/[0.08] to-black/60 backdrop-blur-xl border border-gold/20"
```

### Glassmorphism CSS Fallback
```css
/* Safari requires -webkit prefix */
.glass {
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .glass {
    backdrop-filter: none;
    background-color: rgba(0, 0, 0, 0.9);
  }
}
```

---

## 7. INTERACTIVE GRAPH EDGES (CSS/JS)

### Animated SVG Edges
```jsx
// React component for animated graph edges
const AnimatedEdge = ({ source, target, highlighted }) => {
  const pathRef = useRef(null);
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setLength(pathRef.current.getTotalLength());
    }
  }, []);

  return (
    <path
      ref={pathRef}
      d={`M${source.x},${source.y} Q${controlX},${controlY} ${target.x},${target.y}`}
      fill="none"
      stroke={highlighted ? "#D4AF37" : "#3A3A3A"}
      strokeWidth={highlighted ? 2 : 1}
      strokeDasharray={length}
      strokeDashoffset={highlighted ? 0 : length}
      style={{
        transition: "stroke-dashoffset 0.8s ease-out, stroke 0.3s ease",
      }}
    />
  );
};
```

### CSS Keyframe for Edge Glow
```css
@keyframes edge-glow {
  0%, 100% { stroke: #D4AF37; filter: drop-shadow(0 0 2px #D4AF37); }
  50% { stroke: #E8C547; filter: drop-shadow(0 0 6px #E8C547); }
}

.edge-highlighted {
  animation: edge-glow 2s ease-in-out infinite;
}
```

### D3.js Force Layout Config
```js
const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id).distance(120))
  .force("charge", d3.forceManyBody().strength(-300))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("collision", d3.forceCollide().radius(40));
```

---

## 8. PARALLAX SCROLLING (React/Next.js)

### Implementation with Framer Motion
```jsx
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxSection = ({ children, speed = 0.5 }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div style={{ y }} className="relative">
      {children}
    </motion.div>
  );
};

// Multi-layer parallax background
const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();

  // Layer 1: Star field (slowest)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  // Layer 2: Historical map (medium)
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  // Layer 3: Data overlay (fastest)
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-20">
        {/* Star field / particle layer */}
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute inset-0 opacity-10">
        {/* Historical map texture layer */}
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute inset-0 opacity-5">
        {/* Data visualization overlay */}
      </motion.div>
    </div>
  );
};
```

### Scroll-Triggered Reveal Component
```jsx
const RevealOnScroll = ({ children, direction = "up", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: direction === "up" ? 40 : -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};
```

---

## 9. COLOR PALETTE TAILWIND CONFIG

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Blacks
        'black-pure': '#000000',
        'black-deep': '#0A0A0A',
        'surface': '#111111',
        'surface-elevated': '#1A1A1A',
        'surface-hover': '#222222',
        'border-subtle': '#2A2A2A',
        'border-strong': '#3A3A3A',

        // Gold / Amber
        'gold': {
          DEFAULT: '#D4AF37',
          warm: '#C9A84C',
          light: '#E8C547',
          dim: '#8B7335',
        },
        'amber': {
          DEFAULT: '#FFBF00',
          soft: '#F5C842',
        },
        'copper': '#B87333',

        // Text
        'text-primary': '#F5F0E8',
        'text-secondary': '#B8B0A0',
        'text-tertiary': '#6B6358',

        // Data
        'data-lineage': '#D4AF37',
        'data-migration': '#4A90D9',
        'data-record': '#6BCB77',
        'data-pending': '#FFBF00',
        'data-conflict': '#E74C3C',

        // Chart
        'chart-teal': '#4ECDC4',
        'chart-blue': '#45B7D1',
        'chart-purple': '#96CEB4',
        'chart-pink': '#DDA0DD',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        accent: ['Cinzel', 'serif'],
      },
      boxShadow: {
        'gold': '0 0 15px rgba(212, 175, 55, 0.15)',
        'gold-lg': '0 0 30px rgba(212, 175, 55, 0.2)',
        'inner-gold': 'inset 0 0 20px rgba(212, 175, 55, 0.05)',
        'panel': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #E8C547 50%, #C9A84C 100%)',
        'gradient-dark': 'linear-gradient(180deg, #000000 0%, #111111 100%)',
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '200% center' },
          '50%': { backgroundPosition: '-200% center' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
};
```

---

## 10. COMPONENT PATTERNS

### Person Card (Glassmorphism)
```jsx
<div className="bg-white/[0.03] backdrop-blur-lg border border-white/[0.06]
                rounded-xl p-4 hover:border-gold/30 hover:shadow-gold
                transition-all duration-300 group cursor-pointer">
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20
                    flex items-center justify-center font-display text-gold text-lg">
      {initials}
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-display text-text-primary text-lg truncate group-hover:text-gold transition-colors">
        {fullName}
      </h3>
      <p className="font-mono text-text-tertiary text-xs">
        {birthYear} — {deathYear}
      </p>
    </div>
    <div className="text-right">
      <span className="font-mono text-gold text-sm">{confidence}%</span>
      <p className="font-body text-text-tertiary text-xs">confidence</p>
    </div>
  </div>
</div>
```

### Data Panel (Grafana-Inspired)
```jsx
<div className="bg-surface border border-border-subtle rounded-lg overflow-hidden">
  {/* Panel Header */}
  <div className="flex items-center justify-between px-4 py-2 border-b border-border-subtle">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-gold animate-pulse-gold" />
      <span className="font-mono text-text-secondary text-xs uppercase tracking-wider">
        {panelTitle}
      </span>
    </div>
    <div className="flex items-center gap-1">
      <button className="p-1 text-text-tertiary hover:text-text-primary transition-colors">
        <Maximize2 size={14} />
      </button>
      <button className="p-1 text-text-tertiary hover:text-text-primary transition-colors">
        <MoreVertical size={14} />
      </button>
    </div>
  </div>
  {/* Panel Content */}
  <div className="p-4">
    {children}
  </div>
  {/* Panel Footer (optional) */}
  <div className="px-4 py-2 border-t border-border-subtle bg-black/20">
    <span className="font-mono text-text-tertiary text-[10px]">
      Last updated: {timestamp}
    </span>
  </div>
</div>
```

### Ticker Bar (Bottom Status Bar)
```jsx
<div className="fixed bottom-0 left-0 right-0 h-8 bg-black/90 backdrop-blur-md
                border-t border-white/[0.05] z-50 flex items-center px-4 gap-6">
  <div className="flex items-center gap-2">
    <div className="w-1.5 h-1.5 rounded-full bg-data-record animate-pulse" />
    <span className="font-mono text-text-tertiary text-[10px]">LIVE</span>
  </div>
  <div className="h-3 w-px bg-border-subtle" />
  <span className="font-mono text-text-secondary text-[10px]">
    GENERATIONS: <span className="text-gold">12</span>
  </span>
  <span className="font-mono text-text-secondary text-[10px]">
    RECORDS: <span className="text-data-record">2,847</span>
  </span>
  <span className="font-mono text-text-secondary text-[10px]">
    DNA MATCHES: <span className="text-chart-teal">1,203</span>
  </span>
  <span className="font-mono text-text-secondary text-[10px]">
    LAST SYNC: <span className="text-text-tertiary">{lastSync}</span>
  </span>
  <div className="flex-1" />
  <span className="font-mono text-text-tertiary text-[10px]">
    SAADS ANCESTRY v1.0
  </span>
</div>
```

---

## 11. SCREEN-SPECIFIC LAYOUTS

### Dashboard (Default View)
- 2x2 panel grid on desktop (graph, timeline, map, records)
- Single column stack on mobile
- Header with global search + person selector
- Bottom ticker bar with live stats

### Ancestor Detail Page
- Full-width hero section with person photo/name/dates
- Glassmorphism card overlay with vital information
- Below: Tabbed panels (Life Events, Sources, DNA, Connections)
- Right sidebar: Related persons quick-nav

### Graph View (Full Screen)
- Force-directed D3.js graph, full viewport
- Floating control panel (glassmorphism) in top-right
- Node detail panel slides in from right on click
- Legend panel in bottom-left

### Map View
- Full-viewport Leaflet map with dark tile layer
- Animated migration path overlays
- Timeline slider at bottom (glassmorphism bar)
- Location detail popup on marker click

### Timeline View
- Horizontal scrollable timeline
- Event markers with popover details
- Era/period color bands
- Parallel tracks for multiple ancestors

---

## 12. DARK TILE MAPS

Use CartoDB dark matter or Stadia Alidade Smooth Dark:
```
https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
```

Or MapTiler dark:
```
https://api.maptiler.com/tiles/v2/{z}/{x}/{y}.png?key=YOUR_KEY
```

### Map Marker Styling
```jsx
// Gold pulsing marker for ancestor birth/death locations
const goldMarkerIcon = L.divIcon({
  className: 'custom-marker',
  html: `
    <div class="relative">
      <div class="w-3 h-3 bg-gold rounded-full animate-pulse-gold" />
      <div class="absolute inset-0 w-3 h-3 bg-gold/30 rounded-full animate-ping" />
    </div>
  `,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});
```

---

## 13. AMBIENT ATMOSPHERE

### Film Grain Overlay
```jsx
<div
  className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]"
  style={{
    backgroundImage: `url("data:image/svg+xml,...")`, // noise SVG
    mixBlendMode: 'overlay',
  }}
/>
```

### Vignette
```jsx
<div
  className="fixed inset-0 pointer-events-none z-[99]"
  style={{
    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
  }}
/>
```

### Gold Shimmer Text Effect
```css
.gold-shimmer {
  background: linear-gradient(
    90deg,
    #D4AF37 0%,
    #E8C547 25%,
    #F5C842 50%,
    #E8C547 75%,
    #D4AF37 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s ease-in-out infinite;
}
```

---

## 14. RESPONSIVE BREAKPOINTS

```js
screens: {
  'sm': '640px',    // Mobile landscape
  'md': '768px',    // Tablet portrait
  'lg': '1024px',   // Tablet landscape / small desktop
  'xl': '1280px',   // Desktop
  '2xl': '1536px',  // Large desktop
}
```

### Mobile Adaptations
- Sidebar collapses to bottom sheet (swipeable)
- Panels stack vertically (single column)
- Graph view goes full-screen with tap-to-inspect
- Map gets bottom sheet for location details
- Header becomes compact (logo + hamburger)

---

## 15. KEY DESIGN PRINCIPLES

1. **Cinematic First**: Every screen should feel like a frame from a documentary — dramatic lighting, deliberate composition, emotional weight
2. **Forensic Precision**: Data is presented with the clarity of an investigation board — clear labels, source citations, confidence scores
3. **Progressive Disclosure**: Reveal complexity gradually — overview first, details on demand
4. **Data Density**: Borrow from Bloomberg/Grafana — high information per pixel, but with luxury spacing
5. **Gold = Trust**: Gold is used sparingly for verified data, active states, and emphasis — never for decoration alone
6. **Dark = Depth**: Pure black backgrounds create infinite depth; content floats in space
7. **Typography = Authority**: Serif display type for emotional weight, monospace for data precision
8. **Motion = Narrative**: Animations tell the story of discovery — paths draw, connections reveal, data materializes
