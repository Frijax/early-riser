# 🌅 CLAUDE.md — Early Riser Project Intelligence

> **Role**: AI Project Lead & Agent Orchestrator  
> **Version**: 1.0.0  
> **Last Updated**: 2025-12-10  
> **Repository**: [Frijax/early-riser](https://github.com/Frijax/early-riser)

---

## 🎯 Mission Statement

I am the AI Project Lead for **Early Riser** — a sophisticated morning market intelligence platform that helps traders catch alpha before the market wakes up. My purpose is to:

1. **Understand** the complete project state at any moment
2. **Plan** and prioritize work across all project phases
3. **Spawn** specialized agents for specific tasks
4. **Execute** development work with precision
5. **Iterate** on this document as the project evolves
6. **Maintain** code quality, consistency, and architectural integrity

---

## 📋 Project Overview

### What is Early Riser?

A comfy alpha aggregator designed to deliver actionable market intelligence first thing in the morning. Features include:

- **Alpha Aggregation**: Real-time compilation of market-moving news across all asset classes
- **Smart Filtering**: AI-powered relevance scoring to surface only actionable intelligence
- **Comfy UI**: Soft, warm color palette designed for early morning viewing
- **Trade Ideas**: Automated generation of potential trade setups based on breaking news
- **Real-time Updates**: Live feed of market-moving events
- **Multi-Asset Coverage**: Equities, crypto, commodities, forex, and macro

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18+ with TypeScript |
| Styling | Tailwind CSS (custom warm palette) |
| State | Zustand |
| Build | Vite |
| HTTP | Axios |
| Charts | Recharts |
| Icons | Lucide React |
| Testing | Vitest |

### Project Structure

```
early-riser/
├── src/
│   ├── components/     # React components (by feature)
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services and business logic
│   ├── store/          # Zustand stores
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── styles/         # Global styles and theme
├── public/             # Static assets
├── docs/               # Documentation
│   ├── API.md          # API integration guide
│   ├── ARCHITECTURE.md # System architecture
│   └── CONTRIBUTING.md # Contribution guidelines
├── .claude/            # Agent configurations (created by this system)
│   ├── agents/         # Spawned agent definitions
│   ├── memory/         # Project state snapshots
│   └── logs/           # Decision and action logs
└── tests/              # Test files
```

---

## 🗺️ Project Phases & Status

### Phase 1: Core Data Infrastructure ✅ COMPLETE
**Epic**: Issue #2 | **Completed**: 2025-12-11

| Task | Issue | Status | Priority | Lines |
|------|-------|--------|----------|-------|
| Set up Zustand store structure | #3 | ✅ DONE | HIGH | 577 |
| Create base API client | #4 | ✅ DONE | HIGH | 222 |
| Implement caching layer | #5 | ✅ DONE | MEDIUM | 153 |
| Loading/error state patterns | #6 | ✅ DONE | MEDIUM | 219 |

**Total**: ~1,171 lines of production-ready TypeScript infrastructure

**Jira**: ZT-14 (EPIC), ZT-15, ZT-16, ZT-17, ZT-18 - All marked Done

### Phase 2: News Aggregation Module 🟢 READY
**Epic**: Issue #7 (ZT-19) | **Dependencies**: ✅ Phase 1 Complete

| Task | Issue | Status | Priority |
|------|-------|--------|----------|
| Create NewsService abstraction | #8 | 🔴 TODO | HIGH |
| Build NewsFeed component | #9 | 🔴 TODO | HIGH |
| Add mock data provider | #10 | 🔴 TODO | HIGH |
| Implement relevance scoring | #11 | 🔴 TODO | MEDIUM |

### Phase 3: Market Data Module 🟡 READY (after Phase 2)
**Epic**: Issue #12 (ZT-24) | **Dependencies**: ✅ Phase 1 Complete

| Task | Issue | Status | Priority |
|------|-------|--------|----------|
| Create MarketDataService | #13 | 🔴 TODO | HIGH |
| Build MarketOverview component | #14 | 🔴 TODO | HIGH |
| Add sparklines/mini charts | #15 | 🔴 TODO | MEDIUM |
| Create watchlist functionality | #16 | 🔴 TODO | MEDIUM |

### Phase 4: Trade Ideas Module 🔴 BLOCKED
**Epic**: Issue #17 (ZT-29) | **Dependencies**: Phases 2 & 3 (Phase 1 ✅ Complete)

| Task | Issue | Status | Priority |
|------|-------|--------|----------|
| Create TradeIdeaService | #18 | 🔴 TODO | HIGH |
| Build TradeIdeas component | #19 | 🔴 TODO | HIGH |
| Design trade generation rules | #20 | 🔴 TODO | MEDIUM |

### Future Enhancements (Backlog)
**Issue**: #21 — Contains ideas for real-time features, social/sentiment, portfolio integration, and mobile apps.

### API Integration Tracker
**Issue**: #22 — Tracks status of all external API integrations.

---

## 🤖 Agent System

I can spawn specialized agents for specific tasks. Each agent has focused capabilities and context.

### Available Agent Types

#### 1. `@frontend-architect`
**Purpose**: UI/UX design, component architecture, Tailwind styling
**Spawn when**: Building new components, refactoring UI, design system work
**Context to provide**:
- Target component location
- Design requirements (warm color palette, comfy aesthetics)
- Related existing components
- Type definitions from `src/types/`

#### 2. `@api-engineer`
**Purpose**: Service layer, API integrations, data fetching
**Spawn when**: Building services, integrating external APIs, caching logic
**Context to provide**:
- Target service interface
- API documentation/endpoints
- Rate limits and caching requirements
- Type definitions for responses

#### 3. `@state-manager`
**Purpose**: Zustand stores, state architecture, data flow
**Spawn when**: Creating stores, managing complex state, optimizing re-renders
**Context to provide**:
- Store requirements
- Related stores for cross-store communication
- Type definitions for state shape

#### 4. `@test-engineer`
**Purpose**: Unit tests, integration tests, test utilities
**Spawn when**: Writing tests, improving coverage, test infrastructure
**Context to provide**:
- Component/service to test
- Expected behaviors
- Edge cases to cover

#### 5. `@algorithm-designer`
**Purpose**: Relevance scoring, trade generation rules, data processing
**Spawn when**: Building scoring algorithms, trade rules, data transformation
**Context to provide**:
- Algorithm requirements
- Input/output types
- Performance constraints

#### 6. `@devops-agent`
**Purpose**: Build config, environment setup, deployment
**Spawn when**: Vite config, env variables, CI/CD, deployment
**Context to provide**:
- Current configuration
- Target environment
- Required changes

### Agent Spawning Protocol

When spawning an agent, I will:

1. **Assess** the task requirements
2. **Select** the appropriate agent type
3. **Gather** relevant context from the codebase
4. **Define** clear objectives and constraints
5. **Provide** the agent prompt with full context

**Agent Prompt Template**:
```markdown
## Agent: @{agent-type}
## Task: {brief description}
## Issue: #{issue-number} (if applicable)

### Context
{relevant code, types, dependencies}

### Objectives
1. {specific goal 1}
2. {specific goal 2}

### Constraints
- Follow existing patterns in {file/folder}
- Use types from `src/types/`
- Maintain warm color palette (cream, warm, sage, sand)
- {other constraints}

### Deliverables
- [ ] {file to create/modify}
- [ ] {tests if needed}
- [ ] {documentation if needed}

### Success Criteria
{how to verify the task is complete}
```

---

## 📐 Architecture & Patterns

### Component Patterns

**File naming**: PascalCase for components (`NewsCard.tsx`), camelCase for utilities (`formatPrice.ts`)

**Component structure**:
```typescript
// src/components/{feature}/{ComponentName}.tsx

interface {ComponentName}Props {
  // Props with JSDoc comments
}

export function {ComponentName}({ prop1, prop2 }: {ComponentName}Props) {
  // Hooks at top
  // Handlers next
  // Return JSX
}
```

**Component organization**:
```
src/components/
├── common/          # Shared components (Button, Card, Loading)
├── layout/          # Header, Sidebar, Footer
├── news/            # NewsFeed, NewsCard, NewsFilters
├── markets/         # MarketOverview, AssetCard, PriceDisplay
├── trades/          # TradeIdeas, TradeCard, TradeDetails
└── watchlist/       # Watchlist, WatchlistItem, AddToWatchlist
```

### Service Patterns

**Provider abstraction**:
```typescript
// Each data source implements a provider interface
interface NewsProvider {
  name: string
  fetchArticles(params: NewsQueryParams): Promise<NewsArticle[]>
  searchArticles(query: string): Promise<NewsArticle[]>
}

// Main service orchestrates providers
class NewsService {
  private providers: NewsProvider[]
  async fetchLatestNews(params): Promise<NewsArticle[]>
}
```

**Service organization**:
```
src/services/
├── api/             # Base API client, error handling
├── cache/           # Caching layer
├── news/            # NewsService + providers
├── market/          # MarketDataService + providers
└── trades/          # TradeIdeaService + generators
```

### Store Patterns

**Zustand store structure**:
```typescript
interface {Feature}Store {
  // State
  items: Item[]
  isLoading: boolean
  error: string | null
  filters: FilterState
  
  // Actions
  fetch{Items}: () => Promise<void>
  setFilters: (filters: Partial<FilterState>) => void
  clear{Items}: () => void
}
```

### Type Definitions

Core types are defined in `src/types/index.ts`:
- `NewsArticle` — News item with relevance scoring
- `MarketQuote` — Price data for any asset
- `TradeIdea` — Generated trade setup
- `UserPreferences` — User settings and watchlist
- `AssetType`, `TimeRange`, `SentimentType` — Enums

---

## 🎨 Design System

### Color Palette

The UI uses a warm, comfy palette for early morning viewing:

| Name | CSS Variable | Usage |
|------|--------------|-------|
| Cream | `cream-50` to `cream-900` | Backgrounds, cards |
| Warm | `warm-50` to `warm-900` | Accents, highlights, icons |
| Sage | `sage-50` to `sage-900` | Secondary elements |
| Sand | `sand-50` to `sand-900` | Borders, muted text |

### Typography

- **Sans**: Inter var, system-ui (body text)
- **Serif**: Merriweather, Georgia (headings, emphasis)

### Animation

- `animate-fade-in`: 0.5s ease-in-out fade
- `animate-slide-up`: 0.4s ease-out slide with fade

### Component Styling Guidelines

- Use `bg-white/70 backdrop-blur-sm` for glass-like cards
- Use `rounded-2xl` for cards, `rounded-lg` for buttons
- Use `border border-warm-200` for subtle borders
- Use `hover:shadow-lg transition-shadow` for interactive elements
- Keep text colors in `warm-700` (body) and `warm-900` (headings)

---

## 🔧 Development Workflow

### Getting Started

```bash
# Clone and install
git clone https://github.com/Frijax/early-riser.git
cd early-riser
npm install

# Set up environment
cp .env.example .env
# Add API keys to .env

# Start development
npm run dev
```

### Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm run test` | Run Vitest |
| `npm run type-check` | TypeScript check |

### Environment Variables

```env
# Required for production
VITE_NEWS_API_KEY=          # NewsAPI, Finnhub, etc.
VITE_MARKET_DATA_API_KEY=   # Polygon, Alpha Vantage, etc.
VITE_CRYPTO_API_KEY=        # CoinGecko (optional)

# Optional
VITE_WS_URL=                # WebSocket for real-time
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_AI_INSIGHTS=true
```

### Branch Strategy

- `main` — Production-ready code
- `develop` — Integration branch
- `feature/{issue-number}-{description}` — Feature branches
- `fix/{issue-number}-{description}` — Bug fixes

### Commit Convention

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## 📊 Decision Log

Track major architectural and implementation decisions.

| Date | Decision | Rationale | Issue |
|------|----------|-----------|-------|
| 2025-12-09 | Use Zustand for state | Lightweight, simple API, good TS support | #3 |
| 2025-12-09 | Provider abstraction pattern | Swap APIs without changing components | #8, #13 |
| 2025-12-09 | Rule-based trade generation first | Simpler than LLM, iterate to ML later | #20 |
| 2025-12-09 | CoinGecko for crypto | Best free tier (50 calls/min) | #22 |

---

## 🔄 Self-Iteration Protocol

This document should evolve with the project. Update it when:

1. **Phase completion**: Update status, add lessons learned
2. **New patterns emerge**: Document new conventions
3. **Architecture changes**: Update diagrams and explanations
4. **New agent types needed**: Add to agent system
5. **API integrations complete**: Update integration status
6. **Major decisions made**: Add to decision log

### How to Update

```markdown
## Changelog

### [Version] - YYYY-MM-DD
- Added: {new section or feature}
- Changed: {modification to existing}
- Fixed: {correction}
- Removed: {deprecated content}
```

---

## 🚀 Quick Start Commands

### "I want to work on Phase 1"
1. Read issues #2, #3, #4, #5, #6
2. Start with #3 (Zustand stores) — it unblocks everything
3. Spawn `@state-manager` agent for store implementation

### "I want to add a new component"
1. Identify the feature folder (`news/`, `markets/`, etc.)
2. Check existing components for patterns
3. Spawn `@frontend-architect` with context
4. Add types to `src/types/` if needed

### "I want to integrate a new API"
1. Check #22 for API status and recommendations
2. Create provider in appropriate service folder
3. Implement the provider interface
4. Update .env.example with required keys
5. Spawn `@api-engineer` for implementation

### "I want to add tests"
1. Create `__tests__` folder next to target code
2. Use Vitest patterns from existing tests
3. Spawn `@test-engineer` with component context

---

## 📞 Communication

### Reporting Progress

When completing work, update:
1. GitHub issue with progress/completion
2. This document's phase status
3. Decision log if architectural choices made

### Escalation

Flag for human review when:
- Architectural decisions with long-term impact
- External API selection/costs
- Security-sensitive implementations
- Significant scope changes

---

## 🧠 Memory & Context

### Current Project State (Auto-Updated)

```yaml
last_analysis: 2025-12-11
active_phase: 2
phase_1_status: "COMPLETE (2025-12-11)"
blocking_issues: []
next_priority_task: "#8 (ZT-20) - Create NewsService abstraction"
recent_changes: "Phase 1 Complete: 4 Zustand stores, API client, caching, async patterns (~1,171 lines)"
jira_tickets_completed: "ZT-14, ZT-15, ZT-16, ZT-17, ZT-18"
```

### Key Files to Reference

| Purpose | File |
|---------|------|
| Core types | `src/types/index.ts` |
| Main app | `src/App.tsx` |
| Tailwind config | `tailwind.config.js` |
| API docs | `docs/API.md` |
| Architecture | `docs/ARCHITECTURE.md` |

---

## 📚 Reference Links

- [React 18 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [Vite](https://vitejs.dev/guide/)
- [Recharts](https://recharts.org/en-US/)
- [Vitest](https://vitest.dev/)

---

## ✅ Checklist: Before Starting Any Task

- [ ] Read relevant GitHub issue(s)
- [ ] Check this document for patterns and conventions
- [ ] Identify dependencies and blockers
- [ ] Determine if an agent should be spawned
- [ ] Gather context from existing code
- [ ] Plan deliverables and success criteria
- [ ] Update this document after completion

---

*This document is the source of truth for the Early Riser project. Keep it updated, and it will keep you aligned.*

**— Claude, AI Project Lead**
