import Link from "next/link";
import { Product, bn, getChange, unitBn, safeEmoji } from "@/lib/api";
import PriceBadge from "./PriceBadge";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-xl border border-line bg-white p-4 transition hover:border-brand/40 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface text-xl">{safeEmoji(p.image)}</span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{p.nameBn}</h3>
          <p className="text-xs text-gray-500">{unitBn(p.unit)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-xl font-bold">{bn(p.today)} টাকা</p>
        </div>
        <PriceBadge change={getChange(p)} />
      </div>
    </Link>
  );
}