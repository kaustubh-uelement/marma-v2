import { NextRequest, NextResponse } from "next/server";
import type { RegionKey } from "@/lib/partnerData";

/**
 * Caribbean country codes (ISO 3166-1 alpha-2).
 * Covers most island nations and territories in the Caribbean basin.
 */
const CARIBBEAN_CODES = new Set([
  "AG", "AI", "AW", "BB", "BL", "BQ", "BS", "CU", "CW", "DM",
  "DO", "GD", "GP", "HT", "JM", "KN", "KY", "LC", "MF", "MQ",
  "MS", "PR", "SX", "TC", "TT", "VC", "VG", "VI",
]);

function mapCountryToRegion(countryCode: string | null): RegionKey {
  if (!countryCode) return "USA";

  const code = countryCode.toUpperCase().trim();

  if (code === "US") return "USA";
  if (code === "IN") return "India";
  if (code === "TH") return "Thailand";
  if (CARIBBEAN_CODES.has(code)) return "Caribbean";

  // Default fallback — show USA partners for all other regions
  return "USA";
}

export async function GET(request: NextRequest) {
  // Try various platform-specific geo headers
  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-country-code") ??
    null;

  const region = mapCountryToRegion(country);

  return NextResponse.json({ region }, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
