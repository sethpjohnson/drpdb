'use client'

import { useState, useMemo } from 'react'
import { getAllFlavors, getRandomFlavor } from '@/lib/flavors'
import FlavorCard from '@/components/flavor/FlavorCard'
import { Flavor, FlavorCategory } from '@/types/flavor'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const allFlavors = getAllFlavors()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<('current' | 'discontinued')[]>([])
  const [selectedCategories, setSelectedCategories] = useState<FlavorCategory[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Filter flavors
  const filteredFlavors = useMemo(() => {
    return allFlavors.filter((flavor) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          flavor.name.toLowerCase().includes(query) ||
          flavor.lore.toLowerCase().includes(query) ||
          flavor.flavorNotes.some((note) => note.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }

      // Status filter
      if (selectedStatus.length > 0) {
        const isDiscontinued = flavor.discontinued === true
        const showCurrent = selectedStatus.includes('current')
        const showDiscontinued = selectedStatus.includes('discontinued')

        // Show flavor if it matches ANY selected status (OR logic)
        const matchesStatus =
          (showCurrent && !isDiscontinued) ||
          (showDiscontinued && isDiscontinued)

        if (!matchesStatus) return false
      }

      // Category filter
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(flavor.category)) return false
      }

      return true
    })
  }, [allFlavors, searchQuery, selectedStatus, selectedCategories])

  const handleSurpriseMe = () => {
    const randomFlavor = getRandomFlavor()
    router.push(`/flavor/${randomFlavor.id}`)
  }

  const toggleStatus = (status: 'current' | 'discontinued') => {
    setSelectedStatus((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    )
  }

  const toggleCategory = (cat: FlavorCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedStatus([])
    setSelectedCategories([])
  }

  const hasActiveFilters =
    searchQuery || selectedStatus.length > 0 || selectedCategories.length > 0

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-pepper-burgundy text-pepper-cream py-12 paper-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            The Dr Pepper Database
          </h1>
          <p className="text-xl mb-2 opacity-90">
            Cataloging 34 real flavors with meticulous attention
          </p>
          <p className="text-lg opacity-75">Established 1885 • Archived 2025</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSurpriseMe}
              className="px-8 py-3 bg-pepper-cream text-pepper-burgundy font-bold rounded-lg hover:bg-pepper-fizz transition-colors shadow-lg hover:shadow-xl"
            >
              🎲 Surprise Me
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="mb-8 lg:mb-0">
            <div className="sticky top-20">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full mb-4 px-4 py-2 bg-pepper-burgundy text-pepper-cream rounded-lg font-medium"
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}{' '}
                {hasActiveFilters && `(${selectedStatus.length + selectedCategories.length})`}
              </button>

              <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
                {/* Search */}
                <div>
                  <label htmlFor="search" className="block font-medium text-pepper-burgundy mb-2">
                    Search
                  </label>
                  <input
                    id="search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search flavors..."
                    className="w-full px-4 py-2 border-2 border-pepper-burgundy/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pepper-burgundy"
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <h3 className="font-medium text-pepper-burgundy mb-3">Category</h3>
                  <div className="space-y-2">
                    {(['Classic', 'Seasonal', 'Experimental'] as FlavorCategory[]).map(
                      (cat) => {
                        const count = allFlavors.filter(f => f.category === cat).length
                        return (
                          <label key={cat} className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(cat)}
                                onChange={() => toggleCategory(cat)}
                                className="w-4 h-4 text-pepper-burgundy border-pepper-burgundy/30 rounded focus:ring-pepper-burgundy"
                              />
                              <span className="ml-2 text-sm group-hover:text-pepper-burgundy transition-colors">{cat}</span>
                            </div>
                            <span className="text-xs text-pepper-burgundy/60 font-medium">({count})</span>
                          </label>
                        )
                      }
                    )}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <h3 className="font-medium text-pepper-burgundy mb-3">Status</h3>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedStatus.includes('current')}
                          onChange={() => toggleStatus('current')}
                          className="w-4 h-4 text-pepper-burgundy border-pepper-burgundy/30 rounded focus:ring-pepper-burgundy"
                        />
                        <span className="ml-2 text-sm group-hover:text-pepper-burgundy transition-colors">Currently Available</span>
                      </div>
                      <span className="text-xs text-pepper-burgundy/60 font-medium">
                        ({allFlavors.filter(f => !f.discontinued).length})
                      </span>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedStatus.includes('discontinued')}
                          onChange={() => toggleStatus('discontinued')}
                          className="w-4 h-4 text-pepper-burgundy border-pepper-burgundy/30 rounded focus:ring-pepper-burgundy"
                        />
                        <span className="ml-2 text-sm group-hover:text-pepper-burgundy transition-colors">Discontinued</span>
                      </div>
                      <span className="text-xs text-pepper-burgundy/60 font-medium">
                        ({allFlavors.filter(f => f.discontinued).length})
                      </span>
                    </label>
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 bg-pepper-fizz text-pepper-dark rounded-lg font-medium hover:bg-pepper-burgundy hover:text-pepper-cream transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Flavor Grid */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold text-pepper-burgundy">
                {filteredFlavors.length} Flavor{filteredFlavors.length !== 1 ? 's' : ''} Found
              </h2>
            </div>

            {filteredFlavors.length === 0 ? (
              <div className="text-center py-16 paper-texture bg-pepper-cream rounded-lg border-2 dotted-border border-pepper-burgundy">
                <div className="text-6xl mb-4">🥤</div>
                <h3 className="font-display text-xl font-bold text-pepper-burgundy mb-2">
                  No Flavors Found
                </h3>
                <p className="text-pepper-dark mb-6">
                  The Pepperverse is temporarily experiencing dimensional drift.
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 bg-pepper-burgundy text-pepper-cream rounded-lg font-medium hover:bg-pepper-burgundy-dark transition-colors"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={handleSurpriseMe}
                    className="px-6 py-2 bg-pepper-fizz text-pepper-dark rounded-lg font-medium hover:bg-pepper-burgundy hover:text-pepper-cream transition-colors"
                  >
                    Surprise Me
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFlavors.map((flavor, index) => (
                  <FlavorCard key={flavor.id} flavor={flavor} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
