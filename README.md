# 🌅 Early Riser

> Your morning market intelligence companion - catch alpha before the market wakes up

## Overview

Early Riser is a sophisticated alpha aggregator designed to deliver the most actionable market intelligence right when you wake up. With a carefully crafted, eye-friendly interface, it surfaces the day's most significant market opportunities across all asset classes.

## Features

- **🎯 Alpha Aggregation**: Real-time compilation of market-moving news across equities, crypto, commodities, forex, and macroeconomic events
- **🧠 Smart Filtering**: AI-powered relevance scoring to surface only the most actionable intelligence
- **☕ Comfy UI**: Soft, warm color palette designed for early morning viewing without eye strain
- **📊 Trade Ideas**: Automated generation of potential trade setups based on breaking news
- **⚡ Real-time Updates**: Live feed of market-moving events with instant notifications
- **📈 Multi-Asset Coverage**: Comprehensive view across all major asset classes

## Tech Stack

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom warm color palette
- **State Management**: Zustand
- **API Integration**: Multiple financial data providers
- **Real-time**: WebSocket connections for live updates

## Project Structure

```
early-riser/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services and data fetching
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── styles/         # Global styles and theme
├── public/             # Static assets
├── docs/               # Documentation
└── tests/              # Test files
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- API keys for financial data providers (see `.env.example`)

### Installation

```bash
# Clone the repository
git clone https://github.com/Frijax/early-riser.git
cd early-riser

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Add your API keys to .env

# Start development server
npm run dev
```

## Configuration

Create a `.env` file with the following variables:

```env
VITE_NEWS_API_KEY=your_news_api_key
VITE_MARKET_DATA_API_KEY=your_market_data_key
VITE_CRYPTO_API_KEY=your_crypto_api_key
```

## Usage

1. **Morning Routine**: Open Early Riser first thing in the morning to see curated market intelligence
2. **Scan Headlines**: Review top stories with AI-generated relevance scores
3. **Explore Trade Ideas**: Check automated trade setups based on breaking news
4. **Set Alerts**: Configure custom alerts for specific tickers or keywords

## Roadmap

- [ ] Phase 1: Core aggregation engine and basic UI
- [ ] Phase 2: AI-powered trade idea generation
- [ ] Phase 3: Portfolio integration and risk analysis
- [ ] Phase 4: Social sentiment analysis
- [ ] Phase 5: Mobile app development

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by the calm aesthetics of morning routines
- Built for traders who value quality over quantity
- Community feedback and feature requests welcome

## Support

For questions, feature requests, or bug reports, please open an issue on GitHub.

---

**Disclaimer**: Early Riser is for informational purposes only. Always conduct your own research and consult with financial professionals before making investment decisions.