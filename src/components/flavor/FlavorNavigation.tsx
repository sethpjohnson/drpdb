'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Flavor } from '@/types/flavor'

interface FlavorNavigationProps {
  prevFlavor: Flavor
  nextFlavor: Flavor
}

export default function FlavorNavigation({ prevFlavor, nextFlavor }: FlavorNavigationProps) {
  const router = useRouter()

  const handleRandomFlavor = () => {
    // For static export, we'll just navigate to a random flavor from the list
    // In a real implementation, you'd want to get random from the full list
    router.push(`/flavor/${Math.random() > 0.5 ? prevFlavor.id : nextFlavor.id}`)
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
