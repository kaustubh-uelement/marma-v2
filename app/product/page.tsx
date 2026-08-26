import ClientPage from "./ClientPage";
import { getProducts } from "@/lib/productsData";

export const dynamic = "force-dynamic";

export default async function Page() {
  const products = await getProducts();
  return <ClientPage products={products} />;
}
