'use client'

import { useEffect, useState } from 'react'

export default function Footer() {
  const [sips, setSips] = useState(0)

  useEffect(() => {
    // Fun counter that increments randomly
    const interval = setInterval(() => {
      setSips((prev) => prev + Math.floor(Math.random() * 3))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="bg-pepper-cream border-t-2 border-pepper-burgundy mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-display font-bold text-pepper-burgundy mb-2">
              About This Archive
            </h3>
            <p className="text-sm text-pepper-dark">
              The Comprehensive Dr Pepper Flavor Archive. Cataloguing carbonated joy
              with unnecessary rigor since an arbitrarily chosen date.
            </p>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="font-display font-bold text-pepper-burgundy mb-2">
              Disclaimer
            </h3>
            <p className="text-sm text-pepper-dark">
              This is a fan page. Not affiliated with Dr Pepper. Most flavors are
              fictional. Some lore may contain traces of truth. Consult The Pepper
              Keepers for verification.
            </p>
          </div>

          {/* Stats */}
          <div>
            <h3 className="font-display font-bold text-pepper-burgundy mb-2">
              Archive Statistics
            </h3>
            <div className="text-sm text-pepper-dark space-y-1">
              <p>Total Sips Consumed: {sips.toLocaleString()}</p>
              <p>Sips Remaining: ∞ - 1</p>
              <p>Dimensional Stability: Questionable</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-pepper-burgundy/20 text-center text-sm text-pepper-dark">
          <p>
            © {new Date().getFullYear()} Dr Pepper Database. All rights reserved
            (probably). Built with delightful over-engineering.
          </p>
        </div>
      </div>
    </footer>
  )
}
