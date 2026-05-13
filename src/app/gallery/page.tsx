import type { Metadata } from "next";
import { GalleryCard } from "@/components/gallery-card";
import { SectionHeading } from "@/components/section-heading";
import { listCollection } from "@/lib/server/catalog-repository";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore embroidery visuals, bridal threadwork, logo stitching, border finishing, and boutique fashion details by Chitwan Embroidery.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const galleryItems = await listCollection("gallery");
  const categories = Array.from(new Set(galleryItems.map((item) => item.category)));

  return (
    <div>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Gallery"
            title="Embroidery visuals shaped around texture, light, and garment story."
            description="A curated preview of bridal, border, logo, zari, and personalization work. Add your own Cloudinary images and videos from the admin dashboard."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((category) => (
              <span key={category} className="rounded-full border border-gold/25 bg-pearl px-4 py-2 text-sm font-semibold text-ink/70">
                {category}
              </span>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item, index) => (
              <GalleryCard key={item.id} item={item} priority={index < 2} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
