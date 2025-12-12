import { Sun } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sun className="h-12 w-12 text-warm-500" />
            <h1 className="text-5xl font-serif font-bold text-warm-900">
              Early Riser
            </h1>
          </div>
          <p className="text-warm-600 text-lg">
            Morning market intelligence — catch alpha before the market wakes up
          </p>
        </header>

        {/* Status Card */}
        <div className="card p-8 mb-8 animate-slide-up">
          <h2 className="text-2xl font-serif font-semibold text-warm-900 mb-4">
            🎉 Phase 1 Complete!
          </h2>

          <div className="space-y-3 text-warm-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>✅ Zustand store structure (Issue #3)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>✅ Base API client with error handling (Issue #4)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>✅ Caching layer (Issue #5)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>✅ Loading/error state patterns (Issue #6)</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-warm-50 rounded-lg border border-warm-200">
            <h3 className="font-semibold text-warm-900 mb-2">Ready for Phase 2!</h3>
            <p className="text-sm text-warm-600">
              The core data infrastructure is in place. Now we can start building the news aggregation module.
            </p>
          </div>
        </div>

        {/* Architecture Overview */}
        <div className="card p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-serif font-semibold text-warm-900 mb-4">
            Architecture Overview
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-warm-800 mb-2">State Management</h3>
              <ul className="text-sm text-warm-600 space-y-1">
                <li>• News Store - articles & filters</li>
                <li>• Market Store - quotes & watchlist</li>
                <li>• Trade Store - generated ideas</li>
                <li>• User Store - preferences (persisted)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">Services</h3>
              <ul className="text-sm text-warm-600 space-y-1">
                <li>• API Client - retry, rate limits, interceptors</li>
                <li>• Hybrid Cache - memory + localStorage</li>
                <li>• Error handling - typed errors</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">Components</h3>
              <ul className="text-sm text-warm-600 space-y-1">
                <li>• LoadingState with skeletons</li>
                <li>• ErrorState with retry</li>
                <li>• EmptyState with actions</li>
                <li>• AsyncBoundary wrapper</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">Design System</h3>
              <ul className="text-sm text-warm-600 space-y-1">
                <li>• Warm color palette (cream/warm/sage/sand)</li>
                <li>• Inter + Merriweather fonts</li>
                <li>• Glass morphism effects</li>
                <li>• Smooth animations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-warm-500 text-sm">
          <p>Built with React, TypeScript, Zustand, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  )
}

export default App
