import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";
import { SectionHeading } from "@/components/section-heading";
import { listCollection } from "@/lib/server/catalog-repository";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage Chitwan Embroidery products, services, gallery, images, videos, and prices.",
};

export default async function AdminPage() {
  const [products, services, gallery] = await Promise.all([
    listCollection("products", true),
    listCollection("services", true),
    listCollection("gallery", true),
  ]);

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Dashboard"
          title="A premium control room for the Chitwan Embroidery catalog."
          description="Inline editing, image and video upload, pricing updates, search, filters, and Supabase-backed persistence."
        />
        <div className="mt-8">
          <AdminDashboard
            initialProducts={products}
            initialServices={services}
            initialGallery={gallery}
          />
        </div>
      </div>
    </section>
  );
}

