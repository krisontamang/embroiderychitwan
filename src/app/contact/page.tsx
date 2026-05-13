import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { CustomOrderForm } from "@/components/custom-order-form";
import { SectionHeading } from "@/components/section-heading";
import { paymentMethods, siteConfig, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Chitwan Embroidery for custom embroidery, fashion finishing, Nepal-wide delivery, eSewa, Khalti, and WhatsApp ordering.",
};

export default function ContactPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="A soft, personal ordering experience from first message to final stitch."
            description="Reach out for bridal pieces, business logos, gifting, monograms, and Nepal-wide delivery details."
          />
          <div className="mt-8 grid gap-4">
            <a href={whatsappHref()} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-[1.5rem] border border-gold/20 bg-pearl p-5 text-ink transition hover:bg-champagne/55">
              <MessageCircle className="h-5 w-5 text-rose" />
              <span>
                <span className="block text-sm font-semibold">WhatsApp</span>
                <span className="text-sm text-ink/65">{siteConfig.whatsappDisplay}</span>
              </span>
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-4 rounded-[1.5rem] border border-gold/20 bg-pearl p-5 text-ink transition hover:bg-champagne/55">
              <Mail className="h-5 w-5 text-rose" />
              <span>
                <span className="block text-sm font-semibold">Email</span>
                <span className="text-sm text-ink/65">{siteConfig.email}</span>
              </span>
            </a>
            <div className="flex items-center gap-4 rounded-[1.5rem] border border-gold/20 bg-pearl p-5 text-ink">
              <MapPin className="h-5 w-5 text-rose" />
              <span>
                <span className="block text-sm font-semibold">Location</span>
                <span className="text-sm text-ink/65">{siteConfig.location}</span>
              </span>
            </div>
          </div>
          <div className="mt-8 rounded-[1.5rem] bg-ink p-6 text-ivory">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-soft">Payment support</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <span key={method} className="rounded-full border border-gold/35 px-3 py-1 text-xs text-gold-soft">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
        <CustomOrderForm />
      </div>
    </section>
  );
}

