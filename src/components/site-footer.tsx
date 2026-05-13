import Link from "next/link";
import { Camera, Mail, MapPin, MessageCircle } from "lucide-react";
import { navItems, paymentMethods, siteConfig, whatsappHref } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/20 bg-ink text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/60 bg-ivory text-sm font-semibold text-gold">
              CE
            </span>
            <div>
              <p className="font-serif text-3xl">Chitwan Embroidery</p>
              <p className="text-xs uppercase tracking-[0.24em] text-gold-soft">
                Premium fashion craft
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-7 text-ivory/70">
            Custom embroidery, boutique fashion detailing, logo stitching, and
            Nepal-wide delivery with a soft luxury finish.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded-full border border-gold/30 px-3 py-1 text-xs text-gold-soft"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-soft">
            Explore
          </p>
          <div className="mt-5 grid gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-ivory/70 transition hover:text-ivory">
                {item.label}
              </Link>
            ))}
            <Link href="/admin" className="text-sm text-ivory/70 transition hover:text-ivory">
              Admin
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-soft">
            Contact
          </p>
          <div className="mt-5 grid gap-4 text-sm text-ivory/70">
            <a className="flex items-center gap-3 transition hover:text-ivory" href={whatsappHref()} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4 text-gold-soft" />
              {siteConfig.whatsappDisplay}
            </a>
            <a className="flex items-center gap-3 transition hover:text-ivory" href={`mailto:${siteConfig.email}`}>
              <Mail className="h-4 w-4 text-gold-soft" />
              {siteConfig.email}
            </a>
            <span className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-gold-soft" />
              {siteConfig.location}
            </span>
            <a className="flex items-center gap-3 transition hover:text-ivory" href={siteConfig.social.instagram} target="_blank" rel="noreferrer">
              <Camera className="h-4 w-4 text-gold-soft" />
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-ivory/10 px-4 py-5 text-center text-xs text-ivory/50">
        © {new Date().getFullYear()} Chitwan Embroidery. Crafted for {siteConfig.domain}.
      </div>
    </footer>
  );
}
