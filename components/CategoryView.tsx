"use client";
import { useMemo, useState } from "react";
import { Category, Product, bn, safeEmoji } from "@/lib/api";
import ProductGrid from "./ProductGrid";
import EmptyState from "./EmptyState";

export default function CategoryView({ category, products }: { category: Category; products: Product[] }) {
  const [sort, setSort] = useState<"default" | "asc" | "desc">("default");

  // sorts by the numeric value of the price, never by text,
  // so Bengali digits on screen never affect the order
  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "asc") list.sort((a, b) => Number(a.today) - Number(b.today));
    if (sort === "desc") list.sort((a, b) => Number(b.today) - Number(a.today));
    return list;
  }, [products, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-14 pt-6">
      <div className="flex items-center gap-3 rounded-xl border border-line bg-white p-4">
        <span className="grid size-11 place-items-center rounded-full bg-surface text-2xl">{safeEmoji(category.icon)}</span>
        <div>
          <h1 className="text-xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-gray-500">এই ক্যাটাগরির পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 rounded-xl border border-line bg-white p-3">
        <label htmlFor="sort" className="text-sm text-gray-600">সাজান:</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as "default" | "asc" | "desc")}
          className="select select-sm w-auto"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      {sorted.length === 0 ? (
        <EmptyState title="কোনো পণ্য পাওয়া যায়নি" text="এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।" />
      ) : (
        <>
          <p className="my-3 text-xs text-gray-500">মোট {bn(sorted.length)}টি পণ্য দেখানো হচ্ছে</p>
          <ProductGrid products={sorted} />
        </>
      )}
    </div>
  );
}