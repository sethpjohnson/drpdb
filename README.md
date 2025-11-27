# Dr Pepper Database

> A delightfully over-engineered database of every Dr Pepper flavor thanks to AI. This project was a one-shot experiment to test a new AI toolchain. PRD was created with OpenAI, code was written with Claude Code and numerous custom agents. Since it originally started as a joke between friends, the first round of flavors were completely fabricated. ChatGPT was used to research the real flavors and add them to the database. Alos there is no database, just a JSON file with the flavors and a few images. 
> 
> This was admittedly a silly idea, but it turned into a fun afternoon project to test the current limits of what I can do with AI. 99% of what you see was written by the first prompt. The longest part of the project was finding all of the images to use for the flavors followed by some troubleshooting Github Pages. This part didn't use an agent, only the default Claude Code model but could be improved with better prompts or a custom agent in the future. 

## Overview

The Dr Pepper Database is a lighthearted, static microsite that catalogs 34 real Dr Pepper flavors with researched historical information. The product is intentionally simple, funny, and delightfully over-engineered for what is essentially a list of sodas.

**Key Philosophy**: Deliver the illusion of extreme scientific rigor for a topic that does not warrant it. Celebrate unnecessary taxonomy.

## Features

### Core Features

- **Flavor Database** (Home Page)
  - Browse 34 real Dr Pepper flavors with researched data
  - Search by flavor name, lore, or flavor notes
  - Filter by category (Classic, Seasonal, Experimental), status (Current, Discontinued)
  - Filter counts displayed next to each option
  - "Surprise Me" random flavor selector
  - Responsive grid layout (1/2/3 columns)

- **Flavor Detail Pages**
  - Comprehensive flavor information with product images
  - Historical lore with tongue-in-cheek commentary
  - Flavor notes and pairing suggestions
  - Rarity scoring system (1-10)
  - Sugar-free badge for diet/zero sugar variants
  - Distribution information (National, Regional, Test Market)
  - Caffeine content
  - Related flavors carousel
  - Navigation between flavors

### Special Features

- **Pepperverse Explorer** (`/pepperverse`)
  - Cosmological visualization of flavor relationships
  - SVG-based orbital mechanics
  - Classic flavors orbit "Master Pepper" star
  - Limited editions drift as comets
  - Discontinued flavors spiral into "The Vendor Promotion Cycle" black hole
  - Interactive hover tooltips

- **Flavor Timeline** (`/timeline`)
  - Chronological scrollable list from 1885 to 2047
  - Alternating left/right layout on desktop
  - Search and filter by era
  - Visual styling varies by historical period

- **Flavor Merger Tool** (`/merger`)
  - Combine two flavors into absurd new combinations
  - Algorithmic name generation
  - Nonsense descriptions and warnings
  - Share functionality

- **Theoretical Flavors Lab** (`/lab`)
  - Catalog of impossible flavors
  - Categories: Physics-Defying, Legally Questionable, Dimensionally Unstable
  - Community submission CTA

- **Fake API Documentation** (`/api-docs`)
  - Swagger-style documentation for nonexistent API
  - Humorous error responses
  - "Try It" buttons with canned responses
  - Rate limits: 0.5 requests per hour

## Tech Stack

