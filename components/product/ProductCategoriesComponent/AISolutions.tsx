import React, { useState } from "react";
import SpecificationProductCard from "../SpecificationProductCard";
import BookDemoModal from "@/components/home/BookDemoModal";
import {
  productSectionTitleClassName,
} from "./sectionSpacing";

const defaultAiSpecifications = [
  { label: "Deployment", value: "Edge AI / Cloud Managed" },
  { label: "AI Acceleration", value: "Hardware & Neural Inference" },
  { label: "Throughput", value: "Ultra-low Latency Edge Processing" },
  { label: "Security Engine", value: "Real-time Threat Detection" },
  { label: "Integration", value: "Marma Unified Security Cloud" },
];

export default function AISolutions({ products = [] }: { products?: any[] }) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const aiProducts = products.filter((p: any) => {
    const cat = (p.category || "").toLowerCase();
    return p.isAi === true || cat.includes("ai") || cat.includes("edge");
  });

  const fallbackProducts = [
    {
      id: "ai-drive",
      name: "AI-Drive",
      title: "AI-Drive | Edge AI Intelligent Defense",
      description:
        "AI-Drive delivers intelligent real-time cyber defense and neural threat processing directly at the edge, protecting modern distributed networks without cloud latency.",
      image: "/images/marma-dashboard/enterprise_protection.webp",
      imageAlt: "AI-Drive Edge AI intelligent defense device",
      specifications: defaultAiSpecifications,
    },
  ];

  const displayProducts = aiProducts.length > 0 ? aiProducts : fallbackProducts;

  return (
    <div className="mx-auto w-full max-w-[1280px]">
      <div className={productSectionTitleClassName}>AI & Edge Solutions</div>

      {displayProducts.map((prod: any, idx: number) => {
        const specs =
          Array.isArray(prod.specifications) && prod.specifications.length > 0
            ? prod.specifications
            : prod.keyCapabilities && typeof prod.keyCapabilities === "object"
            ? Object.entries(prod.keyCapabilities).map(([k, v]) => ({
                label: k
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (s) => s.toUpperCase()),
                value: String(v),
              }))
            : defaultAiSpecifications;

        return (
          <div
            key={prod.id || idx}
            id={prod.id || `ai-item-${idx}`}
            className={idx > 0 ? "mt-2 sm:mt-4 lg:mt-10 xl:mt-12" : ""}
          >
            <SpecificationProductCard
              title={prod.title || prod.name || "AI-Drive Security System"}
              descript={
                prod.description ||
                "Intelligent edge cyber defense powered by advanced AI and automated threat isolation."
              }
              image={
                prod.image ||
                "/images/marma-dashboard/enterprise_protection.webp"
              }
              imageAlt={prod.imageAlt || prod.name || prod.title || "AI Drive"}
              specification={specs}
            />
          </div>
        );
      })}

      <BookDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
}
