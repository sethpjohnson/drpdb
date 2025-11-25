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

export type RarityScore = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface Flavor {
  id: string
  name: string
  authenticity: AuthenticityLevel
  category: FlavorCategory
  rarityScore: RarityScore
  releaseYear: number | string
  flavorNotes: string[]
  pairsWellWith: string[]
  lore: string
  imageUrl?: string
  discontinued?: boolean
  region?: string
  distribution?: 'National' | 'Regional' | 'Test Market' | 'Mythical'
  caffeineContent?: string
  pepperversePosition?: {
    x: number
    y: number
    type: 'planet' | 'comet' | 'astral' | 'black-hole'
  }
}

export interface FlavorDatabase {
  version: string
  lastUpdated: string
  flavors: Flavor[]
}

export interface FilterState {
  search: string
  authenticity: AuthenticityLevel[]
  category: FlavorCategory[]
  rarityMin: RarityScore
  rarityMax: RarityScore
  yearRange: [number, number]
}
