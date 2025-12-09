# Contributing to Early Riser

Thank you for your interest in contributing to Early Riser! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, constructive, and professional in all interactions.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, version)

### Suggesting Features

1. Check existing issues and discussions
2. Create a new issue with:
   - Clear use case description
   - Expected behavior
   - Potential implementation approach
   - Any relevant mockups or examples

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write or update tests as needed
5. Ensure all tests pass (`npm test`)
6. Commit with clear messages (`git commit -m 'Add amazing feature'`)
7. Push to your branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/early-riser.git
cd early-riser

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

## Coding Standards

- Follow TypeScript best practices
- Use functional components and hooks
- Write self-documenting code with clear variable names
- Add comments for complex logic
- Keep components small and focused
- Use proper TypeScript types (avoid `any`)

## Commit Messages

Use clear, descriptive commit messages:

- `feat: add sentiment analysis to news items`
- `fix: correct price formatting for crypto assets`
- `docs: update API integration guide`
- `style: improve spacing in market overview`
- `refactor: extract news fetching logic to service`
- `test: add tests for trade idea generator`

## Testing

- Write tests for new features
- Ensure existing tests pass
- Aim for meaningful test coverage
- Test edge cases and error handling

## Questions?

Feel free to open an issue for any questions about contributing!