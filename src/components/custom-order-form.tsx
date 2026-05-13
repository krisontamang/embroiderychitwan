"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  orderType: "Bridal embroidery",
  paymentPreference: "eSewa",
  budget: "",
  timeline: "",
  message: "",
};

export function CustomOrderForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setStatus("success");
      setForm(initialForm);
    } else {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-gold/20 bg-pearl p-5 luxury-shadow md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          Name
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="h-12 rounded-full border border-gold/25 bg-ivory px-4 text-sm font-normal text-ink"
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          WhatsApp / Phone
          <input
            required
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className="h-12 rounded-full border border-gold/25 bg-ivory px-4 text-sm font-normal text-ink"
            placeholder="+977..."
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="h-12 rounded-full border border-gold/25 bg-ivory px-4 text-sm font-normal text-ink"
            placeholder="you@example.com"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          Order Type
          <select
            value={form.orderType}
            onChange={(event) => setForm({ ...form, orderType: event.target.value })}
            className="h-12 rounded-full border border-gold/25 bg-ivory px-4 text-sm font-normal text-ink"
          >
            <option>Bridal embroidery</option>
            <option>Logo embroidery</option>
            <option>Monogram / name</option>
            <option>Dupatta or sari border</option>
            <option>Bulk uniform order</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          Payment Preference
          <select
            value={form.paymentPreference}
            onChange={(event) => setForm({ ...form, paymentPreference: event.target.value })}
            className="h-12 rounded-full border border-gold/25 bg-ivory px-4 text-sm font-normal text-ink"
          >
            <option>eSewa</option>
            <option>Khalti</option>
            <option>Bank transfer</option>
            <option>Cash</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          Budget
          <input
            value={form.budget}
            onChange={(event) => setForm({ ...form, budget: event.target.value })}
            className="h-12 rounded-full border border-gold/25 bg-ivory px-4 text-sm font-normal text-ink"
            placeholder="Example: NPR 8,000"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/75">
          Needed By
          <input
            value={form.timeline}
            onChange={(event) => setForm({ ...form, timeline: event.target.value })}
            className="h-12 rounded-full border border-gold/25 bg-ivory px-4 text-sm font-normal text-ink"
            placeholder="Date or event week"
          />
        </label>
      </div>
      <label className="mt-5 grid gap-2 text-sm font-semibold text-ink/75">
        Details
        <textarea
          required
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          className="min-h-36 rounded-[1.5rem] border border-gold/25 bg-ivory px-4 py-3 text-sm font-normal leading-7 text-ink"
          placeholder="Tell us about garment type, fabric, colors, quantity, and delivery location."
        />
      </label>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-6 text-ink/55">
          Inspiration photos and garment images can be shared on WhatsApp after submitting.
        </p>
        <button
          disabled={status === "loading"}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-ivory transition hover:bg-rose-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {status === "loading" ? "Sending..." : "Send Request"}
        </button>
      </div>
      {status === "success" ? (
        <p className="mt-4 rounded-full bg-fern/12 px-4 py-3 text-sm font-semibold text-fern">
          Request received. We will reply with next steps.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-4 rounded-full bg-rose/12 px-4 py-3 text-sm font-semibold text-rose-dark">
          Something went wrong. Please try WhatsApp directly.
        </p>
      ) : null}
    </form>
  );
}
