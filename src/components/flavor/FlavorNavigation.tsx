'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Flavor } from '@/types/flavor'
import { getRandomFlavor } from '@/lib/flavors'

interface FlavorNavigationProps {
  prevFlavor: Flavor
  nextFlavor: Flavor
}

export default function FlavorNavigation({ prevFlavor, nextFlavor }: FlavorNavigationProps) {
  const router = useRouter()

  const handleRandomFlavor = () => {
    const randomFlavor = getRandomFlavor()
    router.push(`/flavor/${randomFlavor.id}`)
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      <Link
        href={`/flavor/${prevFlavor.id}`}
        className="px-3 py-2 text-sm bg-pepper-cream border-2 border-pepper-burgundy rounded-lg hover:bg-pepper-fizz transition-colors text-center"
        title={`Previous: ${prevFlavor.name}`}
      >
        ← Prev
      </Link>
      <button
        onClick={handleRandomFlavor}
        className="px-3 py-2 text-sm bg-pepper-burgundy text-pepper-cream rounded-lg hover:bg-pepper-burgundy-dark transition-colors"
      >
        🎲 Random
      </button>
      <Link
        href={`/flavor/${nextFlavor.id}`}
        className="px-3 py-2 text-sm bg-pepper-cream border-2 border-pepper-burgundy rounded-lg hover:bg-pepper-fizz transition-colors text-center"
        title={`Next: ${nextFlavor.name}`}
      >
        Next →
      </Link>
    </div>
  )
}
