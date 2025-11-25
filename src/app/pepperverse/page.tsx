'use client'

import { useState } from 'react'
import { getAllFlavors } from '@/lib/flavors'
import { Flavor } from '@/types/flavor'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function PepperversePage() {
  const flavors = getAllFlavors()
  const [hoveredFlavor, setHoveredFlavor] = useState<Flavor | null>(null)
  const [showLabels, setShowLabels] = useState(false)

  // Group flavors by their pepperverse type
  const planets = flavors.filter((f) => f.pepperversePosition?.type === 'planet')
  const comets = flavors.filter((f) => f.pepperversePosition?.type === 'comet')
  const astral = flavors.filter((f) => f.pepperversePosition?.type === 'astral')
  const blackHole = flavors.filter((f) => f.pepperversePosition?.type === 'black-hole')

  return (
    <div className="min-h-screen bg-gradient-to-b from-pepper-dark to-pepper-burgundy text-pepper-cream">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
          The Pepperverse
        </h1>
        <p className="text-center text-xl opacity-90 mb-8">
          A Cosmological Taxonomy of Dr Pepper Flavors
        </p>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-400"></div>
            <span className="text-sm">Classic/Orbital</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-400"></div>
            <span className="text-sm">Limited/Comet</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-400"></div>
            <span className="text-sm">Astral</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-black border border-white"></div>
            <span className="text-sm">Discontinued</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setShowLabels(!showLabels)}
            className="px-4 py-2 bg-pepper-cream text-pepper-dark rounded-lg font-medium hover:bg-pepper-fizz transition-colors"
          >
            {showLabels ? 'Hide Labels' : 'Show Labels'}
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-pepper-burgundy text-pepper-cream rounded-lg font-medium hover:bg-pepper-burgundy-dark transition-colors border-2 border-pepper-cream"
          >
            Back to Database
          </Link>
        </div>
      </div>

      {/* SVG Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-black/30 rounded-lg p-8 overflow-hidden">
          <svg
            viewBox="0 0 1000 700"
            className="w-full h-auto"
            role="img"
            aria-label="Cosmological map of Dr Pepper flavors"
          >
            {/* Background stars */}
            {[...Array(50)].map((_, i) => (
              <circle
                key={`star-${i}`}
                cx={Math.random() * 1000}
                cy={Math.random() * 700}
                r={Math.random() * 2}
                fill="white"
                opacity={Math.random() * 0.8}
              />
            ))}

            {/* Master Pepper Star */}
            <g>
              <motion.circle
                cx="500"
                cy="350"
                r="50"
                fill="url(#masterGradient)"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <text
                x="500"
                y="430"
                textAnchor="middle"
                fill="white"
                fontSize="20"
                fontWeight="bold"
              >
                Master Pepper
              </text>
            </g>

            {/* Orbit paths */}
            <circle
              cx="500"
              cy="350"
              r="150"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="5,5"
              opacity="0.3"
            />
            <circle
              cx="500"
              cy="350"
              r="250"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="5,5"
              opacity="0.3"
            />

            {/* Orbital Flavors (Planets) */}
            {planets.map((flavor, index) => {
              if (!flavor.pepperversePosition) return null
              return (
                <g key={flavor.id}>
                  <Link href={`/flavor/${flavor.id}`}>
                    <motion.circle
                      cx={flavor.pepperversePosition.x}
                      cy={flavor.pepperversePosition.y}
                      r="15"
                      fill="#60A5FA"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                      whileHover={{ scale: 1.3 }}
                      onMouseEnter={() => setHoveredFlavor(flavor)}
                      onMouseLeave={() => setHoveredFlavor(null)}
                      className="cursor-pointer"
                    />
                    {showLabels && (
                      <text
                        x={flavor.pepperversePosition.x}
                        y={flavor.pepperversePosition.y + 30}
                        textAnchor="middle"
                        fill="white"
                        fontSize="12"
                      >
                        {flavor.name.replace('Dr Pepper ', '')}
                      </text>
                    )}
                  </Link>
                </g>
              )
            })}

            {/* Comets */}
            {comets.map((flavor, index) => {
              if (!flavor.pepperversePosition) return null
              return (
                <g key={flavor.id}>
                  <Link href={`/flavor/${flavor.id}`}>
                    <motion.circle
                      cx={flavor.pepperversePosition.x}
                      cy={flavor.pepperversePosition.y}
                      r="12"
                      fill="#4ADE80"
                      animate={{
                        x: [0, 20, 0],
                        y: [0, -10, 0],
                      }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                      whileHover={{ scale: 1.3 }}
                      onMouseEnter={() => setHoveredFlavor(flavor)}
                      onMouseLeave={() => setHoveredFlavor(null)}
                      className="cursor-pointer"
                    />
                    {showLabels && (
                      <text
                        x={flavor.pepperversePosition.x}
                        y={flavor.pepperversePosition.y + 25}
                        textAnchor="middle"
                        fill="white"
                        fontSize="11"
                      >
                        {flavor.name.replace('Dr Pepper ', '')}
                      </text>
                    )}
                  </Link>
                </g>
              )
            })}

            {/* Astral Projections */}
            {astral.map((flavor, index) => {
              if (!flavor.pepperversePosition) return null
              return (
                <g key={flavor.id}>
                  <Link href={`/flavor/${flavor.id}`}>
                    <motion.circle
                      cx={flavor.pepperversePosition.x}
                      cy={flavor.pepperversePosition.y}
                      r="18"
                      fill="url(#astralGradient)"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      whileHover={{ scale: 1.3 }}
                      onMouseEnter={() => setHoveredFlavor(flavor)}
                      onMouseLeave={() => setHoveredFlavor(null)}
                      className="cursor-pointer"
                    />
                    {showLabels && (
                      <text
                        x={flavor.pepperversePosition.x}
                        y={flavor.pepperversePosition.y + 32}
                        textAnchor="middle"
                        fill="white"
                        fontSize="11"
                      >
                        {flavor.name.replace('Dr Pepper ', '')}
                      </text>
                    )}
                  </Link>
                </g>
              )
            })}

            {/* Black Hole */}
            <g>
              <motion.circle
                cx="200"
                cy="600"
                r="60"
                fill="black"
                stroke="white"
                strokeWidth="2"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
              <text
                x="200"
                y="680"
                textAnchor="middle"
                fill="white"
                fontSize="16"
                fontWeight="bold"
              >
                The Vendor Promotion Cycle
              </text>
            </g>

            {/* Discontinued flavors spiraling into black hole */}
            {blackHole.map((flavor, index) => {
              if (!flavor.pepperversePosition) return null
              return (
                <g key={flavor.id}>
                  <Link href={`/flavor/${flavor.id}`}>
                    <motion.circle
                      cx={flavor.pepperversePosition.x}
                      cy={flavor.pepperversePosition.y}
                      r="10"
                      fill="#EF4444"
                      animate={{
                        x: [0, -10, -20],
                        y: [0, 5, 10],
                        scale: [1, 0.8, 0.6],
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'easeIn' }}
                      whileHover={{ scale: 1.3 }}
                      onMouseEnter={() => setHoveredFlavor(flavor)}
                      onMouseLeave={() => setHoveredFlavor(null)}
                      className="cursor-pointer"
                    />
                    {showLabels && (
                      <text
                        x={flavor.pepperversePosition.x}
                        y={flavor.pepperversePosition.y + 20}
                        textAnchor="middle"
                        fill="white"
                        fontSize="10"
                      >
                        {flavor.name.replace('Dr Pepper ', '')}
                      </text>
                    )}
                  </Link>
                </g>
              )
            })}

            {/* Gradients */}
            <defs>
              <radialGradient id="masterGradient">
                <stop offset="0%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#7F1D1D" />
              </radialGradient>
              <linearGradient id="astralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Hover Tooltip */}
          {hoveredFlavor && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 right-4 bg-pepper-cream text-pepper-dark p-4 rounded-lg shadow-xl max-w-xs"
            >
              <h3 className="font-display font-bold text-lg mb-1">{hoveredFlavor.name}</h3>
              <p className="text-sm mb-1">
                <span className="font-medium">Category:</span> {hoveredFlavor.category}
              </p>
              <p className="text-sm mb-1">
                <span className="font-medium">Authenticity:</span> {hoveredFlavor.authenticity}
              </p>
              <p className="text-sm italic">&ldquo;{hoveredFlavor.lore.slice(0, 100)}...&rdquo;</p>
              <p className="text-xs mt-2 text-pepper-burgundy">Click to view details →</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-lg opacity-90 leading-relaxed">
          The Pepperverse represents the cosmological arrangement of all known Dr Pepper flavors.
          Classic flavors orbit the Master Pepper star in stable paths. Limited editions drift as
          comets through the outer reaches. Astral projections exist beyond conventional spacetime.
          Discontinued flavors spiral inexorably into The Vendor Promotion Cycle, a black hole from
          which no flavor returns.
        </p>
      </div>
    </div>
  )
}
