import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import UpdateForm from "@/components/UpdateForm";

export default async function UpdatePage() {
  const session = await getSession();
  if (!session) redirect("/signin?reason=protected&redirect=/profile/update");

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="mb-5 text-sm text-gray-500">আপনার নাম পরিবর্তন করুন।</p>
      <UpdateForm name={session.user.name ?? ""} />
      <Link href="/profile" className="mt-4 block text-center text-xs text-gray-500 hover:text-brand">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </div>
  );
}