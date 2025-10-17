import "@/styles/globals.css";

import { type Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/components/providers";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: {
    default: "Generate random things | awrandom",
    template: "%s awrandom",
  },
  description: "Discover a collection of fun and useful random online tools with a clean, delightful UI designed for everyone.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children, breadcrumb }: Readonly<{ children: React.ReactNode; breadcrumb: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <TRPCReactProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Providers breadcrumb={breadcrumb}>
              {children}

              <Toaster richColors position="top-right" />
            </Providers>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
