export type RegionKey = "USA" | "India" | "Caribbean" | "Thailand";

export interface Partner {
  name: string;
  website: string;
  logo: string;
  region: RegionKey;
  theme?: "dark" | "light";
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
];



export const FALLBACK_PARTNERS: Record<RegionKey, Partner[]> = {
  USA: [
    { name: "ByteSols", website: "https://bytesols.com/", logo: "/images/partners/logos/bytesols.png", region: "USA" },
    { name: "MacroTech", website: "https://macrotechglobal.com/", logo: "/images/partners/logos/macrotech.svg", region: "USA" },
    { name: "CompFl", website: "https://compfl.com/", logo: "/images/partners/logos/compfl.png", region: "USA" },
    { name: "BlueZone", website: "https://www.bluezone-insurance.com/", logo: "/images/partners/logos/bluezone.png", region: "USA" },
    { name: "Caldwell-Digital", website: "https://www.caldwell-list.com/", logo: "/images/partners/logos/caldwell.webp", region: "USA" },
    { name: "Axcsys Communications", website: "https://axcsystelcom.com/", logo: "/images/partners/logos/axcsys.jpg", region: "USA" },
    { name: "VortalSoft", website: "https://vortalsoft.com/", logo: "/images/partners/logos/vortalsoft.png", region: "USA" },
    { name: "GB Tech", website: "https://www.gbtech.net/", logo: "/images/partners/logos/gbtech.png", region: "USA", theme: "dark" },
    { name: "Channel Brokers LLC", website: "https://channel-brokers.com/", logo: "/images/partners/logos/channel-brokers.png", region: "USA" },
    { name: "One Call Networks", website: "https://www.onecallnetworks.com/", logo: "/images/partners/logos/onecall.png", region: "USA" },
  ],
  India: [
    { name: "UElement Technologies", website: "https://uelement.in/", logo: "/images/partners/logos/uelement.svg", region: "India", theme: "dark" },
    { name: "Universys Technologies", website: "https://universys.in/", logo: "/images/partners/logos/universys.png", region: "India" },
    { name: "LN InfoSec Pvt Ltd", website: "https://lninfosec.com/", logo: "/images/partners/logos/lninfosec.png", region: "India", theme: "dark" },
    { name: "Tapasya Technovation", website: "https://tapasyatech.in/", logo: "/images/partners/logos/tapasya.png", region: "India" },
    { name: "Forenx Technologies", website: "https://www.forenxtech.com/", logo: "/images/partners/logos/forenx.png", region: "India" },
    { name: "Atomic IT Solutions", website: "https://atomicits.com/", logo: "/images/partners/logos/atomicits.png", region: "India" },
    { name: "Axiatix", website: "https://axiatix.com/", logo: "/images/partners/logos/axiatix.png", region: "India" },
  ],
  Caribbean: [
    { name: "Alt Catalyst", website: "https://altcatalyst.com/", logo: "/images/partners/logos/altcatalyst.png", region: "Caribbean" },
    { name: "Antraco Aruba", website: "https://www.antracoaruba.com/", logo: "/images/partners/logos/antraco.jpg", region: "Caribbean" },
  ],
  Thailand: [
    { name: "PeakSecure", website: "https://www.peaksecure.ai/", logo: "/images/partners/logos/peaksecure.svg", region: "Thailand", theme: "dark" },
  ],
};

/** Color palette for partner avatar fallbacks */
const AVATAR_COLORS = [
  "#E53935", "#1E88E5", "#43A047", "#FB8C00",
  "#8E24AA", "#00ACC1", "#3949AB", "#D81B60",
  "#6D4C41", "#00897B",
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

export async function getPartners(): Promise<Record<RegionKey, Partner[]>> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG;

    if (!tenantSlug) {
      console.warn("Missing NEXT_PUBLIC_TENANT_SLUG in env");
      return FALLBACK_PARTNERS;
    }

    const res = await fetch(`${apiUrl}/api/v1/partnerships/active`, {
      headers: {
        'x-tenant-slug': tenantSlug,
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error("Failed to fetch partners:", res.statusText);
      return FALLBACK_PARTNERS;
    }

    const json = await res.json();
    const data = Array.isArray(json) ? json : json.data || [];

    if (data.length === 0) {
      return FALLBACK_PARTNERS;
    }

    const grouped: Record<RegionKey, Partner[]> = {
      USA: [],
      India: [],
      Caribbean: [],
      Thailand: [],
    };

    data.forEach((item: any) => {
      const extra = item.extra_field || {};
      // Fallback to USA if region is invalid
      const region = (extra.region as RegionKey) || "USA";

      const partner: Partner = {
        name: extra.name || "Partner",
        website: item.website_url || "",
        logo: item.logo || "",
        region: region,
        theme: extra.theme || "light",
      };

      if (grouped[region]) {
        grouped[region].push(partner);
      } else {
        grouped.USA.push(partner);
      }
    });

    return grouped;
  } catch (error) {
    console.error("Error fetching partners:", error);
    return FALLBACK_PARTNERS;
  }
}
