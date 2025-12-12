import { create } from 'zustand'
import type { NewsArticle, NewsFilters, LoadingState, TimeRange, SentimentType } from '@/types'

interface NewsStore extends LoadingState {
  // State
  articles: NewsArticle[]
  filters: NewsFilters
  sortBy: 'time' | 'relevance'

  // Actions
  setArticles: (articles: NewsArticle[]) => void
  addArticles: (articles: NewsArticle[]) => void
  clearArticles: () => void
  setFilters: (filters: Partial<NewsFilters>) => void
  resetFilters: () => void
  setSortBy: (sortBy: 'time' | 'relevance') => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void

  // Computed selectors (via getters)
  getFilteredArticles: () => NewsArticle[]
  getSortedArticles: () => NewsArticle[]
}

const defaultFilters: NewsFilters = {
  categories: [],
  sentiment: [],
  tickers: [],
  timeRange: TimeRange.DAY_1,
  searchQuery: '',
}

export const useNewsStore = create<NewsStore>((set, get) => ({
  // Initial state
  articles: [],
  filters: defaultFilters,
  sortBy: 'time',
  isLoading: false,
  error: null,

  // Actions
  setArticles: (articles) => set({ articles }),

  addArticles: (newArticles) => set((state) => ({
    articles: [...state.articles, ...newArticles],
  })),

  clearArticles: () => set({ articles: [] }),

  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters },
  })),

  resetFilters: () => set({ filters: defaultFilters }),

  setSortBy: (sortBy) => set({ sortBy }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  // Computed selectors
  getFilteredArticles: () => {
    const { articles, filters } = get()

    return articles.filter((article) => {
      // Category filter
      if (filters.categories.length > 0) {
        const hasCategory = article.categories.some((cat) =>
          filters.categories.includes(cat)
        )
        if (!hasCategory) return false
      }

      // Sentiment filter
      if (filters.sentiment.length > 0) {
        if (!filters.sentiment.includes(article.sentiment)) return false
      }

      // Ticker filter
      if (filters.tickers.length > 0) {
        const hasTicker = article.tickers.some((ticker) =>
          filters.tickers.includes(ticker)
        )
        if (!hasTicker) return false
      }

      // Time range filter
      const now = new Date()
      const articleAge = now.getTime() - article.publishedAt.getTime()
      const maxAge = {
        [TimeRange.HOUR_1]: 60 * 60 * 1000,
        [TimeRange.HOURS_4]: 4 * 60 * 60 * 1000,
        [TimeRange.HOURS_12]: 12 * 60 * 60 * 1000,
        [TimeRange.DAY_1]: 24 * 60 * 60 * 1000,
        [TimeRange.DAYS_7]: 7 * 24 * 60 * 60 * 1000,
        [TimeRange.DAYS_30]: 30 * 24 * 60 * 60 * 1000,
      }[filters.timeRange]

      if (articleAge > maxAge) return false

      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        const matchesTitle = article.title.toLowerCase().includes(query)
        const matchesDescription = article.description.toLowerCase().includes(query)
        const matchesTickers = article.tickers.some((ticker) =>
          ticker.toLowerCase().includes(query)
        )
        if (!matchesTitle && !matchesDescription && !matchesTickers) return false
      }

      return true
    })
  },

  getSortedArticles: () => {
    const filtered = get().getFilteredArticles()
    const { sortBy } = get()

    return [...filtered].sort((a, b) => {
      if (sortBy === 'time') {
        return b.publishedAt.getTime() - a.publishedAt.getTime()
      } else {
        return b.relevanceScore - a.relevanceScore
      }
    })
  },
}))
