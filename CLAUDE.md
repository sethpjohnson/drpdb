# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dr Pepper Database is a lighthearted, static microsite that catalogs 34 real Dr Pepper flavors with researched historical information. The product is intentionally simple, funny, and delightfully over-engineered for what is essentially a list of sodas.

**Key Philosophy**: Deliver the illusion of extreme scientific rigor for a topic that does not warrant it. Celebrate unnecessary taxonomy. The entire site runs with no backend, no login, and no tracking. All data is stored in a single JSON file with accompanying product images.

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
- Deploys to GitHub Pages at https://sethpjohnson.github.io/drpdb/
- No backend services, no API, no database engine
- All data stored as JSON files (primarily `flavors.json`)
- Next.js configured for static export (`output: 'export'`)
- **Important**: Uses `basePath: '/drpdb'` in next.config.ts for GitHub Pages subdirectory deployment
- Images must be prefixed with basePath in components for proper loading on GitHub Pages

### Data Structure

**Flavor Database** (`flavors.json`):
Each flavor entry includes:
- Flavor Name
- Sugar Free (boolean - identifies diet/zero sugar variants)
- Category (Classic, Seasonal, Experimental)
- Flavor Notes
- Release Year (accurate historical data)
- Rarity Score
- "Pairs Well With" field
- One-sentence lore description (factual but written with tongue-in-cheek commentary)
- Distribution (National, Regional, Test Market)
- Caffeine Content
- Image URL (path to product image)
- Pepperverse Position (coordinates for cosmological visualization)

**Content**:
- 34 real Dr Pepper flavors with accurate historical information
- All flavors are real products with researched data and factual (but witty) lore
- 14 flavors marked as sugar_free (Diet Dr Pepper, Zero Sugar variants, etc.)
- Maintains the tongue-in-cheek, archival commentary tone while being factually accurate

### Key Features

1. **Flavor Database**: Browsable catalog with search and filters
   - Keyword search across flavor names, lore, and flavor notes
   - Filters: Category (Classic, Seasonal, Experimental), Status (Currently Available, Discontinued)
   - Filter counts displayed next to each option
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
- GitHub Actions workflow in `.github/workflows/deploy.yml`
- Uses pnpm v10 (lockfileVersion 9.0)
- Uses `actions/upload-pages-artifact@v4` and `actions/deploy-pages@v4`
- Builds static site and deploys to GitHub Pages
- **Critical**: basePath configuration required for subdirectory deployment
- No external dependencies or backend services

## Non-Goals
- Real-time data
- User uploads
- User accounts or profiles
- Backend services or databases
- Practical usefulness beyond entertainment
- Taking itself seriously
