const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export type Destination = {
  id: number;
  name: string;
  country: string;
  region: string;
  rating: number;
  halalRestaurants: number;
  prayerFacilities: boolean;
  description: string;
  bestSeason: string;
  tags: string[];
};

export type Stats = {
  totalDestinations: number;
  totalHalalRestaurants: number;
  averageRating: number;
  withPrayerFacilities: number;
};

type ApiResponse<T> = {
  status: string;
  data: T;
  count?: number;
  message?: string;
};

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`API request to ${path} failed with status ${res.status}`);
  }
  const json: ApiResponse<T> = await res.json();
  return json.data;
}

export function getDestinations(filters?: {
  region?: string;
  country?: string;
  minRating?: number;
}): Promise<Destination[]> {
  const qs = new URLSearchParams();
  if (filters?.region) qs.set("region", filters.region);
  if (filters?.country) qs.set("country", filters.country);
  if (filters?.minRating) qs.set("minRating", String(filters.minRating));
  const query = qs.toString();
  return apiFetch<Destination[]>(`/api/destinations${query ? `?${query}` : ""}`);
}

export function searchDestinations(q: string): Promise<Destination[]> {
  return apiFetch<Destination[]>(`/api/destinations/search?q=${encodeURIComponent(q)}`);
}

export function getRandomDestination(): Promise<Destination> {
  return apiFetch<Destination>("/api/destinations/random");
}

export function getStats(): Promise<Stats> {
  return apiFetch<Stats>("/api/stats");
}
