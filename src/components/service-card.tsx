import Image from "next/image";
import { PenLine, Scissors, Shirt, Sparkles } from "lucide-react";
import type { Service } from "@/lib/data";

const icons = {
  Sparkles,
  Shirt,
  Scissors,
  PenLine,
};

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = icons[service.iconName as keyof typeof icons] ?? Sparkles;

  return (
    <article className="grid overflow-hidden rounded-[2rem] border border-gold/20 bg-pearl luxury-shadow md:grid-cols-[0.85fr_1.15fr]">
      <div className="relative min-h-64 overflow-hidden">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          sizes="(min-width: 768px) 35vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-6 md:p-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-blush/35 text-rose-dark">
            <Icon className="h-5 w-5" />
          </span>
          <span className="rounded-full border border-gold/25 px-4 py-2 text-sm font-semibold text-gold">
            {service.priceLabel}
          </span>
        </div>
        <h3 className="font-serif text-3xl leading-tight text-ink">{service.title}</h3>
        <p className="mt-4 text-sm leading-7 text-ink/68">{service.description}</p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-rose">
          {service.turnaround}
        </p>
        <div className="mt-5 grid gap-2">
          {service.features.map((feature) => (
            <span key={feature} className="rounded-full bg-champagne/55 px-4 py-2 text-sm text-ink/70">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

