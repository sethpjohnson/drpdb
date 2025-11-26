'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Flavor } from '@/types/flavor'
import SugarFreeBadge from './SugarFreeBadge'
import RarityDisplay from './RarityDisplay'
import { motion } from 'framer-motion'

interface FlavorCardProps {
  flavor: Flavor
  index?: number
}

export default function FlavorCard({ flavor, index = 0 }: FlavorCardProps) {
  const [imageError, setImageError] = useState(false)
  const categoryColors = {
    Classic: 'bg-blue-50 border-blue-200',
    Seasonal: 'bg-green-50 border-green-200',
    Experimental: 'bg-purple-50 border-purple-200',
    Forbidden: 'bg-red-50 border-red-200',
  }

  // Add basePath prefix for GitHub Pages deployment
  const basePath = '/drpdb'
  const fullImageUrl = flavor.imageUrl ? `${basePath}${flavor.imageUrl}` : null

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="group"
    >
      <Link href={`/flavor/${flavor.id}`} className="block">
        <div
          className={`h-full paper-texture rounded-lg border-2 dotted-border p-6 transition-all hover:shadow-lg ${
            categoryColors[flavor.category]
          }`}
        >
          {/* Image Section */}
          <div className="aspect-[3/4] bg-pepper-fizz rounded-md mb-4 flex items-center justify-center border-2 border-dashed border-pepper-burgundy/30 overflow-hidden relative">
            {fullImageUrl && !imageError ? (
              <Image
                src={fullImageUrl}
                alt={`${flavor.name} bottle`}
                fill
                className="object-cover"
                unoptimized
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-16 h-16 bg-pepper-burgundy rounded-full flex items-center justify-center">
                <span className="text-pepper-cream font-bold text-2xl">Dr</span>
              </div>
            )}
          </div>

          {/* Header */}
          <div className="mb-3">
            <h3 className="font-display font-bold text-lg text-pepper-burgundy mb-2 group-hover:underline">
              {flavor.name}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <SugarFreeBadge isSugarFree={flavor.sugar_free} size="sm" />
              <span className="text-xs text-pepper-dark px-2 py-0.5 bg-white/50 rounded border">
                {flavor.category}
              </span>
            </div>
          </div>

          {/* Lore */}
          <p className="text-sm text-pepper-dark mb-4 line-clamp-3 italic">
            &ldquo;{flavor.lore}&rdquo;
          </p>

          {/* Metadata */}
          <div className="space-y-2 text-xs text-pepper-dark border-t border-pepper-burgundy/20 pt-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Released:</span>
              <span>{flavor.releaseYear}</span>
            </div>
            <div>
              <span className="font-medium block mb-1">Rarity:</span>
              <RarityDisplay score={flavor.rarityScore} showLabel={false} />
            </div>
          </div>

          {/* View Details */}
          <div className="mt-4 pt-3 border-t border-pepper-burgundy/20">
            <span className="text-sm font-medium text-pepper-burgundy group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
