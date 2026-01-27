import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forgedveloci | Ultra Premium Forged Wheels",
  description: "Bespoke forged wheels engineered for automotive excellence. Experience the pinnacle of wheel craftsmanship.",
  keywords: ["forged wheels", "luxury wheels", "bespoke wheels", "automotive", "premium"],
  authors: [{ name: "Forgedveloci" }],
  openGraph: {
    title: "Forgedveloci | Ultra Premium Forged Wheels",
    description: "Bespoke forged wheels engineered for automotive excellence.",
    type: "website",
    locale: "en_US",
  },
  robots: "index, follow",
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
