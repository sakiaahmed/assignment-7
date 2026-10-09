import { GridSkeleton } from "@/components/ProductGrid";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-14 pt-6">
      <div className="sk h-20 w-full rounded-xl" />
      <div className="sk mt-4 h-14 w-full rounded-xl" />
      <div className="mt-6"><GridSkeleton count={6} /></div>
    </div>
  );
}