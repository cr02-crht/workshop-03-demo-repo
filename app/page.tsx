import { BrandTag } from "@/components/BrandTag";
import { DestinationCard } from "@/components/DestinationCard";
import { StatTile } from "@/components/StatTile";
import {
  getDestinations,
  getRandomDestination,
  getStats,
  searchDestinations,
  type Destination,
  type Stats,
} from "@/lib/api";

const REGIONS = ["Asia", "Middle East", "Europe", "Africa", "Americas", "Oceania"];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ region?: string; minRating?: string; q?: string }>;
}) {
  const { region, minRating, q } = await searchParams;

  const [destinationsResult, statsResult, spotlightResult] = await Promise.allSettled([
    q ? searchDestinations(q) : getDestinations({ region, minRating: minRating ? Number(minRating) : undefined }),
    getStats(),
    getRandomDestination(),
  ]);

  const destinations: Destination[] =
    destinationsResult.status === "fulfilled" ? destinationsResult.value : [];
  const stats: Stats | null = statsResult.status === "fulfilled" ? statsResult.value : null;
  const spotlight: Destination | null =
    spotlightResult.status === "fulfilled" ? spotlightResult.value : null;

  const apiUnreachable =
    destinationsResult.status === "rejected" &&
    statsResult.status === "rejected" &&
    spotlightResult.status === "rejected";

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Destination Explorer
            </h1>
            <p className="mt-1 text-sm text-secondary">
              Sample data pulled live from the workshop demo API.
            </p>
          </div>
          <div className="flex gap-2">
            <BrandTag brand="ht" />
            <BrandTag brand="cr" />
          </div>
        </div>
      </header>

      {apiUnreachable && (
        <div className="mx-auto mt-6 w-full max-w-6xl px-6">
          <div className="rounded-xl border border-ht/30 bg-ht-tint/30 p-4 text-sm text-foreground">
            Couldn&apos;t reach the demo API. Confirm it&apos;s running and that{" "}
            <code className="font-mono">NEXT_PUBLIC_API_BASE_URL</code> in{" "}
            <code className="font-mono">.env.local</code> points to it.
          </div>
        </div>
      )}

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 py-12">
        {/* HalalTrip section: consumer-facing destination browsing */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <BrandTag brand="ht" />
            <h2 className="text-xl font-semibold text-foreground">
              Find your next Muslim-friendly trip
            </h2>
          </div>

          {spotlight && (
            <div className="rounded-2xl border border-ht/30 bg-ht-tint/20 p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-ht">
                Today&apos;s spotlight
              </p>
              <h3 className="mt-1 text-2xl font-semibold text-foreground">
                {spotlight.name}, {spotlight.country}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
                {spotlight.description}
              </p>
            </div>
          )}

          <form className="flex flex-wrap items-end gap-3" action="/">
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-secondary">Search</span>
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Name, country, or tag"
                className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-secondary">Region</span>
              <select
                name="region"
                defaultValue={region ?? ""}
                className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground"
              >
                <option value="">Any</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-secondary">Min rating</span>
              <select
                name="minRating"
                defaultValue={minRating ?? ""}
                className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground"
              >
                <option value="">Any</option>
                {[5, 6, 7, 8, 9].map((r) => (
                  <option key={r} value={r}>
                    {r}+
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="rounded-lg bg-ht px-4 py-2 text-sm font-medium text-white"
            >
              Filter
            </button>
          </form>

          {destinations.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          ) : (
            !apiUnreachable && (
              <p className="text-sm text-secondary">
                No destinations match those filters. Try widening your search.
              </p>
            )
          )}
        </section>

        {/* CrescentRating section: aggregate research statistics */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <BrandTag brand="cr" />
            <h2 className="text-xl font-semibold text-foreground">
              Research snapshot
            </h2>
          </div>

          {stats ? (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatTile
                label="Destinations tracked"
                value={stats.totalDestinations.toLocaleString()}
                accent="cr"
              />
              <StatTile
                label="Halal restaurants"
                value={stats.totalHalalRestaurants.toLocaleString()}
                accent="cr"
              />
              <StatTile
                label="Average rating"
                value={stats.averageRating.toFixed(2)}
                accent="cr"
              />
              <StatTile
                label="With prayer facilities"
                value={stats.withPrayerFacilities.toLocaleString()}
                accent="cr"
              />
            </div>
          ) : (
            !apiUnreachable && (
              <p className="text-sm text-secondary">Stats are unavailable right now.</p>
            )
          )}
        </section>
      </main>

      <footer className="border-t border-border bg-surface px-6 py-6 text-center text-xs text-muted">
        Destinations, ratings, and figures shown here are fictional sample data
        for workshop purposes only — not CrescentRating&apos;s real GMTI ratings or
        research data.
      </footer>
    </div>
  );
}
