'use client'

import { useMemo, useState } from 'react'
import { getAllFlavors } from '@/lib/flavors'
import AuthenticityBadge from '@/components/flavor/AuthenticityBadge'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function TimelinePage() {
  const flavors = getAllFlavors()
  const [searchQuery, setSearchQuery] = useState('')

  // Group flavors by year
  const flavorsByYear = useMemo(() => {
    const grouped: Record<string, typeof flavors> = {}

    flavors.forEach((flavor) => {
      const year = String(flavor.releaseYear)
      if (!grouped[year]) {
        grouped[year] = []
      }
      grouped[year].push(flavor)
    })

    return Object.entries(grouped)
      .sort((a, b) => {
        // Handle string years like "1923 (disputed)"
        const yearA = parseInt(a[0])
        const yearB = parseInt(b[0])
        return yearB - yearA // Newest first
      })
  }, [flavors])

  const filteredTimeline = useMemo(() => {
    if (!searchQuery) return flavorsByYear

    const query = searchQuery.toLowerCase()
    return flavorsByYear
      .map(([year, yearFlavors]) => {
        const filtered = yearFlavors.filter(
          (f) =>
            f.name.toLowerCase().includes(query) ||
            f.lore.toLowerCase().includes(query) ||
            f.category.toLowerCase().includes(query)
        )
        return [year, filtered] as [string, typeof yearFlavors]
      })
      .filter(([, yearFlavors]) => yearFlavors.length > 0)
  }, [flavorsByYear, searchQuery])

  return (
    <div className="min-h-screen bg-pepper-offwhite">
      {/* Header */}
      <div className="bg-pepper-burgundy text-pepper-cream py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            The Flavor Timeline
          </h1>
          <p className="text-xl opacity-90">
            A Chronological Archive of Carbonated Discovery
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search the timeline..."
          className="w-full px-6 py-3 border-2 border-pepper-burgundy/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pepper-burgundy text-lg"
        />
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-pepper-burgundy transform md:-translate-x-1/2"></div>

          {/* Timeline entries */}
          <div className="space-y-12">
            {filteredTimeline.map(([year, yearFlavors], yearIndex) => (
              <div key={year} className="relative">
                {/* Year marker */}
                <div className="flex items-center mb-6">
                  <div className="absolute left-0 md:left-1/2 w-6 h-6 bg-pepper-burgundy rounded-full border-4 border-pepper-offwhite transform md:-translate-x-1/2"></div>
                  <div className="ml-10 md:ml-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 bg-pepper-burgundy text-pepper-cream px-6 py-2 rounded-lg font-display font-bold text-2xl shadow-lg">
                    {year}
                  </div>
                </div>

                {/* Flavors for this year */}
                <div className="space-y-6 ml-10 md:ml-0">
                  {yearFlavors.map((flavor, flavorIndex) => {
                    const isEven = flavorIndex % 2 === 0
                    return (
                      <motion.div
                        key={flavor.id}
                        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.5, delay: flavorIndex * 0.1 }}
                        className={`md:w-[calc(50%-2rem)] ${
                          isEven ? 'md:mr-auto' : 'md:ml-auto'
                        }`}
                      >
                        <Link href={`/flavor/${flavor.id}`}>
                          <div className="paper-texture bg-pepper-cream p-6 rounded-lg border-2 dotted-border border-pepper-burgundy hover:shadow-xl transition-all group">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="font-display font-bold text-xl text-pepper-burgundy group-hover:underline">
                                {flavor.name}
                              </h3>
                              {flavor.discontinued && (
                                <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                                  Discontinued
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2 flex-wrap mb-3">
                              <AuthenticityBadge level={flavor.authenticity} size="sm" />
                              <span className="text-xs px-2 py-1 bg-pepper-fizz rounded-full border border-pepper-burgundy/30">
                                {flavor.category}
                              </span>
                            </div>

                            <p className="text-sm text-pepper-dark italic mb-3">
                              &ldquo;{flavor.lore}&rdquo;
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {flavor.flavorNotes.slice(0, 3).map((note, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-2 py-1 bg-white rounded border border-pepper-burgundy/20"
                                >
                                  {note}
                                </span>
                              ))}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredTimeline.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-pepper-dark">No flavors found in the timeline.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-6 py-2 bg-pepper-burgundy text-pepper-cream rounded-lg font-medium hover:bg-pepper-burgundy-dark transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
