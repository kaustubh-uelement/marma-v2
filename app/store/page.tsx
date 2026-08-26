import React from "react";
import StoreBanner from "@/components/store/StoreBanner";
import HighlightedText from "@/components/global/HighlightedText";
import DecorativeLine from "@/components/home/DecorativeLine";
import ProductCard from "@/components/store/ProductCard";
import { getProducts, Product } from "@/lib/productsData";

export const dynamic = "force-dynamic";

export default async function StorePage() {
  const products = await getProducts();

  const enterpriseProducts = products.filter((p: Product) => {
    const cat = p.category?.toLowerCase() || "";
    return cat.includes("enterprise");
  });

  const smbProducts = products.filter((p: Product) => {
    const cat = p.category?.toLowerCase() || "";
    return cat.includes("smb");
  });

  const homeProducts = products.filter((p: Product) => {
    const cat = p.category?.toLowerCase() || "";
    return cat.includes("home");
  });

  const csProducts = products.filter((p: Product) => {
    const cat = p.category?.toLowerCase() || "";
    return cat.includes("cs-solutions");
  });

  // Group any other categories (e.g. "Ai-drive", "Edge AI", custom modules)
  const otherProducts = products.filter((p: Product) => {
    const cat = p.category?.toLowerCase() || "";
    return (
      !cat.includes("enterprise") &&
      !cat.includes("smb") &&
      !cat.includes("home") &&
      !cat.includes("cs-solutions")
    );
  });

  const otherGrouped: Record<string, Product[]> = {};
  for (const p of otherProducts) {
    const catKey = p.category || "Other Solutions";
    if (!otherGrouped[catKey]) {
      otherGrouped[catKey] = [];
    }
    otherGrouped[catKey].push(p);
  }

  const buildHref = (product: Product) => {
    const slug = (product.slug || product.name || product.id || "product")
      .toLowerCase()
      .replace(/ /g, "-");
    const data = {
      id: product.id,
      name: product.name || product.title,
      description: product.description,
      subTitle: product.subTitle,
      price: product.price,
      image: product.image,
      images: product.images,
      inStock: product.inStock,
    };
    const encoded = encodeURIComponent(
      Buffer.from(JSON.stringify(data)).toString("base64")
    );
    return `/store/${slug}?data=${encoded}`;
  };

  return (
    <main className="flex flex-col bg-white min-h-screen overflow-x-hidden">
      <div>
        <StoreBanner
          title={
            <>
              MSP, MSSP and ITSP{" "}
              <HighlightedText
                text="Partners."
                className="text-[#FFFFFF] font-bold"
                imageClassName="bottom-[-15px] md:bottom-[-20px] right-[5px]"
              />
            </>
          }
          subtitle="Marma offers a range of intelligent cybersecurity products designed to protect entire networks with ease. Built for both homes and businesses, our solutions deliver enterprise-grade security without the complexity of traditional tools."
          isButton={false}
        />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 pt-16 lg:pt-24 relative">
        <div className="flex flex-col w-[50%] sm:w-[40%] min-[901px]:w-[35%] ml-auto pointer-events-none z-0">
          <DecorativeLine
            viewBox="0 0 500 80"
            points="-3000,40 200,40"
            dots={[{ cx: 200, cy: 40, rippleCount: 3 }]}
            className="w-full h-auto scale-x-[-1]"
            dotRadius={6}
            animationDuration={2.5}
          />
          <DecorativeLine
            viewBox="0 0 500 120"
            points="150,20 210,90 3000,90"
            dots={[{ cx: 150, cy: 20, rippleCount: 4, rippleBaseDelay: 0.9 }]}
            className="w-full h-auto -mt-10 md:-mt-24"
            dotRadius={7}
            animationDuration={3}
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 relative">
          <div className="z-10 bg-white pr-4">
            <h2 className="font-bold text-black text-xl lg:text-2xl">
              Order Marma Security Products
            </h2>
          </div>
        </div>

        {/* Enterprise Solutions */}
        {enterpriseProducts.length > 0 && (
          <section className="mb-16">
            <h3 className="text-xl lg:text-2xl font-semibold text-[#999999] mb-8">
              Enterprise Solutions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-2">
              {enterpriseProducts.map((product, index) => (
                <ProductCard
                  key={product.id || index}
                  name={product.name || product.title || "Product"}
                  image={product.image}
                  href={buildHref(product)}
                  inStock={product.inStock}
                />
              ))}
            </div>
          </section>
        )}

        {/* SMB Solutions */}
        {smbProducts.length > 0 && (
          <section className="mb-16">
            <h3 className="text-xl lg:text-2xl font-semibold text-[#999999] mb-8">
              SMB Solutions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-2">
              {smbProducts.map((product, index) => (
                <ProductCard
                  key={product.id || index}
                  name={product.name || product.title || "Product"}
                  image={product.image}
                  href={buildHref(product)}
                  inStock={product.inStock}
                />
              ))}
            </div>
          </section>
        )}

        {/* Home Solutions */}
        {homeProducts.length > 0 && (
          <section className="mb-16">
            <h3 className="text-xl lg:text-2xl font-semibold text-[#999999] mb-8">
              Home Solutions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-2">
              {homeProducts.map((product, index) => (
                <ProductCard
                  key={product.id || index}
                  name={product.name || product.title || "Product"}
                  image={product.image}
                  href={buildHref(product)}
                  inStock={product.inStock}
                />
              ))}
            </div>
          </section>
        )}

        {/* Cyber Security Software Solutions */}
        {csProducts.length > 0 && (
          <section className="mb-16">
            <h3 className="text-xl lg:text-2xl font-semibold text-[#999999] mb-8">
              Cyber Security Software Solutions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-2">
              {csProducts.map((product, index) => (
                <ProductCard
                  key={product.id || index}
                  name={product.name || product.title || "Product"}
                  image={product.image}
                  href={buildHref(product)}
                  inStock={product.inStock}
                />
              ))}
            </div>
          </section>
        )}

        {/* Additional Categories from API (e.g. "Ai-drive", "AI Solutions") */}
        {Object.entries(otherGrouped).map(([categoryName, groupProducts]) => (
          <section key={categoryName} className="mb-16">
            <h3 className="text-xl lg:text-2xl font-semibold text-[#999999] mb-8 capitalize">
              {categoryName.replace(/-/g, " ")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-2">
              {groupProducts.map((product, index) => (
                <ProductCard
                  key={product.id || index}
                  name={product.name || product.title || "Product"}
                  image={product.image}
                  href={buildHref(product)}
                  inStock={product.inStock}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
