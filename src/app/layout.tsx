import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const oswald = localFont({
  src: "./fonts/Oswald-Variable.ttf",
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hokagechess.com"),
  title: "Hokage Chess — The Climb Starts Here",
  description:
    "The road from low-advanced to grandmaster, told from inside the climb. No titles. No shortcuts. Just the grind, the breakthroughs, and a community ascending together.",
  keywords: [
    "chess improvement",
    "chess community",
    "road to grandmaster",
    "chess training",
    "hokage chess",
    "chess journey",
  ],
  authors: [{ name: "Rob Bonavoglia", url: "https://www.youtube.com/@HokageChess" }],
  creator: "Rob Bonavoglia",
  openGraph: {
    title: "Hokage Chess — The Climb Starts Here",
    description:
      "The road from low-advanced to grandmaster, told from inside the climb.",
    url: "https://hokagechess.com",
    siteName: "Hokage Chess",
    type: "website",
    locale: "en_US",
    // og:image meta tags auto-injected from src/app/opengraph-image.png
    // (Next.js 16 file convention; see scripts/generate-og-image.mjs)
  },
  twitter: {
    card: "summary_large_image",
    title: "Hokage Chess — The Climb Starts Here",
    description:
      "The road from low-advanced to grandmaster, told from inside the climb.",
    creator: "@HokageChess",
    // twitter:image auto-injected from src/app/twitter-image.png
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
