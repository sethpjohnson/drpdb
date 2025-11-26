'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Database' },
    { href: '/pepperverse', label: 'Pepperverse' },
    { href: '/timeline', label: 'Timeline' },
    { href: '/merger', label: 'Merger' },
    { href: '/lab', label: 'Lab' },
    { href: '/api-docs', label: 'API' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-pepper-cream border-b-2 border-pepper-burgundy shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-pepper-burgundy rounded-full flex items-center justify-center text-pepper-cream font-bold text-xl">
              Dr
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-pepper-burgundy text-lg leading-none">
                Dr Pepper
              </span>
              <span className="text-xs text-pepper-dark uppercase tracking-wider">
                Database
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-pepper-burgundy text-pepper-cream'
                    : 'text-pepper-dark hover:bg-pepper-fizz'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-pepper-dark hover:bg-pepper-fizz focus:outline-none focus:ring-2 focus:ring-pepper-burgundy"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-pepper-burgundy/20">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-pepper-burgundy text-pepper-cream'
                    : 'text-pepper-dark hover:bg-pepper-fizz'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
