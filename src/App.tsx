import { useState } from 'react'
import { Sun, TrendingUp, Newspaper, Target } from 'lucide-react'

function App() {
  const [currentTime] = useState(new Date())

  const greeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-warm-50 to-sand-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-warm-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sun className="w-8 h-8 text-warm-500" />
              <h1 className="text-2xl font-serif font-bold text-warm-900">Early Riser</h1>
            </div>
            <div className="text-sm text-warm-700">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting Section */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-4xl font-serif text-warm-900 mb-2">{greeting()} ☕</h2>
          <p className="text-warm-700 text-lg">Here's what's moving markets today</p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-warm-200 hover:shadow-lg transition-shadow animate-slide-up">
            <div className="flex items-center space-x-3 mb-4">
              <Newspaper className="w-6 h-6 text-warm-500" />
              <h3 className="text-lg font-semibold text-warm-900">Top Stories</h3>
            </div>
            <p className="text-warm-700 text-sm">Curated news from across markets with AI-powered relevance scoring</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-warm-200 hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6 text-warm-500" />
              <h3 className="text-lg font-semibold text-warm-900">Market Movers</h3>
            </div>
            <p className="text-warm-700 text-sm">Real-time tracking of significant price movements and volume spikes</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-warm-200 hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-6 h-6 text-warm-500" />
              <h3 className="text-lg font-semibold text-warm-900">Trade Ideas</h3>
            </div>
            <p className="text-warm-700 text-sm">AI-generated setups based on breaking news and technical patterns</p>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-warm-100 to-cream-100 rounded-2xl p-8 border border-warm-200 text-center">
          <h3 className="text-2xl font-serif text-warm-900 mb-4">Welcome to Early Riser</h3>
          <p className="text-warm-700 mb-6 max-w-2xl mx-auto">
            Your morning market companion is being built. This alpha aggregator will help you catch 
            the best opportunities before the market fully wakes up. Stay tuned for real-time news, 
            market data, and AI-powered trade ideas.
          </p>
          <div className="inline-flex items-center space-x-2 text-warm-600 text-sm">
            <span className="animate-pulse">🚀</span>
            <span>Coming soon: Full market intelligence dashboard</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-12">
        <div className="text-center text-warm-600 text-sm">
          <p>Early Riser - For informational purposes only. Not financial advice.</p>
        </div>
      </footer>
    </div>
  )
}

export default App