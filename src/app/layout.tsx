import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Condensed, Teko, Space_Grotesk } from "next/font/google";
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

import { ThemeProvider } from "@/components/theme-provider";



import { createClient } from "@/lib/supabase/server";







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



        data-brand={brand}



        className={`${geistSans.variable} ${geistMono.variable} ${robotoCondensed.variable} ${teko.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}



      >





        <ThemeProvider

          attribute="class"

          defaultTheme="system"

          enableSystem

          disableTransitionOnChange

        >

          {children}

        </ThemeProvider>

      </body>

    </html>

  );

}
