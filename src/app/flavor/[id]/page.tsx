import { getAllFlavors, getFlavorById, getRelatedFlavors } from '@/lib/flavors'
import SugarFreeBadge from '@/components/flavor/SugarFreeBadge'
import RarityDisplay from '@/components/flavor/RarityDisplay'
import FlavorCard from '@/components/flavor/FlavorCard'
import Link from 'next/link'
import FlavorNavigation from '@/components/flavor/FlavorNavigation'
import FlavorImage from '@/components/flavor/FlavorImage'

interface PageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  const flavors = getAllFlavors()
  return flavors.map((flavor) => ({
    id: flavor.id,
  }))
}

export default async function FlavorDetailPage({ params }: PageProps) {
  const { id } = await params
  const flavor = getFlavorById(id)

  if (!flavor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-pepper-burgundy mb-4">
            Flavor Not Found
          </h1>
          <p className="text-pepper-dark mb-6">
            This flavor has been lost to dimensional drift.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-pepper-burgundy text-pepper-cream rounded-lg font-medium hover:bg-pepper-burgundy-dark transition-colors"
          >
            Return to Database
          </Link>
        </div>
      </div>
    )
  }

  const relatedFlavors = getRelatedFlavors(flavor, 4)
  const allFlavors = getAllFlavors()
  const currentIndex = allFlavors.findIndex((f) => f.id === flavor.id)
  const prevFlavor = allFlavors[currentIndex - 1] || allFlavors[allFlavors.length - 1]
  const nextFlavor = allFlavors[currentIndex + 1] || allFlavors[0]

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="bg-pepper-cream border-b border-pepper-burgundy/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-pepper-burgundy hover:underline"
          >
            ← Back to Database
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-[400px_1fr] gap-8 mb-12">
          {/* Image Column */}
          <div>
            <FlavorImage imageUrl={flavor.imageUrl} flavorName={flavor.name} />

            {/* Navigation */}
            <div className="mt-6">
              <FlavorNavigation prevFlavor={prevFlavor} nextFlavor={nextFlavor} />
            </div>
          </div>

          {/* Details Column */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="font-display text-4xl font-bold text-pepper-burgundy mb-4">
                {flavor.name}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <SugarFreeBadge isSugarFree={flavor.sugar_free} />
                <span className="px-3 py-1 bg-pepper-fizz text-pepper-dark rounded-full text-sm font-medium border-2 border-pepper-burgundy/30">
                  {flavor.category}
                </span>
                {flavor.discontinued && (
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium border-2 border-red-300">
                    Discontinued
                  </span>
                )}
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 paper-texture bg-pepper-cream p-6 rounded-lg border-2 dotted-border border-pepper-burgundy">
              <div>
                <span className="text-sm text-pepper-dark/70 font-medium">Released</span>
                <p className="text-lg font-bold text-pepper-burgundy">{flavor.releaseYear}</p>
              </div>
              <div>
                <span className="text-sm text-pepper-dark/70 font-medium">Distribution</span>
                <p className="text-lg font-bold text-pepper-burgundy">
                  {flavor.distribution || 'Unknown'}
                </p>
              </div>
              <div>
                <span className="text-sm text-pepper-dark/70 font-medium">Caffeine</span>
                <p className="text-lg font-bold text-pepper-burgundy">
                  {flavor.caffeineContent || 'Unknown'}
                </p>
              </div>
              {flavor.region && (
                <div>
                  <span className="text-sm text-pepper-dark/70 font-medium">Region</span>
                  <p className="text-lg font-bold text-pepper-burgundy">{flavor.region}</p>
                </div>
              )}
            </div>

            {/* Rarity */}
            <div>
              <h2 className="font-display text-xl font-bold text-pepper-burgundy mb-2">
                Rarity Score
              </h2>
              <RarityDisplay score={flavor.rarityScore} />
            </div>

            {/* Flavor Notes */}
            <div>
              <h2 className="font-display text-xl font-bold text-pepper-burgundy mb-2">
                Flavor Notes
              </h2>
              <div className="flex flex-wrap gap-2">
                {flavor.flavorNotes.map((note, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white border-2 border-pepper-burgundy/30 rounded-full text-sm"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Pairs Well With */}
            <div>
              <h2 className="font-display text-xl font-bold text-pepper-burgundy mb-2">
                Pairs Well With
              </h2>
              <p className="text-pepper-dark">{flavor.pairsWellWith.join(', ')}</p>
            </div>

            {/* Lore Section */}
            <div className="paper-texture bg-amber-50 p-6 rounded-lg border-2 border-amber-200 shadow-md">
              <h2 className="font-display text-xl font-bold text-pepper-burgundy mb-3">
                Archive Notes
              </h2>
              <p className="text-pepper-dark italic leading-relaxed text-lg">
                &ldquo;{flavor.lore}&rdquo;
              </p>
              <p className="text-xs text-pepper-dark/60 mt-4">
                — The Pepper Keepers Archives
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Link
                href="/merger"
                className="px-6 py-3 bg-pepper-burgundy text-pepper-cream rounded-lg font-medium hover:bg-pepper-burgundy-dark transition-colors"
              >
                🧪 Try Flavor Merger
              </Link>
              <Link
                href="/pepperverse"
                className="px-6 py-3 bg-pepper-fizz text-pepper-dark rounded-lg font-medium hover:bg-pepper-burgundy hover:text-pepper-cream transition-colors"
              >
                🌌 View in Pepperverse
              </Link>
            </div>
          </div>
        </div>

        {/* Related Flavors */}
        {relatedFlavors.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-3xl font-bold text-pepper-burgundy mb-6">
              Related Flavors
            </h2>
            <p className="text-pepper-dark mb-6">
              Flavors from the same dimensional branch
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedFlavors.map((relatedFlavor, index) => (
                <FlavorCard key={relatedFlavor.id} flavor={relatedFlavor} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
