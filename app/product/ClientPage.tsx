"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ProductShowcase from "@/components/product/ProductShowcase";
import Banner from "@/components/global/Banner";
import HighlightedText from "@/components/global/HighlightedText";
import DecorativeLine from "@/components/home/DecorativeLine";
import Tabs from "@/components/global/TabsComponent";
import { ProductCategoriesMapping } from "@/components/product/ProductCategoriesComponent/ProductComponentMapping";
import ProductSummaryTable, {
  ProductSummaryRow,
} from "@/components/product/ProductSummaryTable";

// ── Data ──────────────────────────────────────────────────────────────────────
const heroProducts = [
  {
    id:"management-platform",
    href: "?tab=enterprise&product=management-platform",
    label:"Management Platform",
    isEnterprise:true,
    image:"/images/marma-dashboard/enterprise_protection.webp",
    alt:"Management Platform Product",
  },
  {
    id: "endpoint-protection",
    href: "?tab=enterprise&product=agent-software-for-windows",
    label: "Marma Security Agent",
    isEnterprise: true,
    image: "/images/marma-dashboard/endpoint_protection.webp",
    alt: "EndPoint Protection Software Product",
  },
  {
    id: "safegov",
    href: "?tab=enterprise&product=safeenterprise-400",
    label: "SafeEnterprise 400",
    isEnterprise: true,
    image: "/images/product/SafeEnterprise4001.webp",
    alt: "SafeGov Product",
  },
  {
    id: "safeenterprise",
    href: "?tab=enterprise&product=safeenterprise-200",
    label: "SafeEnterprise 200",
    isEnterprise: true,
    image: "/images/product/SafeEnterprise2001.webp",
    alt: "SafeEnterprise Product",
  },
  {
    id: "safecloud",
    href: "?tab=enterprise&product=saferemote",
    label: "SafeEnterprise 100",
    isEnterprise: true,
    image: "/images/product/Frame 209.webp",
    alt: "SafeCloud Product",
  },
  {
    id: "safebiz",
    href: "?tab=smb&product=safebiz",
    label: "SafeBiz",
    image: "/images/banners/homepage-right-banner1.webp",
    alt: "SafeBiz Product",
  },
  {
    id: "safehome",
    href: "?tab=home&product=safehome",
    label: "SafeHome",
    image: "/images/banners/solution-banner-right1.webp",
    alt: "SafeHome Product",
  },


];

// ── Card Style Per Offset From Center ─────────────────────────────────────────
function getCardProps(offset: number) {
  const abs = Math.abs(offset);
  const dir = offset <= 0 ? -1 : 1;

  switch (abs) {
    case 0:
      return { x: 0, scale: 1.05, opacity: 1, zIndex: 30 };
    case 1:
      return { x: dir * 210, scale: 0.60, opacity: 0.4, zIndex: 20 };
    default:
      return { x: dir * 400, scale: 0.58, opacity: 0, zIndex: 0 };
  }
}

// ── Constants ─────────────────────────────────────────────────────────────────
const CARD_WIDTH = 260;
const CARD_HEIGHT = 300;

