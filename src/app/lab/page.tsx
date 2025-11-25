'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface TheoreticalFlavor {
  name: string
  status: string
  statusColor: string
  description: string
  whyCantExist: string
  proposedBy: string
}

const theoreticalFlavors: TheoreticalFlavor[] = [
  {
    name: 'Dr Pepper Quantum Foam',
    status: 'Theoretically Impossible',
    statusColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description:
      'A flavor that exists in superposition until observed. Schrodinger refused to comment.',
    whyCantExist: "Violates Heisenberg's Flavor Uncertainty Principle",
    proposedBy: 'Dr. Fizz, 2019',
  },
  {
    name: 'Dr Pepper Reverse Osmosis',
    status: 'Legally Questionable',
    statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description:
      'Removes flavor while adding carbonation. Banned in 47 states, encouraged in 3.',
    whyCantExist: 'FDA said no',
    proposedBy: 'Anonymous, 2021',
  },
  {
    name: 'Dr Pepper Singularity',
    status: 'Dimensionally Unstable',
    statusColor: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    description:
      'Contains all possible Dr Pepper flavors compressed into a single point of infinite density.',
    whyCantExist: 'Would collapse into a black hole upon opening',
    proposedBy: 'The Pepper Keepers (classified), 2015',
  },
  {
    name: 'Dr Pepper Absolute Zero',
    status: 'Physics-Defying',
    statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description:
      'Achieves temperatures below absolute zero while remaining liquid. Tastes like the absence of taste.',
    whyCantExist: 'Thermodynamically impossible and also probably just ice',
    proposedBy: 'Lab Technician #7, 2020',
  },
  {
    name: 'Dr Pepper Recursion',
    status: 'Under Review',
    statusColor: 'bg-gray-100 text-gray-800 border-gray-300',
    description: 'Each sip contains a smaller version of itself. See: Dr Pepper Recursion.',
    whyCantExist: 'Stack overflow error in reality',
    proposedBy: 'Anonymous Developer, 2022',
  },
  {
    name: 'Dr Pepper Antimatter',
    status: 'Theoretically Impossible',
    statusColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description:
      'The opposite of Dr Pepper. Would annihilate normal Dr Pepper on contact.',
    whyCantExist: 'Would destroy the universe if it contacted regular Dr Pepper',
    proposedBy: 'CERN Cafeteria, 2017',
  },
  {
    name: 'Dr Pepper Placebo',
    status: 'Just a Bad Idea',
    statusColor: 'bg-gray-100 text-gray-800 border-gray-300',
    description: 'Contains no Dr Pepper. Just water. Tastes like disappointment.',
    whyCantExist: 'Already exists (it is just water)',
    proposedBy: 'Marketing Department, 2018',
  },
  {
    name: 'Dr Pepper Imaginary',
    status: 'Physics-Defying',
    statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description:
      'Exists only on the complex plane. Requires imaginary taste buds to experience.',
    whyCantExist: 'Cannot be bottled in three-dimensional space',
    proposedBy: 'Mathematics Department, 2019',
  },
]

export default function LabPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = [
    'All',
    'Physics-Defying',
    'Legally Questionable',
    'Dimensionally Unstable',
    'Just a Bad Idea',
    'Under Review',
    'Theoretically Impossible',
  ]

  const filteredFlavors =
    selectedCategory === 'All'
      ? theoreticalFlavors
      : theoreticalFlavors.filter((f) => f.status === selectedCategory)

  return (
    <div className="min-h-screen bg-pepper-offwhite">
      {/* Header */}
      <div className="bg-pepper-burgundy text-pepper-cream py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            The Theoretical Flavors Laboratory
          </h1>
          <p className="text-xl opacity-90 mb-2">
            Flavors that should not be, cannot be,
          </p>
          <p className="text-xl opacity-90">yet somehow still aren&apos;t</p>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6 mb-8">
          <p className="text-pepper-dark text-center">
            An archive of flavors proposed by the community but deemed too powerful, impossible, or
            legally questionable to exist in our dimension.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-pepper-burgundy text-pepper-cream'
                  : 'bg-pepper-cream text-pepper-dark border-2 border-pepper-burgundy/30 hover:bg-pepper-fizz'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Flavors Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredFlavors.map((flavor, index) => (
            <motion.div
              key={flavor.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg border-2 border-pepper-burgundy/30 p-6 hover:shadow-xl transition-all paper-texture"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display font-bold text-2xl text-pepper-burgundy pr-4">
                  {flavor.name}
                </h3>
                <span
                  className={`text-xs px-3 py-1 rounded-full border font-medium whitespace-nowrap ${flavor.statusColor}`}
                >
                  {flavor.status}
                </span>
              </div>

              <p className="text-pepper-dark mb-4 leading-relaxed">{flavor.description}</p>

              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-bold text-red-800 mb-1">Why It Can&apos;t Exist:</p>
                <p className="text-sm text-red-700">{flavor.whyCantExist}</p>
              </div>

              <p className="text-xs text-pepper-dark/60">
                <span className="font-medium">Proposed By:</span> {flavor.proposedBy}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Submit CTA */}
        <div className="bg-gradient-to-br from-pepper-burgundy to-pepper-burgundy-dark text-pepper-cream rounded-lg p-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Have a flavor too dangerous to exist?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Submit your theoretical flavor proposal to The Pepper Keepers for review.
          </p>
          <p className="text-sm opacity-75 mb-6">
            (Submissions are currently reviewed manually. Must be absurd. No actual product
            requests.)
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-pepper-cream text-pepper-burgundy rounded-lg font-bold hover:bg-pepper-fizz transition-colors"
          >
            Submit via GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
