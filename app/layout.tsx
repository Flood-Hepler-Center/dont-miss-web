import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Don't Miss This Saturday — Hangout Space",
  description:
    "A warm, intimate hangout space for good coffee, good food, and even better company. Visit us every Saturday.",
  openGraph: {
    title: "Don't Miss This Saturday",
    description: "Your favourite Saturday hangout space.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
