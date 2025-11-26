# Dr Pepper Database (drpdb.com)

> A delightfully over-engineered database of every Dr Pepper flavor, real and imagined.

## Overview

The Dr Pepper Database is a lighthearted, static microsite that catalogs every flavor of Dr Pepper ever imagined—both real and completely fabricated. The product is intentionally simple, funny, and delightfully over-engineered for what is essentially a list of sodas.

**Key Philosophy**: Deliver the illusion of extreme scientific rigor for a topic that does not warrant it. Celebrate unnecessary taxonomy.

## Features

### Core Features

- **Flavor Database** (Home Page)
  - Browse 24+ Dr Pepper flavors (5 real, 19+ fabricated)
  - Search by flavor name, lore, or notes
  - Filter by authenticity level, category, rarity
  - "Surprise Me" random flavor selector
  - Responsive grid layout (1/2/3 columns)

- **Flavor Detail Pages**
  - Comprehensive flavor information
  - Lore from "The Pepper Keepers Archives"
  - Flavor notes and pairing suggestions
  - Rarity scoring system (1-10)
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
- pnpm 8+ (DO NOT use npm or yarn)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd htp-drpdb

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
  authenticity: AuthenticityLevel // Real, Rumored, Urban Legend, Astral Projection
  category: FlavorCategory        // Classic, Seasonal, Experimental, Forbidden
  rarityScore: RarityScore        // 1-10
  releaseYear: number | string    // Year or range like "1885-1887"
  flavorNotes: string[]           // Array of tasting notes
  pairsWellWith: string[]         // Food/drink pairings
  lore: string                    // Exactly one sentence
  imageUrl?: string               // Optional illustration path
  discontinued?: boolean          // For timeline display
  region?: string                 // For regional variants
  distribution?: string           // National, Regional, Test Market, Mythical
  caffeineContent?: string        // mg or humorous value
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

### Authenticity Badge Colors

- **Real**: Green (#4CAF50)
- **Rumored**: Amber (#FFA726)
- **Urban Legend**: Burgundy (#5C0F1F)
- **Astral Projection**: Purple gradient (#7B2CBF → #C77DFF)

## Content Guidelines

### Lore Writing

Each flavor must have exactly one lore sentence that:
- Reads as if discovered in an unreliable archive
- May reference: bootleg bottlers, lost fountain formulas, dimensional drift, "The Pepper Keepers"
- Uses a deadpan, scientific tone for absurd topics

**Example**:
> "Only available at diners that no longer exist, between 2:00 and 3:00 AM in time zones that have been discontinued."

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

1. Build the site:
   ```bash
   pnpm build
   ```

2. Deploy the `/out` directory to GitHub Pages:
   ```bash
   # Via GitHub Actions (recommended)
   # See .github/workflows/deploy.yml
   ```

3. Configure custom domain (optional):
   - Add CNAME file to /public

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
