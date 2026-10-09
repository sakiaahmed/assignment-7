"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/auth-client";

export default function UpdateForm({ name }: { name: string }) {
  const router = useRouter();
  const [value, setValue] = useState(name);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return toast.error("নাম খালি রাখা যাবে না");

    setLoading(true);
    const { error } = await updateUser({ name: value.trim() });
    setLoading(false);

    if (error) return toast.error(error.message || "আপডেট করা যায়নি");

    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-xl border border-line bg-white p-5">
      <label className="block text-sm font-medium">
        নাম
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input input-bordered mt-1 w-full"
        />
      </label>
      <button disabled={loading} className="btn btn-primary w-full">
        {loading ? <span className="loading loading-spinner loading-sm" /> : "তথ্য আপডেট করুন"}
      </button>
    </form>
  );
}