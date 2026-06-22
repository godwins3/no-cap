import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nocap — Data Shouldn't Expire | Kenya's Digital-First Telecom",
  description:
    "Kenya's first digital-native telecom. Unlimited internet with no expiry, no hidden fees, no nonsense. Join the data revolution.",
  keywords: [
    "Kenya telecom",
    "eSIM Kenya",
    "unlimited data Kenya",
    "no expiry data",
    "digital telecom",
    "nocap",
  ],
  openGraph: {
    title: "nocap — Data Shouldn't Expire",
    description:
      "Kenya's first digital-native telecom. Unlimited internet with no expiry, no hidden fees, no nonsense.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#09090B] text-white">{children}</body>
    </html>
  );
}
