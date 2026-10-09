import { Change, bnPct } from "@/lib/api";

export default function PriceBadge({ change }: { change: Change }) {
  const map = {
    up: { cls: "bg-red-50 text-up", t: "▲" },
    down: { cls: "bg-green-50 text-down", t: "▼" },
    flat: { cls: "bg-gray-100 text-gray-500", t: "—" },
  }[change.dir];
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${map.cls}`}>
      {map.t} {bnPct(change.pct)}%
    </span>
  );
}