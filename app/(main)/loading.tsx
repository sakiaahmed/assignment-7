import { GridSkeleton } from "@/components/ProductGrid";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-14 pt-6">
      <div className="sk h-56 w-full rounded-2xl" />
      <div className="sk mt-10 h-6 w-40" />
      <div className="mt-3"><GridSkeleton /></div>
      <div className="sk mt-10 h-6 w-40" />
      <div className="mt-3"><GridSkeleton /></div>
    </div>
  );
}