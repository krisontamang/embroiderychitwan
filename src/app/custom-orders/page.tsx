import type { Metadata } from "next";
import { CustomOrderForm } from "@/components/custom-order-form";
import { SectionHeading } from "@/components/section-heading";
import { orderSteps } from "@/lib/data";

export const metadata: Metadata = {
  title: "Custom Orders",
  description:
    "Request custom embroidery, bridal fashion detailing, logo stitching, monograms, and Nepal-wide delivery from Chitwan Embroidery.",
};

export default function CustomOrdersPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Custom orders"
            title="Tell us the story of the piece you want to create."
            description="Share your garment, design idea, quantity, delivery location, and timing. We will respond with design direction, pricing, and payment options."
          />
          <div className="mt-8 grid gap-4">
            {orderSteps.map((step, index) => (
              <div key={step.title} className="rounded-[1.5rem] border border-gold/20 bg-pearl p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose">
                  Step {index + 1}
                </p>
                <h2 className="mt-3 font-serif text-2xl">{step.title}</h2>
                <p className="mt-2 text-sm leading-7 text-ink/65">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
        <CustomOrderForm />
      </div>
    </section>
  );
}

