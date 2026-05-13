import Image from "next/image";
import type { GalleryItem } from "@/lib/data";

type GalleryCardProps = {
  item: GalleryItem;
  priority?: boolean;
};

export function GalleryCard({ item, priority = false }: GalleryCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-gold/20 bg-pearl luxury-shadow">
      <div className="relative aspect-[4/5] overflow-hidden bg-champagne">
        {item.mediaType === "video" ? (
          <video
            className="h-full w-full object-cover"
            controls
            playsInline
            poster={item.thumbnail}
            src={item.src}
          />
        ) : (
          <Image
            src={item.src}
            alt={item.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-x-4 top-4 flex justify-between gap-3">
          <span className="rounded-full bg-ivory/90 px-3 py-1 text-xs font-semibold text-rose-dark backdrop-blur">
            {item.category}
          </span>
          {item.mediaType === "video" ? (
            <span className="rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-gold-soft backdrop-blur">
              Video
            </span>
          ) : null}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-2xl text-ink">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-ink/65">{item.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-champagne/65 px-3 py-1 text-xs text-ink/70">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

