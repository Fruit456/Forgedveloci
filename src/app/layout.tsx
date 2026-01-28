import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ForgedVeloci | Exklusiva Smidda Fälgar",
  description: "Sveriges ledande ateljé för skräddarsydda smidda fälgar. Upplev perfektion i varje detalj.",
  keywords: ["smidda fälgar", "lyxfälgar", "custom fälgar", "bilfälgar", "premium fälgar", "Sverige"],
  authors: [{ name: "ForgedVeloci" }],
  openGraph: {
    title: "ForgedVeloci | Exklusiva Smidda Fälgar",
    description: "Sveriges ledande ateljé för skräddarsydda smidda fälgar.",
    type: "website",
    locale: "sv_SE",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
