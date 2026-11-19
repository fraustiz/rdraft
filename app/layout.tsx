import type { Metadata, Viewport } from "next";
import { Noto_Sans } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { COUNTED_DOMAIN, STATS_PATH, UMAMI_WEBSITE_ID } from "@/lib/analytics";

import "./globals.css";
import "flag-icons/css/flag-icons.min.css";

const notoSans = Noto_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

/** Riot's display face, used for the wordmark only. */
const league = localFont({
  src: "./fonts/League.otf",
  variable: "--font-league",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rdraft — tirage au sort de draft League of Legends",
  description:
    "Ajoutez vos alliés, lancez le tirage : chaque joueur reçoit un champion et une lane au hasard.",
  applicationName: "Rdraft",
  openGraph: {
    title: "Rdraft",
    description: "Tirage au sort de champions et de lanes pour votre équipe.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${notoSans.variable} ${league.variable} dark`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
        <SpeedInsights />
        {/* Visitor counting, see lib/analytics.ts. The query string and the
            fragment are never sent: they are not ours to collect, and a
            query can carry tokens or codes that must not land in a stats
            database. */}
        <Script
          src={`${STATS_PATH}/script.js`}
          strategy="afterInteractive"
          data-website-id={UMAMI_WEBSITE_ID}
          data-host-url={STATS_PATH}
          data-domains={COUNTED_DOMAIN}
          data-exclude-hash="true"
          data-exclude-search="true"
        />
      </body>
    </html>
  );
}
