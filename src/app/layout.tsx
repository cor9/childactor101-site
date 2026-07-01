import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.childactor101.com"),
  title: {
    default: "Child Actor 101 | The classroom for families navigating TV and film",
    template: "%s | Child Actor 101",
  },
  description:
    "Child Actor 101 helps families navigate the television and film industry through trusted education, practical tools, and professional training.",
  openGraph: {
    title: "Child Actor 101",
    description:
      "Trusted education, practical tools, and professional training for families navigating TV and film.",
    url: "https://www.childactor101.com",
    siteName: "Child Actor 101",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Child Actor 101",
    description:
      "Trusted education, practical tools, and professional training for families navigating TV and film.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <a
          href="#main-content"
          className="sr-only absolute left-4 top-4 z-[100] rounded-full bg-purple px-4 py-2 text-sm font-semibold text-chalk shadow-soft focus:not-sr-only"
        >
          Skip to content
        </a>
        <div className="flex min-h-full flex-col">
          <Header />
          <div id="main-content" className="flex-1">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
