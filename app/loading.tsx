export default function Loading() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-border bg-surface px-6 py-8">
        <div className="mx-auto h-8 w-64 max-w-6xl animate-pulse rounded-lg bg-border" />
      </div>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-xl border border-border bg-surface"
          />
        ))}
      </div>
    </div>
  );
}
