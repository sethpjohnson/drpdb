import { Flavor, FlavorDatabase } from '@/types/flavor'
import flavorsData from '@/data/flavors.json'

export function getAllFlavors(): Flavor[] {
  const data = flavorsData as FlavorDatabase
  return data.flavors
}

export function getFlavorById(id: string): Flavor | undefined {
  const flavors = getAllFlavors()
  return flavors.find((flavor) => flavor.id === id)
}

export function getRandomFlavor(): Flavor {
  const flavors = getAllFlavors()
  const randomIndex = Math.floor(Math.random() * flavors.length)
  return flavors[randomIndex]
}

export function getFlavorsByCategory(category: string): Flavor[] {
  const flavors = getAllFlavors()
  return flavors.filter((flavor) => flavor.category === category)
}

export function getRelatedFlavors(flavor: Flavor, count: number = 4): Flavor[] {
  const allFlavors = getAllFlavors()

  // Filter out the current flavor and get flavors from the same category
  const sameCategoryFlavors = allFlavors.filter(
    (f) => f.id !== flavor.id && f.category === flavor.category
  )

  // If we have enough from the same category, use those
  if (sameCategoryFlavors.length >= count) {
    return sameCategoryFlavors.slice(0, count)
  }

  // Otherwise, mix with flavors from the same authenticity level
  const sameAuthFlavors = allFlavors.filter(
    (f) => f.id !== flavor.id && f.authenticity === flavor.authenticity
  )

  const combined = [...new Set([...sameCategoryFlavors, ...sameAuthFlavors])]
  return combined.slice(0, count)
}
