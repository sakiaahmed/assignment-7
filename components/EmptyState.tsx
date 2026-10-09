import Link from "next/link";

export default function EmptyState({
  title = "পাতাটি পাওয়া যায়নি",
  text = "আপনি যে পাতাটি খুঁজছেন তা নেই বা সরিয়ে নেওয়া হয়েছে।",
}: { title?: string; text?: string }) {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <p className="text-6xl font-bold text-brand">৪০৪</p>
      <h1 className="mt-3 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-gray-600">{text}</p>
      <Link href="/" className="btn btn-primary mt-6">হোম পেজে ফিরে যান</Link>
    </div>
  );
}