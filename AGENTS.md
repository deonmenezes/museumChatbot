# museumChatbot

A Next.js web application providing an AI-powered chatbot interface for museum ticket booking, using Google's Generative AI (Gemini) to guide users through selecting museums, entering visitor details, and completing bookings.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **AI:** Google Generative AI (`@google/generative-ai` — Gemini)
- **Styling:** Tailwind CSS, clsx, tailwind-merge
- **Icons:** lucide-react, react-icons

## Setup

```bash
cd museumchat
yarn install
# or
npm install
```

Create a `.env` file (see `.env` in the repo — note it is committed; replace with your own keys):
```
GEMINI_API_KEY=your_key_here
```

## Build / Run / Test

```bash
# Development server
yarn dev
# or
npm run dev

# Production build
yarn build

# Start production server
yarn start

# Lint
yarn lint
```

## Project Structure

```
museumchat/             # Main application root
  src/
    app/                # Next.js App Router pages and layouts
  public/               # Static assets (museum images, icons)
  next.config.mjs       # Next.js configuration
  tailwind.config.ts    # Tailwind CSS configuration
  tsconfig.json         # TypeScript configuration
  .env                  # Environment variables (Gemini API key)
```

## Architecture & Key Files

- Entry point: `museumchat/src/app/page.tsx`
- The chat interface calls the Gemini API to collect booking details (museum, name, email, phone, nationality, visit date/time, ticket counts, language) and returns a structured JSON response plus human-readable text.
- AI prompt instructs Gemini to act as a museum booking assistant and format responses with a JSON object on the first line.

## Conventions & Notes for Agents

- The actual app lives inside the `museumchat/` subdirectory; run all commands from there.
- The `.env` file is committed to the repo — do not commit real API keys; rotate if exposed.
- No test suite is present.
- The companion backend API is in a separate repo (`museum-chatbot-api`).
