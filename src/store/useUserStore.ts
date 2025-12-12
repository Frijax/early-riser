import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserPreferences, WatchlistItem, NewsFilters, AssetType } from '@/types'

const defaultPreferences: UserPreferences = {
  watchlist: [
    // Default watchlist items
    { symbol: 'SPY', assetType: 'index' as AssetType, addedAt: new Date() },
    { symbol: 'QQQ', assetType: 'index' as AssetType, addedAt: new Date() },
    { symbol: 'AAPL', assetType: 'stock' as AssetType, addedAt: new Date() },
    { symbol: 'BTC', assetType: 'crypto' as AssetType, addedAt: new Date() },
  ],
  favoriteCategories: [],
  hiddenCategories: [],
  defaultFilters: {},
  notifications: {
    enabled: true,
    highPriorityNews: true,
    tradeIdeas: true,
    priceAlerts: false,
    sound: false,
  },
  theme: 'light',
}

interface UserStore {
  preferences: UserPreferences

  // Actions
  setPreferences: (preferences: Partial<UserPreferences>) => void
  addToWatchlist: (item: WatchlistItem) => void
  removeFromWatchlist: (symbol: string) => void
  reorderWatchlist: (fromIndex: number, toIndex: number) => void
  toggleFavoriteCategory: (category: string) => void
  toggleHiddenCategory: (category: string) => void
  setDefaultFilters: (filters: Partial<NewsFilters>) => void
  setNotificationSettings: (settings: Partial<UserPreferences['notifications']>) => void
  setTheme: (theme: 'light' | 'dark' | 'auto') => void
  resetToDefaults: () => void

  // Computed selectors
  isInWatchlist: (symbol: string) => boolean
  isFavoriteCategory: (category: string) => boolean
  isHiddenCategory: (category: string) => boolean
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // Initial state
      preferences: defaultPreferences,

      // Actions
      setPreferences: (newPreferences) => set((state) => ({
        preferences: { ...state.preferences, ...newPreferences },
      })),

      addToWatchlist: (item) => set((state) => {
        const exists = state.preferences.watchlist.some(
          (w) => w.symbol === item.symbol
        )
        if (exists) return state

        return {
          preferences: {
            ...state.preferences,
            watchlist: [...state.preferences.watchlist, item],
          },
        }
      }),

      removeFromWatchlist: (symbol) => set((state) => ({
        preferences: {
          ...state.preferences,
          watchlist: state.preferences.watchlist.filter((w) => w.symbol !== symbol),
        },
      })),

      reorderWatchlist: (fromIndex, toIndex) => set((state) => {
        const newWatchlist = [...state.preferences.watchlist]
        const [removed] = newWatchlist.splice(fromIndex, 1)
        newWatchlist.splice(toIndex, 0, removed)

        return {
          preferences: {
            ...state.preferences,
            watchlist: newWatchlist,
          },
        }
      }),

      toggleFavoriteCategory: (category) => set((state) => {
        const { favoriteCategories } = state.preferences
        const newFavorites = favoriteCategories.includes(category)
          ? favoriteCategories.filter((c) => c !== category)
          : [...favoriteCategories, category]

        return {
          preferences: {
            ...state.preferences,
            favoriteCategories: newFavorites,
          },
        }
      }),

      toggleHiddenCategory: (category) => set((state) => {
        const { hiddenCategories } = state.preferences
        const newHidden = hiddenCategories.includes(category)
          ? hiddenCategories.filter((c) => c !== category)
          : [...hiddenCategories, category]

        return {
          preferences: {
            ...state.preferences,
            hiddenCategories: newHidden,
          },
        }
      }),

      setDefaultFilters: (filters) => set((state) => ({
        preferences: {
          ...state.preferences,
          defaultFilters: { ...state.preferences.defaultFilters, ...filters },
        },
      })),

      setNotificationSettings: (settings) => set((state) => ({
        preferences: {
          ...state.preferences,
          notifications: { ...state.preferences.notifications, ...settings },
        },
      })),

      setTheme: (theme) => set((state) => ({
        preferences: {
          ...state.preferences,
          theme,
        },
      })),

      resetToDefaults: () => set({ preferences: defaultPreferences }),

      // Computed selectors
      isInWatchlist: (symbol) => {
        return get().preferences.watchlist.some((w) => w.symbol === symbol)
      },

      isFavoriteCategory: (category) => {
        return get().preferences.favoriteCategories.includes(category)
      },

      isHiddenCategory: (category) => {
        return get().preferences.hiddenCategories.includes(category)
      },
    }),
    {
      name: 'early-riser-user-preferences',
    }
  )
)
