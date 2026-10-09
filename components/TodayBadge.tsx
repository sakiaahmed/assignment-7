"use client";
import { useEffect, useState } from "react";

export default function TodayBadge() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    );
  }, []);

  return (
    <span className="inline-block min-h-6 rounded-md bg-green-50 px-2.5 py-1 text-xs font-semibold text-brand">
      {date || "আজকের দাম"}
    </span>
  );
}