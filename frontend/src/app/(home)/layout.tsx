import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fusion - Streamline Sales with Actionable Analytics",
  description:
    "Boost your sales productivity with Fusion's real-time analytics, seamless integrations, and intuitive dashboards. Start your 14-day free trial today!",
  keywords: "sales analytics, CRM, business growth, real-time insights",
  openGraph: {
    title: "Fusion - Streamline Sales with Actionable Analytics",
    description:
      "Boost your sales productivity with Fusion's real-time analytics and integrations.",
    url: "https://yourwebsite.com",
    images: ["/og-image.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}