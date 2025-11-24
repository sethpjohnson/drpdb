# Technical PRD: Dr Pepper Database (drpprdb.com)

**Version:** 1.0
**Last Updated:** 2024-11-24
**Status:** Ready for Implementation

---

## Context & Why Now

The Dr Pepper Database is a static microsite celebrating the taxonomy of Dr Pepper flavors (real and fabricated) with intentional over-engineering for comedic effect. The timing is ideal because:

- Static site generators and modern React tooling make "delightfully over-engineered" feasible without operational burden
- GitHub Pages provides free, zero-maintenance hosting
- The project scope is well-defined with clear boundaries (no backend, no auth, no tracking)
- A tribute to the mythical "23 flavors" deserves a dedicated archive

---

## Users & JTBD

| User Segment | Job to Be Done |
|--------------|----------------|
| Casual browsers | "I want 30 seconds of delight discovering absurd Dr Pepper lore" |
| Dr Pepper enthusiasts | "I want to explore real and fictional flavor variants in a fun way" |
| Web developers | "I want to see a well-crafted static site that's intentionally ridiculous" |

---

## Business Goals & Success Metrics

### Leading Indicators
- Site builds with zero errors
- Lighthouse performance score > 90
- Page load < 300ms on 3G connection
- All 23+ flavors searchable and filterable

### Lagging Indicators
- At least one audible chuckle from a visitor (per PRD requirement)
- GitHub stars as a vanity metric
- Social shares of ridiculous flavor entries

---

## Technical Architecture

### Stack Decisions

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Package Manager | pnpm | Required per PRD; faster, disk-efficient |
| Framework | Next.js 14+ | Static export support; React-based |
| Language | TypeScript | Type safety for flavor data structures |
| Styling | Tailwind CSS | Utility-first, minimal CSS bundle |
| Components | shadcn/ui | Accessible, customizable primitives |
| Animation | Framer Motion | Declarative animations for Pepperverse |
| Linting | ESLint | Code quality enforcement |
| Deployment | GitHub Pages | Static hosting, GitHub Actions CI/CD |

### Next.js Static Export Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: process.env.NODE_ENV === 'production' ? '/drpprdb' : '',
}

export default nextConfig
```

**Key Static Export Constraints:**
- No API routes (use client-side JSON fetching)
- No Server Components with dynamic data
- No middleware
- All images must use `unoptimized: true`
- `generateStaticParams()` for dynamic routes

---

## Data Structure

### flavors.json Schema

```typescript
// types/flavor.ts

export type AuthenticityLevel =
  | 'Real'
  | 'Rumored'
  | 'Urban Legend'
  | 'Astral Projection'

export type FlavorCategory =
  | 'Classic'
  | 'Seasonal'
  | 'Experimental'
  | 'Forbidden'

export type RarityScore = 1 | 2 | 3 | 4 | 5 // 1 = Common, 5 = Legendary

export interface Flavor {
  id: string                      // kebab-case unique identifier
  name: string                    // Display name
  authenticity: AuthenticityLevel
  category: FlavorCategory
  rarityScore: RarityScore
  releaseYear: number | string    // Year or range like "1885-1887"
  flavorNotes: string[]           // Array of tasting notes
  pairsWellWith: string[]         // Food/drink pairings
  lore: string                    // Exactly one sentence
  imageUrl?: string               // Optional illustration path
  discontinued?: boolean          // For timeline display
  region?: string                 // For regional variants
}

