import { Geist, Geist_Mono } from "next/font/google";

import "@/styles/globals.css";
import { Provider } from "@/components/provider";

import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Generate random things | awrandom",
    template: "%s awrandom",
  },
  description: "Discover a collection of fun and useful random online tools with a clean, delightful UI designed for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
