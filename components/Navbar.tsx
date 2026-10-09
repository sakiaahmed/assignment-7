"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Category, safeEmoji } from "@/lib/api";
import { signOut, useSession } from "@/lib/auth-client";

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isPending } = useSession();
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    );
  }, []);

  async function handleSignOut() {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    (document.activeElement as HTMLElement)?.blur();
    router.push("/");
    router.refresh();
  }

  const user = data?.user;

  return (
    <nav>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-icon.png" alt="বাজার দর" className="size-5 object-contain" /> {/* <- extension */}
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold">বাজার দর</span>
            <span className="block min-h-4 text-[11px] text-gray-500">{date}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="sk h-9 w-24" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 hover:bg-surface">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt="" className="size-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <span className="grid size-8 place-items-center rounded-full bg-brand text-sm font-semibold text-white">
                    {user.name?.[0]?.toUpperCase() ?? "U"}
                  </span>
                )}
                <span className="hidden text-sm font-medium sm:block">{user.name?.split(" ")[0]}</span>
                <span className="text-xs text-gray-400">▾</span>
              </div>
              <div tabIndex={0} className="dropdown-content z-50 mt-2 w-60 rounded-xl border border-line bg-white p-3 shadow-lg">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="mb-2 truncate text-xs text-gray-500">{user.email}</p>
                <Link href="/profile" onClick={() => (document.activeElement as HTMLElement)?.blur()} className="block rounded-md px-2 py-1.5 text-sm hover:bg-surface">
                  👤 আমার প্রোফাইল
                </Link>
                <button onClick={handleSignOut} className="w-full rounded-md px-2 py-1.5 text-left text-sm text-red-600 hover:bg-red-50">
                  ↩ সাইন আউট
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl overflow-x-auto px-4 pb-2.5 [scrollbar-width:none]">
        <ul className="flex min-w-max items-center gap-1.5 sm:justify-center">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition ${
                    active ? "bg-brand font-semibold text-white" : "text-gray-700 hover:bg-surface"
                  }`}
                >
                  <span>{safeEmoji(c.icon)}</span>
                  {c.nameBn}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}