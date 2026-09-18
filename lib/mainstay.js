/**
 * Mainstay CMS Client Integration Layer
 * Provides high-performance, resilient data fetching for Mainstay Microservices
 * with Next.js ISR caching (revalidate: 30s) and static fallback.
 */

import { FALLBACK_PARTNERS } from "./partnerData";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://dunytgqgpv9fu.cloudfront.net";
const TENANT_SLUG = process.env.NEXT_PUBLIC_TENANT_SLUG || "marma-security";

/**
 * Normalizes a logo URL if relative or missing
 */
function normalizeLogoUrl(logo) {
  if (!logo) return "";
  if (logo.startsWith("http://") || logo.startsWith("https://") || logo.startsWith("/")) {
    return logo;
  }
  return `${API_BASE}/${logo.replace(/^\/+/, "")}`;
}

/**
 * Fetches active partnerships.
 * - Client-side (browser): Calls the local Next.js proxy route `/api/partners` to bypass CORS domain restrictions.
 * - Server-side (Node / SSR / ISR): Directly queries the Mainstay Gateway with ISR revalidation.
 *
 * @param {object} [options]
 * @param {boolean} [options.forceServer]
 * @returns {Promise<Record<string, Array<object>>>} Grouped partners by region/country
 */
export async function fetchActivePartners(options = {}) {
  const isServer = typeof window === "undefined" || options.forceServer;

  // 1. Browser context: Use internal Next.js proxy route to prevent CORS errors on preview branches / localhost
  if (!isServer) {
    try {
      const res = await fetch("/api/partners", {
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Object.keys(data).length > 0) {
          return data;
        }
      }
    } catch (err) {
      console.warn("[Mainstay Client] Error fetching from /api/partners proxy, falling back to static data:", err);
    }
    return FALLBACK_PARTNERS;
  }

  // 2. Server context: Direct server-to-server fetch (bypasses browser CORS checks)
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(`${API_BASE}/api/v1/partnerships/active`, {
      headers: {
        "x-tenant-slug": TENANT_SLUG,
      },
      next: { revalidate: 30 },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[Mainstay] Failed to fetch active partners (${res.status}): ${res.statusText}`);
      return FALLBACK_PARTNERS;
    }

    const raw = await res.json();
    const data = Array.isArray(raw) ? raw : raw.data || [];

    if (!data.length) {
      return FALLBACK_PARTNERS;
    }

    // Hydrate each partner: If extra_field or website_url was omitted by the active list endpoint,
    // fetch the single partnership by ID in parallel.
    const hydratedList = await Promise.all(
      data.map(async (item) => {
        let details = item;
        if (!item.extra_field || !item.website_url) {
          try {
            const detailRes = await fetch(`${API_BASE}/api/v1/partnerships/${item.id}`, {
              headers: {
                "x-tenant-slug": TENANT_SLUG,
              },
              next: { revalidate: 30 },
            });
            if (detailRes.ok) {
              const fullItem = await detailRes.json();
              details = { ...item, ...fullItem };
            }
          } catch {
            // Keep existing item if single detail fetch fails
          }
        }

        const extra = details.extra_field || {};
        const region = extra.region || "USA";
        const country = extra.country || (region === "USA" ? "United States" : region);
        const value = extra.value || region;

        return {
          id: details.id,
          name: extra.name || "Partner",
          website: details.website_url || "",
          logo: normalizeLogoUrl(details.logo || details.logoThumbnail),
          region: region,
          country: country,
          value: value,
          theme: extra.theme || "light",
          display_order: details.display_order ?? 0,
        };
      })
    );

    // Group partners by region
    const grouped = {
      USA: [],
      India: [],
      Caribbean: [],
      Thailand: [],
    };

    hydratedList.sort((a, b) => a.display_order - b.display_order);

    for (const partner of hydratedList) {
      const reg = partner.region || "USA";
      if (!grouped[reg]) {
        grouped[reg] = [];
      }
      grouped[reg].push(partner);
    }

    return grouped;
  } catch (err) {
    clearTimeout(timeout);
    console.warn("[Mainstay] Error fetching active partners on server, using fallback data:", err.message);
    return FALLBACK_PARTNERS;
  }
}

export default {
  fetchActivePartners,
};
