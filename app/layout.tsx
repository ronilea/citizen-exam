import type { Metadata } from "next";
import { Assistant, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "600", "700"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Citizen Café — Hebrew Flashcards",
  description:
    "Study Hebrew vocabulary with flashcards organised by Citizen Café tiers and levels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${assistant.variable} ${libreBaskerville.variable} h-dvh antialiased`}
    >
      <body className="flex h-dvh flex-col overflow-hidden bg-surface-base text-brand-charcoal">
        {children}
      </body>
    </html>
  );
}
