import {
  galleryItems,
  products,
  services,
  type GalleryItem,
  type MediaAsset,
  type Product,
  type Service,
} from "@/lib/data";
import { createAdminSupabase, createPublicSupabase } from "@/lib/supabase/server";

export type CollectionName = "products" | "services" | "gallery";
type CatalogItem = Product | Service | GalleryItem;

const tableByCollection: Record<CollectionName, string> = {
  products: "products",
  services: "services",
  gallery: "gallery_items",
};

const fallbackByCollection = {
  products,
  services,
  gallery: galleryItems,
};

export async function listCollection(collection: "products", includeDrafts?: boolean): Promise<Product[]>;
export async function listCollection(collection: "services", includeDrafts?: boolean): Promise<Service[]>;
export async function listCollection(collection: "gallery", includeDrafts?: boolean): Promise<GalleryItem[]>;
export async function listCollection(collection: CollectionName, includeDrafts = false) {
  const supabase = includeDrafts ? createAdminSupabase() : createPublicSupabase();

  if (!supabase) {
    return fallbackByCollection[collection];
  }

  let query = supabase
    .from(tableByCollection[collection])
    .select("*")
    .order("sort_order", { ascending: true });

  if (!includeDrafts) {
    query = query.eq("status", "active");
  }

  const { data, error } = await query;

  if (error || !data) {
    return fallbackByCollection[collection];
  }

  return data.map((row) => fromDatabase(collection, row));
}

export async function createCatalogItem(collection: CollectionName, input: Partial<CatalogItem>) {
  const item = withDefaults(collection, input);
  const supabase = createAdminSupabase();

  if (!supabase) {
    return { item, source: "demo" as const };
  }

  const { data, error } = await supabase
    .from(tableByCollection[collection])
    .insert(toDatabase(collection, item) as never)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return { item: fromDatabase(collection, data), source: "supabase" as const };
}

export async function updateCatalogItem(collection: CollectionName, id: string, input: Partial<CatalogItem>) {
  const item = withDefaults(collection, { ...input, id });
  const supabase = createAdminSupabase();

  if (!supabase) {
    return { item, source: "demo" as const };
  }

  const { data, error } = await supabase
    .from(tableByCollection[collection])
    .update(toDatabase(collection, item) as never)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return { item: fromDatabase(collection, data), source: "supabase" as const };
}

export async function deleteCatalogItem(collection: CollectionName, id: string) {
  const supabase = createAdminSupabase();

  if (!supabase) {
    return { id, source: "demo" as const };
  }

  const { error } = await supabase.from(tableByCollection[collection]).delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return { id, source: "supabase" as const };
}

function fromDatabase(collection: CollectionName, row: Record<string, unknown>) {
  if (collection === "products") {
    return {
      id: stringValue(row.id),
      name: stringValue(row.name),
      slug: stringValue(row.slug),
      category: stringValue(row.category),
      priceMin: numberValue(row.price_min),
      priceLabel: stringValue(row.price_label),
      description: stringValue(row.description),
      story: stringValue(row.story),
      images: mediaArray(row.images),
      videos: mediaArray(row.videos),
      tags: stringArray(row.tags),
      isFeatured: Boolean(row.is_featured),
      status: statusValue(row.status),
      sortOrder: numberValue(row.sort_order),
    } satisfies Product;
  }

  if (collection === "services") {
    return {
      id: stringValue(row.id),
      title: stringValue(row.title),
      slug: stringValue(row.slug),
      priceLabel: stringValue(row.price_label),
      description: stringValue(row.description),
      turnaround: stringValue(row.turnaround),
      features: stringArray(row.features),
      imageUrl: stringValue(row.image_url),
      iconName: stringValue(row.icon_name),
      status: statusValue(row.status),
      sortOrder: numberValue(row.sort_order),
    } satisfies Service;
  }

  return {
    id: stringValue(row.id),
    title: stringValue(row.title),
    category: stringValue(row.category),
    description: stringValue(row.description),
    mediaType: row.media_type === "video" ? "video" : "image",
    src: stringValue(row.src),
    thumbnail: stringValue(row.thumbnail),
    tags: stringArray(row.tags),
    isFeatured: Boolean(row.is_featured),
    status: statusValue(row.status),
    sortOrder: numberValue(row.sort_order),
  } satisfies GalleryItem;
}

function toDatabase(collection: CollectionName, item: CatalogItem) {
  if (collection === "products") {
    const product = item as Product;
    return {
      name: product.name,
      slug: product.slug,
      category: product.category,
      price_min: product.priceMin,
      price_label: product.priceLabel,
      description: product.description,
      story: product.story,
      images: product.images,
      videos: product.videos ?? [],
      tags: product.tags,
      is_featured: product.isFeatured,
      status: product.status,
      sort_order: product.sortOrder,
    };
  }

  if (collection === "services") {
    const service = item as Service;
    return {
      title: service.title,
      slug: service.slug,
      price_label: service.priceLabel,
      description: service.description,
      turnaround: service.turnaround,
      features: service.features,
      image_url: service.imageUrl,
      icon_name: service.iconName,
      status: service.status,
      sort_order: service.sortOrder,
    };
  }

  const galleryItem = item as GalleryItem;
  return {
    title: galleryItem.title,
    category: galleryItem.category,
    description: galleryItem.description,
    media_type: galleryItem.mediaType,
    src: galleryItem.src,
    thumbnail: galleryItem.thumbnail ?? null,
    tags: galleryItem.tags,
    is_featured: galleryItem.isFeatured,
    status: galleryItem.status,
    sort_order: galleryItem.sortOrder,
  };
}

function withDefaults(collection: CollectionName, input: Partial<CatalogItem>): CatalogItem {
  const fallback = fallbackByCollection[collection][0] as CatalogItem;
  const id = input.id ?? `draft-${crypto.randomUUID()}`;

  if (collection === "products") {
    const product = input as Partial<Product>;
    const name = product.name ?? "New Product";
    return {
      ...(fallback as Product),
      ...product,
      id,
      name,
      slug: product.slug ?? slugify(name),
      priceMin: Number(product.priceMin ?? 0),
      images: product.images ?? [],
      videos: product.videos ?? [],
      tags: product.tags ?? [],
      status: product.status ?? "draft",
    };
  }

  if (collection === "services") {
    const service = input as Partial<Service>;
    const title = service.title ?? "New Service";
    return {
      ...(fallback as Service),
      ...service,
      id,
      title,
      slug: service.slug ?? slugify(title),
      features: service.features ?? [],
      status: service.status ?? "draft",
    };
  }

  const galleryItem = input as Partial<GalleryItem>;
  const title = galleryItem.title ?? "New Gallery Item";
  return {
    ...(fallback as GalleryItem),
    ...galleryItem,
    id,
    title,
    status: galleryItem.status ?? "draft",
    tags: galleryItem.tags ?? [],
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

function numberValue(value: unknown) {
  return typeof value === "number" ? value : Number(value ?? 0);
}

function stringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function mediaArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is MediaAsset => {
    return Boolean(item && typeof item === "object" && "src" in item);
  });
}

function statusValue(value: unknown): "active" | "draft" {
  return value === "draft" ? "draft" : "active";
}
