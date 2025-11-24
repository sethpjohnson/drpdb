# Dr Pepper Database - UX Specification

## 1. Overview

The Dr Pepper Database (drpprdb.com) is a delightfully over-engineered fan page that catalogues every real, rumored, and completely fabricated Dr Pepper flavor with deadpan seriousness. The UX embraces the tongue-in-cheek nature of the project while maintaining high usability standards and a vintage soda-fountain aesthetic.

### 1.1 Design Principles

- **Obsessive Detail, Casual Tone**: Treat absurd content with scientific rigor
- **Delight Over Efficiency**: Favor whimsy while respecting user time
- **Progressive Revelation**: Start simple, reward exploration
- **Accessibility First**: High contrast, keyboard navigation, no autoplaying content
- **Mobile-First Responsive**: Perfect on phone, delightful on desktop

### 1.2 Aesthetic Foundation

**Visual Identity**: Vintage soda fountain meets archival documentation

**Color Palette**:
- Primary: Dr Pepper Burgundy (#5C0F1F)
- Secondary: Cream (#F5EBE0)
- Background: Off-White (#FAF7F2)
- Accent: Fizz Amber (#D4A574)
- Text: Deep Brown (#2D1B1B)
- Error: Cherry Red (#C41E3A)
- Success: Mint Green (#A8D5BA)

**Typography**:
- Headings: Typeface with vintage medicine label aesthetic (consider Playfair Display, Crimson Text, or similar serif)
- Body: Highly readable sans-serif (Inter, Source Sans Pro)
- Monospace: For "data" fields and API docs (JetBrains Mono, Fira Code)

**Visual Style**:
- Subtle paper texture on backgrounds
- Hand-drawn style illustrations for flavors
- Dotted borders reminiscent of vintage coupons
- Fizz bubble decorative elements
- Aging/weathering effects on older flavor entries

---

## 2. Information Architecture

### 2.1 Site Map

```
drpprdb.com/
├── Home (Flavor Database)
├── Flavor Detail Pages (/flavor/[slug])
├── Pepperverse Explorer (/pepperverse)
├── Timeline (/timeline)
├── Flavor Merger Tool (/merger)
├── Theoretical Flavors Lab (/theoretical)
├── Fake API Docs (/api-docs)
└── About (/about) [optional easter egg]
```

### 2.2 Navigation Structure

**Primary Navigation** (persistent header):
- Logo/Home
- Database (current page indicator)
- Pepperverse
- Timeline
- More (dropdown for Merger, Lab, API Docs)

**Mobile Navigation**:
- Hamburger menu revealing full navigation
- Logo always visible
- Search icon in header (opens search overlay on mobile)

---

## 3. Page Specifications

## 3.1 Home / Flavor Database Page

### Purpose
Primary entry point. Browse, search, and filter all Dr Pepper flavors with scientific absurdity.

### Layout Structure

#### Desktop (1024px+)
```
┌─────────────────────────────────────────────────┐
│ Header: Logo | Database | Pepperverse | More   │
├─────────────────────────────────────────────────┤
│ Hero Section (if first visit)                   │
│ "The Comprehensive Dr Pepper Flavor Archive"    │
│ Subtitle with sips counter                      │
├─────────────────────────────────────────────────┤
│ ┌─────────────────┐  ┌────────────────────────┐│
│ │  Filters Panel  │  │  Search & Sort Bar     ││
│ │  (sticky)       │  │                         ││
│ │                 │  ├────────────────────────┤│
│ │  Authenticity   │  │  Flavor Grid/List      ││
│ │  ☐ Real         │  │  ┌───┐ ┌───┐ ┌───┐    ││
│ │  ☐ Rumored      │  │  │ 1 │ │ 2 │ │ 3 │    ││
│ │  ☐ Legend       │  │  └───┘ └───┘ └───┘    ││
│ │  ☐ Astral       │  │  ┌───┐ ┌───┐ ┌───┐    ││
│ │                 │  │  │ 4 │ │ 5 │ │ 6 │    ││
│ │  Rarity         │  │  └───┘ └───┘ └───┘    ││
│ │  [slider]       │  │                         ││
│ │                 │  │  [Load More / Lazy]    ││
│ │  Category       │  └────────────────────────┘│
│ │  ☐ Classic      │                            │
│ │  ☐ Seasonal     │                            │
│ │  ☐ Experimental │                            │
│ │  ☐ Forbidden    │                            │
│ │                 │                            │
│ │  Year Range     │                            │
│ │  [1879 - 2025]  │                            │
│ │                 │                            │
│ │  [Clear All]    │                            │
│ └─────────────────┘                            │
└─────────────────────────────────────────────────┘
```

#### Tablet (768px - 1023px)
- Filters collapse to drawer (filter icon button)
- Grid reduces to 2 columns
- Search bar becomes more prominent

#### Mobile (< 768px)
- Single column layout
- Filters in bottom sheet or slide-in drawer
- Search in sticky header with icon
- Cards stack vertically

### Hero Section (First Visit Only)

Displayed on initial page load, dismissible, uses localStorage to remember.

```
┌────────────────────────────────────────────────────┐
│                                                    │
│     THE COMPREHENSIVE DR PEPPER FLAVOR ARCHIVE     │
│                                                    │
│   Cataloguing 23+ dimensions of carbonated joy    │
│        since an arbitrarily chosen date            │
│                                                    │
│              Sips Remaining: ∞ - 1                 │
│                                                    │
│         [Begin Exploration] [Surprise Me]          │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Animation**: Gentle fade-in with slight scale-up. Fizz bubbles float up background.

**Accessibility**: Marked as `role="region"` with `aria-label="Welcome message"`. Dismissible with keyboard.

### Search & Sort Bar

**Components**:
- Search input (left): "Search the Pepperverse..."
- View toggle (center-right): Grid/List icons
- Sort dropdown (right): "Rarity ↓", "Name A-Z", "Year ↓", "Random"
- Surprise Me button (far right): Dice icon

**Search Behavior**:
- Real-time filtering (debounced 300ms)
- Searches: name, flavor notes, lore description
- Shows result count: "42 flavors found"
- Clear button (X) appears when text entered

**States**:
- Default
- Active (user typing)
- Results found (count displayed)
- No results (shows "0 flavors found" + suggestion to clear filters)

### Filters Panel

**Sticky positioning**: Follows scroll until reaching footer.

**Filter Groups**:

1. **Authenticity Level** (checkboxes)
   - Real (with count badge)
   - Rumored (with count)
   - Urban Legend (with count)
   - Astral Projection (with count)

2. **Rarity Score** (range slider)
   - Visual: 1-10 scale
   - Shows current range: "3 - 8"
   - Marks for common (1-3), rare (4-7), mythic (8-10)

3. **Category** (checkboxes)
   - Classic
   - Seasonal
   - Experimental
   - Forbidden

4. **Year Range** (dual-handle slider)
   - Range: 1879 - 2025
   - Shows selected range
   - Historical years use sepia visual cue

**Filter Actions**:
- "Clear All" button at bottom
- Active filter count badge in mobile filter button
- Each active filter shows as removable chip above results

**Animation**: Smooth height transitions when expanding/collapsing groups (Framer Motion).

### Flavor Cards (Grid View)

**Card Structure**:
```
┌─────────────────────────┐
│     [Illustration]      │
│                         │
├─────────────────────────┤
│ Flavor Name             │
│ Authenticity Badge      │
│                         │
│ "Lore snippet..."       │
│                         │
│ ★★★☆☆ Rarity: 6/10     │
│ Released: 1998          │
│                         │
│ [View Details →]        │
└─────────────────────────┘
```

**Visual Details**:
- Border: Dotted vintage style
- Shadow: Subtle drop shadow on hover
- Badge: Colored pill for authenticity (Real=green, Rumored=amber, Legend=burgundy, Astral=purple gradient)
- Aspect ratio: 3:4 for illustration area
- Background: Cream with subtle paper texture

**Interaction States**:
- **Default**: Slight border, no shadow
- **Hover**: Lifts with shadow, border thickens, subtle scale (1.02)
- **Focus**: High contrast outline for keyboard navigation
- **Active/Clicked**: Brief press animation (scale 0.98)

**Animation**: Staggered fade-in using Framer Motion when page loads or filters change.

**Accessibility**:
- Each card is `<article>` with proper heading hierarchy
- "View Details" button has aria-label with flavor name
- Rarity shown as aria-label "Rarity: 6 out of 10 stars"

### Flavor Cards (List View)

**Card Structure** (horizontal layout):
```
┌──────────┬────────────────────────────────────────────┐
│   [Img]  │ Flavor Name            [Authenticity Badge]│
│   100px  │ Released: 1998 | Category: Experimental    │
│   sq.    │                                            │
│          │ "Lore description appears here..."         │
│          │                                            │
│          │ ★★★☆☆ 6/10 | Pairs with: Ancient grains  │
│          │                         [View Details →]   │
└──────────┴────────────────────────────────────────────┘
```

**Benefits**: More info at a glance, better for scanning.

### Empty States

**No Results from Search/Filters**:
```
┌────────────────────────────────────┐
│            🥤                      │
│                                    │
│   No Flavors Found in Database    │
│                                    │
│   Try adjusting your filters or   │
│   broadening your search terms.   │
│                                    │
│   [Clear All Filters]              │
│   [Surprise Me Instead]            │
└────────────────────────────────────┘
```

**Loading State**:
- Skeleton cards with pulsing animation
- Matches grid/list layout
- Shows 6-9 skeleton cards

**Error State**:
```
┌────────────────────────────────────┐
│            ⚠️                      │
│                                    │
│   Unable to Load Flavor Database  │
│                                    │
│   The Pepperverse is temporarily  │
│   experiencing dimensional drift. │
│                                    │
│   [Retry]                          │
└────────────────────────────────────┘
```

### "Surprise Me" Flow

**Trigger**: Click "Surprise Me" button

**Animation Sequence**:
1. Page content fades slightly (opacity 0.3)
2. Center overlay appears with spinning Dr Pepper bottle
3. "Consulting the Pepper Archives..." text
4. 1.5 second animation
5. Navigate to random flavor detail page with slide transition

**Accessibility**: Focus trap in modal, ESC to cancel, screen reader announces "Selecting random flavor".

---

## 3.2 Flavor Detail Page

### Purpose
Deep dive into a single flavor with all metadata, lore, and related flavors.

### URL Structure
`/flavor/[slug]` (e.g., `/flavor/quantum-reserve`)

### Layout Structure

#### Desktop Layout
```
┌─────────────────────────────────────────────────┐
│ Header: [Back to Database] Logo | Navigation    │
├─────────────────────────────────────────────────┤
│ ┌───────────────────┐  ┌──────────────────────┐│
│ │                   │  │  Flavor Name         ││
│ │   Featured Image  │  │  Authenticity Badge  ││
│ │   (large)         │  │                      ││
│ │   400x500px       │  │  Released: [Year]    ││
│ │                   │  │  Rarity: ★★★☆☆ 6/10  ││
│ │                   │  │  Category: Seasonal  ││
│ └───────────────────┘  │                      ││
│                        │  Flavor Notes:        ││
│ [Prev] [Random] [Next] │  Cherry, vanilla...  ││
│                        │                      ││
│                        │  Pairs Well With:    ││
│                        │  Pizza, regret       ││
│                        │                      ││
│                        │  [Try Flavor Merger] ││
│                        └──────────────────────┘│
├─────────────────────────────────────────────────┤
│ LORE SECTION                                    │
│ ┌─────────────────────────────────────────────┐│
│ │ "Allegedly discovered in a bootleg bottler's││
│ │  basement in Waco, this flavor was said to  ││
│ │  contain 24 ingredients, making it one      ││
│ │  ingredient too powerful for mortals."      ││
│ └─────────────────────────────────────────────┘│
├─────────────────────────────────────────────────┤
│ METADATA TABLE                                  │
│ ┌──────────────┬──────────────────────────────┐│
│ │ Field        │ Value                        ││
│ ├──────────────┼──────────────────────────────┤│
│ │ Authenticity │ Urban Legend                 ││
│ │ First Sighted│ 1998                         ││
│ │ Last Seen    │ 2003                         ││
│ │ Distribution │ Regional (Southwest US)      ││
│ │ ABV          │ 0% (probably)                ││
│ │ Caffeine     │ Classified                   ││
│ └──────────────┴──────────────────────────────┘│
├─────────────────────────────────────────────────┤
│ RELATED FLAVORS                                 │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐                   │
│ │ 1  │ │ 2  │ │ 3  │ │ 4  │ (carousel)        │
│ └────┘ └────┘ └────┘ └────┘                   │
│ "Flavors from the same dimensional branch"     │
└─────────────────────────────────────────────────┘
```

#### Mobile Layout
- Single column
- Image full-width at top
- All metadata sections stack
- Prev/Random/Next buttons become bottom fixed bar

### Image Display

**Treatment**:
- Paper texture border
- Slight rotation (1-2 degrees) for whimsy
- Shadow suggesting physical photo
- Zoom on click (lightbox overlay)

**Fallback**: Generic Dr Pepper bottle silhouette if no image.

### Lore Section

**Visual Treatment**:
- Displayed in aged paper box
- Serif typeface
- Slightly off-black text (#3A2828)
- Optional: Vintage paper clip icon in corner
- Background: Subtle yellowed paper texture

**Animation**: Fade in with slight upward motion when scrolling into view.

### Metadata Table

**Style**: Bordered table with alternating row colors (cream/off-white).

**Fields** (all optional, shows "Unknown" or "Classified" if missing):
- Authenticity Level
- First Sighted (year)
- Last Seen (year or "Still Available")
- Distribution (National, Regional, Test Market, Mythical)
- ABV (always 0% or humorous value)
- Caffeine Content (mg or "Classified")
- Original Bottle Design (description)
- Known Variants (list)

**Accessibility**: Table has proper `<th>` headers with scope attribute.

### Navigation Controls

**Previous / Random / Next**:
- Three buttons in horizontal row
- Previous: "← Dr Pepper [Name]"
- Random: "🎲 Random Flavor"
- Next: "Dr Pepper [Name] →"

**Desktop**: Below image
**Mobile**: Fixed bottom bar (sticky)

**Animation**: Slide transitions between flavor pages.

### Related Flavors Carousel

**Logic**: Shows 4-6 flavors from same:
- Category (priority)
- Time period (within 5 years)
- Authenticity level
- Or random if no matches

**Interaction**:
- Horizontal scroll on mobile
- Arrow navigation on desktop
- Keyboard arrow key support
- Snap scrolling

---

## 3.3 Pepperverse Explorer

### Purpose
Cosmological map visualizing flavor relationships as celestial bodies. Pure visual whimsy with hover interactions.

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│ Header: Navigation                              │
├─────────────────────────────────────────────────┤
│ Title: THE PEPPERVERSE                          │
│ Subtitle: "A Cosmological Taxonomy"             │
├─────────────────────────────────────────────────┤
│ Legend:                                         │
│ ● Classic  ☄ Limited  ⚫ Discontinued  ✦ Astral│
├─────────────────────────────────────────────────┤
│                                                 │
│              ┌──────────────┐                   │
│              │  Master      │                   │
│    ☄     ●   │  Pepper      │  ●               │
│              │  (star)      │       ●          │
│    ●         └──────────────┘                   │
│                    ●                            │
│                              ●   ☄             │
│   ✦                    ●                       │
│            ●                      ●            │
│                   ⚫ The Vendor                 │
│     ●           Promotion Cycle                │
│                   (black hole)                  │
│                                                 │
└─────────────────────────────────────────────────┘
│ [Toggle Labels] [Zoom In] [Zoom Out] [Reset]   │
└─────────────────────────────────────────────────┘
```

### SVG Map Structure

**Coordinate System**: 1200x800 viewBox, responsive scaling.

**Elements**:

1. **Master Pepper Star** (center)
   - Burgundy gradient circle
   - Pulsing glow animation
   - Label: "Master Pepper"
   - Size: 80px diameter

2. **Classic Flavors** (orbiting planets)
   - Circular orbit paths (dotted lines, subtle)
   - 5-8 flavors as circles (30px diameter)
   - Each has unique color based on flavor profile
   - Slow CSS rotation animation (30-60s per orbit)

3. **Limited Edition Comets**
   - Elliptical paths
   - Comet tail effect (SVG gradient)
   - Faster animation (15-30s)
   - 3-5 flavors

4. **Discontinued Experiments Black Hole**
   - Dark gradient circle (bottom right quadrant)
   - Swirling animation
   - Flavors spiraling in (animated path)
   - 4-6 discontinued flavors

5. **Astral Projections**
   - Floating freely (no orbit)
   - Twinkling opacity animation
   - Connection lines to nearest flavors (dim dotted)
   - 2-3 mythical flavors

### Interaction States

**Default**:
- Labels hidden (toggle to show)
- Gentle ambient animations
- Orbit paths visible on hover

**Hover (Desktop)**:
- Flavor circle scales up (1.3x)
- Tooltip appears with:
  - Flavor name
  - Category
  - Year
  - "Click to view details"
- Connected orbit path highlights
- Cursor becomes pointer

**Click**:
- Navigate to flavor detail page
- Exit animation (flavor "zooms" toward viewer)

**Touch (Mobile)**:
- Tap to show tooltip
- Tap again to navigate
- Pinch to zoom (optional enhancement)

### Controls

**Bottom Control Bar**:
- Toggle Labels: Show/hide all flavor names
- Zoom In/Out: SVG viewBox manipulation
- Reset: Return to default view
- (Optional) Animate: Play/pause all animations

### Accessibility

**Critical Considerations**:
- Map is `role="img"` with detailed aria-label
- Hidden text list of all flavors below map
- Each flavor has accessible name
- Keyboard navigation: Tab through flavors
- Focus states with high contrast rings
- Option to disable animations (respects prefers-reduced-motion)

**Alternative View**: Link to "List all flavors by category" (links to database with category filter).

### Empty/Loading States

**Loading**:
- Skeleton SVG with pulsing circles
- "Calculating orbital mechanics..."

**Error**:
- Static fallback SVG
- Message: "The Pepperverse is currently unavailable"

---

## 3.4 Timeline Page

### Purpose
Chronological scrollable list of flavor releases (real and fabricated) from 1879 to present.

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│ Header: Navigation                              │
├─────────────────────────────────────────────────┤
│ THE FLAVOR TIMELINE                             │
│ A Chronological Archive of Carbonated Discovery│
├─────────────────────────────────────────────────┤
│ [Filter by Era: All ▼] [Search...]             │
├─────────────────────────────────────────────────┤
│                                                 │
│ 2024                                           │
│ ├─── Dr Pepper Creamy Coconut                  │
│ │    Limited Edition, Seasonal                 │
│ │    [View Details]                            │
│ │                                               │
│ ├─── Dr Pepper Strawberries & Cream            │
│ │    Limited Edition, Seasonal                 │
│ │    [View Details]                            │
│ │                                               │
│ 2023                                           │
│ ├─── Dr Pepper Quantum Reserve                 │
│ │    ⚠ Astral Projection, Experimental         │
│ │    [View Details]                            │
│ │                                               │
│ 1998                                           │
│ ├─── Dr Pepper Red Fusion                      │
│ │    Discontinued, Experimental                │
│ │    [View Details]                            │
│ │                                               │
│ ...                                             │
│                                                 │
│ 1885                                           │
│ ├─── Dr Pepper Original Formula                │
│ │    🏛 Historical, Classic                     │
│ │    "The genesis. Possibly 23 ingredients.    │
│ │     Probably fewer. Who can say?"            │
│ │    [View Details]                            │
│ │                                               │
│ 1879                                           │
│ ├─── Dr Pepper Prototype #7                    │
│      ⚠ Urban Legend, Lost Formula              │
│      "Allegedly predates official invention.   │
│       Records found in water-damaged ledger."  │
│      [View Details]                            │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Visual Design

**Timeline Spine**:
- Vertical line down left side (desktop) or center (mobile)
- Burgundy color, 3px width
- Dots at each year marker

**Year Headers**:
- Large, bold serif font
- Sticky on scroll (current year stays at top)
- Burgundy color
- Background: off-white with paper texture

**Entry Cards**:
- Connected to spine with horizontal line
- Alternating left/right on desktop
- All left-aligned on mobile
- Cream background, dotted border
- Authenticity badge in corner

**Historical Era Visual Cues**:
- Pre-1900: Sepia tint
- 1900-1950: Slight warm tone
- 1950-2000: Full color but desaturated
- 2000+: Full vibrant color
- Future dates (if any): Slight blue/purple tint

### Filtering & Search

**Era Filter Dropdown**:
- All Years
- Pre-1900 (The Genesis)
- 1900-1950 (The Golden Age)
- 1950-2000 (The Expansion)
- 2000-Present (The Modern Era)
- Future/Speculative

**Search**:
- Filters timeline entries in real-time
- Highlights matching text
- Shows year headers even if empty (with "No flavors released this year")

### Interaction States

**Default**: Scroll smoothly through timeline

**Hover**: Entry card lifts, shows full lore text if truncated

**Click**: Navigate to flavor detail page

**Animation**:
- Entries fade in with stagger as scrolling
- Use Intersection Observer for performance
- Slide in from left/right based on alternating pattern

### Mobile Adaptations

- Single column, all entries left-aligned
- Timeline spine in center or left edge
- Year headers more compact
- Swipe gestures for faster scrubbing (optional)

### Accessibility

- Semantic HTML: `<article>` for entries, `<time>` for dates
- Keyboard navigation: Tab through entries
- Screen readers: Chronological list makes sense linearly
- Skip to year: Quick jump links in sidebar (desktop) or dropdown (mobile)

---

## 3.5 Flavor Merger Tool

### Purpose
Playful generator that combines two flavors and outputs a nonsense description. No actual AI, just templated randomness.

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│ Header: Navigation                              │
├─────────────────────────────────────────────────┤
│ THE FLAVOR MERGER LABORATORY                    │
│ "Combining the uncombineable since now"         │
├─────────────────────────────────────────────────┤
│                                                 │
│ Select two flavors to merge:                   │
│                                                 │
│ ┌─────────────────────┐   ┌─────────────────┐ │
│ │ Flavor A:           │   │ Flavor B:       │ │
│ │ [Dropdown Select]   │ + │ [Dropdown]      │ │
│ │ or                  │   │ or              │ │
│ │ [🎲 Random]         │   │ [🎲 Random]     │ │
│ └─────────────────────┘   └─────────────────┘ │
│                                                 │
│            [🧪 MERGE FLAVORS]                   │
│                                                 │
├─────────────────────────────────────────────────┤
│ MERGER RESULT (appears after merge)             │
│ ┌─────────────────────────────────────────────┐│
│ │                                             ││
│ │  Dr Pepper Midnight Coconut Fusion          ││
│ │                                             ││
│ │  "This unholy union combines the temporal   ││
│ │   distortion properties of Midnight Fog     ││
│ │   with the tropical instability of Creamy   ││
│ │   Coconut. Flavor profile: Confused.        ││
│ │   Recommended serving: Never."              ││
│ │                                             ││
│ │  Rarity: 11/10 (Illegal in 3 Dimensions)    ││
│ │  Pairs With: Existential dread              ││
│ │                                             ││
│ │  [Merge Different Flavors] [Share]          ││
│ └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
```

### Interaction Flow

1. **Initial State**:
   - Two empty dropdown selects
   - Merge button disabled (grey)
   - Placeholder text: "Select or randomize"

2. **Selection State**:
   - User picks from dropdown (all flavors listed)
   - Or clicks "Random" button to auto-fill
   - Merge button enables when both selected

3. **Merging Animation**:
   - Click "Merge Flavors" button
   - Brief animation: Two flavor names slide together
   - "Calculating quantum flavor matrix..." text
   - 1-2 second delay for drama

4. **Result State**:
   - Result card slides up from bottom
   - Merged name displayed prominently
   - Generated description (templated)
   - Nonsense metadata
   - Options to merge again or share

### Name Generation Logic

**Template**:
`Dr Pepper [Adjective A] [Noun B] [Suffix]`

**Examples**:
- "Midnight" + "Coconut" = "Midnight Coconut Fusion"
- "Quantum" + "Strawberry" = "Quantum Strawberry Reserve"
- "Dark" + "Cherry" = "Dark Cherry Convergence"

**Suffixes** (random):
- Fusion, Reserve, Convergence, Anomaly, Paradox, Synthesis, Continuum

### Description Generation

**Template Structure**:
```
"This [adjective] union combines the [property A] of [Flavor A]
with the [property B] of [Flavor B].

Flavor profile: [random descriptor].

Recommended serving: [absurd suggestion]."
```

**Properties Pool**:
- temporal distortion properties
- quantum entanglement
- aromatic complexity
- dimensional instability
- thermodynamic improbability

**Descriptors Pool**:
- Confused, Paradoxical, Unstable, Transcendent, Concerning, Illegal

**Serving Suggestions**:
- Never, With extreme caution, Under laboratory conditions, Only on Tuesdays, In a parallel universe

### Metadata Generation

**Rarity**: Always above 10 (impossible values)
- "11/10 (Illegal in 3 Dimensions)"
- "15/10 (Violates Flavor Convention)"

**Pairs With**:
- Existential dread, Regret, Time travel, Dimensional rifts, Your last mistake

### Visual Design

**Merger Animation**:
- Two circles (representing flavors) slide toward each other
- Merge with particle effect
- New circle with merged color emerges
- Framer Motion physics-based spring animation

**Result Card**:
- Prominent border (double-line, vintage style)
- Warning stripes in corner (humorous)
- Parchment background texture

### Share Functionality

**Share Button**: Copies shareable text to clipboard

**Share Text Template**:
```
I merged [Flavor A] and [Flavor B] in the Dr Pepper Flavor Merger!

Result: Dr Pepper [Merged Name]

"[Description]"

Try it yourself: drpprdb.com/merger
```

**Feedback**: Toast notification "Merged flavor copied to clipboard!"

### Mobile Adaptations

- Stack flavor selects vertically
- Larger touch targets for buttons
- Result card full width

### Accessibility

- All dropdowns properly labeled
- Merge button has aria-live region announcing result
- Keyboard navigable
- Focus management when result appears

---

## 3.6 Theoretical Flavors Lab

### Purpose
Showcase community-proposed impossible flavors. Static page, manually curated, celebrating absurdist creativity.

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│ Header: Navigation                              │
├─────────────────────────────────────────────────┤
│ THE THEORETICAL FLAVORS LABORATORY              │
│ "Flavors that should not be, cannot be,         │
│  yet somehow still aren't"                      │
├─────────────────────────────────────────────────┤
│ An archive of flavors proposed by the community │
│ but deemed too powerful, impossible, or legally │
│ questionable to exist in our dimension.         │
├─────────────────────────────────────────────────┤
│                                                 │
│ [Filter: All | Physics-Defying | Forbidden |   │
│          Dimensionally Unstable | Just Bad]     │
│                                                 │
│ ┌─────────────────────────────────────────────┐│
│ │ Dr Pepper Quantum Foam                      ││
│ │ Status: Theoretically Impossible            ││
│ │                                             ││
│ │ "A flavor that exists in superposition until││
│ │  observed. Schrödinger refused to comment." ││
│ │                                             ││
│ │ Why It Can't Exist: Violates Heisenberg's   ││
│ │ Flavor Uncertainty Principle                ││
│ │                                             ││
│ │ Proposed By: Dr. Fizz, 2019                 ││
│ └─────────────────────────────────────────────┘│
│                                                 │
│ ┌─────────────────────────────────────────────┐│
│ │ Dr Pepper Reverse Osmosis                   ││
│ │ Status: Legally Questionable                ││
│ │                                             ││
│ │ "Removes flavor while adding carbonation.   ││
│ │  Banned in 47 states, encouraged in 3."     ││
│ │                                             ││
│ │ Why It Can't Exist: FDA said no             ││
│ │                                             ││
│ │ Proposed By: Anonymous, 2021                ││
│ └─────────────────────────────────────────────┘│
│                                                 │
│ [More theoretical flavors...]                  │
│                                                 │
└─────────────────────────────────────────────────┘
│ [Submit Your Theoretical Flavor]                │
│ (Links to contact/GitHub)                       │
└─────────────────────────────────────────────────┘
```

### Card Structure (Individual Theoretical Flavor)

**Components**:
- Flavor Name (large, bold)
- Status Badge (color-coded)
- Description (2-3 sentences of absurdist humor)
- "Why It Can't Exist" (scientific-sounding nonsense)
- Proposed By (name/handle + year)
- Optional: Theoretical illustration (abstract art)

**Status Types & Colors**:
- Theoretically Impossible (purple)
- Legally Questionable (amber warning)
- Dimensionally Unstable (gradient shimmer)
- Just Bad Ideas (grey)
- Under Review (blue)

### Filtering

**Categories**:
- All
- Physics-Defying
- Forbidden by Law
- Dimensionally Unstable
- Just Bad Ideas
- Under Review

**Filter UI**: Horizontal tab bar or button group

### Visual Design

**Aesthetic**: Scientific research paper meets asylum whiteboard

**Card Styling**:
- White background with lab notebook lines
- Warning tape borders for dangerous flavors
- Equations or diagrams in background (faded)
- Rubber stamp effects for "REJECTED" or "CLASSIFIED"

**Illustrations**: Abstract, surreal art representing impossible concepts

### Interaction States

**Default**: Cards display in masonry grid

**Hover**: Card tilts slightly, reveals additional info

**Click**: Expands to modal with full "research notes"

### Submission CTA

**Bottom Section**:
- Prominent call-to-action
- "Have a flavor too dangerous to exist?"
- Button/link to GitHub Issues or contact form
- Clear guidelines (must be absurd, no actual product requests)

### Accessibility

- All cards have proper headings
- Status badges have text alternatives
- High contrast mode available
- Keyboard navigation through cards

---

## 3.7 Fake API Documentation

### Purpose
Purely comedic. Documentation for a REST API that doesn't exist, with endpoints that return absurd errors.

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│ Header: Navigation                              │
├─────────────────────────────────────────────────┤
│ Dr Pepper Database API Documentation            │
│ Version: π.0 (Irrational)                       │
│ Status: Theoretically Available                 │
├─────────────────────────────────────────────────┤
│ Sidebar:        │ Main Content:                 │
│                 │                               │
│ Quick Start     │ # Getting Started             │
│ Authentication  │                               │
│ Endpoints       │ The Dr Pepper Database API    │
│   - Flavors     │ provides programmatic access  │
│   - Search      │ to flavor data that may or    │
│   - Random      │ may not exist in any          │
│   - Immortal    │ reasonable sense.             │
│ Rate Limits     │                               │
│ Error Codes     │ ## Base URL                   │
│ SDKs (None)     │ `https://api.drpprdb.com/v1/` │
│                 │ (Does not resolve)            │
└─────────────────────────────────────────────────┘
```

### Documentation Sections

#### 1. Quick Start

```markdown
# Quick Start

1. Don't.
2. If you must, acquire an API key by submitting Form 23-B
   to the Department of Carbonated Beverages.
3. Wait 3-5 business centuries.
4. Key will arrive via pneumatic tube.

## Example Request
```bash
curl https://api.drpprdb.com/v1/flavors
# Returns: 418 I'm a teapot
```
```

#### 2. Authentication

```markdown
# Authentication

All requests require an API key in the header:

`X-Pepper-Key: your-key-here`

Note: Keys expire every 23 seconds. Plan accordingly.

## Obtaining a Key

Keys are distributed via lottery system. Winners are notified
via carrier pigeon. Losers receive nothing.
```

#### 3. Endpoints

**GET /v1/flavors**
```markdown
Returns all flavors in the database.

Response: 200 OK
{
  "flavors": [],
  "count": -1,
  "message": "The array is simultaneously full and empty"
}

Rate Limit: 0.5 requests per hour
```

**GET /v1/flavors/{id}**
```markdown
Returns a specific flavor.

Response: 404 Not Found
{
  "error": "Flavor exists but refuses to be observed",
  "schrödinger_index": 0.97
}
```

**GET /v1/flavors/random**
```markdown
Returns a random flavor.

Response: 200 OK (sometimes)
{
  "flavor": null,
  "message": "Random is too deterministic. Try again never."
}
```

**GET /v1/flavors/immortal**
```markdown
Retrieve flavors that transcend time.

Response: 404 Always
{
  "error": "Flavor Cannot Be Contained",
  "suggested_action": "Accept the void"
}
```

**POST /v1/flavors**
```markdown
Create a new flavor.

Response: 403 Forbidden
{
  "error": "Only The Pepper Keepers may create",
  "trial_date": "Heat death of universe"
}
```

#### 4. Error Codes

```markdown
# Error Codes

- 200: OK (rare)
- 404: Not Found (common)
- 418: I'm a Teapot (always for beverage endpoints)
- 451: Unavailable for Legal Reasons (all theoretical flavors)
- 500: Internal Server Error (server is having an existential crisis)
- 503: Service Unavailable (service is available but unwilling)
- 666: Flavor Forbidden By Ancient Pact
- 999: Error code unknown even to the database
```

#### 5. Rate Limits

```markdown
# Rate Limits

- Free Tier: 0.5 requests per hour
- Pro Tier: 1 request per hour
- Enterprise: 1 request per hour but with a nicer error message

## Rate Limit Headers

`X-RateLimit-Remaining: -1`
`X-RateLimit-Reset: Never`
```

#### 6. SDKs

```markdown
# Official SDKs

We offer SDKs for the following languages:

- JavaScript: Coming Soon™
- Python: Under Review
- Ruby: Lost in shipping
- Go: Went
- Rust: Oxidized
- PHP: Please no

## Community Libraries

None. The community knows better.
```

### Visual Design

**Style**: Matches modern API documentation (Stripe, Twilio aesthetic)

**Code Blocks**:
- Syntax highlighting
- Copy button (copies the absurd example)
- Language tabs (bash, JavaScript, Python) - all show same joke

**Sidebar Navigation**:
- Sticky on scroll
- Expandable sections
- Active section highlighted

**Colors**:
- Code background: Dark grey (#2D2D2D)
- Text: Cream (#F5EBE0)
- Accent: Dr Pepper burgundy for links

### Interactive Elements

**Try It Button**:
- Each endpoint has "Try It" button
- Opens console overlay
- Makes fake request
- Shows animated loading
- Returns the documented error response
- Copy response button

**Response Viewer**:
- Collapsible JSON viewer
- Syntax highlighted
- Line numbers
- Copy button

### Accessibility

- All code blocks have proper ARIA labels
- Keyboard navigation through sidebar
- Skip links to main content
- High contrast code theme available

---

## 4. Component Library

### 4.1 Core Components

#### FlavorCard
**Purpose**: Display flavor in grid/list format

**Props**:
- flavor: FlavorData
- view: 'grid' | 'list'
- onClick: () => void

**States**: default, hover, focus, loading

**Variants**:
- GridCard (3:4 ratio, vertical layout)
- ListCard (horizontal layout)
- CompactCard (timeline use)

#### AuthenticityBadge
**Purpose**: Visual indicator of flavor realness

**Props**:
- level: 'real' | 'rumored' | 'legend' | 'astral'
- size: 'sm' | 'md' | 'lg'

**Styles**:
- Real: Green pill (#4CAF50)
- Rumored: Amber pill (#FFA726)
- Legend: Burgundy pill (#5C0F1F)
- Astral: Purple gradient (#7B2CBF to #C77DFF)

#### RarityDisplay
**Purpose**: Show rarity score

**Props**:
- score: number (1-10)
- showLabel: boolean

**Rendering**:
- Stars (filled/half/empty)
- Numeric score
- Optional label "Rarity:"

#### SearchBar
**Purpose**: Global search input

**Props**:
- value: string
- onChange: (value: string) => void
- onClear: () => void
- placeholder: string

**Features**:
- Debounced input (300ms)
- Clear button when has value
- Loading indicator during search
- Result count display

#### FilterPanel
**Purpose**: Sidebar filter controls

**Props**:
- filters: FilterState
- onFilterChange: (filters: FilterState) => void
- onClearAll: () => void

**Sections**:
- Authenticity checkboxes
- Rarity slider
- Category checkboxes
- Year range slider

#### Modal/Dialog
**Purpose**: Overlays for "Surprise Me", errors, etc.

**Props**:
- isOpen: boolean
- onClose: () => void
- title: string
- children: ReactNode

**Features**:
- Backdrop blur
- Focus trap
- ESC to close
- Click outside to close
- Framer Motion animations

#### Toast/Notification
**Purpose**: Temporary feedback messages

**Props**:
- message: string
- type: 'success' | 'error' | 'info'
- duration: number

**Positioning**: Bottom right (desktop), top center (mobile)

**Animation**: Slide in from bottom, fade out

### 4.2 Layout Components

#### PageHeader
**Purpose**: Consistent header across pages

**Contents**:
- Logo (links to home)
- Primary navigation
- Mobile menu toggle

**Sticky**: Yes, on scroll

#### PageFooter
**Purpose**: Site footer

**Contents**:
- Copyright (humorous)
- Links (GitHub, About)
- "Sips consumed" counter

#### PageContainer
**Purpose**: Consistent max-width and padding

**Max Width**: 1280px
**Padding**: Responsive

#### Section
**Purpose**: Page section wrapper

**Props**:
- title: string
- description: string (optional)

---

## 5. User Flows

### 5.1 First-Time Visitor Flow

```
1. Land on Home page
   ↓
2. See Hero Section
   - Read tagline
   - Notice "Surprise Me" button
   ↓
3. Dismiss Hero (or click Begin Exploration)
   ↓
4. See Flavor Database
   - 23+ flavors in grid
   - Filter panel on left
   - Search bar at top
   ↓
5. Browse a few cards
   ↓
6. Click "Surprise Me"
   ↓
7. Spinning animation
   ↓
8. Arrive at Random Flavor Detail
   ↓
9. Read lore, laugh
   ↓
10. Click "Pepperverse" in nav
    ↓
11. See cosmological map
    ↓
12. Hover a few flavors
    ↓
13. Return to Database or explore Timeline
    ↓
14. (Optional) Share with friends
```

**Goal**: Visitor experiences core delight within 30 seconds.

### 5.2 Power User Flow (Browsing Specific Flavor)

```
1. Land on Home page (or arrive via direct link)
   ↓
2. Use Search bar
   - Type "Midnight Fog"
   ↓
3. Results filter in real-time
   ↓
4. Click flavor card
   ↓
5. Arrive at Flavor Detail page
   ↓
6. Read all metadata, lore
   ↓
7. Click "Try Flavor Merger"
   ↓
8. Navigate to Merger Tool (Midnight Fog pre-selected)
   ↓
9. Select second flavor
   ↓
10. Merge flavors
    ↓
11. Read absurd result
    ↓
12. Share result via clipboard
```

**Goal**: Easy navigation to specific content, with discovery of related features.

### 5.3 Mobile Discovery Flow

```
1. Land on Home page (mobile)
   ↓
2. See compact hero
   ↓
3. Tap "Begin Exploration"
   ↓
4. Scroll through flavor cards (single column)
   ↓
5. Tap filter icon (bottom-right FAB)
   ↓
6. Filter drawer slides up
   ↓
7. Select "Urban Legend" filter
   ↓
8. Close drawer
   ↓
9. See filtered results
   ↓
10. Tap flavor card
    ↓
11. Read detail page
    ↓
12. Swipe right for next flavor
    ↓
13. Tap hamburger menu
    ↓
14. Navigate to Timeline
    ↓
15. Scroll through chronological list
    ↓
16. Return home
```

**Goal**: Touch-optimized navigation, bottom-sheet patterns, swipe gestures.

---

## 6. Interaction Patterns & Animations

### 6.1 Page Transitions

**Navigation between pages**:
- Fade out current page (200ms)
- Slide in new page from right (300ms, ease-out)
- Use Framer Motion `AnimatePresence`

**Flavor Detail Navigation** (Prev/Next):
- Slide left for next, right for previous
- Brief overlap (50ms)

### 6.2 Hover States

**Flavor Cards**:
- Scale: 1.0 → 1.02 (200ms ease-out)
- Shadow: none → 0 4px 12px rgba(0,0,0,0.15)
- Border: 1px → 2px
- Cursor: pointer

**Buttons**:
- Background color shift (150ms)
- Scale: 1.0 → 1.05 (for primary actions)
- Cursor: pointer

**Pepperverse Flavors**:
- Scale: 1.0 → 1.3 (250ms spring animation)
- Tooltip fade in (150ms)
- Orbit path highlights

### 6.3 Loading States

**Skeleton Screens**:
- Pulsing opacity animation (1s loop)
- Matches layout of actual content
- Grey placeholder shapes

**Spinner**:
- Rotating Dr Pepper bottle icon
- 360° rotation (1s linear loop)
- Used for "Surprise Me" and other deliberate waits

**Progress Indicators**:
- Linear progress bar for bulk operations
- Percentage display if known

### 6.4 Microinteractions

**Surprise Me Button**:
- Pulse animation on idle (2s loop, subtle)
- On click: Button spins 360° (500ms)
- Page fades, spinner appears

**Filter Application**:
- Checkboxes: Checkmark slides in (200ms)
- Results: Staggered fade-in (50ms delay between cards)

**Copy to Clipboard**:
- Button: Changes to checkmark (300ms)
- Toast appears: "Copied!"
- Button reverts after 2s

**Search Results**:
- As user types: Results fade out old, fade in new (300ms)
- Result count animates (number ticker effect)

**Scroll Animations** (Intersection Observer):
- Timeline entries: Slide in from left/right as enter viewport
- Lore section: Fade up when scrolled into view
- Related flavors: Stagger in (100ms delays)

### 6.5 Error States

**Animation**: Shake effect (horizontal wobble, 400ms)

**Display**:
- Error icon (⚠️ or custom)
- Error message (helpful, humorous)
- Retry button or alternative action

**Example** (Search No Results):
- "No flavors found" with sad bottle icon
- Gentle fade in (300ms)
- "Clear Filters" and "Surprise Me" buttons

### 6.6 Responsive Animations

**Reduced Motion**: Respect `prefers-reduced-motion` media query
- Disable all non-essential animations
- Instant transitions instead of animations
- No parallax or continuous motion

**Mobile Considerations**:
- Lighter animations (shorter durations)
- Avoid complex physics simulations
- Optimize for 60fps

---

## 7. Responsive Design

### 7.1 Breakpoints

```css
/* Mobile First Approach */

/* Extra Small (default, no media query needed) */
0px - 639px: Mobile phones

/* Small */
640px - 767px: Large phones, small tablets

/* Medium */
768px - 1023px: Tablets

/* Large */
1024px - 1279px: Small laptops, desktops

/* Extra Large */
1280px+: Large desktops
```

### 7.2 Layout Adaptations by Breakpoint

#### Mobile (0-639px)

**Home/Database**:
- Single column cards
- Filters in bottom drawer
- Search in sticky header
- No sidebar
- Compact hero (3 lines)

**Flavor Detail**:
- Image full width
- Single column metadata
- Prev/Random/Next buttons in fixed bottom bar

**Pepperverse**:
- Full width SVG
- Touch interactions (tap for tooltip)
- Pinch to zoom (optional)
- Legend above map

**Timeline**:
- Single column, left-aligned entries
- Compact year headers
- Era filter in dropdown

**Merger Tool**:
- Vertical stack (Flavor A above Flavor B)
- Full width dropdowns
- Merge button full width

#### Tablet (640-1023px)

**Home/Database**:
- 2-column grid
- Filters in slide-out drawer (left)
- Larger cards than mobile
- Search bar more prominent

**Flavor Detail**:
- Image 40% width (left)
- Metadata 60% (right)
- Related flavors: 3 cards visible

**Pepperverse**:
- Larger SVG
- Legend beside map
- Controls below map

**Timeline**:
- Entries alternate left/right (narrower)
- Year headers sticky

#### Desktop (1024px+)

**Home/Database**:
- 3-4 column grid (based on width)
- Sticky filters sidebar (left, 25% width)
- Large search bar
- Spacious card layout

**Flavor Detail**:
- Image 35% width (left)
- Metadata 65% (right)
- Related flavors: 4-5 cards visible, carousel

**Pepperverse**:
- Full interactive experience
- Legend alongside map
- Controls integrated

**Timeline**:
- Entries alternate left/right (full effect)
- Larger entry cards
- Quick jump sidebar (optional)

### 7.3 Touch vs. Mouse Interactions

**Touch Targets** (Mobile):
- Minimum 44x44px
- Padding around clickable elements
- Bottom sheet patterns for filters
- Swipe gestures where appropriate

**Mouse Interactions** (Desktop):
- Hover states show additional info
- Tooltips on hover
- Cursor changes (pointer, grab, etc.)
- Scroll-based parallax (subtle)

### 7.4 Typography Scaling

```css
/* Fluid typography using clamp() */

h1: clamp(2rem, 5vw, 3.5rem)
h2: clamp(1.5rem, 4vw, 2.5rem)
h3: clamp(1.25rem, 3vw, 2rem)
body: clamp(1rem, 2.5vw, 1.125rem)
small: clamp(0.875rem, 2vw, 1rem)
```

---

## 8. Accessibility Specifications

### 8.1 WCAG 2.1 Level AA Compliance

**Color Contrast**:
- Text: Minimum 4.5:1 ratio
- Large text (18pt+): Minimum 3:1 ratio
- Interactive elements: 3:1 minimum against background

**Tested Combinations**:
- Burgundy (#5C0F1F) on Cream (#F5EBE0): 9.2:1 ✓
- Deep Brown (#2D1B1B) on Off-White (#FAF7F2): 12.8:1 ✓
- Links use underline + color

### 8.2 Keyboard Navigation

**Tab Order**:
- Logical, follows visual flow
- Skip link to main content (first tab stop)
- All interactive elements focusable

**Focus Indicators**:
- Visible outline: 2px solid burgundy
- Offset: 2px
- Never removed (`:focus-visible` for mouse users)

**Keyboard Shortcuts** (optional):
- `/` - Focus search
- `Esc` - Close modals/drawers
- Arrow keys - Navigate Pepperverse flavors

### 8.3 Screen Reader Support

**Semantic HTML**:
- Proper heading hierarchy (h1 → h2 → h3, no skips)
- Landmark regions: header, nav, main, aside, footer
- Lists for navigation and flavor grids

**ARIA Labels**:
- All icons have aria-label
- Loading states announced via aria-live
- Filter count: "3 filters active"
- Search results: "42 flavors found"

**Alt Text**:
- Flavor images: "Illustration of Dr Pepper [Flavor Name]"
- Decorative images: alt=""
- Icons conveying meaning: aria-label

**Focus Management**:
- Modal opens: Focus trapped, moves to close button
- Page transition: Focus moves to h1
- Filter applied: Announce result count

### 8.4 Animation & Motion

**Reduced Motion**:
- Respect `prefers-reduced-motion: reduce`
- Disable decorative animations
- Use instant transitions
- Keep essential feedback (e.g., button press)

**No Autoplaying Content**:
- No autoplay videos
- No autoplay sounds
- No automatic carousels
- User-initiated animations only

### 8.5 Forms & Inputs

**Labels**:
- All inputs have visible labels (no placeholder-only)
- Associated via `<label for="id">` or wrapping

**Error Messages**:
- Associated with input via aria-describedby
- Visible error text
- Icon + text (not icon alone)

**Required Fields**:
- Marked with asterisk and "required" in label
- aria-required="true"

### 8.6 High Contrast Mode

**Windows High Contrast**:
- Test all pages in high contrast mode
- Ensure borders/outlines visible
- Don't rely on background images for meaning

**Dark Mode** (future enhancement):
- Inverted palette
- Same contrast ratios maintained
- User preference respected

---

## 9. Content Strategy

### 9.1 Voice & Tone

**Brand Voice**: Deadpan archivist meets enthusiastic soda nerd

**Characteristics**:
- Precise, scientific language for absurd topics
- Occasional archaic terminology ("allegedly", "purported")
- Footnotes and citations (to nothing)
- Straight-faced humor

**Examples**:
- Good: "This flavor was allegedly recovered from a bootleg bottling facility in Waco, Texas, circa 1998."
- Bad: "LOL this flavor is so crazy!!!"

**Tone Variations by Context**:
- Database: Scholarly, archival
- Pepperverse: Cosmological, grand
- Merger Tool: Mad scientist, playful
- API Docs: Corporate, dry (which makes it funnier)

### 9.2 Writing Guidelines

**Flavor Descriptions**:
- One sentence lore (max 2)
- Include specific details (years, places, people)
- Reference "The Pepper Keepers", "dimensional drift", etc.
- Avoid modern slang

**Metadata Labels**:
- Use colon separator: "Released: 1998"
- Be consistent
- Some fields can say "Unknown" or "Classified" for humor

**Error Messages**:
- Helpful first, funny second
- Provide actionable next steps
- Example: "No flavors found. Try clearing filters or consulting The Pepper Keepers."

**Accessibility Text**:
- Descriptive, not cute
- Prioritize clarity
- Example: "Illustration of Dr Pepper Midnight Fog" not "Spooky purple bottle lol"

### 9.3 Flavor Lore Templates

**Template 1: Historical Discovery**
"[Flavor name] was discovered in [year] in a [location]. [Unusual circumstance]. Records remain incomplete."

**Template 2: Mythological**
"Legend tells of [flavor name], which could only be bottled during [condition]. The Pepper Keepers deny its existence."

**Template 3: Experimental Failure**
"[Flavor name] was test-marketed in [year] for exactly [short time]. [What went wrong]. No samples survive."

**Template 4: Interdimensional**
"This flavor originated in [parallel universe concept]. It remains unstable in our timeline. [Warning]."

---

## 10. Performance Requirements

### 10.1 Load Time Targets

**First Contentful Paint (FCP)**: < 1.5s
**Largest Contentful Paint (LCP)**: < 2.5s
**Time to Interactive (TTI)**: < 3.5s
**Cumulative Layout Shift (CLS)**: < 0.1

**Total Page Weight**:
- Home page: < 500 KB (including images)
- Flavor detail: < 300 KB
- Pepperverse: < 800 KB (SVG-heavy)

### 10.2 Optimization Strategies

**Images**:
- WebP format with JPEG fallback
- Lazy loading (below fold)
- Responsive images (srcset)
- Max dimension: 1200px width
- Compression: 80% quality

**Code Splitting**:
- Route-based splitting (each page separate bundle)
- Lazy load Pepperverse SVG
- Lazy load Framer Motion on interaction pages

**Caching**:
- Static assets: 1 year cache
- flavors.json: 1 hour cache (can update content easily)
- HTML: No cache (service worker handles)

**Fonts**:
- Subset fonts (Latin only if appropriate)
- Font-display: swap
- Load critical fonts immediately, decorative fonts lazily

**Critical CSS**:
- Inline above-fold styles
- Load full stylesheet async

### 10.3 Mobile Performance

**3G Network Target**:
- Page loads in < 5s on slow 3G
- Use Chrome DevTools throttling to test

**Data Savings**:
- Offer low-res image option (settings toggle, future)
- No unnecessary animations on slow connections

### 10.4 Accessibility Performance

**Keyboard Navigation Speed**:
- Tab through entire page in < 30 key presses
- Skip links reduce this significantly

**Screen Reader**:
- Proper heading structure allows quick navigation
- ARIA landmarks enable jumping between sections

---

## 11. Visual Design System

### 11.1 Color System

**Primary Palette**:
```
--color-burgundy-900: #3D0A14 (darkest)
--color-burgundy-700: #5C0F1F (primary)
--color-burgundy-500: #8B1538
--color-burgundy-300: #B54865

--color-cream-100: #FAF7F2 (lightest)
--color-cream-300: #F5EBE0
--color-cream-500: #E8D5C4

--color-brown-900: #2D1B1B (text)
--color-brown-700: #4A3333
--color-brown-500: #6B4F4F
```

**Accent Colors**:
```
--color-amber: #D4A574 (fizz highlights)
--color-cherry: #C41E3A (errors, warnings)
--color-mint: #A8D5BA (success states)
```

**Authenticity Colors**:
```
--color-real: #4CAF50 (green)
--color-rumored: #FFA726 (amber)
--color-legend: #5C0F1F (burgundy)
--color-astral: linear-gradient(135deg, #7B2CBF, #C77DFF) (purple)
```

### 11.2 Typography System

**Font Families**:
```css
--font-heading: 'Playfair Display', Georgia, serif;
--font-body: 'Inter', 'Helvetica Neue', sans-serif;
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
```

**Type Scale**:
```css
--text-xs: 0.75rem (12px)
--text-sm: 0.875rem (14px)
--text-base: 1rem (16px)
--text-lg: 1.125rem (18px)
--text-xl: 1.25rem (20px)
--text-2xl: 1.5rem (24px)
--text-3xl: 1.875rem (30px)
--text-4xl: 2.25rem (36px)
--text-5xl: 3rem (48px)
```

**Line Heights**:
```css
--leading-tight: 1.25
--leading-normal: 1.5
--leading-relaxed: 1.75
```

**Font Weights**:
```css
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

### 11.3 Spacing System

**Base Unit**: 4px (0.25rem)

**Scale**:
```css
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem (16px)
--space-5: 1.25rem (20px)
--space-6: 1.5rem (24px)
--space-8: 2rem (32px)
--space-10: 2.5rem (40px)
--space-12: 3rem (48px)
--space-16: 4rem (64px)
--space-20: 5rem (80px)
```

### 11.4 Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

### 11.5 Border Radius

```css
--radius-sm: 0.25rem (4px)
--radius-md: 0.5rem (8px)
--radius-lg: 1rem (16px)
--radius-full: 9999px (pill shape)
```

### 11.6 Transitions

```css
--transition-fast: 150ms ease-out
--transition-base: 250ms ease-out
--transition-slow: 400ms ease-out
```

### 11.7 Textures & Decorative Elements

**Paper Texture**:
- Subtle noise overlay (opacity: 0.03)
- Applied to cream backgrounds

**Dotted Borders**:
- Border style: dashed or dotted
- Vintage coupon aesthetic
- 2px width

**Fizz Bubbles**:
- SVG circles with gradient
- Floating animation (optional, decorative)
- Used sparingly as background elements

---

## 12. Content States Reference

### 12.1 Database Page States

| State | Display | Actions |
|-------|---------|---------|
| **Loading Initial** | Skeleton cards (6-9) | None |
| **Loaded with Results** | Flavor grid/list | Browse, filter, search |
| **Search Active** | Filtered results | Clear search, modify |
| **No Results (Search)** | Empty state with message | Clear search, Surprise Me |
| **No Results (Filters)** | Empty state with message | Clear filters, Surprise Me |
| **Error Loading** | Error state with retry | Retry button |

### 12.2 Flavor Detail Page States

| State | Display | Actions |
|-------|---------|---------|
| **Loading** | Skeleton layout | None |
| **Loaded** | Full flavor details | Navigate, merge, share |
| **Error (Flavor Not Found)** | 404-style error | Return to database |
| **Error (Network)** | Network error | Retry button |

### 12.3 Pepperverse States

| State | Display | Actions |
|-------|---------|---------|
| **Loading** | Skeleton SVG with pulsing | None |
| **Loaded** | Full interactive map | Hover, click, zoom |
| **Error** | Static fallback SVG | Link to database |

### 12.4 Interactive Tool States (Merger)

| State | Display | Actions |
|-------|---------|---------|
| **Initial Empty** | Empty selects, disabled button | Select flavors |
| **One Flavor Selected** | One populated, button disabled | Select second |
| **Both Selected** | Both populated, button enabled | Merge |
| **Merging** | Animation overlay | Wait |
| **Result Shown** | Merged flavor card | Merge again, share |

---

## 13. Implementation Priorities

### Phase 1: Core MVP (Week 1-2)

**Priority 1**:
- Home/Database page with grid view
- Flavor detail pages
- Basic search functionality
- flavors.json data structure
- Mobile-responsive layouts

**Priority 2**:
- Filtering system
- Authenticity badges
- Rarity display
- Navigation header/footer
- Basic animations (hover states)

**Priority 3**:
- "Surprise Me" functionality
- Prev/Next navigation on detail pages
- Empty states
- Error handling

### Phase 2: Enhanced Experience (Week 3)

**Priority 1**:
- Pepperverse Explorer (SVG map)
- Timeline page
- Related flavors section

**Priority 2**:
- List view toggle
- Framer Motion animations
- Scroll animations
- Loading skeletons

**Priority 3**:
- Toast notifications
- Focus management improvements
- Accessibility audit

### Phase 3: Fun Extras (Week 4)

**Priority 1**:
- Flavor Merger Tool
- Theoretical Flavors Lab

**Priority 2**:
- Fake API Documentation
- "Sips remaining" counter
- Share functionality

**Priority 3**:
- Easter eggs (Konami code, hidden flavors)
- Printable trading cards (future)
- Dark mode (future)

---

## 14. Success Metrics

### 14.1 User Engagement

**Target Metrics**:
- Average session duration: > 45 seconds (exceeds 30s goal)
- Pages per session: > 2
- Bounce rate: < 60%
- Return visitor rate: > 10% within 30 days

**Tracking** (Privacy-Respecting):
- No user tracking or analytics (per PRD)
- Optional: Self-hosted Plausible or Simple Analytics
- Public dashboard showing aggregate metrics

### 14.2 Technical Performance

**Measured via Lighthouse**:
- Performance: > 90
- Accessibility: 100
- Best Practices: > 90
- SEO: > 90

**Core Web Vitals**:
- LCP: < 2.5s (Good)
- FID: < 100ms (Good)
- CLS: < 0.1 (Good)

### 14.3 Accessibility Compliance

**Automated Testing**:
- 0 errors in axe DevTools
- 0 errors in WAVE

**Manual Testing**:
- Keyboard navigation: All features accessible
- Screen reader: All content announced correctly
- Color contrast: All ratios meet WCAG AA

### 14.4 Qualitative Goals

**Achieved When**:
- At least one person audibly chuckles (per PRD)
- Site is shared on social media organically
- People request to submit theoretical flavors
- "Surprise Me" is clicked frequently
- Users spend time reading lore descriptions

---

## 15. Design Handoff Checklist

### For Developers

**Assets Provided**:
- [ ] Color palette (CSS variables)
- [ ] Typography scale (CSS variables)
- [ ] Spacing system (CSS variables)
- [ ] Component specifications
- [ ] Animation timings and easings
- [ ] Breakpoint definitions
- [ ] SVG assets (logo, icons, pepperverse)

**Documentation Provided**:
- [ ] Component hierarchy
- [ ] User flows
- [ ] Interaction patterns
- [ ] Accessibility requirements
- [ ] Content guidelines
- [ ] Performance targets

**Design Files** (if applicable):
- [ ] Figma/Sketch file with all pages
- [ ] High-fidelity mockups
- [ ] Interactive prototypes
- [ ] Component library

**Data Structure**:
- [ ] flavors.json schema defined
- [ ] Example flavor entries
- [ ] Required vs. optional fields

### Quality Assurance

**Testing Requirements**:
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS, Android)
- [ ] Tablet testing (iPad, Android tablets)
- [ ] Keyboard navigation testing
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Lighthouse audits
- [ ] Slow network testing (3G throttling)

---

## 16. Future Enhancements (Post-Launch)

### 16.1 Content Expansions

- **More Flavors**: Continuously add to database (goal: 50+)
- **Flavor Collections**: Themed groups (Holiday flavors, Regional exclusives)
- **Pepperverse Expansion**: Add more astronomical zones
- **Historical Deep Dives**: Expanded timeline entries with mini-articles

### 16.2 Feature Additions

- **PepperGPT Bot**: Static chatbot with canned responses
- **Pepper Index Fund**: Graph tracking flavor "stability" over time
- **Trading Cards**: Printable PDF cards for each flavor
- **Flavor Comparison**: Side-by-side comparison tool
- **Community Submissions**: Form for theoretical flavor proposals (moderated)

### 16.3 Technical Improvements

- **Dark Mode**: Full theme implementation
- **Offline Support**: Service worker for offline browsing
- **Progressive Web App**: Installable app
- **Advanced Search**: Boolean operators, saved searches
- **Localization**: Multi-language support (humorous translations)

### 16.4 Easter Eggs

- **Konami Code**: Triggers "Caffeine Mode" (screen shake)
- **Hidden Flavors**: Discoverable only through specific actions
- **Seasonal Variants**: Site appearance changes for holidays
- **Secret URLs**: Hidden pages with bonus content

---

## Appendix A: Flavor Data Schema

```typescript
interface FlavorData {
  id: string; // Unique identifier (slug)
  name: string; // "Dr Pepper Midnight Fog"
  authenticityLevel: 'real' | 'rumored' | 'legend' | 'astral';
  category: 'classic' | 'seasonal' | 'experimental' | 'forbidden';
  rarityScore: number; // 1-10
  releaseYear?: number; // Year or null if unknown
  lastSeen?: number; // Year or null if still available
  flavorNotes: string[]; // ["Cherry", "Vanilla", "Temporal distortion"]
  pairsWellWith?: string; // "Ancient grains, regret"
  lore: string; // One-sentence description
  image?: string; // URL or path to illustration
  distribution?: 'national' | 'regional' | 'test-market' | 'mythical';
  abv?: string; // Usually "0%" but can be humorous
  caffeineContent?: string; // "Classified" or mg value
  bottleDesign?: string; // Description
  variants?: string[]; // Related flavor names
  pepperversePosition?: { x: number; y: number; type: 'planet' | 'comet' | 'astral' };
}
```

---

## Appendix B: Component API Reference

### FlavorCard

```typescript
interface FlavorCardProps {
  flavor: FlavorData;
  view: 'grid' | 'list';
  onClick?: () => void;
  className?: string;
}
```

### AuthenticityBadge

```typescript
interface AuthenticityBadgeProps {
  level: 'real' | 'rumored' | 'legend' | 'astral';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}
```

### RarityDisplay

```typescript
interface RarityDisplayProps {
  score: number; // 1-10
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

### SearchBar

```typescript
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}
```

### FilterPanel

```typescript
interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearAll: () => void;
  isOpen?: boolean; // For mobile drawer
  onClose?: () => void; // For mobile drawer
}

interface FilterState {
  authenticityLevels: string[];
  rarityRange: [number, number];
  categories: string[];
  yearRange: [number, number];
}
```

---

## Document Summary

This UX specification defines a comprehensive, delightfully absurd user experience for the Dr Pepper Database. The design embraces vintage soda-fountain aesthetics while maintaining modern usability standards and WCAG AA accessibility compliance.

**Key Design Decisions**:
1. Mobile-first responsive design with distinct layouts per breakpoint
2. Vintage aesthetic (burgundy/cream palette, medicine label typography)
3. Deadpan humor throughout (API docs, lore descriptions, error messages)
4. High accessibility standards (keyboard nav, screen reader support, no autoplay)
5. Performance-focused (skeleton screens, lazy loading, < 500KB pages)
6. Animation opportunities with Framer Motion (but respectful of reduced-motion)

**Core User Flows**:
- First-time visitor: Hero → Browse → Surprise Me → Detail page (< 30s)
- Power user: Search → Filter → Detail → Related features
- Mobile: Touch-optimized with bottom sheets and swipe gestures

**Component Structure**:
- Reusable components (FlavorCard, AuthenticityBadge, RarityDisplay)
- Consistent states (loading, error, empty, success)
- Accessible by default (ARIA, keyboard support, high contrast)

The specification is ready for implementation in phases, with clear priorities and success metrics defined.