// ── HeroCarousel ──────────────────────────────────────────────────────────────
function HeroCarousel() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = heroProducts.length;

  const next = useCallback(
    () => setCurrent((prev) => (prev + 1) % total),
    [total],
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 1800);
    return () => clearInterval(timer);
  }, [next, paused]);

  useGSAP(
    () => {
      heroProducts.forEach((_, i) => {
        let offset = i - current;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        const { x, scale, opacity, zIndex } = getCardProps(offset);
        const card = containerRef.current?.querySelector(`.card-${i}`);

        if (card) {
          gsap.to(card, {
            x,
            scale,
            opacity,
            zIndex,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true,
          });
        }
      });
    },
    { dependencies: [current], scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-full min-h-[480px]"
    >
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none" />

      {heroProducts.map((product, i) => {
        let offset = i - current;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        const isCenter = offset === 0;
        const isSide = Math.abs(offset) === 1;

        // ── Card inner content (shared) ──────────────────────────────────
        const cardContent = (
          <>
            {/* Arrow — center card only */}
            {isCenter && (
              <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-transparent group-hover:bg-white flex items-center justify-center group-hover:shadow-md transition-all duration-300">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 12L12 2M12 2H4M12 2V10"
                    stroke="#FF0000"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}

            {/* Product Image */}
            <div
              className="relative z-10 flex items-end justify-center px-6 pt-6 mb-[-20px]"
              style={{ height: CARD_HEIGHT }}
            >
              <Image
                src={product.image}
                alt={product.alt}
                width={160}
                height={200}
                className={`object-contain h-auto drop-shadow-2xl ${product.isEnterprise ? "scale-150 pb-[30%]" : ""}`}
                priority={isCenter}
              />
            </div>

            {/* Label */}
            <div
              className="pt-[30px] pb-5 px-6 text-center border-t border-white/10 rounded-b-[20px]"
              style={{ background: "rgba(237,237,237,0.21)" }}
            >
              <p className="text-white font-title font-bold text-[18px] leading-none tracking-wide">
                {product.label}
              </p>
            </div>
          </>
        );

        return (
          <div
            key={product.id}
            className={`card-${i}`}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              marginLeft: -(CARD_WIDTH / 2),
              marginTop: -(CARD_HEIGHT / 2) - 30,
              cursor: isSide ? "pointer" : "default",
            }}
            onClick={() => isSide && setCurrent(i)}
          >
            {/* ── Pulsing Glow ─────────────────────────────────────────── */}
            <div
              className={`glow-${i}`}
              style={{
                position: "absolute",
                bottom: -22,
                left: "12%",
                width: "76%",
                height: 32,
                background:
                  "radial-gradient(ellipse 100% 100%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 55%, transparent 75%)",
                filter: "blur(10px)",
                zIndex: -1,
                borderRadius: "50%",
              }}
            />

            {/* ── Card ─────────────────────────────────────────────────── */}
            <div
              onClick={() => {
                if (isCenter) {
                  router.push(product.href, { scroll: false });
                } else if (isSide) {
                  setCurrent(i);
                }
              }}
              className="group relative flex flex-col transition-all"
              style={{
                width: CARD_WIDTH,
                cursor: (isCenter || isSide) ? "pointer" : "default",
                background: isCenter ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.04)",
                backdropFilter: isCenter ? "blur(30px) saturate(180%)" : "blur(12px) saturate(140%)",
                WebkitBackdropFilter: isCenter ? "blur(30px) saturate(180%)" : "blur(12px) saturate(140%)",
                border: isCenter ? "1px solid rgba(255,255,255,0.28)" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                transform: "translateZ(0)",
                willChange: "transform",
                isolation: "isolate",
                transition: "background 0.8s ease, border 0.8s ease, box-shadow 0.8s ease, backdrop-filter 0.8s ease",
                boxShadow: isCenter
                  ? "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.45)"
                  : "0 8px 24px rgba(0,0,0,0.2)",
              }}
            >
              {cardContent}
            </div>
          </div>
        );
      })}

      {/* ── Controls: Prev | Pause/Play | Next ───────────────────────────── */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-40">
        {/* Prev */}
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + total) % total)}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/15 hover:bg-white/30 border border-white/20 transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 2L4 7L9 12"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Pause / Play */}
        <button
          onClick={() => setPaused((p) => !p)}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/15 hover:bg-white/30 border border-white/20 transition-all duration-200"
        >
          {paused ? (
            /* Play icon */
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 2L10 6L3 10V2Z" fill="white" />
            </svg>
          ) : (
            /* Pause icon */
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="2" y="2" width="3" height="8" rx="1" fill="white" />
              <rect x="7" y="2" width="3" height="8" rx="1" fill="white" />
            </svg>
          )}
        </button>

        {/* Next */}
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % total)}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/15 hover:bg-white/30 border border-white/20 transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M5 2L10 7L5 12"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ClientPage({ products }: { products: any }) {

  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const productParam = searchParams.get("product");

  const [activeProductTab, setActiveProductTab] = useState<
    keyof typeof ProductCategoriesMapping
  >(
    (tabParam && tabParam in ProductCategoriesMapping
      ? tabParam
      : "enterprise") as keyof typeof ProductCategoriesMapping,
  );

  useEffect(() => {
    if (tabParam && tabParam in ProductCategoriesMapping) {
      setActiveProductTab(tabParam as keyof typeof ProductCategoriesMapping);
    }
  }, [tabParam]);

  useEffect(() => {
    if (!productParam) return;

    let attempts = 0;
    const MAX_ATTEMPTS = 30;
    const NAVBAR_HEIGHT = 100;

    const tryScroll = () => {
      const el = document.getElementById(productParam);

      if (el) {
        const top =
          el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }

      attempts++;
      if (attempts < MAX_ATTEMPTS) {
        setTimeout(tryScroll, 100);
      }
    };

    const timer = setTimeout(tryScroll, 50);
    return () => clearTimeout(timer);
  }, [productParam, activeProductTab]);

  const onTabChange = (tabId: string) => {
    setActiveProductTab(tabId as keyof typeof ProductCategoriesMapping);
  };

  const ActiveComponent = ProductCategoriesMapping[activeProductTab];

  const columns = [
    { key: "enterprise", label: "Enterprise" },
    { key: "smb", label: "SMB" },
    { key: "home", label: "Home" },
  ];

  const rows: ProductSummaryRow[] = [
    {
      category: "Security Gateway",
      values: {
        enterprise: "SE 200/ SE 400/ SE 100",
        smb: "SafeBiz Firewall",
        home: "SafeHome Firewall",
      },
    },
    {
      category: "Peak Throughput",
      values: { enterprise: "10 Gbps", smb: "1 Gbps", home: "1 Gbps" },
    },
    {
      category: "Wi-Fi",
      values: {
        enterprise: "Wi-Fi 6E/ 7",
        smb: "Wi-Fi 5/ 6E",
        home: "Wi-Fi 5/ 6E",
      },
    },
    {
      category: "Max Users",
      values: { enterprise: "400 per appliance", smb: "128", home: "64" },
    },
    {
      category: "Management Platform",
      values: {
        enterprise: "Cloud + Private DC",
        smb: "Cloud Only",
        home: "-",
      },
    },
    {
      category: "Windows Endpoint Agent",
      values: {
        enterprise: { check: true as const },
        smb: { check: true as const },
        home: "-",
      },
    },
    {
      category: "Mobile App",
      values: {
        enterprise: "-",
        smb: { check: true, label: "iOS & Android" },
        home: { check: true, label: "iOS & Android" },
      },
    },
    {
      category: "Email Protection",
      values: {
        enterprise: { check: true as const, label: "Cloud Service" },
        smb: "-",
        home: "-",
      },
    },
    {
      category: "SIEM/ SOC Integration",
      values: { enterprise: { check: true as const }, smb: "-", home: "-" },
    },
    {
      category: "Made In India",
      values: {
        enterprise: { check: true as const, label: "(All gateways)" },
        smb: "-",
        home: "-",
      },
    },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#FFFFFF] overflow-x-hidden">
      <div className="relative">
        <Banner
          backgroundImage="/images/banners/productHeroBanner.webp"
          heightVariant="900"
          ContinerClass="h-auto lg:h-[100vh]"
          sectionClassName="py-16 lg:py-24"
          title={
            <>
              Enterprise-Grade{" "}
              <HighlightedText
                text="AI Cybersecurity"
                imageClassName="bottom-[-18px] md:bottom-[-20px]"
              />
              <br className="hidden lg:block" /> for Every Network
            </>
          }
          titleClassName="font-banner font-normal text-[28px] md:text-[36px] leading-[1.2] md:leading-[50px] tracking-[-0.01em] text-white"
          subtitle={
            <>
              Marma Security serves three distinct markets
              <br className="hidden lg:block" />
              with tailored product lines,
              <br className="hidden lg:block" />
              all powered by our unified AI-driven cloud platform.
              <br className="hidden lg:block" />
              Choose the protection that fits your scale.
            </>
          }
          subtitleClassName="font-title font-light text-[18px] md:text-[24px] leading-[1.4] md:leading-[34px] tracking-[-0.01em] text-white max-w-[550px]"
          rightContent={<HeroCarousel />}
        />

        {/* Decorative */}
        <div className="absolute bottom-6 right-0 w-[320px] lg:w-[450px] flex flex-col justify-end z-20 pointer-events-none">
          <DecorativeLine
            viewBox="0 0 700 80"
            points="-3000,40 210,40"
            dots={[{ cx: 210, cy: 40, rippleCount: 3 }]}
            className="w-full h-auto scale-x-[-1]"
            dotRadius={12}
            animationDuration={2.5}
          />
          <DecorativeLine
            viewBox="0 120 1260 160"
            points="20,150 500,150 600,270 3000,270"
            dots={[{ cx: 0, cy: 150, rippleCount: 4 }]}
            className="w-full h-auto -mt-4 md:-mt-10"
            strokeWidth={3}
            dotRadius={22}
            animationDuration={2.5}
          />
        </div>
      </div>

      {/* Product Showcases */}
      <div className=" pt-20">
        <div className="mb-10">
          <Tabs
            tabs={[
              { label: "Enterprise Solutions", id: "enterprise" },
              { label: "SMB Solutions", id: "smb" },
              { label: "Home Solutions", id: "home" },
            ]}
            activeTabId={activeProductTab}
            onTabChange={onTabChange}
            align="left"
          />
        </div>
        <div className="mb-4 mx-2">
          <ActiveComponent products={products} />
        </div>
      </div>

      <div className=" pt-12 mx-auto w-full max-w-[1280px]">
        <div className="flex flex-col w-[50%] sm:w-[40%] min-[901px]:w-[40%] ml-auto pointer-events-none z-0">
          <DecorativeLine
            viewBox="0 0 500 80"
            points="-3000,40 200,40"
            dots={[{ cx: 200, cy: 40, rippleCount: 3 }]}
            className="w-full h-auto scale-x-[-1]"
            dotRadius={6}
            animationDuration={2.5}
          />
        </div>
        <ProductSummaryTable
          title="Product Summary"
          columns={columns}
          rows={rows}
        />
      </div>
    </main>
  );
}
