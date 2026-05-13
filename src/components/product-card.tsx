import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/data";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0];

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-gold/20 bg-pearl luxury-shadow">
      <div className="relative aspect-[4/5] overflow-hidden">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-x-4 top-4 flex items-center justify-between">
          <span className="rounded-full bg-ivory/90 px-3 py-1 text-xs font-semibold text-rose-dark backdrop-blur">
            {product.category}
          </span>
          {product.isFeatured ? (
            <span className="rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-gold-soft backdrop-blur">
              Signature
            </span>
          ) : null}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl leading-tight text-ink">{product.name}</h3>
            <p className="mt-2 text-sm font-semibold text-gold">{product.priceLabel}</p>
          </div>
          <Link
            href="/custom-orders"
            title={`Order ${product.name}`}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/30 text-rose-dark transition group-hover:bg-rose-dark group-hover:text-ivory"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-4 text-sm leading-7 text-ink/65">{product.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-champagne/65 px-3 py-1 text-xs text-ink/70">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