export interface FlavorDatabase {
  version: string
  lastUpdated: string
  flavors: Flavor[]
}
```

### Sample flavors.json Entry

```json
{
  "version": "1.0.0",
  "lastUpdated": "2024-11-24",
  "flavors": [
    {
      "id": "original-23",
      "name": "Dr Pepper Original",
      "authenticity": "Real",
      "category": "Classic",
      "rarityScore": 1,
      "releaseYear": 1885,
      "flavorNotes": ["cherry", "vanilla", "amaretto", "mystery"],
      "pairsWellWith": ["barbecue", "existential dread", "Tuesdays"],
      "lore": "The original 23 ingredients remain classified, guarded by The Pepper Keepers in a vault beneath Waco, Texas.",
      "imageUrl": "/images/flavors/original-23.svg"
    },
    {
      "id": "midnight-fog",
      "name": "Dr Pepper Midnight Fog",
      "authenticity": "Urban Legend",
      "category": "Forbidden",
      "rarityScore": 5,
      "releaseYear": "1923 (disputed)",
      "flavorNotes": ["smoke", "moonlight", "regret"],
      "pairsWellWith": ["noir films", "broken clocks"],
      "lore": "Only available at diners that no longer exist, between 2:00 and 3:00 AM in time zones that have been discontinued.",
      "discontinued": true
    }
  ]
}
```

### Data Size Budget

| Constraint | Target | Rationale |
|------------|--------|-----------|
| flavors.json | < 50 KB | 23+ flavors with full metadata |
| Total data files | < 100 KB | Including supporting JSON |
| Images (all) | < 1.5 MB | SVG preferred; compressed PNG fallback |
| **Total database** | **< 2 MB** | Per PRD requirement |

---

## Component Architecture

### Directory Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with theme
│   ├── page.tsx                # Home/database view
│   ├── pepperverse/
│   │   └── page.tsx            # Pepperverse Explorer
│   ├── timeline/
│   │   └── page.tsx            # Flavor Timeline
│   ├── lab/
│   │   └── page.tsx            # Theoretical Flavors Lab
│   ├── merger/
│   │   └── page.tsx            # Flavor Merger Tool
│   └── api-docs/
│       └── page.tsx            # Fake API documentation
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── flavor/
│   │   ├── FlavorCard.tsx      # Individual flavor display
│   │   ├── FlavorGrid.tsx      # Grid layout for database
│   │   ├── FlavorDetail.tsx    # Expanded flavor view
│   │   └── FlavorFilters.tsx   # Search and filter UI
│   ├── pepperverse/
│   │   ├── CosmicMap.tsx       # Main SVG visualization
│   │   ├── FlavorOrbit.tsx     # Orbital animation wrapper
│   │   └── BlackHole.tsx       # Discontinued flavors sink
│   ├── timeline/
│   │   └── TimelineEntry.tsx   # Year-based entry
│   ├── merger/
│   │   └── FlavorMerger.tsx    # Merger generator UI
│   └── layout/
│       ├── Header.tsx          # Site header with navigation
│       ├── Footer.tsx          # Credits and fizz counter
│       └── Navigation.tsx      # Main nav component
├── data/
│   ├── flavors.json            # Primary flavor database
│   └── theoretical.json        # Lab flavors (static)
├── lib/
│   ├── flavors.ts              # Data loading utilities
│   ├── search.ts               # Client-side search logic
│   └── merger.ts               # Flavor combination generator
├── hooks/
│   ├── useFlavorSearch.ts      # Search state management
│   └── useSipsCounter.ts       # Fun counter logic
└── types/
    └── flavor.ts               # TypeScript interfaces
```

### Component Specifications

#### FR-001: FlavorCard

```typescript
interface FlavorCardProps {
  flavor: Flavor
  variant?: 'compact' | 'expanded'
  onClick?: () => void
}
```

**Acceptance Criteria:**
- [ ] Displays flavor name, authenticity badge, and rarity stars
- [ ] Shows category pill with appropriate color
- [ ] Truncates lore to 100 characters with ellipsis in compact mode
- [ ] Hover state reveals "Pairs Well With" tooltip
- [ ] Click expands to detail view or navigates to flavor page
- [ ] Alt text on image: "{Flavor Name} illustration"

#### FR-002: FlavorFilters

```typescript
interface FlavorFiltersProps {
  onFilterChange: (filters: FilterState) => void
  initialFilters?: FilterState
}

interface FilterState {
  search: string
  authenticity: AuthenticityLevel[]
  category: FlavorCategory[]
  rarityMin: RarityScore
  rarityMax: RarityScore
  yearRange: [number, number]
}
```

**Acceptance Criteria:**
- [ ] Keyword search filters by name (case-insensitive)
- [ ] Multi-select for authenticity levels
- [ ] Multi-select for categories
- [ ] Rarity score range slider (1-5)
- [ ] Year range filter with min/max inputs
- [ ] "Clear All" resets to defaults
- [ ] "Surprise Me" button selects random flavor
- [ ] Filter state persists in URL params for shareability
- [ ] Debounced search input (300ms)

#### FR-003: Pepperverse Explorer (CosmicMap)

```typescript
interface CosmicMapProps {
  flavors: Flavor[]
  onFlavorHover?: (flavor: Flavor | null) => void
  onFlavorClick?: (flavor: Flavor) => void
}
```

