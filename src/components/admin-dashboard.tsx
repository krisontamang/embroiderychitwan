"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ImageUp,
  LayoutGrid,
  LogIn,
  Package,
  Plus,
  Save,
  Search,
  Settings2,
  Trash2,
} from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { getBrowserSupabase } from "@/lib/supabase/browser";
import type { GalleryItem, MediaAsset, Product, Service } from "@/lib/data";

type AdminDashboardProps = {
  initialProducts: Product[];
  initialServices: Service[];
  initialGallery: GalleryItem[];
};

type Tab = "products" | "services" | "gallery";
type StatusFilter = "all" | "active" | "draft";

const tabs: Array<{ id: Tab; label: string; icon: typeof Package }> = [
  { id: "products", label: "Products", icon: Package },
  { id: "services", label: "Services", icon: Settings2 },
  { id: "gallery", label: "Gallery", icon: LayoutGrid },
];

export function AdminDashboard({
  initialProducts,
  initialServices,
  initialGallery,
}: AdminDashboardProps) {
  const [tab, setTab] = useState<Tab>("products");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [products, setProducts] = useState(initialProducts);
  const [services, setServices] = useState(initialServices);
  const [gallery, setGallery] = useState(initialGallery);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("Demo mode works without Supabase keys. Add env vars to persist changes.");
  const supabase = getBrowserSupabase();

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => data.subscription.unsubscribe();
  }, [supabase]);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        return matches(product.status, statusFilter) && textMatches(query, [
          product.name,
          product.category,
          product.description,
          product.tags.join(" "),
        ]);
      }),
    [products, query, statusFilter],
  );

  const filteredServices = useMemo(
    () =>
      services.filter((service) => {
        return matches(service.status, statusFilter) && textMatches(query, [
          service.title,
          service.description,
          service.features.join(" "),
        ]);
      }),
    [services, query, statusFilter],
  );

  const filteredGallery = useMemo(
    () =>
      gallery.filter((item) => {
        return matches(item.status, statusFilter) && textMatches(query, [
          item.title,
          item.category,
          item.description,
          item.tags.join(" "),
        ]);
      }),
    [gallery, query, statusFilter],
  );

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setNotice("Supabase is not configured yet, so the dashboard stays in demo mode.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setNotice(error.message);
      return;
    }

    setNotice("Signed in. Changes will be checked against admin_profiles before saving.");
  }

  async function uploadAssets(files: FileList | null) {
    if (!files?.length) {
      return [];
    }

    const data = new FormData();
    Array.from(files).forEach((file) => data.append("files", file));

    const response = await fetch("/api/uploads", {
      method: "POST",
      headers: authHeaders(session),
      body: data,
    });

    if (!response.ok) {
      setNotice("Upload failed. Check Cloudinary credentials or admin access.");
      return [];
    }

    const result = await response.json();
    setNotice(result.source === "cloudinary" ? "Media uploaded to Cloudinary." : "Demo upload added.");
    return (result.assets ?? []) as MediaAsset[];
  }

  async function saveProduct(product: Product) {
    try {
      const saved = await saveItem<Product>("products", product, session);
      setProducts((items) => replaceById(items, product.id, saved));
      setNotice("Product saved.");
    } catch {
      setNotice("Product save failed. Sign in with an admin account or check Supabase keys.");
    }
  }

  async function saveService(service: Service) {
    try {
      const saved = await saveItem<Service>("services", service, session);
      setServices((items) => replaceById(items, service.id, saved));
      setNotice("Service saved.");
    } catch {
      setNotice("Service save failed. Sign in with an admin account or check Supabase keys.");
    }
  }

  async function saveGalleryItem(item: GalleryItem) {
    try {
      const saved = await saveItem<GalleryItem>("gallery", item, session);
      setGallery((items) => replaceById(items, item.id, saved));
      setNotice("Gallery item saved.");
    } catch {
      setNotice("Gallery save failed. Sign in with an admin account or check Supabase keys.");
    }
  }

  async function deleteItem(collection: Tab, id: string) {
    const response = await fetch(`/api/${collection}/${id}`, {
      method: "DELETE",
      headers: authHeaders(session),
    });

    if (!response.ok) {
      setNotice("Delete failed. Sign in with an admin account or check Supabase keys.");
      return;
    }

    if (collection === "products") {
      setProducts((items) => items.filter((item) => item.id !== id));
    } else if (collection === "services") {
      setServices((items) => items.filter((item) => item.id !== id));
    } else {
      setGallery((items) => items.filter((item) => item.id !== id));
    }

    setNotice("Item deleted.");
  }

  return (
    <div className="grid gap-8">
      <section className="grid gap-6 rounded-[2rem] border border-gold/20 bg-pearl p-5 luxury-shadow lg:grid-cols-[1.1fr_0.9fr] lg:p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose">Admin studio</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">
            Manage the boutique catalog.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/65">
            Edit products, services, pricing, gallery images, and video assets
            without leaving the page.
          </p>
          <p className="mt-5 rounded-full bg-champagne/65 px-4 py-3 text-sm font-semibold text-ink/70">
            {notice}
          </p>
        </div>

        <form onSubmit={signIn} className="grid gap-3 rounded-[1.5rem] border border-gold/20 bg-ivory p-4">
          <p className="text-sm font-semibold text-ink">Supabase admin sign-in</p>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@example.com"
            className="h-11 rounded-full border border-gold/25 bg-pearl px-4 text-sm"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="h-11 rounded-full border border-gold/25 bg-pearl px-4 text-sm"
          />
          <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-ivory transition hover:bg-rose-dark">
            <LogIn className="h-4 w-4" />
            {session ? "Refresh Session" : "Sign In"}
          </button>
        </form>
      </section>

      <section className="rounded-[2rem] border border-gold/20 bg-pearl p-4 luxury-shadow md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition ${
                    active ? "bg-ink text-ivory" : "bg-ivory text-ink/70 hover:bg-champagne"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_9rem] lg:w-[32rem]">
            <label className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/45" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search catalog"
                className="h-11 w-full rounded-full border border-gold/25 bg-ivory pl-11 pr-4 text-sm"
              />
            </label>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
              className="h-11 rounded-full border border-gold/25 bg-ivory px-4 text-sm font-semibold text-ink/70"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          {tab === "products" ? (
            <ProductEditor
              items={filteredProducts}
              onAdd={() => setProducts((items) => [newProduct(), ...items])}
              onChange={(next) => setProducts((items) => replaceById(items, next.id, next))}
              onSave={saveProduct}
              onDelete={(id) => deleteItem("products", id)}
              onUpload={uploadAssets}
            />
          ) : null}
          {tab === "services" ? (
            <ServiceEditor
              items={filteredServices}
              onAdd={() => setServices((items) => [newService(), ...items])}
              onChange={(next) => setServices((items) => replaceById(items, next.id, next))}
              onSave={saveService}
              onDelete={(id) => deleteItem("services", id)}
              onUpload={uploadAssets}
            />
          ) : null}
          {tab === "gallery" ? (
            <GalleryEditor
              items={filteredGallery}
              onAdd={() => setGallery((items) => [newGalleryItem(), ...items])}
              onChange={(next) => setGallery((items) => replaceById(items, next.id, next))}
              onSave={saveGalleryItem}
              onDelete={(id) => deleteItem("gallery", id)}
              onUpload={uploadAssets}
            />
          ) : null}
        </div>
      </section>
    </div>
  );
}

