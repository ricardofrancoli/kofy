# Kofy

Kofy is your new favourite bot roaster. Answer their questions and it will roast your choices. It will then match you with your Kofy profile, with a selection of coffee origins, ,methods and complements.

Built with Next.js 15, React 19, and Tailwind CSS, using [@landbot/core](https://www.npmjs.com/package/@landbot/core) for the bot interactions.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/kofy.git
cd kofy

# Install dependencies
pnpm install
```

### Development
```bash
pnpm dev
Open http://localhost:3000 in your browser to see the application.
```

### Testing
The project uses Vitest and React Testing Library for testing components and hooks:

- Component tests are located in `src/app/components/__tests__/`
- Hook tests are located in `src/app/hooks/__tests__/`

To run the tests:
```bash
# Run tests
pnpm test
```

### Building for production
```bash
# Create a production build
pnpm build
```

## Roadmap
The following features are planned for future releases:

### Testing Improvements
- More Unit Tests: Increase test coverage for all components and utilities
- Integration Tests: Add end-to-end tests to verify complete user flows

### Data Persistence
- Save user preferences between sessions
