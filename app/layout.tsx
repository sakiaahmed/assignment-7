import type { Metadata } from "next";
import { Hind_Siliguri, Noto_Color_Emoji } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import ToasterProvider from "@/components/ToasterProvider";
import { getCategories, getProducts } from "@/lib/api";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

const emoji = Noto_Color_Emoji({
  subsets: ["emoji"],
  weight: "400",
  variable: "--font-emoji",
});

export const metadata: Metadata = {
  title: "বাজার দর — আজকের বাজারের দাম এক নজরে",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return (
    <html lang="bn" data-theme="bazar" className={`${hind.variable} ${emoji.variable}`}>
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-40 bg-white shadow-sm">
          <Navbar categories={categories} />
          <Ticker products={products} />
        </header>
        <main className="flex-1">{children}</main>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}