import { create } from 'zustand'
import type { MarketQuote, AssetType, LoadingState } from '@/types'

interface MarketStore extends LoadingState {
  // State
  quotes: Map<string, MarketQuote>
  watchlist: string[]
  lastUpdated: Date | null

  // Actions
  setQuote: (quote: MarketQuote) => void
  setQuotes: (quotes: MarketQuote[]) => void
  removeQuote: (symbol: string) => void
  clearQuotes: () => void
  addToWatchlist: (symbol: string) => void
  removeFromWatchlist: (symbol: string) => void
  reorderWatchlist: (fromIndex: number, toIndex: number) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  setLastUpdated: () => void

  // Computed selectors
  getQuote: (symbol: string) => MarketQuote | undefined
  getWatchlistQuotes: () => MarketQuote[]
  getQuotesByType: (assetType: AssetType) => MarketQuote[]
}

export const useMarketStore = create<MarketStore>((set, get) => ({
  // Initial state
  quotes: new Map(),
  watchlist: [],
  lastUpdated: null,
  isLoading: false,
  error: null,

  // Actions
  setQuote: (quote) => set((state) => {
    const newQuotes = new Map(state.quotes)
    newQuotes.set(quote.symbol, quote)
    return { quotes: newQuotes }
  }),

  setQuotes: (quotes) => set(() => {
    const newQuotes = new Map()
    quotes.forEach((quote) => newQuotes.set(quote.symbol, quote))
    return { quotes: newQuotes }
  }),

  removeQuote: (symbol) => set((state) => {
    const newQuotes = new Map(state.quotes)
    newQuotes.delete(symbol)
    return { quotes: newQuotes }
  }),

  clearQuotes: () => set({ quotes: new Map() }),

  addToWatchlist: (symbol) => set((state) => {
    if (state.watchlist.includes(symbol)) return state
    return { watchlist: [...state.watchlist, symbol] }
  }),

  removeFromWatchlist: (symbol) => set((state) => ({
    watchlist: state.watchlist.filter((s) => s !== symbol),
  })),

  reorderWatchlist: (fromIndex, toIndex) => set((state) => {
    const newWatchlist = [...state.watchlist]
    const [removed] = newWatchlist.splice(fromIndex, 1)
    newWatchlist.splice(toIndex, 0, removed)
    return { watchlist: newWatchlist }
  }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setLastUpdated: () => set({ lastUpdated: new Date() }),

  // Computed selectors
  getQuote: (symbol) => {
    return get().quotes.get(symbol)
  },

  getWatchlistQuotes: () => {
    const { quotes, watchlist } = get()
    return watchlist
      .map((symbol) => quotes.get(symbol))
      .filter((quote): quote is MarketQuote => quote !== undefined)
  },

  getQuotesByType: (assetType) => {
    const { quotes } = get()
    return Array.from(quotes.values()).filter(
      (quote) => quote.assetType === assetType
    )
  },
}))
