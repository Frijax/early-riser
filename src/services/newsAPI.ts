import type { NewsResponse, NewsItem } from '../types/api';

class NewsAPIClient {
  private apiKey: string;
  private baseUrl = 'https://newsapi.org/v2';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || import.meta.env.VITE_NEWS_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('NewsAPI key not configured');
    }
  }

  /**
   * Get top headlines from NewsAPI
   */
  async getTopHeadlines(params: {
    country?: string;
    category?: string;
    q?: string;
    pageSize?: number;
    page?: number;
  } = {}): Promise<NewsItem[]> {
    const queryParams = new URLSearchParams({
      apiKey: this.apiKey,
      ...Object.fromEntries(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ),
    });

    try {
      const response = await fetch(`${this.baseUrl}/top-headlines?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`NewsAPI error: ${response.status} ${response.statusText}`);
      }

      const data: NewsResponse = await response.json();
      return this.normalizeArticles(data.articles);
    } catch (error) {
      console.error('Failed to fetch top headlines:', error);
      throw error;
    }
  }

  /**
   * Search for news articles
   */
  async searchNews(params: {
    q: string;
    searchIn?: string;
    sources?: string;
    domains?: string;
    from?: string;
    to?: string;
    language?: string;
    sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
    pageSize?: number;
    page?: number;
  }): Promise<NewsItem[]> {
    const queryParams = new URLSearchParams({
      apiKey: this.apiKey,
      ...Object.fromEntries(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ),
    });

    try {
      const response = await fetch(`${this.baseUrl}/everything?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`NewsAPI error: ${response.status} ${response.statusText}`);
      }

      const data: NewsResponse = await response.json();
      return this.normalizeArticles(data.articles);
    } catch (error) {
      console.error('Failed to search news:', error);
      throw error;
    }
  }

  /**
   * Normalize NewsAPI articles to internal format
   */
  private normalizeArticles(articles: NewsResponse['articles']): NewsItem[] {
    return articles.map((article) => ({
      id: `${article.source.name}-${article.publishedAt}-${article.title.substring(0, 20)}`,
      source: article.source.name,
      title: article.title,
      description: article.description || '',
      url: article.url,
      imageUrl: article.urlToImage,
      publishedAt: new Date(article.publishedAt),
      content: article.content,
    }));
  }

  /**
   * Check if API key is configured
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

// Export singleton instance
export const newsAPI = new NewsAPIClient();
export default newsAPI;
