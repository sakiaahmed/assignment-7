import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { bn, bnPrice, getChange, getProduct, getProducts, unitBn, unitName, safeEmoji } from "@/lib/api";
import { getSession } from "@/lib/auth";
import PriceBadge from "@/components/PriceBadge";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Protected route: only logged-in users can see this page
  const session = await getSession();
  if (!session) {
    redirect(`/signin?reason=protected&redirect=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const list = await getProducts();
  const found = list.find((p) => p.slug === slug);
  if (!found) notFound();

  const p = (await getProduct(found.id)) ?? found;
  const markets = p.markets ?? [];
  const change = getChange(p);

  const min = markets.length ? Math.min(...markets.map((m) => m.min)) : p.today;
  const max = markets.length ? Math.max(...markets.map((m) => m.max)) : p.today;
  const avg = markets.length
    ? Math.round(markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / markets.length)
    : p.today;

  const stats = [
    { label: "সর্বনিম্ন দাম", value: min, note: "সবচেয়ে কম পাওয়া দাম", color: "text-down" },
    { label: "সর্বোচ্চ দাম", value: max, note: "সবচেয়ে বেশি পাওয়া দাম", color: "text-up" },
    { label: "গড় দাম", value: avg, note: "সব বাজারের গড়", color: "text-gray-900" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 pb-14 pt-6">
      <nav className="mb-4 text-xs text-gray-500">
        <Link href="/" className="hover:text-brand">হোম</Link> ›{" "}
        <Link href={`/category/${p.category}`} className="hover:text-brand">{p.categoryNameBn}</Link> › {p.nameBn}
      </nav>

      <section className="flex flex-col gap-4 rounded-xl border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-surface text-3xl">
            {safeEmoji(p.image)}
          </span>
          <div>
            <h1 className="text-xl font-bold">{p.nameBn}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span>{unitBn(p.unit)}</span>
              <span className="rounded-full bg-green-50 px-2 py-0.5 font-medium text-brand">
                {safeEmoji(p.categoryIcon)} {p.categoryNameBn}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-gray-600">
              বাজারে গড়ে {bn(avg)} টাকা — গতকাল ছিল {bn(p.yesterday)} টাকা, গত সপ্তাহে {bn(p.lastWeek)} টাকা, গত মাসে {bn(p.lastMonth)} টাকা।
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-line bg-surface px-5 py-3 text-center">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-2xl font-bold">{bn(p.today)}</p>
          <p className="mb-1 text-xs text-gray-500">টাকা / {unitName(p.unit)}</p>
          <PriceBadge change={change} />
        </div>
      </section>

      <section className="mt-5 rounded-xl border border-line bg-white p-5">
        <h2 className="mb-3 font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-line p-4">
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className={`text-xl font-bold ${s.color}`}>{bn(s.value)} টাকা</p>
              <p className="text-xs text-gray-400">{s.note}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-3 mt-6 font-bold">বাজারভিত্তিক আজকের দাম</h2>
        {markets.length === 0 ? (
          <p className="text-sm text-gray-500">বাজারভিত্তিক তথ্য পাওয়া যায়নি।</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="bg-surface text-left text-xs text-gray-600">
                <tr>
                  <th className="px-3 py-2">বাজার</th>
                  <th className="px-3 py-2">বিভাগ</th>
                  <th className="px-3 py-2 text-right">সর্বনিম্ন</th>
                  <th className="px-3 py-2 text-right">সর্বোচ্চ</th>
                  <th className="px-3 py-2 text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((m, i) => (
                  <tr key={i} className="border-t border-line even:bg-surface/50">
                    <td className="px-3 py-2">{m.market}</td>
                    <td className="px-3 py-2 text-gray-600">{m.division}</td>
                    <td className="px-3 py-2 text-right">{bn(m.min)} টাকা</td>
                    <td className="px-3 py-2 text-right">{bn(m.max)} টাকা</td>
                    <td className="px-3 py-2 text-right font-semibold">{bnPrice((m.min + m.max) / 2)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}