export function BrandTag({ brand }: { brand: "cr" | "ht" }) {
  const isCr = brand === "cr";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
        isCr
          ? "border-cr/30 bg-cr-tint/40 text-cr"
          : "border-ht/30 bg-ht-tint/40 text-ht"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isCr ? "bg-cr" : "bg-ht"}`}
      />
      {isCr ? "CrescentRating" : "HalalTrip"}
    </span>
  );
}
