# workshop-03-demo-repo

A Next.js front end built for a workshop that teaches non-developers how a page can connect to and display data from an API. It renders live data from the companion `workshop-03-demo-api` Express API as a single destination-explorer page, split into two clearly labeled sections:

- **HalalTrip** — a spotlight card (random destination), a filter/search form, and a destination card grid.
- **CrescentRating** — an aggregate stats dashboard (destinations tracked, halal restaurants, average rating, prayer-facility coverage).

> **Note:** The destinations, ratings, and figures shown come from the demo API's `data/data.json`, which is fictional sample data for teaching purposes only. It is not CrescentRating's real GMTI ratings or research data.

## Getting Started

1. Make sure the `workshop-03-demo-api` server is running (see that repo's README) and note its URL.
2. Install dependencies:
   ```
   npm install
   ```
3. Point the app at your API by creating `.env.local`:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   ```
   (use whatever host/port/tunnel URL the API is actually reachable at)
4. Start the dev server:
   ```
   npm run dev
   ```
5. Open the printed local URL (Next.js will pick the next free port if 3000 is taken by the API).

If `NEXT_PUBLIC_API_BASE_URL` is missing or unreachable, the page still renders and shows an inline notice instead of failing.

## Project structure

| Path | Purpose |
|------|---------|
| `app/page.tsx` | The destination-explorer homepage (server component, fetches on each request) |
| `app/loading.tsx` | Skeleton UI shown while data is fetching |
| `lib/api.ts` | Typed fetch helpers for every demo API endpoint (`/api/destinations`, `/api/destinations/random`, `/api/destinations/search`, `/api/stats`) |
| `components/DestinationCard.tsx` | Card for a single destination |
| `components/StatTile.tsx` | A single stat in the CrescentRating dashboard |
| `components/BrandTag.tsx` | CR / HT badge used to keep the two brands visually distinct |
| `app/globals.css` | Design tokens (light/dark) — placeholder colors; swap in real brand values when available |

## Filtering and search

The homepage reads `region`, `minRating`, and `q` from the URL's query string and re-fetches server-side accordingly — no client-side JavaScript required. For example:

```
/?region=Asia&minRating=6
/?q=food
```

## About the API

This app is a consumer of `workshop-03-demo-api`, a separate Express repo with no authentication (rate-limited to 100 requests/15 min per IP). See that repo for endpoint documentation.
