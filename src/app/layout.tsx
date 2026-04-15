import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import ClientLayout from "@/components/ClientLayout";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Edge Solution | Digital Marketing Agency",
  description: "Transform your brand with cutting-edge digital marketing strategies. SEO, Social Media, PPC, and Content Marketing solutions.",
  keywords: "digital marketing, SEO, social media marketing, PPC, content marketing, branding",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col relative overflow-x-hidden`}>
        <GoogleAnalytics />
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