- **Framework**: Next.js 15.5+ (Static Export)
- **Language**: TypeScript 5.9+
- **Styling**: Tailwind CSS 3.4+
- **Components**: Custom components (shadcn/ui-inspired)
- **Animations**: Framer Motion 11.11+
- **Package Manager**: pnpm (REQUIRED)
- **Deployment**: GitHub Pages (or any static host)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+ (DO NOT use npm or yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/sethpjohnson/drpdb.git
cd htp-drpprdb

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Open http://localhost:3000
```

### Build

```bash
# Build static site
pnpm build

# Output will be in /out directory
```

### Lint

```bash
# Run ESLint
pnpm lint
```

## Project Structure

```
htp-drpdb/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── layout.tsx              # Root layout with fonts
│   │   ├── page.tsx                # Home/Database page
│   │   ├── globals.css             # Global styles
│   │   ├── flavor/[id]/            # Dynamic flavor detail pages
│   │   ├── pepperverse/            # Pepperverse Explorer
│   │   ├── timeline/               # Timeline page
│   │   ├── merger/                 # Flavor Merger Tool
│   │   ├── lab/                    # Theoretical Flavors Lab
│   │   └── api-docs/               # Fake API Documentation
│   ├── components/                 # React components
│   │   ├── layout/                 # Header, Footer
│   │   └── flavor/                 # FlavorCard, badges, etc.
│   ├── data/
│   │   └── flavors.json            # 24+ flavor database
│   ├── lib/
│   │   └── flavors.ts              # Flavor utilities
│   └── types/
│       └── flavor.ts               # TypeScript interfaces
├── docs/                           # Project documentation
├── public/                         # Static assets
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies
```

## Data Structure

### Flavor Schema

```typescript
interface Flavor {
  id: string                      // kebab-case unique identifier
  name: string                    // Display name
  sugar_free: boolean             // Identifies diet/zero sugar variants
  category: FlavorCategory        // Classic, Seasonal, Experimental
  rarityScore: RarityScore        // 1-10
  releaseYear: number | string    // Year (accurate historical data)
  flavorNotes: string[]           // Array of tasting notes
  pairsWellWith: string[]         // Food/drink pairings
  lore: string                    // Exactly one sentence of factual (but witty) commentary
  imageUrl?: string               // Product image path
  discontinued?: boolean          // Current availability status
  region?: string                 // For regional variants
  distribution?: string           // National, Regional, Test Market
  caffeineContent?: string        // mg per 12oz
  pepperversePosition?: {         // For Pepperverse visualization
    x: number
    y: number
    type: 'planet' | 'comet' | 'astral' | 'black-hole'
  }
}
```

## Design System

### Color Palette

- **Primary**: Dr Pepper Burgundy (#722F37, #5C0F1F)
- **Secondary**: Cream (#FFFDD0), Off-white (#FAF9F6)
- **Accent**: Fizz (#E8D4B8)
- **Text**: Deep Brown (#2D1B1B)

### Typography

- **Display**: Playfair Display (serif, for headings)
- **Body**: Inter (sans-serif, for text)

### Badge Colors

- **Sugar Free**: Green (#4CAF50) - Identifies diet and zero sugar variants
- **Category**: Soft colors matching flavor type (Blue for Classic, Green for Seasonal, Purple for Experimental)

## Content Guidelines

### Lore Writing

Each flavor has exactly one lore sentence that:
- Presents accurate historical information with tongue-in-cheek commentary
- Maintains a deadpan, archival tone while being factually accurate
- Highlights interesting or quirky facts about the flavor's history

**Example**:
> "Flagship flavor created in Waco, Texas in 1885, predating Coca-Cola by one year and refusing to be called a cola ever since."

## Performance

- **Page Load**: < 300ms on 3G
- **Database Size**: < 2MB total
- **Build Output**: ~150KB per page
- **Static Generation**: All pages pre-rendered at build time

## Accessibility

- WCAG 2.1 AA compliant
- High contrast (4.5:1 minimum)
- Full keyboard navigation
- Screen reader support with ARIA labels
- Respects prefers-reduced-motion
- Alt text on all images

## Deployment

### GitHub Pages

The site is deployed automatically via GitHub Actions to https://sethpjohnson.github.io/drpdb/

**Important Configuration**:
- `next.config.ts` includes `basePath: '/drpdb'` for subdirectory deployment
- Image components prepend basePath to all image URLs
- GitHub Actions uses pnpm v10 and latest artifact upload actions

**Workflow**:
1. Push to main branch triggers deployment
2. GitHub Actions runs lint and build
3. Uploads `/out` directory as artifact
4. Deploys to GitHub Pages

### Other Static Hosts

The `/out` directory can be deployed to:
- Netlify
- Vercel (with static export)
- Cloudflare Pages
- AWS S3
- Any static file host

## Contributing

This is a fun personal project. Contributions welcome for:
- Additional flavor lore
- Theoretical flavor proposals
- Bug fixes
- UI improvements

Please maintain the deadpan, over-engineered tone.

## License

This is a fan project and is not affiliated with Dr Pepper. All Dr Pepper trademarks belong to their respective owners.

## Acknowledgments

- The Pepper Keepers (allegedly)
- The Department of Carbonated Beverages
- Anyone who has ever wondered "but why?"

---

Built with delightful over-engineering.

**Status**: Theoretically Available | **Version**: π.0 (Irrational)
