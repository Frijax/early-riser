// Core type definitions for Early Riser

export interface NewsArticle {
  id: string
  title: string
  description: string
  content: string
  source: string
  author?: string
  publishedAt: Date
  url: string
  imageUrl?: string
  relevanceScore: number
  sentiment: 'positive' | 'negative' | 'neutral'
  tickers: string[]
  categories: string[]
}

export interface MarketQuote {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap?: number
  high24h?: number
  low24h?: number
  lastUpdated: Date
}

export interface TradeIdea {
  id: string
  symbol: string
  assetType: 'stock' | 'crypto' | 'forex' | 'commodity'
  direction: 'long' | 'short'
  rationale: string
  entryPrice: number
  targetPrice: number
  stopLoss: number
  riskReward: number
  timeframe: string
  confidence: number
  relatedNews: string[]
  createdAt: Date
}

export interface UserPreferences {
  watchlist: string[]
  favoriteCategories: string[]
  notificationSettings: {
    priceAlerts: boolean
    newsAlerts: boolean
    tradeIdeas: boolean
  }
  displaySettings: {
    compactMode: boolean
    showCharts: boolean
    autoRefresh: boolean
  }
}

export type AssetType = 'stock' | 'crypto' | 'forex' | 'commodity'
export type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'
export type SentimentType = 'positive' | 'negative' | 'neutral'