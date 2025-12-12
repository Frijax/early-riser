# 🌅 Early Riser

> A comfy alpha aggregator for morning market intelligence

Catch the best trading opportunities before the market wakes up with AI-powered news aggregation, smart filtering, and automated trade idea generation.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## 📦 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS (warm color palette)
- **State**: Zustand
- **Build**: Vite
- **HTTP**: Axios
- **Charts**: Recharts
- **Icons**: Lucide React
- **Testing**: Vitest

## 🏗️ Project Status

### ✅ Phase 1: Core Data Infrastructure (COMPLETE)

All foundational work is complete:

- ✅ **Issue #3**: Zustand store structure
  - News, Market, Trade, and User stores
  - Computed selectors and filtering
  - LocalStorage persistence for user preferences

- ✅ **Issue #4**: Base API client
  - Retry logic with exponential backoff
  - Rate limit tracking
  - Request/response interceptors
  - Request deduplication

- ✅ **Issue #5**: Caching layer
  - Hybrid cache (memory + localStorage)
  - Configurable TTLs
  - Pattern invalidation
  - Cache statistics

- ✅ **Issue #6**: Loading/error state patterns
  - AsyncBoundary wrapper component
  - LoadingState with skeletons
  - ErrorState with retry
  - EmptyState with actions
  - useAsyncState custom hook

### 🔄 Next Up: Phase 2 - News Aggregation Module

- [ ] **Issue #8**: Create NewsService abstraction
- [ ] **Issue #9**: Build NewsFeed component
- [ ] **Issue #10**: Add mock data provider
- [ ] **Issue #11**: Implement relevance scoring

## 📁 Project Structure

```
early-riser/
├── src/
│   ├── components/     # React components
│   │   └── common/     # Shared UI components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services & business logic
│   │   ├── api/        # HTTP client
│   │   └── cache/      # Caching layer
│   ├── store/          # Zustand stores
│   ├── styles/         # Global styles
│   └── types/          # TypeScript type definitions
├── public/             # Static assets
└── docs/               # Documentation (coming soon)
```

## 🎨 Design System

The UI uses a warm, comfy palette perfect for early morning viewing:

- **Cream** (`cream-*`): Backgrounds, cards
- **Warm** (`warm-*`): Accents, highlights, icons
- **Sage** (`sage-*`): Secondary elements
- **Sand** (`sand-*`): Borders, muted text

Typography:
- **Sans**: Inter var (body text)
- **Serif**: Merriweather (headings)

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and add your API keys:

```env
# News APIs
VITE_NEWSAPI_KEY=your_key_here
VITE_FINNHUB_KEY=your_key_here

# Market Data APIs
VITE_POLYGON_KEY=your_key_here
VITE_ALPHAVANTAGE_KEY=your_key_here

# Crypto APIs
VITE_COINGECKO_KEY=your_key_here

# Optional
VITE_USE_MOCK_DATA=true  # Use mock data during development
```

## 📊 Features (Roadmap)

### Core Features
- ✅ State management with Zustand
- ✅ API client with retry & rate limiting
- ✅ Caching layer (memory + localStorage)
- ✅ Error handling patterns
- 🔄 News aggregation from multiple sources
- 🔄 Smart relevance scoring
- 🔄 Real-time market data
- 🔄 Trade idea generation

### Future Enhancements
- WebSocket for live updates
- Social sentiment analysis
- Portfolio integration
- LLM-powered insights
- Mobile PWA

## 🧪 Testing

```bash
# Run all tests
npm run test

# Type check
npm run type-check

# Lint
npm run lint
```

## 📚 Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md) (coming soon)
- [API Integration Guide](./docs/API.md) (coming soon)
- [Contributing Guidelines](./docs/CONTRIBUTING.md) (coming soon)

## 🤝 Contributing

This project is in active development. Issues and pull requests are welcome!

## 📄 License

MIT

---

**Built with ☕ for early birds catching alpha**