**Acceptance Criteria:**
- [ ] SVG viewBox: 800x600 minimum
- [ ] "Master Pepper" star at center with pulsing glow animation
- [ ] Classic flavors orbit at inner ring (radius: 150px)
- [ ] Seasonal flavors orbit at middle ring (radius: 250px)
- [ ] Experimental flavors drift as comets with tail animation
- [ ] "The Vendor Promotion Cycle" black hole in corner
- [ ] Discontinued/Forbidden flavors spiral toward black hole
- [ ] Hover tooltip shows flavor name and authenticity
- [ ] Click navigates to flavor detail
- [ ] Framer Motion for smooth orbital animations
- [ ] Animation respects `prefers-reduced-motion`

#### FR-004: Flavor Merger Tool

```typescript
interface FlavorMergerState {
  flavorA: Flavor | null
  flavorB: Flavor | null
  result: MergedFlavor | null
}

interface MergedFlavor {
  name: string           // Generated combination name
  description: string    // Nonsensical description
  warning: string        // Humorous safety warning
}
```

**Acceptance Criteria:**
- [ ] Two dropdown selectors for input flavors
- [ ] "Merge" button triggers generation
- [ ] Result displays with dramatic reveal animation
- [ ] Generated name combines syllables from both inputs
- [ ] Description uses template: "A {adjective} fusion of {notes} and {notes}"
- [ ] Warning randomly selected from predefined list
- [ ] "Reset" clears both inputs and result
- [ ] Share button copies result to clipboard

#### FR-005: Fake API Documentation

**Acceptance Criteria:**
- [ ] Styled like Swagger/OpenAPI documentation
- [ ] Endpoints listed:
  - `GET /v1/flavors` - Returns nothing useful
  - `GET /v1/flavors/{id}` - May or may not exist
  - `GET /v1/flavors/immortal` - Always 404: "Flavor Cannot Be Contained"
  - `POST /v1/flavors/propose` - Returns 418: "I'm a teapot, not a soda fountain"
  - `DELETE /v1/flavors/{id}` - Returns 403: "The Pepper Keepers forbid this"
- [ ] Example responses in JSON format with humorous error messages
- [ ] "Try It" buttons that display canned responses
- [ ] Rate limit notice: "0 requests per day (generous)"

---

