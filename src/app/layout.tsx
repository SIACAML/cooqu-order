import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProgressBar } from '@lexz451/next-nprogress';
import { QueryProvider } from "@/providers/QueryProvider";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CooQu | Authentic Homemade Food Experiences",
  description: "CooQu connects you with talented home cooks for custom meals, catering, and theme-based dining. Discover the joy of home-cooked goodness.",
  verification: {
    google: "X11AKmhpY3QVfacgsiBSuMMVWOGoKCbJUm1Rf_dKDSM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-5FHRRS35" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <ProgressBar
            color="#FF6B00"
            height='2px'
            options={{
              showSpinner: false,
            }}
          />
        </Suspense>
        <QueryProvider>
          {children}
        </QueryProvider>
        <GoogleAnalytics gaId="G-CZ9P8YQS3W" />

      </body>
    </html>
  );
}
