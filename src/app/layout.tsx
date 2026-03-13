import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://carmel-ahotin.vercel.app"),
  title: "Portfolio – Jesugnon Carmel AHOTIN",
  description:
    "Portfolio professionnel de Jesugnon Carmel AHOTIN, Full Stack Developer orienté produit, performance et UX.",
  alternates: {
    canonical: "/fr",
    languages: {
      fr: "/fr",
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    url: "https://carmel-ahotin.vercel.app",
    title: "Portfolio – Jesugnon Carmel AHOTIN",
    description:
      "Portfolio de Jesugnon Carmel AHOTIN – Full Stack Developer (Next.js, NestJS, Firebase) spécialisé en produits performants et UX premium.",
    siteName: "Carmel AHOTIN – Portfolio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "t9xxKCsyBh3ZHIL7uV6kq5avC4UhgFUA44VpfPhDP8A",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
