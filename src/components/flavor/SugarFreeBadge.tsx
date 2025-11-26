interface SugarFreeBadgeProps {
  isSugarFree: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function SugarFreeBadge({ isSugarFree, size = 'md' }: SugarFreeBadgeProps) {
  // Return null if not sugar free - no badge needed
  if (!isSugarFree) {
    return null
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border bg-green-100 text-green-800 border-green-300 ${sizeClasses[size]}`}
      role="status"
      aria-label="Sugar Free"
    >
      Sugar Free
    </span>
  )
}
