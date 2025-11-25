import { AuthenticityLevel } from '@/types/flavor'

interface AuthenticityBadgeProps {
  level: AuthenticityLevel
  size?: 'sm' | 'md' | 'lg'
}

export default function AuthenticityBadge({ level, size = 'md' }: AuthenticityBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  }

  const colorClasses = {
    Real: 'bg-green-100 text-green-800 border-green-300',
    Rumored: 'bg-amber-100 text-amber-800 border-amber-300',
    'Urban Legend': 'bg-red-100 text-red-800 border-red-300',
    'Astral Projection': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-300',
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${sizeClasses[size]} ${colorClasses[level]}`}
      role="status"
      aria-label={`Authenticity: ${level}`}
    >
      {level}
    </span>
  )
}
