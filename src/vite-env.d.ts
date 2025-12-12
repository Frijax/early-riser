/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NEWSAPI_KEY: string
  readonly VITE_FINNHUB_KEY: string
  readonly VITE_POLYGON_KEY: string
  readonly VITE_ALPHAVANTAGE_KEY: string
  readonly VITE_TWELVEDATA_KEY: string
  readonly VITE_COINGECKO_KEY: string
  readonly VITE_WS_URL: string
  readonly VITE_ENABLE_NOTIFICATIONS: string
  readonly VITE_ENABLE_AI_INSIGHTS: string
  readonly VITE_USE_MOCK_DATA: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
