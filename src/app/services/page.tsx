import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { deliveryHighlights } from "@/lib/data";
import { listCollection } from "@/lib/server/catalog-repository";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom bridal embroidery, logo embroidery, machine digitizing, monograms, and premium fashion finishing from Chitwan Embroidery.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await listCollection("services");

  return (
    <div>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <SectionHeading
              eyebrow="Services"
              title="Premium embroidery services with clear starting prices."
              description="From bridal detail to repeat logo batches, every project is priced around design size, stitch density, material, finishing, and delivery timeline."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {deliveryHighlights.map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-gold/20 bg-pearl p-4 text-sm font-semibold text-ink/70">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 grid gap-7">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-gold/20 bg-champagne/55 p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose">Custom bundle</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-ink">
              Need multiple services in one order?
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/68">
              Combine digitizing, embroidery, finishing, packaging, and
              Nepal-wide delivery into one production plan.
            </p>
          </div>
          <Link
            href="/custom-orders"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-ivory transition hover:bg-rose-dark"
          >
            Request Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
