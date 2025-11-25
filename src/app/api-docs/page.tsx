'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface EndpointExample {
  method: string
  path: string
  description: string
  response: string
  statusCode: number
}

const endpoints: EndpointExample[] = [
  {
    method: 'GET',
    path: '/v1/flavors',
    description: 'Returns all flavors in the database.',
    statusCode: 200,
    response: `{
  "flavors": [],
  "count": -1,
  "message": "The array is simultaneously full and empty"
}`,
  },
  {
    method: 'GET',
    path: '/v1/flavors/{id}',
    description: 'Returns a specific flavor.',
    statusCode: 404,
    response: `{
  "error": "Flavor exists but refuses to be observed",
  "schrödinger_index": 0.97
}`,
  },
  {
    method: 'GET',
    path: '/v1/flavors/random',
    description: 'Returns a random flavor.',
    statusCode: 200,
    response: `{
  "flavor": null,
  "message": "Random is too deterministic. Try again never."
}`,
  },
  {
    method: 'GET',
    path: '/v1/flavors/immortal',
    description: 'Retrieve flavors that transcend time.',
    statusCode: 404,
    response: `{
  "error": "Flavor Cannot Be Contained",
  "suggested_action": "Accept the void"
}`,
  },
  {
    method: 'POST',
    path: '/v1/flavors',
    description: 'Create a new flavor.',
    statusCode: 403,
    response: `{
  "error": "Only The Pepper Keepers may create",
  "trial_date": "Heat death of universe"
}`,
  },
  {
    method: 'DELETE',
    path: '/v1/flavors/{id}',
    description: 'Delete a flavor.',
    statusCode: 403,
    response: `{
  "error": "The Pepper Keepers forbid this",
  "consequences": "Severe"
}`,
  },
]

