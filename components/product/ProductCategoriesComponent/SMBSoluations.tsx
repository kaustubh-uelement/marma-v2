"use client";

import { useState } from "react";
import DecorativeLine from "@/components/home/DecorativeLine";
import BookDemoModal from "@/components/home/BookDemoModal";
import EndpointProductCard from "../EndpointProductCard";
import ManagementProductCard from "../ManagementProductCard";
import SpecificationProductCard, {
  SpecificationProductItem,
} from "../SpecificationProductCard";
import {
  productDecoratedSectionClassName,
  productHalfSectionTitleClassName,
  productSectionClassName,
  productSectionTitleClassName,
} from "./sectionSpacing";

const smbGatewaySpecifications: SpecificationProductItem[] = [
  { label: "Form Factor", value: "Table-top / Wall-mounted" },
  { label: "Throughput", value: "1 Gbps" },
  { label: "WAN Ports", value: "1 x 2.5 Gbps" },
  { label: "LAN Ports", value: "4 x 1 Gbps (Ethernet)" },
  { label: "Integrated Wi-Fi", value: "Wi-Fi 5 / 6E" },
  { label: "Recommended Users", value: "Up to 128" },
];

const smbGatewayDescription =
  "SafeBiz is a next-generation firewall designed to protect small and medium-sized businesses from cyberattacks. It delivers enterprise-grade security, simplified deployment, and AI-powered threat detection to safeguard sensitive business data and ensure business continuity.";

const smbManagementDescription =
  "Cloud-based Marma Management Platform for managing Security Gateways and Endpoint Protection - designed for simplicity with minimal IT overhead.";

function getSafeSpecifications(
  prod: any,
  fallbackSpecs: SpecificationProductItem[]
): SpecificationProductItem[] {
  if (Array.isArray(prod?.specifications) && prod.specifications.length > 0) {
    return prod.specifications;
  }
  if (Array.isArray(prod?.keyCapabilities) && prod.keyCapabilities.length > 0) {
    return prod.keyCapabilities.map((c: any) => ({
      label: c.title || c.label || "Feature",
      value: c.description || c.value || "",
    }));
  }
  if (
    prod?.keyCapabilities &&
    typeof prod.keyCapabilities === "object" &&
    !Array.isArray(prod.keyCapabilities) &&
    Object.keys(prod.keyCapabilities).length > 0
  ) {
    return Object.entries(prod.keyCapabilities).map(([k, v]) => ({
      label: k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
      value: String(v),
    }));
  }
  return fallbackSpecs;
}

function extractProductFeatures(prod: any): (string | React.ReactNode)[] {
  const list: (string | React.ReactNode)[] = [];

  if (Array.isArray(prod?.keyCapabilities) && prod.keyCapabilities.length > 0) {
    for (const item of prod.keyCapabilities) {
      if (typeof item === "string" && item.trim()) {
        list.push(item.trim());
      } else if (item && typeof item === "object") {
        const title = item.title || item.name || item.label;
        const desc = item.description || item.value || item.desc;
        if (title && desc) {
          list.push(
            <span>
              <strong>{title}:</strong> {desc}
            </span>
          );
        } else if (title) {
          list.push(title);
        } else if (desc) {
          list.push(desc);
        }
      }
    }
  } else if (
    prod?.keyCapabilities &&
    typeof prod.keyCapabilities === "object" &&
    !Array.isArray(prod.keyCapabilities) &&
    Object.keys(prod.keyCapabilities).length > 0
  ) {
    for (const [key, val] of Object.entries(prod.keyCapabilities)) {
      if (val && typeof val === "string") {
        list.push(
          <span>
            <strong>{key}:</strong> {val}
          </span>
        );
      } else if (val && typeof val === "object") {
        const desc = (val as any).description || (val as any).title;
        list.push(
          desc ? (
            <span>
              <strong>{key}:</strong> {desc}
            </span>
          ) : (
            key
          )
        );
      } else {
        list.push(key);
      }
    }
  }

  if (list.length === 0 && Array.isArray(prod?.features) && prod.features.length > 0) {
    for (const f of prod.features) {
      if (typeof f === "string" && f.trim()) list.push(f.trim());
    }
  }

  if (list.length === 0 && Array.isArray(prod?.accordingData) && prod.accordingData.length > 0) {
    for (const item of prod.accordingData) {
      if (typeof item === "string" && item.trim()) {
        list.push(item.trim());
      } else if (item?.title && item?.description) {
        list.push(
          <span>
            <strong>{item.title}:</strong> {item.description}
          </span>
        );
      } else if (item?.title) {
        list.push(item.title);
      }
    }
  }

  return list;
}

