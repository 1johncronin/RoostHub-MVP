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

import { Plus } from "lucide-react";

import { createClient } from "@/lib/supabase/server";

import Link from "next/link";



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

                    

                    {/* Mobile FAB for Selling */}

                    <Link 

                      href="/sell" 

                      className="md:hidden fixed bottom-6 right-6 h-14 w-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 z-50 animate-bounce-slow border-2 border-white/20"

                    >

                      <Plus className="h-8 w-8" />

                    </Link>

                  </ThemeProvider>

                </body>

              </html>

              );

            }

            

          
