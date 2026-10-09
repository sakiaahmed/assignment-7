import { Product, bn, bnPct, getChange, unitName, safeEmoji } from "@/lib/api";

function Item({ p }: { p: Product }) {
  const c = getChange(p);
  const color = c.dir === "up" ? "text-up" : c.dir === "down" ? "text-down" : "text-gray-500";
  const arrow = c.dir === "up" ? "▲" : c.dir === "down" ? "▼" : "—";
  return (
    <span className="mx-4 inline-flex items-center gap-1.5 whitespace-nowrap text-xs sm:text-sm">
      <span>{safeEmoji(p.image)}</span>
      <span className="font-medium">{p.nameBn}</span>
      <span className="text-gray-600">{bn(p.today)} টাকা/{unitName(p.unit)}</span>
      <span className={`font-semibold ${color}`}>{arrow} {bnPct(c.pct)}%</span>
    </span>
  );
}

export default function Ticker({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <div className="marquee overflow-hidden border-y border-line bg-white py-2" aria-label="দামের তালিকা">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div key={k} className="flex">
            {products.map((p) => <Item key={`${k}-${p.id}`} p={p} />)}
          </div>
        ))}
      </div>
    </div>
  );
}