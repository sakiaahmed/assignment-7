import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import CategoryView from "@/components/CategoryView";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();
  const products = (await getProducts(slug)).filter((p) => p.category === slug);
  return <CategoryView category={category} products={products} />;
}