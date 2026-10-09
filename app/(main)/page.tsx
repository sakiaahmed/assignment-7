import { getChange, getProducts } from "@/lib/api";
import type { Product } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import AllProducts from "@/components/AllProducts";
import TodayBadge from "@/components/TodayBadge";

function Section({ title, products, dot }: { title: string; products: Product[]; dot: string }) {
  return (
    <section className="mt-10">
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <span className={dot === "▲" ? "text-up text-sm" : "text-down text-sm"}>{dot}</span>
        {title}
      </h2>
      <div className="mt-3"><ProductGrid products={products} /></div>
    </section>
  );
}

export default async function Home() {
  const products = await getProducts();
  const rows = products.map((p) => ({ p, c: getChange(p) }));
  const risers = rows.filter((r) => r.c.dir === "up").sort((a, b) => b.c.pct - a.c.pct).slice(0, 6).map((r) => r.p);
  const fallers = rows.filter((r) => r.c.dir === "down").sort((a, b) => b.c.pct - a.c.pct).slice(0, 6).map((r) => r.p);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-14 pt-6">
      <section className="grid items-center gap-6 rounded-2xl border border-line bg-white p-6 sm:p-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <TodayBadge />
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
          <p className="mt-3 max-w-xl text-sm text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিশ্লেষণ, মান, সর্বনিম্ন-সর্বোচ্চ ও দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary btn-sm sm:btn-md mt-5">সব পণ্য দেখুন</a>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bazar-hero.png"
          alt="ফল ও সবজির ঝুড়ি"
          className="mx-auto w-full max-w-[260px] object-contain md:max-w-xs"
        />
      </section>

      <Section title="আজ দাম বেড়েছে" dot="▲" products={risers} />
      <Section title="আজ দাম কমেছে" dot="▼" products={fallers} />
      <AllProducts products={products} />
    </div>
  );
}