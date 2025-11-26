import { RarityScore } from '@/types/flavor'

interface RarityDisplayProps {
  score: RarityScore
  showLabel?: boolean
}

export default function RarityDisplay({ score, showLabel = true }: RarityDisplayProps) {
  const stars = []
  const maxStars = 10

  for (let i = 1; i <= maxStars; i++) {
    if (i <= score) {
      stars.push(
        <span key={i} className="text-amber-500" aria-hidden="true">
          ★
        </span>
      )
    } else {
      stars.push(
        <span key={i} className="text-gray-300" aria-hidden="true">
          ☆
        </span>
      )
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex" aria-label={`Rarity: ${score} out of ${maxStars} stars`}>
        {stars}
      </div>
      {showLabel && (
        <span className="text-sm text-pepper-dark font-medium">{score}/10</span>
      )}
    </div>
  )
}
