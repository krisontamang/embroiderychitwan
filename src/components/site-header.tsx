"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { navItems, siteConfig, whatsappHref } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/15 bg-ivory/88 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Chitwan Embroidery home">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/45 bg-pearl text-sm font-semibold text-gold luxury-shadow">
            CE
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-2xl text-ink">Chitwan</span>
            <span className="-mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-rose">
              Embroidery
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-blush/35 text-rose-dark"
                    : "text-ink/70 hover:bg-champagne/55 hover:text-rose-dark"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-ivory transition hover:bg-rose-dark"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          title={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-full border border-gold/25 bg-pearl text-ink lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-navigation" className="border-t border-gold/15 bg-ivory px-4 pb-5 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2 pt-4" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-full px-4 py-3 text-sm font-semibold ${
                    active ? "bg-blush/35 text-rose-dark" : "bg-pearl text-ink/75"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-ivory"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp {siteConfig.whatsappDisplay}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

