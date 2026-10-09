export type Market = { market: string; division: string; min: number; max: number };
export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change?: { dir: string; pct: number };
  markets?: Market[];
};
export type Category = { id: string; slug: string; nameBn: string; icon: string };
export type Change = { dir: "up" | "down" | "flat"; pct: number };

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function get<T>(path: string): Promise<T | null> {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 300 } });
      if (res.ok) return (await res.json()) as T;
    } catch {}
  }
  return null;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const data = await get<Product[]>(category ? `/products?category=${category}` : "/products");
  return Array.isArray(data) ? data : [];
}
export async function getProduct(id: number | string) {
  return get<Product>(`/products/${id}`);
}
export async function getCategories(): Promise<Category[]> {
  const data = await get<Category[]>("/categories");
  return Array.isArray(data) ? data : [];
}

/* ---------- Bangla helpers ---------- */
const nf = new Intl.NumberFormat("bn-BD");
export const bn = (n: number) => nf.format(n);
export const bnPct = (n: number) =>
  new Intl.NumberFormat("bn-BD", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n);
export const bnPrice = (n: number) =>
  Number.isInteger(n)
    ? bn(n)
    : new Intl.NumberFormat("bn-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const UNITS: Record<string, string> = {
  kg: "কেজি", kilogram: "কেজি", litre: "লিটার", liter: "লিটার", l: "লিটার",
  dozen: "ডজন", doz: "ডজন", piece: "পিস", pcs: "পিস", pc: "পিস",
  hali: "হালি", gram: "গ্রাম", g: "গ্রাম",
};
export const unitName = (u: string) => UNITS[u?.toLowerCase()] ?? u;
export const unitBn = (u: string) => `প্রতি ${unitName(u)}`;

export function getChange(p: Product): Change {
  if (p.change) {
    const d = p.change.dir?.toLowerCase();
    const dir = d === "up" ? "up" : d === "down" ? "down" : "flat";
    return { dir, pct: Math.abs(p.change.pct) };
  }
  if (!p.yesterday) return { dir: "flat", pct: 0 };
  const pct = Math.round(((p.today - p.yesterday) / p.yesterday) * 1000) / 10;
  return { dir: pct > 0 ? "up" : pct < 0 ? "down" : "flat", pct: Math.abs(pct) };
}

/* Shows the emoji exactly as the API sends it */
export const safeEmoji = (e: string) => e;