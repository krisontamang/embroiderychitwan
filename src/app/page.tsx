import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Truck } from "lucide-react";
import { GalleryCard } from "@/components/gallery-card";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import {
  deliveryHighlights,
  heroImage,
  orderSteps,
} from "@/lib/data";
import { listCollection } from "@/lib/server/catalog-repository";
import { siteConfig, whatsappHref } from "@/lib/site";

export const revalidate = 60;

export default async function Home() {
  const [products, services, galleryItems] = await Promise.all([
    listCollection("products"),
    listCollection("services"),
    listCollection("gallery"),
  ]);
  const signatureProducts = products.filter((product) => product.isFeatured).slice(0, 2);
  const featuredGallery = galleryItems.filter((item) => item.isFeatured).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    image: heroImage,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.whatsappDisplay,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chitwan",
      addressCountry: "NP",
    },
    areaServed: "Nepal",
    paymentAccepted: "eSewa, Khalti, Bank Transfer, Cash",
    priceRange: "NPR 450+",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative isolate min-h-[82svh] overflow-hidden">
        <Image
          src={heroImage}
          alt="Premium fashion embroidery visual for Chitwan Embroidery"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(46,34,48,0.74),rgba(191,63,112,0.34),rgba(255,249,240,0.18))]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ivory to-transparent" />

        <div className="relative mx-auto flex min-h-[82svh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-ivory">
            <p className="reveal-up text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Luxury embroidery from Chitwan
            </p>
            <h1 className="reveal-up mt-5 font-serif text-5xl leading-none text-balance sm:text-6xl lg:text-8xl">
              Chitwan Embroidery
            </h1>
            <p className="reveal-up-delay mt-6 max-w-2xl text-base leading-8 text-ivory/82 sm:text-lg">
              Feminine boutique embroidery, custom fashion detailing, logo
              stitching, and carefully finished occasion pieces delivered across
              Nepal.
            </p>
            <div className="reveal-up-delay mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/custom-orders"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-ivory px-6 text-sm font-semibold text-ink transition hover:bg-gold-soft"
              >
                Start a Custom Order
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-ivory/45 px-6 text-sm font-semibold text-ivory backdrop-blur transition hover:bg-ivory/12"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Now
              </a>
            </div>
            <div className="reveal-up-delay mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {["Bridal", "Logo", "Zari", "Monogram"].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-ivory/25 bg-ivory/10 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-ivory backdrop-blur"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Craft first"
            title="Embroidery that feels personal before it feels decorative."
            description="Every piece begins with the garment, the occasion, the person wearing it, and the small details that make the work feel intentional."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {deliveryHighlights.map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-gold/20 bg-pearl p-5 luxury-shadow">
                <CheckCircle2 className="h-5 w-5 text-rose" />
                <p className="mt-4 text-sm font-semibold text-ink">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Signature services"
              title="Boutique work for weddings, brands, gifts, and daily wear."
              description="Choose a service as-is, or combine digitizing, threadwork, and finishing into one custom order."
            />
            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-gold/35 px-5 text-sm font-semibold text-rose-dark transition hover:bg-champagne"
            >
              View Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {services.slice(0, 2).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Featured work"
            title="Visual details, soft finishes, and pieces made to be remembered."
            align="center"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredGallery.map((item, index) => (
              <GalleryCard key={item.id} item={item} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-champagne/55 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Products and pricing"
              title="Starting prices for the most requested embroidery pieces."
              description="Final pricing depends on design size, stitch density, material, thread type, quantity, and delivery timing."
            />
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-ivory transition hover:bg-rose-dark"
            >
              Explore Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {signatureProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-gold/20 bg-ink p-6 text-ivory luxury-shadow md:grid-cols-[0.8fr_1.2fr] md:p-10">
          <div>
            <Truck className="h-8 w-8 text-gold-soft" />
            <h2 className="mt-6 font-serif text-4xl leading-tight text-balance">
              Custom orders delivered across Nepal.
            </h2>
            <p className="mt-5 text-sm leading-7 text-ivory/70">
              Send inspiration, approve the design direction, and receive a
              carefully finished piece with eSewa, Khalti, bank transfer, or
              cash payment support.
            </p>
          </div>
          <div className="grid gap-4">
            {orderSteps.map((step, index) => (
              <div key={step.title} className="rounded-[1.5rem] border border-ivory/12 bg-ivory/7 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-soft">
                  Step {index + 1}
                </p>
                <h3 className="mt-3 font-serif text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ivory/68">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
