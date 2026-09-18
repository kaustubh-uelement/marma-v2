#!/usr/bin/env node

/**
 * Seed Marma Security Partnerships into Mainstay CMS
 * Populates diverse regional cybersecurity/enterprise partners with extra_field:
 * - name
 * - country
 * - value
 * - region
 * - theme
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://dunytgqgpv9fu.cloudfront.net";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "administrator@marmasec.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "n12l!XV5MI07iiJf";
const TENANT_SLUG = process.env.NEXT_PUBLIC_TENANT_SLUG || "marma-security";
const TENANT_ID = "5731199c-32b0-4768-b17f-0c3b272579b0";

const PARTNERS_TO_SEED = [
  // USA
  {
    name: "ByteSols",
    website_url: "https://bytesols.com/",
    logo: "/images/partners/logos/bytesols.png",
    region: "USA",
    country: "United States",
    value: "USA",
    theme: "light",
    display_order: 1,
  },
  {
    name: "MacroTech",
    website_url: "https://macrotechglobal.com/",
    logo: "/images/partners/logos/macrotech.svg",
    region: "USA",
    country: "United States",
    value: "USA",
    theme: "light",
    display_order: 2,
  },
  {
    name: "CompFl",
    website_url: "https://compfl.com/",
    logo: "/images/partners/logos/compfl.png",
    region: "USA",
    country: "United States",
    value: "USA",
    theme: "light",
    display_order: 3,
  },
  {
    name: "BlueZone",
    website_url: "https://www.bluezone-insurance.com/",
    logo: "/images/partners/logos/bluezone.png",
    region: "USA",
    country: "United States",
    value: "USA",
    theme: "light",
    display_order: 4,
  },
  {
    name: "GB Tech",
    website_url: "https://www.gbtech.net/",
    logo: "/images/partners/logos/gbtech.png",
    region: "USA",
    country: "United States",
    value: "USA",
    theme: "dark",
    display_order: 5,
  },

  // India
  {
    name: "UElement Technologies",
    website_url: "https://uelement.in/",
    logo: "/images/partners/logos/uelement.svg",
    region: "India",
    country: "India",
    value: "India",
    theme: "dark",
    display_order: 10,
  },
  {
    name: "Samanviti Technologies",
    website_url: "https://samanviti.com/",
    logo: "/images/partners/logos/uelement.svg",
    region: "India",
    country: "India",
    value: "India",
    theme: "light",
    display_order: 11,
  },
  {
    name: "Universys Technologies",
    website_url: "https://universys.in/",
    logo: "/images/partners/logos/universys.png",
    region: "India",
    country: "India",
    value: "India",
    theme: "light",
    display_order: 12,
  },
  {
    name: "LN InfoSec Pvt Ltd",
    website_url: "https://lninfosec.com/",
    logo: "/images/partners/logos/lninfosec.png",
    region: "India",
    country: "India",
    value: "India",
    theme: "dark",
    display_order: 13,
  },
  {
    name: "Tapasya Technovation",
    website_url: "https://tapasyatech.in/",
    logo: "/images/partners/logos/tapasya.png",
    region: "India",
    country: "India",
    value: "India",
    theme: "light",
    display_order: 14,
  },

  // Caribbean
  {
    name: "Alt Catalyst",
    website_url: "https://altcatalyst.com/",
    logo: "/images/partners/logos/altcatalyst.png",
    region: "Caribbean",
    country: "Trinidad and Tobago",
    value: "Caribbean",
    theme: "light",
    display_order: 20,
  },
  {
    name: "Antraco Aruba",
    website_url: "https://www.antracoaruba.com/",
    logo: "/images/partners/logos/antraco.jpg",
    region: "Caribbean",
    country: "Aruba",
    value: "Caribbean",
    theme: "light",
    display_order: 21,
  },

  // Thailand
  {
    name: "PeakSecure",
    website_url: "https://www.peaksecure.ai/",
    logo: "/images/partners/logos/peaksecure.svg",
    region: "Thailand",
    country: "Thailand",
    value: "Thailand",
    theme: "dark",
    display_order: 30,
  },

  // United Kingdom
  {
    name: "CyberVault UK",
    website_url: "https://channel-brokers.com/",
    logo: "/images/partners/logos/channel-brokers.png",
    region: "United Kingdom",
    country: "United Kingdom",
    value: "UK",
    theme: "light",
    display_order: 40,
  },
];

async function main() {
  console.log(`\n============================================================`);
  console.log(`🔑 Logging into Mainstay API (${API_BASE})...`);
  console.log(`   Admin Email: ${ADMIN_EMAIL}`);
  console.log(`   Tenant Slug: ${TENANT_SLUG}`);
  console.log(`============================================================\n`);

  const loginRes = await fetch(`${API_BASE}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });

  if (!loginRes.ok) {
    const txt = await loginRes.text();
    throw new Error(`Login failed (${loginRes.status}): ${txt}`);
  }

  const { accessToken } = await loginRes.json();
  console.log("✅ Successfully authenticated as Marma Security Admin!\n");

  // Fetch current partnerships
  const listRes = await fetch(`${API_BASE}/api/v1/partnerships`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "x-tenant-id": TENANT_ID,
    },
  });

  const existing = listRes.ok ? await listRes.json() : [];
  console.log(`Found ${existing.length} existing partnerships in Mainstay CMS.\n`);

  // Map of existing items by ID or name
  const existingDetails = [];
  for (const item of existing) {
    try {
      const detailRes = await fetch(`${API_BASE}/api/v1/partnerships/${item.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-tenant-id": TENANT_ID,
        },
      });
      if (detailRes.ok) {
        existingDetails.push(await detailRes.json());
      }
    } catch {
      // Continue
    }
  }

  console.log("🚀 Seeding & Updating Partners...\n");

  for (const p of PARTNERS_TO_SEED) {
    const extra_field = {
      name: p.name,
      country: p.country,
      value: p.value,
      region: p.region,
      theme: p.theme || "light",
    };

    // Find if already exists by name or website
    const matched = existingDetails.find(
      (e) =>
        (e.extra_field && e.extra_field.name === p.name) ||
        (e.website_url && e.website_url.replace(/\/$/, "") === p.website_url.replace(/\/$/, ""))
    );

    if (matched) {
      console.log(`🔄 Updating existing partner: ${p.name} (ID: ${matched.id})`);
      const updateRes = await fetch(`${API_BASE}/api/v1/partnerships/${matched.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-tenant-id": TENANT_ID,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logo: p.logo,
          website_url: p.website_url,
          display_order: p.display_order,
          is_active: true,
          extra_field,
        }),
      });

      if (!updateRes.ok) {
        console.error(`   ✗ Update failed (${updateRes.status}): ${await updateRes.text()}`);
      } else {
        console.log(`   ✓ Updated [${p.country} / ${p.region}]`);
      }
    } else {
      console.log(`➕ Creating new partner: ${p.name} [${p.country} / ${p.region}]`);
      const createRes = await fetch(`${API_BASE}/api/v1/partnerships`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-tenant-id": TENANT_ID,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logo: p.logo,
          website_url: p.website_url,
          display_order: p.display_order,
          is_active: true,
          extra_field,
        }),
      });

      if (!createRes.ok) {
        console.error(`   ✗ Create failed (${createRes.status}): ${await createRes.text()}`);
      } else {
        const created = await createRes.json();
        console.log(`   ✓ Created (ID: ${created.id})`);
      }
    }
  }

  console.log(`\n============================================================`);
  console.log(`🎉 Seeding complete! Checking public active endpoint...`);
  console.log(`============================================================\n`);

  const activeRes = await fetch(`${API_BASE}/api/v1/partnerships/active`, {
    headers: { "x-tenant-slug": TENANT_SLUG },
  });

  if (activeRes.ok) {
    const activeList = await activeRes.json();
    console.log(`✅ Public Active Partnerships Count: ${activeList.length}`);
  } else {
    console.warn(`⚠️ Could not reach active endpoint (${activeRes.status})`);
  }
}

main().catch((err) => {
  console.error("Fatal Seeding Error:", err);
  process.exit(1);
});
