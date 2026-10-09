import { Product } from "@/lib/api";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => <ProductCard key={p.id} p={p} />)}
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-line bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="sk size-10" />
            <div className="space-y-2"><div className="sk h-4 w-28" /><div className="sk h-3 w-16" /></div>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="space-y-2"><div className="sk h-3 w-16" /><div className="sk h-6 w-24" /></div>
            <div className="sk h-6 w-14" />
          </div>
        </div>
      ))}
    </div>
  );
}