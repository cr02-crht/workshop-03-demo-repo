import type { Destination } from "@/lib/api";

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {destination.name}
          </h3>
          <p className="text-sm text-secondary">
            {destination.country} · {destination.region}
          </p>
        </div>
        <div className="shrink-0 rounded-full bg-ht-tint/40 px-2.5 py-1 text-sm font-semibold text-ht">
          {destination.rating.toFixed(1)}
        </div>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-secondary">
        {destination.description}
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <dt className="text-muted">Halal restaurants</dt>
          <dd className="font-medium text-foreground">
            {destination.halalRestaurants.toLocaleString()}
          </dd>
        </div>
        <div>
          <dt className="text-muted">Best season</dt>
          <dd className="font-medium text-foreground">{destination.bestSeason}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {destination.prayerFacilities && (
          <span className="rounded-full bg-good/10 px-2.5 py-1 text-xs font-medium text-good">
            Prayer facilities
          </span>
        )}
        {destination.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2.5 py-1 text-xs text-secondary"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
