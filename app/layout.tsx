import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geist-sans",
  display: "swap",
});

const googleSans = localFont({
  src: "./fonts/GoogleSans-VariableFont_GRAD,opsz,wght.ttf",
  variable: "--font-google-sans",
  weight: "100 900",
  display: "swap",
  fallback: ["Inter", "-apple-system", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Anthronite - AI Research Lab",
  description: "AI Research Lab architecting high end infrastructure and inventing new ai systems.",
  icons: {
    icon: "/logo no bg.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${googleSans.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
