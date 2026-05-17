import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mobile-KIA · Bunda & Buah Hati",
  description: "Sistem Kesehatan Ibu & Anak — Elegan, Modern, Terpercaya",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}