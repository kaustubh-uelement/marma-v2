import { fetchApi } from "@/lib/api";

export interface Product {
  id: string;
  name: string;
  title?: string;
  slug: string;
  category: string;
  description?: string;
  subTitle?: string;
  price: number;
  image: string;
  images?: string[];
  inStock: boolean;
  isAi?: boolean;
  isCube?: boolean;
  to?: string;
  keyCapabilities?: Record<string, any> | any[];
  accordingData?: Record<string, any> | any[];
  hero?: Record<string, any>;
  specifications?: any[];
}

export const defaultProducts: Product[] = [
  {
    id: "safeenterprise-400",
    name: "SafeEnterprise 400",
    title: "SafeEnterprise 400 | Regional Office / Campus Security",
    slug: "safeenterprise-400",
    category: "enterprise",
    description:
      "SafeEnterprise 400 is a high-throughput next-generation firewall designed for large enterprises and campus networks, delivering high throughput, deep packet inspection, and advanced threat protection.",
    subTitle: "Regional Office / Campus Security",
    price: 999.99,
    image: "/images/product/SafeEnterprise4001.webp",
    images: [
      "/images/product/SafeEnterprise4001.webp",
      "/images/product/SafeEnterprise4002.webp",
    ],
    inStock: true,
    to: "/store/safeenterprise-400",
  },
  {
    id: "safeenterprise-200",
    name: "SafeEnterprise 200",
    title: "SafeEnterprise 200 | Branch Office Security",
    slug: "safeenterprise-200",
    category: "enterprise",
    description:
      "SafeEnterprise 200 is a next-generation firewall designed to protect branch offices and small to mid-sized organizations from advanced cyber threats.",
    subTitle: "Branch Office Security",
    price: 799.99,
    image: "/images/product/SafeEnterprise2001.webp",
    images: ["/images/product/SafeEnterprise2001.webp"],
    inStock: true,
    to: "/store/safeenterprise-200",
  },
  {
    id: "saferemote",
    name: "SafeEnterprise 100",
    title: "SafeEnterprise 100 | Remote Worker Security",
    slug: "saferemote",
    category: "enterprise",
    description:
      "SafeEnterprise 100 is a compact, high-performance next-generation firewall designed specifically for remote workers and small branch offices.",
    subTitle: "Remote Worker Security",
    price: 499.99,
    image: "/images/product/Frame 209.webp",
    images: ["/images/product/Frame 209.webp"],
    inStock: true,
    to: "/store/saferemote",
  },
  {
    id: "safebiz",
    name: "SafeBiz",
    title: "SafeBiz Firewall | SMB Office Security",
    slug: "safebiz",
    category: "smb",
    description:
      "SafeBiz Firewall delivers comprehensive network security and parental controls designed for small and medium businesses.",
    subTitle: "SMB Office Security",
    price: 599.99,
    image: "/images/banners/homepage-right-banner1.webp",
    images: ["/images/banners/homepage-right-banner1.webp"],
    inStock: true,
    to: "/store/safebiz",
  },
  {
    id: "safehome",
    name: "SafeHome",
    title: "SafeHome Firewall | Home Network Security",
    slug: "safehome",
    category: "home",
    description:
      "SafeHome is an AI-powered next-generation firewall designed to protect home networks and families from advanced cyber threats.",
    subTitle: "Home Network Security",
    price: 479.99,
    image: "/images/banners/solution-banner-right1.webp",
    images: ["/images/banners/solution-banner-right1.webp"],
    inStock: true,
    to: "/store/safehome",
  },
];

const DEFAULT_FALLBACK_IMAGE = "/images/product/SafeEnterprise4001.webp";

function mapBackendToProduct(item: any, index: number): Product {
  const name = String(item.name || item.title || "Product").trim();
  const slug = String(item.slug || name.toLowerCase().replace(/\s+/g, "-")).trim();
  const id = String(item.id || slug || `product-${index}`);
  const category = String(item.category || "General").trim();

  // Determine a valid image URL with safe fallback
  let image = typeof item.image === "string" && item.image.trim() ? item.image.trim() : "";
  if (!image && typeof item.logoimage === "string" && item.logoimage.trim()) {
    image = item.logoimage.trim();
  }
  if (!image) {
    const catLower = category.toLowerCase();
    if (catLower.includes("home")) {
      image = "/images/banners/solution-banner-right1.webp";
    } else if (catLower.includes("smb")) {
      image = "/images/banners/homepage-right-banner1.webp";
    } else if (catLower.includes("ai")) {
      image = "/images/marma-dashboard/enterprise_protection.webp";
    } else {
      image = DEFAULT_FALLBACK_IMAGE;
    }
  }

  const price = typeof item.price === "number" && !isNaN(item.price) ? item.price : 0;

  return {
    id,
    name,
    title: item.title || name,
    slug,
    category,
    description: item.description || "",
    subTitle: item.subTitle || item.subtitle || "",
    price,
    image,
    images: Array.isArray(item.images) && item.images.length > 0 ? item.images : [image],
    inStock: item.inStock !== false,
    isAi: Boolean(item.isAi),
    isCube: Boolean(item.isCube),
    to: item.to || `/store/${slug}`,
    keyCapabilities: item.keyCapabilities || item.keycapabilities || {},
    accordingData: item.accordingData || {},
    hero: item.hero || {},
    specifications: item.specifications || [],
  };
}

/**
 * Fetches active products from the API and gracefully merges with core defaults.
 * Any custom product added to the API (e.g. ai-drive) is included and presented,
 * while ensuring default showcase devices remain available if not overridden.
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetchApi("/api/v1/products/active", {
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn("Products API response not ok, status:", response.status);
      return defaultProducts;
    }

    const data = await response.json();
    const rows = Array.isArray(data) ? data : data?.data || [];

    if (!rows.length) {
      return defaultProducts;
    }

    const apiProducts = rows.map((item: any, idx: number) => mapBackendToProduct(item, idx));

    // Merge: Keep all API products. For any core default product that is NOT present in the API
    // (by matching id or slug), append it so standard catalog items are preserved.
    const merged = [...apiProducts];
    for (const def of defaultProducts) {
      const exists = apiProducts.some(
        (p: Product) =>
          p.id.toLowerCase() === def.id.toLowerCase() ||
          p.slug.toLowerCase() === def.slug.toLowerCase() ||
          p.name.toLowerCase() === def.name.toLowerCase()
      );
      if (!exists) {
        merged.push(def);
      }
    }

    return merged;
  } catch (error) {
    console.error("Error fetching products from API:", error);
    return defaultProducts;
  }
}

/**
 * Resolves a product by ID or slug from a given list or by fetching.
 */
export async function getProductByIdOrSlug(
  idOrSlug: string,
  providedList?: Product[]
): Promise<Product | null> {
  const list = providedList || (await getProducts());
  const target = idOrSlug.toLowerCase().trim();

  return (
    list.find(
      (p) =>
        p.id.toLowerCase() === target ||
        p.slug.toLowerCase() === target ||
        p.name.toLowerCase().replace(/\s+/g, "-") === target
    ) || null
  );
}
