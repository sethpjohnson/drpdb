'use client'

import { useState } from 'react'
import Image from 'next/image'

interface FlavorImageProps {
  imageUrl: string | null | undefined
  flavorName: string
}

export default function FlavorImage({ imageUrl, flavorName }: FlavorImageProps) {
  const [imageError, setImageError] = useState(false)

  const showImage = imageUrl && !imageError

  return (
    <div className="aspect-[3/4] bg-pepper-fizz rounded-lg flex items-center justify-center border-4 border-dashed border-pepper-burgundy/30 paper-texture sticky top-24 overflow-hidden relative">
      {showImage ? (
        <Image
          src={imageUrl}
          alt={`${flavorName} bottle`}
          fill
          className="object-cover"
          unoptimized
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-32 h-32 bg-pepper-burgundy rounded-full flex items-center justify-center">
          <span className="text-pepper-cream font-bold text-6xl">Dr</span>
        </div>
      )}
    </div>
  )
}
