import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Condensed, Teko, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeProvider } from "@/components/mode-provider";
import { createClient } from "@/lib/supabase/server";
import { MobileNav } from "@/components/layout/MobileNav";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["600"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "700"],
});

export const metadata: Metadata = {
  title: "RoostHub | Marketplace for Dirt & Snow",
  description: "Buy, sell, and showcase your dirt bikes, snowmobiles, and gear.",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#6B2CF5",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let brand = 'roosthub';
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('theme_brand').eq('id', user.id).single();
    brand = profile?.theme_brand || 'roosthub';
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoCondensed.variable} ${teko.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModeProvider initialBrand={brand}>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1 pb-20 md:pb-0">
                    {children}
                </main>
                <Footer />
                <MobileNav />
            </div>
          </ModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}