# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dr Pepper Database (drpprdb.com) is a lighthearted, static microsite that catalogs every flavor of Dr Pepper ever imagined—both real and completely fabricated. The product is intentionally simple, funny, and delightfully over-engineered for what is essentially a list of sodas.

**Key Philosophy**: Deliver the illusion of extreme scientific rigor for a topic that does not warrant it. Celebrate unnecessary taxonomy. The entire site runs with no backend, no login, and no tracking (aside from maybe a polite "sips remaining" counter that resets on refresh).

## Tech Stack Requirements

**MUST USE** (per PRD):
- **pnpm** for package management (NOT npm or yarn)
- **Next.js** for the framework (static export mode)
- **React** with **TypeScript**
- **Tailwind CSS** for styling
- **shadcn/ui** for components
- **Framer Motion** for animations
- **ESLint** for linting

## Project Commands

### Setup
```bash
pnpm install
```

### Development
```bash
pnpm dev
```

### Build
```bash
pnpm build
```

### Linting
```bash
pnpm lint
```

### Testing
```bash
pnpm test
```

## Architecture

### Static Site Structure
- Deploys to GitHub Pages or equivalent static host
- No backend services, no API, no database engine
- All data stored as JSON files (primarily `flavors.json`)
- Next.js configured for static export (`output: 'export'`)

### Data Structure

**Flavor Database** (`flavors.json`):
Each flavor entry includes:
- Flavor Name
- Authenticity Level (Real, Rumored, Urban Legend, Astral Projection)
- Flavor Notes
- Release Year (real or fabricated)
- Rarity Score
- "Pairs Well With" field
- One-sentence lore description (written as if discovered in an unreliable archive)
- Optional image or illustration

**Initial Content Requirements**:
- At least 23 flavors minimum (tribute to the 23 ingredients)
- 5 real flavors, 18 fabricated ones
- Required fabricated examples: Dr Pepper Midnight Fog, Dr Pepper Quantum Reserve, Dr Pepper Chili Dog (real but treated as mythic), Dr Pepper Decaf+

### Key Features

1. **Flavor Database**: Browsable catalog with search and filters
   - Keyword search across flavor names
   - Filters: Authenticity Level, Rarity Score, Flavor Category (Classic, Seasonal, Experimental, Forbidden), Release Year
   - "Surprise Me" button for random entry

2. **Pepperverse Explorer**: Interactive cosmological flavor map
   - Classic flavors orbit the "Master Pepper" star
   - Limited editions drift as comets
   - Discontinued experiments fall into "The Vendor Promotion Cycle" black hole
   - Implementation: SVG with hover tooltips (not actual simulation)

3. **Fun Extras**:
   - Flavor Timeline: Scrollable list by year
   - Flavor Merger Tool: Playful generator mashing two flavors
   - Theoretical Flavors Lab: Static page of impossible flavors
   - API Docs for a Nonexistent API: Comedic fake endpoints (e.g., `/v1/flavors/immortal` returns `404: Flavor Cannot Be Contained`)

### Branding and Aesthetic
- Slightly vintage soda-fountain theme
- Typography reminiscent of old medicine labels
- Whimsical illustrations
- Color palette: burgundy, cream, off-white, and soda fizz dots

### Lore Writing Guidelines
Each flavor must have exactly one lore sentence that:
- Reads as if discovered in an unreliable archive
- May reference: bootleg bottlers, lost fountain formulas, dimensional drift, "The Pepper Keepers"

## Performance Requirements
- Page loads under 300ms for most pages
- Database less than 2MB
- Minimal CSS
- No heavy frameworks unless used ironically

## Deployment
- GitHub Actions validates JSON structure
- Build and push to gh-pages on merge
- No external dependencies

## Non-Goals
- Real-time data
- User uploads
- User accounts or profiles
- Practical usefulness
- Accuracy
- Seriousness
