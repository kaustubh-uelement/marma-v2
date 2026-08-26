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

  const displayProducts = deviceProducts.length > 0 ? deviceProducts : fallbackProducts;

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
                specification={
                  prod.keyCapabilities
                    ? prod.keyCapabilities.map((c: any) => ({ label: c.title, value: c.description }))
                    : prod.specifications || smbGatewaySpecifications
                }
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