function isHardwareProduct(prod: any): boolean {
  if (Array.isArray(prod?.specifications) && prod.specifications.length > 0) {
    return true;
  }
  const name = (prod?.name || prod?.title || "").toLowerCase();
  const desc = (prod?.description || "").toLowerCase();

  if (
    name.includes("software") ||
    name.includes("agent") ||
    name.includes("cloud") ||
    name.includes("service") ||
    name.includes("app") ||
    name.includes("email") ||
    name.includes("endpoint") ||
    desc.includes("software") ||
    desc.includes("cloud-based") ||
    desc.includes("saas")
  ) {
    return false;
  }

  if (
    name.includes("firewall") ||
    name.includes("gateway") ||
    name.includes("hardware") ||
    name.includes("appliance") ||
    name.includes("rack") ||
    name.includes("400") ||
    name.includes("200") ||
    name.includes("100")
  ) {
    return true;
  }

  return false;
}

export default function SMBSoluations({ products = [] }: { products?: any[] }) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const getProduct = (searchString: string) => {
    return products.find((p: any) =>
      (p.name || p.title || p.productName || "")?.toLowerCase().includes(searchString.toLowerCase())
    );
  };

  const fallbackProducts = [
    {
      id: "safebiz",
      title: "SafeBiz Firewall | SMB Office Security",
      description: smbGatewayDescription,
      image: "/images/banners/homepage-right-banner1.webp",
      imageAlt: "SafeBiz Firewall SMB office security device",
      specifications: smbGatewaySpecifications,
    }
  ];

  const deviceProducts = products.filter((p: any) => {
    const cat = p.category?.toLowerCase() || '';
    return cat === 'smb' || cat === 'smbsoluations' || cat === 'smb-solutions';
  });

  const isBackup = products.some((p: any) => p.isBackup === true);
  const displayProducts =
    deviceProducts.length > 0
      ? deviceProducts
      : isBackup
      ? fallbackProducts
      : [];

  if (!isBackup) {
    return (
      <>
        <div className="mx-auto w-full max-w-[1280px]">
          <div className={productSectionTitleClassName}>SMB Solutions</div>
          <div className="flex flex-col gap-6 md:gap-8 px-4 sm:px-6 md:px-12">
            {displayProducts.map((prod: any, idx: number) => {
              if (isHardwareProduct(prod)) {
                return (
                  <div key={prod.id || idx} id={prod.id || `smb-item-${idx}`}>
                    <SpecificationProductCard
                      title={prod.name || prod.title || "SMB Security Device"}
                      descript={prod.description || smbGatewayDescription}
                      image={prod.image || "/images/banners/homepage-right-banner1.webp"}
                      imageAlt={prod.imageAlt || prod.name || prod.title || "SMB security device"}
                      specification={getSafeSpecifications(prod, smbGatewaySpecifications)}
                    />
                  </div>
                );
              }

              return (
                <div key={prod.id || idx} id={prod.id || `smb-item-${idx}`}>
                  <EndpointProductCard
                    name={prod.name || prod.title || "SMB Security Solution"}
                    tagline={prod.category || "SMB Solutions"}
                    subTitle={prod.hero?.title || prod.subTitle || undefined}
                    primaryFeature={prod.description || smbGatewayDescription}
                    features={extractProductFeatures(prod)}
                    image={prod.image || "/images/banners/homepage-right-banner1.webp"}
                    bookDemoLabel="Start Free Trial"
                    onBookDemo={() => setIsDemoModalOpen(true)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <BookDemoModal
          isOpen={isDemoModalOpen}
          bookDemoTitle="Start Free Trial"
          onClose={() => setIsDemoModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className="mx-auto w-full max-w-[1280px]">
        <div className={productSectionTitleClassName}>Security Gateways</div>

        {displayProducts.map((prod: any, idx: number) => {
          return (
            <div key={prod.id || idx} id={prod.id || `smb-item-${idx}`} className={idx > 0 ? "mt-2 sm:mt-4 lg:mt-10 xl:mt-12" : ""}>
              <SpecificationProductCard
                title={prod.name || prod.title || "SMB Security Device"}
                descript={prod.description || smbGatewayDescription}
                image={prod.image || "/images/banners/homepage-right-banner1.webp"}
                imageAlt={prod.imageAlt || prod.name || prod.title || "SMB security device"}
                specification={getSafeSpecifications(
                  prod,
                  smbGatewaySpecifications
                )}
              />
            </div>
          );
        })}

        <div className={productDecoratedSectionClassName}>
          <div className="relative w-screen left-1/2 -translate-x-1/2 mb-2 md:mb-8">
            <div className="w-[220px] sm:w-[280px] md:w-[360px] lg:w-[460px]">
              <DecorativeLine
                viewBox="0 0 700 80"
                points="-3000,40 210,40"
                dots={[{ cx: 210, cy: 40, rippleCount: 3 }]}
                className="w-full h-auto"
                dotRadius={10}
                animationDuration={2.4}
              />
            </div>
          </div>

          <div className={productSectionTitleClassName}>Management Platform</div>
          <div className="max-md:px-6 md:px-12">
            <ManagementProductCard
              title="Management Platform"
              description={smbManagementDescription}
              image="/images/marma-dashboard/security_agents.webp"
              imageAlt="Management Platform"
            />
          </div>
        </div>

        <div className={`max-md:px-6 ${productSectionClassName}`}>
          <div className="flex flex-col gap-8 lg:gap-6">
            <div className="flex flex-col">
              <div className={productHalfSectionTitleClassName}>
                Endpoint Protection Software
              </div>
              <div className="md:px-12">
                <EndpointProductCard
                  name="Agent Software for Windows"
                  tagline="24×7 Endpoint Protection"
                  subTitle="Stop Phishing, Ransomware & Malware Before They Strike"
                  primaryFeature={<div>
                    Powered by advanced deep packet inspection (DPI), the Marma Agent inspects all inbound and outbound traffic in real time automatically filtering and blocking threats with seamless performance and virtually no system slowdown.
                    <br />
                    Integrated with the Marma AI-Powered Security Cloud, the agent continuously adapts to the latest cyber threats, ensuring users stay protected without manual updates.
                    <br />
                    Unlike traditional solutions, the Marma Security Agent does not rely on slow VPN tunnels and never transmits customer data to the cloud, ensuring maximum privacy.
                  </div>}
                  features={[
                    "Advanced Deep Packet Inspection for Threat protection",
                    "Protects from phishing, ransomware, malware, and data breaches",
                    "Updated automatically to protect from latest threats",
                    "DNS Security",
                    "URL Filtering",
                    "Scam Protection",
                    "Data Loss Prevention",
                    "Firewall & Anti-Virus Integration",
                  ]}
                  image="/images/product/software/marmaAgent.webp"
                  bookDemoLabel="Start Free Trial"
                  onBookDemo={() => setIsDemoModalOpen(true)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-12">
            <div className={productHalfSectionTitleClassName}>
              Mobile Application
            </div>
            <div className="md:px-12">
              <EndpointProductCard
                name="Mobile App"
                tagline="iOS & Android"
                image="/images/product/software/mobile_app_1.webp"
                subTitle={<>Locks down web access-blocking categories, sites,<br />IPs, and regions in real time.</>}
                primaryFeature="Our AI cybersecurity 24x7 platform monitors and secures the incoming and outgoing internet traffic from your organization and provides real-time alerts on our user-friendly Mobile App when threats are detected and blocked, providing the user with the peace of mind that their network is secure."
                features={[
                  "Dashboard",
                  "Firewall Onboarding",
                  "Alerts",
                  "User Security Config",
                  "QR Phishing Protection",
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Book a Demo Modal */}
      <BookDemoModal
        isOpen={isDemoModalOpen}
        bookDemoTitle="Start Free Trial"
        onClose={() => setIsDemoModalOpen(false)}
      />
    </>
  );
}
