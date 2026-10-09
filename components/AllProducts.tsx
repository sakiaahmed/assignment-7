"use client";
import { useMemo, useState } from "react";
import { Product } from "@/lib/api";
import ProductGrid from "./ProductGrid";

export default function AllProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<"default" | "asc" | "desc">("default");

  // sorts by the numeric price, never by text, so Bengali digits don't affect order
  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "asc") list.sort((a, b) => Number(a.today) - Number(b.today));
    if (sort === "desc") list.sort((a, b) => Number(b.today) - Number(a.today));
    return list;
  }, [products, sort]);

  return (
    <section id="সব-পণ্য" className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">সব পণ্য</h2>
          <p className="text-sm text-gray-500">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের দাম।</p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-all" className="text-sm text-gray-600">সাজান:</label>
          <select
            id="sort-all"
            value={sort}
            onChange={(e) => setSort(e.target.value as "default" | "asc" | "desc")}
            className="select select-sm w-auto"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>
      <div className="mt-3"><ProductGrid products={sorted} /></div>
    </section>
  );
}