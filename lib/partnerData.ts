export type RegionKey = "USA" | "India" | "Caribbean" | "Thailand" | "United Kingdom" | string;

export interface Partner {
  id?: string;
  name: string;
  website: string;
  logo: string;
  region: RegionKey;
  country?: string;
  value?: string;
  theme?: "dark" | "light";
  display_order?: number;
}

export interface RegionInfo {
  key: RegionKey;
  label: string;
  flag: string;
}

export const REGIONS: RegionInfo[] = [
  { key: "USA", label: "United States", flag: "🇺🇸" },
  { key: "India", label: "India", flag: "🇮🇳" },
  { key: "Caribbean", label: "Caribbean", flag: "🌴" },
  { key: "Thailand", label: "Thailand", flag: "🇹🇭" },
  { key: "United Kingdom", label: "United Kingdom", flag: "🇬🇧" },
];

export const FALLBACK_PARTNERS: Record<RegionKey, Partner[]> = {
  USA: [
    {
      name: "ByteSols",
      website: "https://bytesols.com/",
      logo: "/images/partners/logos/bytesols.png",
      region: "USA",
      country: "United States",
      value: "USA",
    },
    {
      name: "MacroTech",
      website: "https://macrotechglobal.com/",
      logo: "/images/partners/logos/macrotech.svg",
      region: "USA",
      country: "United States",
      value: "USA",
    },
    {
      name: "CompFl",
      website: "https://compfl.com/",
      logo: "/images/partners/logos/compfl.png",
      region: "USA",
      country: "United States",
      value: "USA",
    },
    {
      name: "BlueZone",
      website: "https://www.bluezone-insurance.com/",
      logo: "/images/partners/logos/bluezone.png",
      region: "USA",
      country: "United States",
      value: "USA",
    },
    {
      name: "Caldwell-Digital",
      website: "https://www.caldwell-list.com/",
      logo: "/images/partners/logos/caldwell.webp",
      region: "USA",
      country: "United States",
      value: "USA",
    },
    {
      name: "Axcsys Communications",
      website: "https://axcsystelcom.com/",
      logo: "/images/partners/logos/axcsys.jpg",
      region: "USA",
      country: "United States",
      value: "USA",
    },
    {
      name: "VortalSoft",
      website: "https://vortalsoft.com/",
      logo: "/images/partners/logos/vortalsoft.png",
      region: "USA",
      country: "United States",
      value: "USA",
    },
    {
      name: "GB Tech",
      website: "https://www.gbtech.net/",
      logo: "/images/partners/logos/gbtech.png",
      region: "USA",
      country: "United States",
      value: "USA",
      theme: "dark",
    },
    {
      name: "Channel Brokers LLC",
      website: "https://channel-brokers.com/",
      logo: "/images/partners/logos/channel-brokers.png",
      region: "USA",
      country: "United States",
      value: "USA",
    },
    {
      name: "One Call Networks",
      website: "https://www.onecallnetworks.com/",
      logo: "/images/partners/logos/onecall.png",
      region: "USA",
      country: "United States",
      value: "USA",
    },
  ],
  India: [
    { name: "UElement Technologies", website: "https://uelement.in/", logo: "/images/partners/logos/uelement.svg", region: "India", country: "India", value: "India", theme: "dark" },
    { name: "Samanviti Technologies", website: "https://samanviti.com/", logo: "/images/partners/logos/uelement.svg", region: "India", country: "India", value: "India" },
    { name: "Universys Technologies", website: "https://universys.in/", logo: "/images/partners/logos/universys.png", region: "India", country: "India", value: "India" },
    { name: "LN InfoSec Pvt Ltd", website: "https://lninfosec.com/", logo: "/images/partners/logos/lninfosec.png", region: "India", country: "India", value: "India", theme: "dark" },
    { name: "Tapasya Technovation", website: "https://tapasyatech.in/", logo: "/images/partners/logos/tapasya.png", region: "India", country: "India", value: "India" },
    { name: "Forenx Technologies", website: "https://www.forenxtech.com/", logo: "/images/partners/logos/forenx.png", region: "India", country: "India", value: "India" },
    { name: "Atomic IT Solutions", website: "https://atomicits.com/", logo: "/images/partners/logos/atomicits.png", region: "India", country: "India", value: "India" },
    { name: "Axiatix", website: "https://axiatix.com/", logo: "/images/partners/logos/axiatix.png", region: "India", country: "India", value: "India" },
    { name: "ARRA Associates", website: "https://arra-associates.com/", logo: "/images/partners/logos/arra-logo.png", region: "India", country: "India", value: "India" },
  ],
  Caribbean: [
    {
      name: "Alt Catalyst",
      website: "https://altcatalyst.com/",
      logo: "/images/partners/logos/altcatalyst.png",
      region: "Caribbean",
      country: "Trinidad and Tobago",
      value: "Caribbean",
    },
    {
      name: "Antraco Aruba",
      website: "https://www.antracoaruba.com/",
      logo: "/images/partners/logos/antraco.jpg",
      region: "Caribbean",
      country: "Aruba",
      value: "Caribbean",
    },
  ],
  Thailand: [
    {
      name: "PeakSecure",
      website: "https://www.peaksecure.ai/",
      logo: "/images/partners/logos/peaksecure.svg",
      region: "Thailand",
      country: "Thailand",
      value: "Thailand",
      theme: "dark",
    },
  ],
  "United Kingdom": [
    {
      name: "CyberVault UK",
      website: "https://channel-brokers.com/",
      logo: "/images/partners/logos/channel-brokers.png",
      region: "United Kingdom",
      country: "United Kingdom",
      value: "UK",
    },
  ],
};

/** Color palette for partner avatar fallbacks */
const AVATAR_COLORS = [
  "#E53935",
  "#1E88E5",
  "#43A047",
  "#FB8C00",
  "#8E24AA",
  "#00ACC1",
  "#3949AB",
  "#D81B60",
  "#6D4C41",
  "#00897B",
];

export function getAvatarColor(index: number): string {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

export function getInitials(name: string): string {
  return name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/**
 * Fetches active partners from Mainstay CMS with resilient fallback to local data.
 */
export async function getPartners(): Promise<Record<string, Partner[]>> {
  try {
    const { fetchActivePartners } = await import("./mainstay");
    const partners = await fetchActivePartners();
    if (partners && Object.keys(partners).length > 0) {
      return partners as Record<string, Partner[]>;
    }
  } catch (error) {
    console.warn("Mainstay client fetch error, falling back to local partners:", error);
  }

  return FALLBACK_PARTNERS;
}
