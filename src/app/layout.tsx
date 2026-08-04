import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { siteName } from "@/lib/config";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${siteName} - Earn on your phone`,
  description:
    "Chat, watch, and play to earn. Withdraw to mobile money anytime. Simple, modern earning from your phone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