## Styling & Design System

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pepper: {
          burgundy: '#722F37',
          cream: '#FFFDD0',
          offwhite: '#FAF9F6',
          fizz: '#E8D4B8',
          dark: '#2D1F1F',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],  // Medicine label style
        body: ['var(--font-body)', 'sans-serif'],
      },
      animation: {
        'orbit-slow': 'orbit 60s linear infinite',
        'orbit-medium': 'orbit 30s linear infinite',
        'comet': 'comet 15s ease-in-out infinite',
        'fizz': 'fizz 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

### shadcn/ui Components Required

| Component | Usage |
|-----------|-------|
| Button | Actions, "Surprise Me", navigation |
| Card | Flavor display containers |
| Badge | Authenticity levels, categories |
| Input | Search field |
| Select | Filter dropdowns, merger selectors |
| Slider | Rarity range filter |
| Tooltip | Hover information |
| Dialog | Flavor detail modal (optional) |
| Tabs | API docs sections |

### Typography

- **Display Font:** "Playfair Display" or similar serif (medicine label aesthetic)
- **Body Font:** "Inter" or system sans-serif
- **Monospace:** For fake API docs

### Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | WCAG AA minimum (4.5:1) |
| Focus indicators | Visible focus rings on all interactive elements |
| Alt text | All flavor images have descriptive alt text |
| Keyboard navigation | Full site navigable without mouse |
| Reduced motion | Respect `prefers-reduced-motion` media query |
| Screen reader | ARIA labels on custom components |

---

## Framer Motion Animation Specifications

### Animation Tokens

```typescript
// lib/animations.ts

export const transitions = {
  spring: { type: 'spring', stiffness: 300, damping: 30 },
  smooth: { type: 'tween', duration: 0.3, ease: 'easeInOut' },
  slow: { type: 'tween', duration: 0.6, ease: 'easeOut' },
}

export const variants = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  },
  orbit: {
    animate: {
      rotate: 360,
      transition: { duration: 60, repeat: Infinity, ease: 'linear' },
    },
  },
}
```

### Animation Requirements

| Element | Animation | Duration | Trigger |
|---------|-----------|----------|---------|
| Flavor cards | Fade in + scale | 300ms | On mount, staggered 50ms |
| Filter changes | Fade transition | 200ms | On filter update |
| Pepperverse orbits | Continuous rotation | 30-60s | Continuous |
| Black hole | Spiral inward | 10s | Continuous |
| Comet tails | Trailing particles | 15s cycle | Continuous |
| Merger result | Dramatic reveal | 800ms | On generation |
| Page transitions | Fade | 300ms | Route change |

---

## Implementation Phases

### Phase 1: Foundation (Days 1-2)

**Objective:** Project scaffolding and core infrastructure

| Task | Acceptance Criteria |
|------|---------------------|
| Initialize Next.js project with TypeScript | `pnpm create next-app` completes without errors |
| Configure static export | `next build` outputs to `/out` directory |
| Set up Tailwind CSS | Custom color palette applied |
| Install and configure shadcn/ui | Button, Card, Input components available |
| Create type definitions | `Flavor` interface compiles without errors |
| Create flavors.json with 5 real flavors | JSON validates against schema |
| Set up ESLint | `pnpm lint` passes |
| Create basic layout (Header, Footer) | Navigation renders on all pages |

**Deliverable:** Deployable skeleton site with styled layout

### Phase 2: Flavor Database (Days 3-4)

**Objective:** Core database viewing and filtering

| Task | Acceptance Criteria |
|------|---------------------|
| Implement FlavorCard component | Displays all flavor fields correctly |
| Implement FlavorGrid component | Responsive grid: 1/2/3 columns |
| Implement FlavorFilters component | All filter types functional |
| Implement client-side search | < 50ms filter response |
| Add "Surprise Me" button | Randomly selects flavor |
| Complete flavors.json (23+ entries) | 5 real + 18 fabricated |
| Add URL state for filters | Filters persist on reload |

**Deliverable:** Fully searchable flavor database

### Phase 3: Pepperverse Explorer (Days 5-6)

**Objective:** Interactive cosmic visualization

| Task | Acceptance Criteria |
|------|---------------------|
| Create SVG base with viewBox | Renders at 800x600 minimum |
| Implement Master Pepper star | Centered, pulsing glow |
| Add orbital rings | 3 distinct radii |
| Position flavors on orbits | By category |
| Implement orbit animations | Smooth, continuous |
| Add black hole visualization | With spiral effect |
| Implement hover tooltips | Shows flavor name |
| Add click navigation | Routes to flavor detail |
| Respect reduced motion | Disables animation |

**Deliverable:** Interactive Pepperverse visualization

### Phase 4: Fun Extras (Days 7-8)

**Objective:** Timeline, Merger, Lab, and Fake API

| Task | Acceptance Criteria |
|------|---------------------|
| Implement Flavor Timeline | Scrollable by year |
| Create Flavor Merger Tool | Generates combination |
| Build Theoretical Flavors Lab | Static list renders |
| Create Fake API Documentation | All endpoints documented |
| Add "Try It" interactions | Canned responses display |
| Implement sips counter | Resets on refresh |

**Deliverable:** All "Fun Extras" features complete

### Phase 5: Polish & Deploy (Days 9-10)

**Objective:** Performance optimization and deployment

| Task | Acceptance Criteria |
|------|---------------------|
| Lighthouse audit | Score > 90 all categories |
| Performance optimization | Load time < 300ms |
| Cross-browser testing | Chrome, Firefox, Safari |
| Mobile responsive testing | Works on 320px width |
| GitHub Actions CI/CD | Auto-deploys on merge |
| Documentation update | README complete |
| Final content review | All lore proofread |

**Deliverable:** Production-ready site on GitHub Pages

---

## Non-Functional Requirements

### Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint | < 1.0s | Lighthouse |
| Largest Contentful Paint | < 1.5s | Lighthouse |
| Time to Interactive | < 2.0s | Lighthouse |
| Total Blocking Time | < 100ms | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| Page weight (gzipped) | < 200KB | Build output |
| flavors.json load | < 50ms | Browser DevTools |

### Scale

- **Concurrent users:** Unlimited (static hosting)
- **Database size:** 23-100 flavors supported
- **Image assets:** < 50 total, lazy-loaded

### Observability

- No analytics or tracking per PRD requirements
- Build-time validation of JSON schema
- GitHub Actions logs for deployment issues

### Security

| Concern | Mitigation |
|---------|------------|
| XSS | No user input; React escapes by default |
| Data integrity | JSON validated at build time |
| Dependencies | pnpm audit in CI |

### Privacy

- No cookies
- No local storage (except volatile sips counter)
- No tracking pixels
- No external API calls

---

## Rollout Plan

### Pre-Launch Checklist

- [ ] All 23+ flavors have complete metadata
- [ ] All lore sentences reviewed for tone
- [ ] Images optimized (< 50KB each)
- [ ] Lighthouse score > 90
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on mobile (iOS Safari, Android Chrome)
- [ ] GitHub Pages custom domain configured (optional)
- [ ] 404 page created with thematic content

### Deployment Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### Guardrails

- **Build validation:** JSON schema check fails build if invalid
- **Lint check:** ESLint errors block deployment
- **Size budget:** Warn if total bundle > 500KB

### Kill Switch

Not applicable for static site. To "kill" the site:
1. Disable GitHub Pages in repository settings
2. Or push empty index.html with maintenance message

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Next.js static export limitations | Medium | High | Validate all features work with `output: 'export'` early |
| SVG animations performance | Medium | Medium | Use CSS transforms; limit particle count |
| Large image bundle | Low | Medium | Use SVG where possible; compress all assets |
| Content not funny enough | Medium | High | Review with actual humans before launch |
| Framer Motion bundle size | Low | Low | Tree-shake unused features |

---

## Open Questions

1. **Custom domain:** Should we use drpprdb.com or a subdomain/path?
2. **Image style:** Hand-drawn SVG illustrations or AI-generated?
3. **Future API:** Should we actually build a JSON API for fun?
4. **Konami code:** Implement "Caffeine Mode" easter egg in Phase 1 or defer?
5. **Font licensing:** Confirm Playfair Display license for web use

---

## Content: Initial 23 Flavors Requirement

### Real Flavors (5)

| Name | Category | Year |
|------|----------|------|
| Dr Pepper Original | Classic | 1885 |
| Dr Pepper Cherry | Classic | 2009 |
| Dr Pepper Vanilla Float | Seasonal | 2014 |
| Dr Pepper Zero Sugar | Classic | 2021 |
| Dr Pepper Strawberries & Cream | Seasonal | 2023 |

### Fabricated Flavors (18) - Required Examples

| Name | Authenticity | Category |
|------|--------------|----------|
| Dr Pepper Midnight Fog | Urban Legend | Forbidden |
| Dr Pepper Quantum Reserve | Astral Projection | Experimental |
| Dr Pepper Chili Dog* | Rumored | Experimental |
| Dr Pepper Decaf+ | Rumored | Classic |
| (14 more to be created) | Various | Various |

*Note: Dr Pepper Chili Dog may actually exist as a promotional variant; treat as "mythic" regardless.

### Lore Writing Guidelines

**Tone:** Unreliable archivist, possibly unhinged historian

**Templates:**
- "First spotted at [impossible location] during [improbable event]..."
- "The Pepper Keepers deny its existence, which only confirms..."
- "Bootleg bottlers in [region] claimed to have reverse-engineered..."
- "Lost to dimensional drift after the [year] Great Carbonation Event..."

**Forbidden lore elements:**
- Nothing actually harmful or offensive
- No real trademark violations (don't disparage competitors)
- No references to real people without obvious parody

---

## Testing Requirements

### Unit Testing (Deferred)

For a static site of this scope, unit tests are optional but recommended for:
- `merger.ts` - Flavor combination logic
- `search.ts` - Filter matching logic

### Manual Testing Checklist

- [ ] All 23 flavors display correctly
- [ ] Search returns expected results
- [ ] Each filter type works independently
- [ ] Combined filters work correctly
- [ ] "Surprise Me" never returns undefined
- [ ] Pepperverse renders without errors
- [ ] All tooltips display on hover
- [ ] Merger generates coherent output
- [ ] Timeline scrolls smoothly
- [ ] Fake API buttons respond
- [ ] Mobile layout is usable
- [ ] Keyboard navigation works throughout

### Build Verification

```bash
# Validate JSON schema
pnpm validate-data

# Type check
pnpm tsc --noEmit

# Lint
pnpm lint

# Build
pnpm build

# Verify output
ls -la out/
```

---

## Appendix: Technical Decisions Log

| Decision | Options Considered | Choice | Rationale |
|----------|-------------------|--------|-----------|
| Framework | Astro, Eleventy, Next.js | Next.js | Required per PRD; familiar ecosystem |
| State management | Redux, Zustand, React state | React state + URL | Simple enough; no complex state |
| Animation library | CSS, GSAP, Framer Motion | Framer Motion | Required per PRD; declarative API |
| Image format | PNG, WebP, SVG | SVG preferred | Scalable, small file size, themeable |
| Data storage | JSON, YAML, MDX | JSON | Simple, native parsing |

---

*This document serves as the authoritative technical specification for the Dr Pepper Database implementation. All implementation decisions should reference this PRD.*
