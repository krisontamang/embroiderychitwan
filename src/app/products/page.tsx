import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { listCollection } from "@/lib/server/catalog-repository";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse embroidery products and starting prices for bridal blouses, logo polos, dupatta borders, and monogram personalization.",
};

export const revalidate = 60;

export default async function ProductsPage() {
  const products = await listCollection("products");
  const categories = Array.from(new Set(products.map((product) => product.category)));

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Products"
          title="Embroidery pieces with premium finishing and transparent starting prices."
          description="Use these as a starting point, then personalize thread colors, fabric, motif size, quantity, and delivery timing."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <span key={category} className="rounded-full bg-pearl px-4 py-2 text-sm font-semibold text-rose-dark ring-1 ring-gold/20">
              {category}
            </span>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