export default function APIDocsPage() {
  const [activeEndpoint, setActiveEndpoint] = useState<number | null>(null)
  const [tryResults, setTryResults] = useState<Record<number, string>>({})

  const handleTryIt = (index: number, endpoint: EndpointExample) => {
    setTryResults({ ...tryResults, [index]: 'Loading...' })

    setTimeout(() => {
      setTryResults({ ...tryResults, [index]: endpoint.response })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      {/* Header */}
      <div className="bg-pepper-burgundy-dark border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display text-4xl font-bold mb-2">Dr Pepper Database API</h1>
          <p className="text-pepper-cream/80">
            Version: π.0 (Irrational) | Status: Theoretically Available
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-2">
            <nav className="sticky top-4 space-y-1">
              <a
                href="#getting-started"
                className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Getting Started
              </a>
              <a
                href="#authentication"
                className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Authentication
              </a>
              <a
                href="#endpoints"
                className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Endpoints
              </a>
              <a
                href="#rate-limits"
                className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Rate Limits
              </a>
              <a
                href="#error-codes"
                className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Error Codes
              </a>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Getting Started */}
            <section id="getting-started" className="scroll-mt-8">
              <h2 className="font-display text-3xl font-bold mb-4">Getting Started</h2>
              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <p>Welcome to the Dr Pepper Database API documentation.</p>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>Don&apos;t.</li>
                  <li>
                    If you must, acquire an API key by submitting Form 23-B to the Department of
                    Carbonated Beverages.
                  </li>
                  <li>Wait 3-5 business centuries.</li>
                  <li>Key will arrive via pneumatic tube.</li>
                </ol>
                <div className="mt-4 bg-gray-900 rounded p-4 font-mono text-sm">
                  <div className="text-gray-500 mb-2"># Example Request</div>
                  <div className="text-green-400">curl https://api.drpprdb.com/v1/flavors</div>
                  <div className="text-gray-500 mt-2"># Returns: 418 I&apos;m a teapot</div>
                </div>
                <div className="bg-red-900/20 border border-red-500 rounded p-4 mt-4">
                  <p className="text-sm text-red-200">
                    <strong>Base URL:</strong> https://api.drpprdb.com/v1/ (Does not resolve)
                  </p>
                </div>
              </div>
            </section>

            {/* Authentication */}
            <section id="authentication" className="scroll-mt-8">
              <h2 className="font-display text-3xl font-bold mb-4">Authentication</h2>
              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <p>All requests require an API key in the header:</p>
                <div className="bg-gray-900 rounded p-4 font-mono text-sm">
                  <span className="text-blue-400">X-Pepper-Key</span>: your-key-here
                </div>
                <div className="bg-amber-900/20 border border-amber-500 rounded p-4">
                  <p className="text-sm text-amber-200">
                    <strong>Note:</strong> Keys expire every 23 seconds. Plan accordingly.
                  </p>
                </div>
                <h3 className="font-bold text-xl mt-6 mb-2">Obtaining a Key</h3>
                <p className="text-gray-300">
                  Keys are distributed via lottery system. Winners are notified via carrier pigeon.
                  Losers receive nothing.
                </p>
              </div>
            </section>

            {/* Endpoints */}
            <section id="endpoints" className="scroll-mt-8">
              <h2 className="font-display text-3xl font-bold mb-4">Endpoints</h2>
              <div className="space-y-4">
                {endpoints.map((endpoint, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setActiveEndpoint(activeEndpoint === index ? null : index)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`px-3 py-1 rounded font-bold text-sm ${
                            endpoint.method === 'GET'
                              ? 'bg-blue-600'
                              : endpoint.method === 'POST'
                              ? 'bg-green-600'
                              : 'bg-red-600'
                          }`}
                        >
                          {endpoint.method}
                        </span>
                        <span className="font-mono">{endpoint.path}</span>
                      </div>
                      <svg
                        className={`w-5 h-5 transition-transform ${
                          activeEndpoint === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {activeEndpoint === index && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 space-y-4">
                            <p className="text-gray-300">{endpoint.description}</p>

                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold">Response</h4>
                                <span
                                  className={`text-sm px-2 py-1 rounded ${
                                    endpoint.statusCode === 200
                                      ? 'bg-green-900/30 text-green-300'
                                      : 'bg-red-900/30 text-red-300'
                                  }`}
                                >
                                  {endpoint.statusCode}
                                </span>
                              </div>
                              <pre className="bg-gray-900 rounded p-4 font-mono text-sm overflow-x-auto">
                                <code>{endpoint.response}</code>
                              </pre>
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={() => handleTryIt(index, endpoint)}
                                className="px-4 py-2 bg-pepper-burgundy rounded hover:bg-pepper-burgundy-dark transition-colors"
                              >
                                Try It
                              </button>
                              {tryResults[index] && (
                                <button
                                  onClick={() => {
                                    const newResults = { ...tryResults }
                                    delete newResults[index]
                                    setTryResults(newResults)
                                  }}
                                  className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                                >
                                  Clear
                                </button>
                              )}
                            </div>

                            {tryResults[index] && (
                              <div className="bg-gray-900 rounded p-4">
                                <div className="text-sm text-gray-400 mb-2">Response:</div>
                                <pre className="font-mono text-sm">
                                  <code>{tryResults[index]}</code>
                                </pre>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>

            {/* Rate Limits */}
            <section id="rate-limits" className="scroll-mt-8">
              <h2 className="font-display text-3xl font-bold mb-4">Rate Limits</h2>
              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <strong>Free Tier:</strong> 0.5 requests per hour
                  </li>
                  <li>
                    <strong>Pro Tier:</strong> 1 request per hour
                  </li>
                  <li>
                    <strong>Enterprise:</strong> 1 request per hour but with a nicer error message
                  </li>
                </ul>
                <div className="bg-gray-900 rounded p-4 font-mono text-sm mt-4">
                  <div className="text-gray-500"># Rate Limit Headers</div>
                  <div>X-RateLimit-Remaining: -1</div>
                  <div>X-RateLimit-Reset: Never</div>
                </div>
              </div>
            </section>

            {/* Error Codes */}
            <section id="error-codes" className="scroll-mt-8">
              <h2 className="font-display text-3xl font-bold mb-4">Error Codes</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <table className="w-full text-left">
                  <thead className="border-b border-gray-700">
                    <tr>
                      <th className="pb-3 pr-4">Code</th>
                      <th className="pb-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-mono">200</td>
                      <td className="py-3">OK (rare)</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-mono">404</td>
                      <td className="py-3">Not Found (common)</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-mono">418</td>
                      <td className="py-3">I&apos;m a Teapot (always for beverage endpoints)</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-mono">451</td>
                      <td className="py-3">
                        Unavailable for Legal Reasons (all theoretical flavors)
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-mono">500</td>
                      <td className="py-3">
                        Internal Server Error (server is having an existential crisis)
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-mono">503</td>
                      <td className="py-3">Service Unavailable (service is available but unwilling)</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-mono">666</td>
                      <td className="py-3">Flavor Forbidden By Ancient Pact</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-mono">999</td>
                      <td className="py-3">Error code unknown even to the database</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SDKs */}
            <section className="scroll-mt-8">
              <h2 className="font-display text-3xl font-bold mb-4">Official SDKs</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <p className="mb-4">We offer SDKs for the following languages:</p>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <strong>JavaScript:</strong> Coming Soon™
                  </li>
                  <li>
                    <strong>Python:</strong> Under Review
                  </li>
                  <li>
                    <strong>Ruby:</strong> Lost in shipping
                  </li>
                  <li>
                    <strong>Go:</strong> Went
                  </li>
                  <li>
                    <strong>Rust:</strong> Oxidized
                  </li>
                  <li>
                    <strong>PHP:</strong> Please no
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-gray-900 rounded">
                  <h3 className="font-bold mb-2">Community Libraries</h3>
                  <p className="text-gray-400">None. The community knows better.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
