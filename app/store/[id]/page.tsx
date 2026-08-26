import { getProducts, getProductByIdOrSlug, Product } from "@/lib/productsData";
import ClientProductPage from "./ClientProductPage";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ data?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { id } = resolvedParams;

  let product: Product | null = null;
  const products = await getProducts();

  // If we have encoded product data in the query parameter, decode it first
  if (resolvedSearchParams?.data) {
    try {
      const decoded = Buffer.from(
        decodeURIComponent(resolvedSearchParams.data),
        "base64"
      ).toString("utf-8");
      product = JSON.parse(decoded);
    } catch (e) {
      console.error("Failed to parse product data from URL", e);
    }
  }

  // If no product data was passed in the URL, find it from the fetched products
  if (!product) {
    product = await getProductByIdOrSlug(id, products);
  }

  return (
    <ClientProductPage
      product={product}
      allProducts={products}
      productId={id}
    />
  );
}
