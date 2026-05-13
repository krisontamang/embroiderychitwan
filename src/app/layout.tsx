import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Chitwan Embroidery | Premium Custom Embroidery in Nepal",
    template: "%s | Chitwan Embroidery",
  },
  description:
    "Elegant custom embroidery, boutique fashion pieces, logo stitching, and Nepal-wide delivery from Chitwan Embroidery.",
  keywords: [
    "Chitwan Embroidery",
    "embroidery in Chitwan",
    "custom embroidery Nepal",
    "bridal embroidery Nepal",
    "logo embroidery Nepal",
    "boutique fashion Chitwan",
  ],
  openGraph: {
    title: "Chitwan Embroidery",
    description:
      "Premium embroidery and fashion craftsmanship with custom orders, eSewa and Khalti payment support, and Nepal-wide delivery.",
    url: siteConfig.url,
    siteName: "Chitwan Embroidery",
    locale: "en_NP",
    type: "website",
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-ivory text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
