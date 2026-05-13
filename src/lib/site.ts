export const siteConfig = {
  name: "Chitwan Embroidery",
  tagline: "Premium embroidery and boutique fashion craft",
  domain: "chitwanembroidery.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://chitwanembroidery.com",
  email: "info@chitwanembroidery.com",
  location: "Chitwan, Nepal",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "9779800000000",
  whatsappDisplay: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "+977 980 0000000",
  social: {
    instagram: "https://instagram.com/chitwanembroidery",
    facebook: "https://facebook.com/chitwanembroidery",
  },
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/custom-orders", label: "Custom Orders" },
  { href: "/contact", label: "Contact" },
];

export const paymentMethods = ["eSewa", "Khalti", "Bank Transfer", "Cash"];

export function whatsappHref(message = "Namaste Chitwan Embroidery, I would like to discuss a custom embroidery order.") {
  const number = siteConfig.whatsappNumber.replace(/[^\d]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
