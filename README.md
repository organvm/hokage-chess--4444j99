# Hokage Chess & BODI Substrate

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-orange)

A dual-purpose repository serving as the deployable landing surface for Rob Bonavoglia (@HokageChess, NYC chess YouTuber) and the working substrate for the broader BODI (Body Of Discipline) cross-pollination architecture.

## Features

- ✅ **Dynamic Persona Routing**: `landing-engine` primitive for dynamically generating per-persona routes.
- ✅ **Brand-Agnostic Engines**: Universal title, thumbnail, and video-idea scoring injected with domain vocabulary.
- ✅ **Kit Integration**: Email-capture handler using Kit.
- ✅ **Modern Tech Stack**: Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v3.

## Quick Start

### Prerequisites

- Node.js >= 25
- npm

### Installation

```bash
git clone https://github.com/4444J99/hokage-chess.git
cd hokage-chess
npm install
```

### Usage

Start the development server:

```bash
npm run dev
```

Run the test suite:

```bash
npm run test
```

## Documentation

Full architectural documentation and cross-pollination details are located in `docs/substrate/bodi/`.
Read `.conductor/active-handoff.md` and `HANDOFF.md` before making contributions.

## Architecture Highlights

- **`src/lib/content-strategy.ts`**: Brand-neutral content strategy engine.
- **`src/lib/landing-engine/`**: Persona × Narrative × Section engine.
- **`src/app/`**: Root page, dynamic persona routes, and API endpoints.
- **Visual System**: Dark mode with Hokage Red (`#C41E3A`) and Oswald, DM Sans, JetBrains Mono fonts.

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
