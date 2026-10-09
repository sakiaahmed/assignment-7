"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");
    const confirm = String(fd.get("confirm") || "");

    let m = "";
    if (!name || !email || !password) m = "সব ঘর পূরণ করুন";
    else if (password.length < 8) m = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
    else if (password !== confirm) m = "দুটি পাসওয়ার্ড মেলেনি";

    if (m) {
      setError(m);
      toast.error(m);
      return;
    }

    setLoading(true);
    setError("");
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      const msg = error.message || "অ্যাকাউন্ট তৈরি করা যায়নি";
      setError(msg);
      toast.error(msg);
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mb-5 mt-1 text-center text-sm text-gray-500">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <form onSubmit={onSubmit} className="space-y-3 rounded-xl border border-line bg-white p-5">
        <label className="block text-sm font-medium">
          নাম
          <input name="name" placeholder="যেমন: রফিক উদ্দিন" className="input input-bordered mt-1 w-full" />
        </label>
        <label className="block text-sm font-medium">
          ইমেইল
          <input name="email" type="email" placeholder="you@example.com" className="input input-bordered mt-1 w-full" />
        </label>
        <label className="block text-sm font-medium">
          পাসওয়ার্ড
          <input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className="input input-bordered mt-1 w-full" />
        </label>
        <label className="block text-sm font-medium">
          পাসওয়ার্ড নিশ্চিত করুন
          <input name="confirm" type="password" placeholder="আবার লিখুন" className="input input-bordered mt-1 w-full" />
        </label>

        {error && (
          <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <button disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "অ্যাকাউন্ট তৈরি করুন"}
        </button>

        <div className="divider my-1 text-xs text-gray-400">অথবা</div>
        <SocialButtons callbackURL="/" />

        <p className="pt-1 text-center text-sm text-gray-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-medium text-brand">সাইন ইন করুন</Link>
        </p>
      </form>

      <Link href="/" className="mt-4 block text-center text-xs text-gray-500 hover:text-brand">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}