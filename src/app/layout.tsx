import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Condensed, Teko } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "700"], // Light, Regular, Bold
  style: ["normal", "italic"],
});

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "RoostHub | Marketplace for Dirt & Snow",
  description: "Buy, sell, and showcase your dirt bikes, snowmobiles, and gear.",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#6B2CF5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoCondensed.variable} ${teko.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}