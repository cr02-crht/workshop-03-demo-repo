export function StatTile({
  label,
  value,
  accent = "cr",
}: {
  label: string;
  value: string;
  accent?: "cr" | "ht";
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <div
        className={`mb-3 h-1 w-8 rounded-full ${
          accent === "cr" ? "bg-cr" : "bg-ht"
        }`}
      />
      <p className="text-sm font-medium text-secondary">{label}</p>
      <p className="mt-1 text-4xl font-semibold text-foreground">{value}</p>
    </div>
  );
}
