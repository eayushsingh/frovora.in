import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Frovora Bakehouse | Artisanal Desserts — Hyderabad",
  description:
    "Freshly Baked · Handmade · Artisanal. Brownies, cookies & bars — baked to obsession, delivered to your door in Hyderabad.",
  openGraph: {
    title: "Frovora Bakehouse",
    description: "Handcrafted for the midnight sweet tooth.",
    url: "https://frovora.in",
    siteName: "Frovora Bakehouse",
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
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <body className="bg-white text-[#2A2A2A] font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