function ProductEditor({
  items,
  onAdd,
  onChange,
  onSave,
  onDelete,
  onUpload,
}: {
  items: Product[];
  onAdd: () => void;
  onChange: (item: Product) => void;
  onSave: (item: Product) => void;
  onDelete: (id: string) => void;
  onUpload: (files: FileList | null) => Promise<MediaAsset[]>;
}) {
  return (
    <div className="grid gap-4">
      <button onClick={onAdd} className="inline-flex h-11 w-fit items-center gap-2 rounded-full bg-rose-dark px-4 text-sm font-semibold text-ivory">
        <Plus className="h-4 w-4" />
        Add Product
      </button>
      <div className="grid gap-4">
        {items.map((item) => (
          <article key={item.id} className="grid gap-4 rounded-[1.5rem] border border-gold/20 bg-ivory p-4 lg:grid-cols-[13rem_1fr]">
            <PreviewImage src={item.images[0]?.src} alt={item.name} />
            <div className="grid gap-3">
              <Field label="Name" value={item.name} onChange={(name) => onChange({ ...item, name })} />
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Category" value={item.category} onChange={(category) => onChange({ ...item, category })} />
                <Field label="Price Label" value={item.priceLabel} onChange={(priceLabel) => onChange({ ...item, priceLabel })} />
                <Field label="Price Min" value={String(item.priceMin)} onChange={(priceMin) => onChange({ ...item, priceMin: Number(priceMin) })} />
              </div>
              <Textarea label="Description" value={item.description} onChange={(description) => onChange({ ...item, description })} />
              <Textarea label="Story" value={item.story} onChange={(story) => onChange({ ...item, story })} />
              <Field label="Tags" value={item.tags.join(", ")} onChange={(value) => onChange({ ...item, tags: csv(value) })} />
              <RowActions
                status={item.status}
                onStatus={(status) => onChange({ ...item, status })}
                onSave={() => onSave(item)}
                onDelete={() => onDelete(item.id)}
                onUpload={async (files) => {
                  const assets = await onUpload(files);
                  onChange({ ...item, images: [...item.images, ...assets.filter((asset) => asset.type !== "video")] });
                }}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ServiceEditor({
  items,
  onAdd,
  onChange,
  onSave,
  onDelete,
  onUpload,
}: {
  items: Service[];
  onAdd: () => void;
  onChange: (item: Service) => void;
  onSave: (item: Service) => void;
  onDelete: (id: string) => void;
  onUpload: (files: FileList | null) => Promise<MediaAsset[]>;
}) {
  return (
    <div className="grid gap-4">
      <button onClick={onAdd} className="inline-flex h-11 w-fit items-center gap-2 rounded-full bg-rose-dark px-4 text-sm font-semibold text-ivory">
        <Plus className="h-4 w-4" />
        Add Service
      </button>
      <div className="grid gap-4">
        {items.map((item) => (
          <article key={item.id} className="grid gap-4 rounded-[1.5rem] border border-gold/20 bg-ivory p-4 lg:grid-cols-[13rem_1fr]">
            <PreviewImage src={item.imageUrl} alt={item.title} />
            <div className="grid gap-3">
              <Field label="Title" value={item.title} onChange={(title) => onChange({ ...item, title })} />
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Price" value={item.priceLabel} onChange={(priceLabel) => onChange({ ...item, priceLabel })} />
                <Field label="Turnaround" value={item.turnaround} onChange={(turnaround) => onChange({ ...item, turnaround })} />
                <Field label="Icon" value={item.iconName} onChange={(iconName) => onChange({ ...item, iconName })} />
              </div>
              <Textarea label="Description" value={item.description} onChange={(description) => onChange({ ...item, description })} />
              <Field label="Features" value={item.features.join(", ")} onChange={(value) => onChange({ ...item, features: csv(value) })} />
              <Field label="Image URL" value={item.imageUrl} onChange={(imageUrl) => onChange({ ...item, imageUrl })} />
              <RowActions
                status={item.status}
                onStatus={(status) => onChange({ ...item, status })}
                onSave={() => onSave(item)}
                onDelete={() => onDelete(item.id)}
                onUpload={async (files) => {
                  const assets = await onUpload(files);
                  const image = assets.find((asset) => asset.type !== "video");
                  if (image) onChange({ ...item, imageUrl: image.src });
                }}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function GalleryEditor({
  items,
  onAdd,
  onChange,
  onSave,
  onDelete,
  onUpload,
}: {
  items: GalleryItem[];
  onAdd: () => void;
  onChange: (item: GalleryItem) => void;
  onSave: (item: GalleryItem) => void;
  onDelete: (id: string) => void;
  onUpload: (files: FileList | null) => Promise<MediaAsset[]>;
}) {
  return (
    <div className="grid gap-4">
      <button onClick={onAdd} className="inline-flex h-11 w-fit items-center gap-2 rounded-full bg-rose-dark px-4 text-sm font-semibold text-ivory">
        <Plus className="h-4 w-4" />
        Add Gallery Item
      </button>
      <div className="grid gap-4">
        {items.map((item) => (
          <article key={item.id} className="grid gap-4 rounded-[1.5rem] border border-gold/20 bg-ivory p-4 lg:grid-cols-[13rem_1fr]">
            <PreviewImage src={item.thumbnail || item.src} alt={item.title} />
            <div className="grid gap-3">
              <Field label="Title" value={item.title} onChange={(title) => onChange({ ...item, title })} />
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Category" value={item.category} onChange={(category) => onChange({ ...item, category })} />
                <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                  Media Type
                  <select
                    value={item.mediaType}
                    onChange={(event) => onChange({ ...item, mediaType: event.target.value as GalleryItem["mediaType"] })}
                    className="h-11 rounded-full border border-gold/25 bg-pearl px-4 text-sm font-normal normal-case tracking-normal text-ink"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </label>
                <Field label="Tags" value={item.tags.join(", ")} onChange={(value) => onChange({ ...item, tags: csv(value) })} />
              </div>
              <Textarea label="Description" value={item.description} onChange={(description) => onChange({ ...item, description })} />
              <Field label="Media URL" value={item.src} onChange={(src) => onChange({ ...item, src })} />
              <Field label="Thumbnail" value={item.thumbnail ?? ""} onChange={(thumbnail) => onChange({ ...item, thumbnail })} />
              <RowActions
                status={item.status}
                onStatus={(status) => onChange({ ...item, status })}
                onSave={() => onSave(item)}
                onDelete={() => onDelete(item.id)}
                onUpload={async (files) => {
                  const assets = await onUpload(files);
                  const asset = assets[0];
                  if (asset) onChange({ ...item, src: asset.src, mediaType: asset.type === "video" ? "video" : "image" });
                }}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-full border border-gold/25 bg-pearl px-4 text-sm font-normal normal-case tracking-normal text-ink"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-24 rounded-[1.25rem] border border-gold/25 bg-pearl px-4 py-3 text-sm font-normal normal-case leading-6 tracking-normal text-ink"
      />
    </label>
  );
}

function RowActions({
  status,
  onStatus,
  onSave,
  onDelete,
  onUpload,
}: {
  status: "active" | "draft";
  onStatus: (status: "active" | "draft") => void;
  onSave: () => void;
  onDelete: () => void;
  onUpload: (files: FileList | null) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <select
          value={status}
          onChange={(event) => onStatus(event.target.value as "active" | "draft")}
          className="h-10 rounded-full border border-gold/25 bg-pearl px-4 text-sm font-semibold text-ink/70"
        >
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </select>
        <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-gold/25 bg-pearl px-4 text-sm font-semibold text-ink/70">
          <ImageUp className="h-4 w-4" />
          Upload
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(event) => onUpload(event.target.files)}
          />
        </label>
      </div>
      <div className="flex gap-2">
        <button onClick={onSave} className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-ivory">
          <Save className="h-4 w-4" />
          Save
        </button>
        <button onClick={onDelete} className="grid h-10 w-10 place-items-center rounded-full border border-rose/25 text-rose-dark" title="Delete">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function PreviewImage({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-champagne">
      {src ? (
        <Image src={src} alt={alt} fill sizes="13rem" className="object-cover" />
      ) : (
        <div className="grid h-full place-items-center text-sm font-semibold text-ink/45">
          No image
        </div>
      )}
    </div>
  );
}

async function saveItem<T extends { id: string }>(collection: Tab, item: T, session: Session | null) {
  const isDraft = item.id.startsWith("draft-");
  const response = await fetch(isDraft ? `/api/${collection}` : `/api/${collection}/${item.id}`, {
    method: isDraft ? "POST" : "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(session),
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Save failed");
  }

  const result = await response.json();
  return result.item as T;
}

function authHeaders(session: Session | null): Record<string, string> {
  return session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {};
}

function replaceById<T extends { id: string }>(items: T[], id: string, next: T) {
  return items.map((item) => (item.id === id ? next : item));
}

function textMatches(query: string, values: string[]) {
  if (!query.trim()) {
    return true;
  }

  const haystack = values.join(" ").toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function matches(status: "active" | "draft", filter: StatusFilter) {
  return filter === "all" || status === filter;
}

function csv(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function newProduct(): Product {
  return {
    id: `draft-${crypto.randomUUID()}`,
    name: "New Product",
    slug: "new-product",
    category: "Custom",
    priceMin: 0,
    priceLabel: "Quote on request",
    description: "",
    story: "",
    images: [],
    videos: [],
    tags: [],
    isFeatured: false,
    status: "draft",
    sortOrder: 99,
  };
}

function newService(): Service {
  return {
    id: `draft-${crypto.randomUUID()}`,
    title: "New Service",
    slug: "new-service",
    priceLabel: "Quote on request",
    description: "",
    turnaround: "To be confirmed",
    features: [],
    imageUrl: "",
    iconName: "Sparkles",
    status: "draft",
    sortOrder: 99,
  };
}

function newGalleryItem(): GalleryItem {
  return {
    id: `draft-${crypto.randomUUID()}`,
    title: "New Gallery Item",
    category: "Custom",
    description: "",
    mediaType: "image",
    src: "",
    thumbnail: "",
    tags: [],
    isFeatured: false,
    status: "draft",
    sortOrder: 99,
  };
}
