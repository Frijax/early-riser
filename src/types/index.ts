// Core type definitions for Early Riser

// ========================================
// Enums
// ========================================

export enum AssetType {
  STOCK = 'stock',
  CRYPTO = 'crypto',
  FOREX = 'forex',
  COMMODITY = 'commodity',
  INDEX = 'index',
}

export enum SentimentType {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NEUTRAL = 'neutral',
}

export enum TimeRange {
  HOUR_1 = '1h',
  HOURS_4 = '4h',
  HOURS_12 = '12h',
  DAY_1 = '1d',
  DAYS_7 = '7d',
  DAYS_30 = '30d',
}

// ========================================
// News Types
// ========================================

export interface NewsArticle {
  id: string
  title: string
  description: string
  content: string
  source: string
  publishedAt: Date
  url: string
  relevanceScore: number // 0-1
  sentiment: SentimentType
  tickers: string[]
  categories: string[]
  imageUrl?: string
}

export interface NewsQueryParams {
  categories?: string[]
  tickers?: string[]
  sentiment?: SentimentType[]
  from?: Date
  to?: Date
  limit?: number
  offset?: number
}

export interface NewsFilters {
  categories: string[]
  sentiment: SentimentType[]
  tickers: string[]
  timeRange: TimeRange
  searchQuery: string
}

// ========================================
// Market Data Types
// ========================================

export interface MarketQuote {
  symbol: string
  name: string
  assetType: AssetType
  price: number
  change: number
  changePercent: number
  volume: number
  dayHigh: number
  dayLow: number
  previousClose: number
  timestamp: Date
  // Optional fields
  preMarketPrice?: number
  preMarketChange?: number
  afterHoursPrice?: number
  afterHoursChange?: number
}

export interface OHLCV {
  timestamp: Date
  open: number
  high: number
  low: number
  close: number
  volume: number
}

// ========================================
// Trade Ideas Types
// ========================================

export interface TradeIdea {
  id: string
  symbol: string
  assetType: AssetType
  direction: 'long' | 'short'
  entry: number
  entryMin?: number
  entryMax?: number
  target: number
  targets?: number[] // Multiple targets
  stop: number
  riskRewardRatio: number
  confidence: number // 0-1
  rationale: string
  relatedNews: string[] // NewsArticle IDs
  timeframe: 'intraday' | 'swing' | 'position'
  generatedAt: Date
  status: 'active' | 'archived' | 'completed'
  outcome?: 'win' | 'loss' | 'scratch'
}

export interface IdeaContext {
  recentNews: NewsArticle[]
  marketData: MarketQuote[]
  watchlist: string[]
}

export interface TradeRule {
  id: string
  name: string
  description: string
  assetTypes: AssetType[]
  evaluate(context: RuleContext): boolean
  generate(context: RuleContext): Partial<TradeIdea>
}

export interface RuleContext {
  news: NewsArticle[]
  quote: MarketQuote
  historical?: OHLCV[]
  relatedNews?: NewsArticle[]
}

// ========================================
// User Preferences Types
// ========================================

export interface UserPreferences {
  watchlist: WatchlistItem[]
  favoriteCategories: string[]
  hiddenCategories: string[]
  defaultFilters: Partial<NewsFilters>
  notifications: NotificationSettings
  theme: 'light' | 'dark' | 'auto'
}

export interface WatchlistItem {
  symbol: string
  assetType: AssetType
  addedAt: Date
  displayName?: string
}

export interface NotificationSettings {
  enabled: boolean
  highPriorityNews: boolean
  tradeIdeas: boolean
  priceAlerts: boolean
  sound: boolean
}

// ========================================
// API & Service Types
// ========================================

export interface ApiError {
  message: string
  status?: number
  code?: string
  retryable: boolean
}

export interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

// ========================================
// Store State Types
// ========================================

export interface LoadingState {
  isLoading: boolean
  error: string | null
}

export interface PaginationState {
  page: number
  limit: number
  total: number
  hasMore: boolean
}
