import DecorativeLine from "@/components/home/DecorativeLine";
import EndpointProductCard from "../EndpointProductCard";
import SpecificationProductCard, {
  SpecificationProductItem,
} from "../SpecificationProductCard";
import {
  productDecoratedSectionClassName,
  productSectionTitleClassName,
} from "./sectionSpacing";

const homeGatewaySpecifications: SpecificationProductItem[] = [
  { label: "Form Factor", value: "Desktop" },
  { label: "Throughput", value: "1 Gbps" },
  { label: "WAN Ports", value: "1 x 2.5 Gbps" },
  { label: "LAN Ports", value: "4 x 1 Gbps (Ethernet)" },
  { label: "Integrated Wi-Fi", value: "Wi-Fi 5 / 6E" },
  { label: "Recommended Users", value: "Up to 64" },
];

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

export default function HomeSolutions({ products = [] }: { products?: any[] }) {
  const getProduct = (searchString: string) => {
    return products.find((p: any) =>
      (p.name || p.title || p.productName || "")?.toLowerCase().includes(searchString.toLowerCase())
    );
  };

  const mobileApp = getProduct("Mobile App");

  const fallbackProducts = [
    {
      id: "safehome",
      title: "SafeHome Firewall | Home Network Security",
      description: "SafeHome is a next-generation firewall designed to protect home networks from advanced cyber threats. It combines deep packet inspection, AI-powered threat detection, and comprehensive Parental Control capabilities in a compact form factor.",
      image: "/images/banners/solution-banner-right1.webp",
      imageAlt: "SafeHome Firewall home network security device",
      specifications: homeGatewaySpecifications,
    }
  ];

  const deviceProducts = products.filter((p: any) => {
    const cat = p.category?.toLowerCase() || '';
    return cat === 'home' || cat === 'homesolutions' || cat === 'home-solutions';
  });

  const isBackup = products.some((p: any) => p.isBackup === true);
  const displayProducts =
    deviceProducts.length > 0
      ? deviceProducts
      : isBackup
      ? fallbackProducts
      : [];

  return (
    <div className="mx-auto w-full max-w-[1280px]">
      <div className={productSectionTitleClassName}>Security Gateways</div>

      {displayProducts.map((prod: any, idx: number) => {
        return (
          <div key={prod.id || idx} id={prod.id || `home-item-${idx}`} className={idx > 0 ? "mt-2 sm:mt-4 lg:mt-10 xl:mt-12" : ""}>
            <SpecificationProductCard
              title={prod.name || prod.title || "Home Security Device"}
              descript={prod.description || "SafeHome protects all connected devices on your network from cyberattacks targeting your financial and personal data, safeguarding your privacy and protecting your family on the internet."}
              image={prod.image || "/images/banners/solution-banner-right1.webp"}
              imageAlt={prod.imageAlt || prod.name || prod.title || "Home security device"}
              specification={getSafeSpecifications(
                prod,
                homeGatewaySpecifications
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

        <div className={productSectionTitleClassName}>Mobile Application</div>
        <div className="max-md:px-6 md:px-12">
          <EndpointProductCard
            name={mobileApp?.name || mobileApp?.title || "Mobile App"}
            tagline={mobileApp?.tagline || "iOS & Android"}
            subTitle="Easily enable and monitor a safe internet for your family with comprehensive parental controls."
            primaryFeature={mobileApp?.primaryFeature || "Our AI cybersecurity 24x7 platform monitors and secures the incoming and outgoing internet traffic from your home and provides real-time alerts on our user-friendly Mobile App when threats are detected and blocked, providing the user with the peace of mind that their network is secure."}
            image="/images/product/software/mobile_app2.webp"
            features={mobileApp?.features || [
              "Smart Setup: Configure SafeHome effortlessly.",
              "Real-Time Threat Intelligence: Instant alerts for malicious domains/URLs.",
              "Network Visibility: Monitor connected hosts and activity in real-time.",
              "Security Controls: Block harmful categories, domains, and high-risk IPs.",
              "Secure QR Verification: Instantly verify QR codes securely.",
              "Centralized Control: Manage all devices from a single intuitive dashboard.",
            ]}
            imageClass="pt-2 scale-y-[1.01] bg-[#e0e0e0]"
          />
        </div>
      </div>
    </div>
  );
}
