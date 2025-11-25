'use client'

import { useState } from 'react'
import { getAllFlavors } from '@/lib/flavors'
import { Flavor } from '@/types/flavor'
import { motion, AnimatePresence } from 'framer-motion'

interface MergedFlavor {
  name: string
  description: string
  warning: string
  rarity: string
  pairsWith: string
}

export default function MergerPage() {
  const flavors = getAllFlavors()
  const [flavorA, setFlavorA] = useState<Flavor | null>(null)
  const [flavorB, setFlavorB] = useState<Flavor | null>(null)
  const [result, setResult] = useState<MergedFlavor | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const suffixes = ['Fusion', 'Reserve', 'Convergence', 'Anomaly', 'Paradox', 'Synthesis', 'Continuum']
  const adjectives = ['unholy', 'temporal', 'quantum', 'dimensional', 'impossible', 'forbidden']
  const properties = [
    'temporal distortion properties',
    'quantum entanglement',
    'aromatic complexity',
    'dimensional instability',
    'thermodynamic improbability',
    'metaphysical uncertainty',
  ]
  const descriptors = ['Confused', 'Paradoxical', 'Unstable', 'Transcendent', 'Concerning', 'Illegal', 'Questionable']
  const servingSuggestions = [
    'Never',
    'With extreme caution',
    'Under laboratory conditions',
    'Only on Tuesdays',
    'In a parallel universe',
    'After signing a waiver',
  ]
  const pairings = ['Existential dread', 'Regret', 'Time travel', 'Dimensional rifts', 'Your last mistake', 'Uncertainty']

  const mergeFlavors = () => {
    if (!flavorA || !flavorB) return

    setIsLoading(true)

    // Simulate processing
    setTimeout(() => {
      const wordsA = flavorA.name.replace('Dr Pepper ', '').split(' ')
      const wordsB = flavorB.name.replace('Dr Pepper ', '').split(' ')

      const nameA = wordsA[0] || 'Mystery'
      const nameB = wordsB[wordsB.length - 1] || 'Unknown'
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]

      const mergedName = `Dr Pepper ${nameA} ${nameB} ${suffix}`
      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
      const propA = properties[Math.floor(Math.random() * properties.length)]
      const propB = properties[Math.floor(Math.random() * properties.length)]
      const descriptor = descriptors[Math.floor(Math.random() * descriptors.length)]
      const serving = servingSuggestions[Math.floor(Math.random() * servingSuggestions.length)]
      const pairing = pairings[Math.floor(Math.random() * pairings.length)]

      const rarityScore = Math.min(flavorA.rarityScore + flavorB.rarityScore + 3, 15)

      const merged: MergedFlavor = {
        name: mergedName,
        description: `This ${adjective} union combines the ${propA} of ${flavorA.name} with the ${propB} of ${flavorB.name}. Flavor profile: ${descriptor}. Recommended serving: ${serving}.`,
        warning: 'WARNING: This flavor combination violates at least three natural laws and possibly several international treaties.',
        rarity: `${rarityScore}/10 (Illegal in ${Math.floor(Math.random() * 5) + 1} Dimensions)`,
        pairsWith: pairing,
      }

      setResult(merged)
      setIsLoading(false)
    }, 1500)
  }

  const reset = () => {
    setFlavorA(null)
    setFlavorB(null)
    setResult(null)
  }

  const randomizeA = () => {
    const randomFlavor = flavors[Math.floor(Math.random() * flavors.length)]
    setFlavorA(randomFlavor)
  }

  const randomizeB = () => {
    const randomFlavor = flavors[Math.floor(Math.random() * flavors.length)]
    setFlavorB(randomFlavor)
  }

  const copyToClipboard = () => {
    if (!result) return
    const text = `I merged flavors in the Dr Pepper Flavor Merger!\n\nResult: ${result.name}\n\n"${result.description}"\n\nTry it yourself: drpprdb.com/merger`
    navigator.clipboard.writeText(text)
    alert('Merged flavor copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pepper-burgundy to-pepper-dark text-pepper-cream">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          The Flavor Merger Laboratory
        </h1>
        <p className="text-xl opacity-90">Combining the uncombineable since now</p>
      </div>

      {/* Merger Interface */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-pepper-cream text-pepper-dark rounded-lg p-8 paper-texture">
          <p className="text-center mb-8 text-lg">
            Select two flavors to merge into a new, scientifically questionable combination:
          </p>

          {/* Flavor Selectors */}
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 mb-8 items-center">
            {/* Flavor A */}
            <div>
              <label className="block font-medium text-pepper-burgundy mb-2">Flavor A:</label>
              <select
                value={flavorA?.id || ''}
                onChange={(e) => setFlavorA(flavors.find((f) => f.id === e.target.value) || null)}
                className="w-full px-4 py-3 border-2 border-pepper-burgundy/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pepper-burgundy mb-2"
              >
                <option value="">Select a flavor...</option>
                {flavors.map((flavor) => (
                  <option key={flavor.id} value={flavor.id}>
                    {flavor.name}
                  </option>
                ))}
              </select>
              <button
                onClick={randomizeA}
                className="w-full px-4 py-2 bg-pepper-fizz rounded-lg font-medium hover:bg-pepper-burgundy hover:text-pepper-cream transition-colors"
              >
                🎲 Random
              </button>
            </div>

            {/* Plus Sign */}
            <div className="text-center">
              <div className="text-4xl font-bold text-pepper-burgundy">+</div>
            </div>

            {/* Flavor B */}
            <div>
              <label className="block font-medium text-pepper-burgundy mb-2">Flavor B:</label>
              <select
                value={flavorB?.id || ''}
                onChange={(e) => setFlavorB(flavors.find((f) => f.id === e.target.value) || null)}
                className="w-full px-4 py-3 border-2 border-pepper-burgundy/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pepper-burgundy mb-2"
              >
                <option value="">Select a flavor...</option>
                {flavors.map((flavor) => (
                  <option key={flavor.id} value={flavor.id}>
                    {flavor.name}
                  </option>
                ))}
              </select>
              <button
                onClick={randomizeB}
                className="w-full px-4 py-2 bg-pepper-fizz rounded-lg font-medium hover:bg-pepper-burgundy hover:text-pepper-cream transition-colors"
              >
                🎲 Random
              </button>
            </div>
          </div>

          {/* Merge Button */}
          <div className="text-center mb-8">
            <button
              onClick={mergeFlavors}
              disabled={!flavorA || !flavorB || isLoading}
              className={`px-12 py-4 rounded-lg font-bold text-lg transition-all ${
                flavorA && flavorB && !isLoading
                  ? 'bg-pepper-burgundy text-pepper-cream hover:bg-pepper-burgundy-dark hover:scale-105 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? '🧪 Merging...' : '🧪 MERGE FLAVORS'}
            </button>
          </div>

          {/* Loading Animation */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="inline-block text-6xl"
                >
                  ⚗️
                </motion.div>
                <p className="text-lg text-pepper-burgundy mt-4 font-medium">
                  Calculating quantum flavor matrix...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence>
            {result && !isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', damping: 15 }}
                className="bg-gradient-to-br from-yellow-50 to-amber-50 border-4 border-amber-400 rounded-lg p-8 relative"
              >
                {/* Warning stripe */}
                <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400"></div>

                <h2 className="font-display text-3xl font-bold text-pepper-burgundy mb-4 text-center">
                  {result.name}
                </h2>

                <div className="space-y-4">
                  <p className="text-lg leading-relaxed">{result.description}</p>

                  <div className="bg-red-100 border-2 border-red-400 rounded-lg p-4">
                    <p className="text-sm font-bold text-red-800">{result.warning}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t-2 border-amber-300">
                    <div>
                      <span className="font-bold text-pepper-burgundy">Rarity:</span> {result.rarity}
                    </div>
                    <div>
                      <span className="font-bold text-pepper-burgundy">Pairs With:</span> {result.pairsWith}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6 justify-center">
                  <button
                    onClick={reset}
                    className="px-6 py-2 bg-pepper-burgundy text-pepper-cream rounded-lg font-medium hover:bg-pepper-burgundy-dark transition-colors"
                  >
                    Merge Different Flavors
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="px-6 py-2 bg-pepper-fizz text-pepper-dark rounded-lg font-medium hover:bg-pepper-burgundy hover:text-pepper-cream transition-colors"
                  >
                    📋 Share
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
