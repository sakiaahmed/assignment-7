"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [redirectTo, setRedirectTo] = useState("/");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const r = q.get("redirect");
    if (r && r.startsWith("/")) setRedirectTo(r);
    if (q.get("reason") === "protected") {
      toast.error("এই পাতা দেখতে আগে সাইন ইন করুন", { id: "protected" });
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");

    if (!email || !password) {
      const m = "ইমেইল ও পাসওয়ার্ড দিন";
      setError(m);
      toast.error(m);
      return;
    }

    setLoading(true);
    setError("");
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const m = error.message || "ইমেইল বা পাসওয়ার্ড ভুল";
      setError(m);
      toast.error(m);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-2xl font-bold">সাইন ইন</h1>
      <p className="mb-5 mt-1 text-center text-sm text-gray-500">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      <form onSubmit={onSubmit} className="space-y-3 rounded-xl border border-line bg-white p-5">
        <label className="block text-sm font-medium">
          ইমেইল
          <input name="email" type="email" placeholder="you@example.com" className="input input-bordered mt-1 w-full" />
        </label>
        <label className="block text-sm font-medium">
          পাসওয়ার্ড
          <input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className="input input-bordered mt-1 w-full" />
        </label>

        {error && (
          <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <button disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
        </button>

        <div className="divider my-1 text-xs text-gray-400">অথবা</div>
        <SocialButtons callbackURL={redirectTo} />

        <p className="pt-1 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-medium text-brand">সাইন আপ করুন</Link>
        </p>
      </form>

      <Link href="/" className="mt-4 block text-center text-xs text-gray-500 hover:text-brand">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}