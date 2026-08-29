import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bradley Mukhuti - Deep Ancestry Discovery",
  description:
    "How far back can we trace the lineage of Bradley Mukhuti? A deep ancestry investigation into the Mukhuti family of Barisal, Bangladesh — combining family-provided knowledge, Bengali Brahmin surname history, and honest evidence scoring of verified, inferred, and unresolved claims.",
  keywords: [
    "genealogy",
    "ancestry",
    "family tree",
    "Mukhuti",
    "Mukherjee",
    "Mukhopadhyay",
    "Barisal",
    "Bengal",
    "Shillong",
    "ancestry research",
    "deep ancestry",
    "family history",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-pearl antialiased">
        {children}
      </body>
    </html>
  );
}
