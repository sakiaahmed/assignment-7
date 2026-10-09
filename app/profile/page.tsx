import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/signin?reason=protected&redirect=/profile");
  const { user } = session;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
      <p className="mb-5 text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white p-4">
        <div className="flex items-center gap-3">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="size-14 rounded-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <span className="grid size-14 place-items-center rounded-full bg-brand text-xl font-semibold text-white">
              {user.name?.[0]?.toUpperCase() ?? "U"}
            </span>
          )}
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </div>

      <div className="mt-4 rounded-xl border border-line bg-white p-5">
        <h2 className="mb-3 font-semibold">তথ্য</h2>
        <p className="text-sm text-gray-500">নাম</p>
        <p className="mb-4 font-medium">{user.name}</p>
        <Link href="/profile/update" className="btn btn-primary w-full">
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}