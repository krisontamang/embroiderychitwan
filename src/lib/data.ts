export type MediaAsset = {
  src: string;
  alt: string;
  type?: "image" | "video";
  poster?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  priceMin: number;
  priceLabel: string;
  description: string;
  story: string;
  images: MediaAsset[];
  videos?: MediaAsset[];
  tags: string[];
  isFeatured: boolean;
  status: "active" | "draft";
  sortOrder: number;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  priceLabel: string;
  description: string;
  turnaround: string;
  features: string[];
  imageUrl: string;
  iconName: string;
  status: "active" | "draft";
  sortOrder: number;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  mediaType: "image" | "video";
  src: string;
  thumbnail?: string;
  tags: string[];
  isFeatured: boolean;
  status: "active" | "draft";
  sortOrder: number;
};

const unsplash = (id: string, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

export const heroImage = unsplash("photo-1515886657613-9f3515b0c78f", 1800);

export const products: Product[] = [
  {
    id: "bridal-blouse",
    name: "Premium Bridal Blouse Embroidery",
    slug: "premium-bridal-blouse-embroidery",
    category: "Bridal",
    priceMin: 6500,
    priceLabel: "From NPR 6,500",
    description:
      "Dense threadwork, sequins, and zari detailing for bridal blouses, lehenga sets, and occasion wear.",
    story:
      "Designed for heirloom photographs, each motif is balanced around the neckline, sleeves, and border so the garment feels ornate without losing elegance.",
    images: [
      {
        src: unsplash("photo-1503342217505-b0a15ec3261c"),
        alt: "Luxury bridal fashion embroidery detail",
      },
      {
        src: unsplash("photo-1542060748-10c28b62716f"),
        alt: "Premium pink fashion embroidery inspiration",
      },
    ],
    tags: ["Zari", "Sequins", "Bridal"],
    isFeatured: true,
    status: "active",
    sortOrder: 1,
  },
  {
    id: "logo-polo",
    name: "Custom Logo Polo Batch",
    slug: "custom-logo-polo-batch",
    category: "Branding",
    priceMin: 450,
    priceLabel: "From NPR 450 per piece",
    description:
      "Clean logo embroidery for polos, shirts, aprons, uniforms, and corporate gifting orders.",
    story:
      "Digitized stitching keeps your logo crisp across repeat batches, with thread matching and placement guidance before production.",
    images: [
      {
        src: unsplash("photo-1558769132-cb1aea458c5e"),
        alt: "Boutique clothing rack for custom logo embroidery",
      },
    ],
    tags: ["Logo", "Uniforms", "Bulk"],
    isFeatured: true,
    status: "active",
    sortOrder: 2,
  },
  {
    id: "dupatta-border",
    name: "Hand-Finished Dupatta Border",
    slug: "hand-finished-dupatta-border",
    category: "Occasion Wear",
    priceMin: 2800,
    priceLabel: "From NPR 2,800",
    description:
      "Soft borders, floral repeats, and statement corners for dupattas, sari falls, and shawls.",
    story:
      "A refined finish for gifts and ceremonies, with delicate metallic accents and color palettes tuned to your outfit.",
    images: [
      {
        src: unsplash("photo-1620799140408-edc6dcb6d633"),
        alt: "Soft folded textile ready for embroidery finishing",
      },
    ],
    tags: ["Borders", "Floral", "Gifting"],
    isFeatured: false,
    status: "active",
    sortOrder: 3,
  },
  {
    id: "kurta-monogram",
    name: "Festive Kurta Personalization",
    slug: "festive-kurta-personalization",
    category: "Personalization",
    priceMin: 1200,
    priceLabel: "From NPR 1,200",
    description:
      "Names, initials, cuffs, collars, and subtle motifs for kurtas, shirts, scarves, and kidswear.",
    story:
      "A small personal mark can make everyday clothing feel beautifully considered, especially for family sets and event outfits.",
    images: [
      {
        src: unsplash("photo-1512436991641-6745cdb1723f"),
        alt: "Fashion garment detail for custom monogram embroidery",
      },
    ],
    tags: ["Names", "Monogram", "Family Sets"],
    isFeatured: false,
    status: "active",
    sortOrder: 4,
  },
];

export const services: Service[] = [
  {
    id: "bridal-occasion",
    title: "Bridal and Occasion Embroidery",
    slug: "bridal-and-occasion-embroidery",
    priceLabel: "NPR 6,500+",
    description:
      "Statement blouse, lehenga, sari, and dupatta embroidery with premium thread, sequin, and zari finishing.",
    turnaround: "7-18 days",
    features: ["Design consultation", "Thread and motif preview", "Finishing and packaging"],
    imageUrl: unsplash("photo-1503342217505-b0a15ec3261c", 1000),
    iconName: "Sparkles",
    status: "active",
    sortOrder: 1,
  },
  {
    id: "logo-uniform",
    title: "Logo and Uniform Embroidery",
    slug: "logo-and-uniform-embroidery",
    priceLabel: "NPR 450+/piece",
    description:
      "Digitized logo stitching for teams, hotels, salons, schools, and corporate merchandise.",
    turnaround: "3-10 days",
    features: ["Logo digitizing", "Bulk pricing", "Consistent placement"],
    imageUrl: unsplash("photo-1558769132-cb1aea458c5e", 1000),
    iconName: "Shirt",
    status: "active",
    sortOrder: 2,
  },
  {
    id: "digitizing",
    title: "Machine Embroidery Digitizing",
    slug: "machine-embroidery-digitizing",
    priceLabel: "NPR 1,500+",
    description:
      "Convert names, logos, and artwork into stitch-ready files with clean density and thread guidance.",
    turnaround: "1-3 days",
    features: ["Artwork cleanup", "Stitch file prep", "Sample approval"],
    imageUrl: unsplash("photo-1618932260643-eee4a2f652a6", 1000),
    iconName: "Scissors",
    status: "active",
    sortOrder: 3,
  },
  {
    id: "monogram",
    title: "Names and Monograms",
    slug: "names-and-monograms",
    priceLabel: "NPR 800+",
    description:
      "Elegant initials, family sets, cuffs, collars, handkerchiefs, towels, scarves, and gifting pieces.",
    turnaround: "2-5 days",
    features: ["Font pairing", "Placement guidance", "Gift-ready finishing"],
    imageUrl: unsplash("photo-1496747611176-843222e1e57c", 1000),
    iconName: "PenLine",
    status: "active",
    sortOrder: 4,
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "gallery-bridal-blush",
    title: "Blush Bridal Threadwork",
    category: "Bridal",
    description: "Layered florals with soft gold highlights for a refined bridal finish.",
    mediaType: "image",
    src: unsplash("photo-1503342217505-b0a15ec3261c", 1200),
    tags: ["Bridal", "Florals"],
    isFeatured: true,
    status: "active",
    sortOrder: 1,
  },
  {
    id: "gallery-runway-detail",
    title: "Occasion Wear Detail",
    category: "Fashion",
    description: "A boutique-inspired silhouette with delicate surface detail.",
    mediaType: "image",
    src: unsplash("photo-1515886657613-9f3515b0c78f", 1200),
    tags: ["Fashion", "Premium"],
    isFeatured: true,
    status: "active",
    sortOrder: 2,
  },
  {
    id: "gallery-textile-folds",
    title: "Soft Textile Finishing",
    category: "Borders",
    description: "Champagne-toned textile layers for dupatta and sari border planning.",
    mediaType: "image",
    src: unsplash("photo-1620799140408-edc6dcb6d633", 1200),
    tags: ["Borders", "Dupatta"],
    isFeatured: false,
    status: "active",
    sortOrder: 3,
  },
  {
    id: "gallery-logo-batch",
    title: "Boutique Batch Prep",
    category: "Logo",
    description: "Consistent placement and color matching for repeat apparel orders.",
    mediaType: "image",
    src: unsplash("photo-1558769132-cb1aea458c5e", 1200),
    tags: ["Logo", "Bulk"],
    isFeatured: false,
    status: "active",
    sortOrder: 4,
  },
  {
    id: "gallery-gold-line",
    title: "Gold Accent Styling",
    category: "Zari",
    description: "Warm metallic accents selected for ceremony-ready garments.",
    mediaType: "image",
    src: unsplash("photo-1542060748-10c28b62716f", 1200),
    tags: ["Zari", "Gold"],
    isFeatured: true,
    status: "active",
    sortOrder: 5,
  },
  {
    id: "gallery-monogram",
    title: "Personalized Detail",
    category: "Monogram",
    description: "Subtle custom stitching for names, initials, and family sets.",
    mediaType: "image",
    src: unsplash("photo-1512436991641-6745cdb1723f", 1200),
    tags: ["Monogram", "Gifts"],
    isFeatured: false,
    status: "active",
    sortOrder: 6,
  },
];

export const deliveryHighlights = [
  "Nepal-wide delivery",
  "eSewa and Khalti supported",
  "Custom samples before bulk work",
  "Careful packaging for premium garments",
];

export const orderSteps = [
  {
    title: "Share your garment",
    description: "Send photos, measurements, logo files, or inspiration references on WhatsApp.",
  },
  {
    title: "Approve design and price",
    description: "Receive motif direction, timing, payment options, and delivery details.",
  },
  {
    title: "Craft and dispatch",
    description: "Your embroidery is finished, quality checked, packed, and delivered across Nepal.",
  },
];

