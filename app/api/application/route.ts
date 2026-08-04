import { NextRequest, NextResponse } from "next/server";

const trimTrailingSlash = (value = "") =>
  typeof value === "string" ? value.replace(/\/+$/, "") : "";

const getCareersApiBaseUrl = () =>
  trimTrailingSlash(process.env.NEXT_PUBLIC_API_URL || "");

const getTenantSlug = () => process.env.NEXT_PUBLIC_TENANT_SLUG || "";

export async function POST(req: NextRequest) {
  try {
    const incoming = await req.formData();

    const careerId = incoming.get("careerId");
    if (!careerId) {
      return NextResponse.json({ error: "Missing careerId" }, { status: 400 });
    }

    const base = getCareersApiBaseUrl();
    const slug = getTenantSlug();

    if (!base || !slug) {
      console.error("Missing NEXT_PUBLIC_API_URL or NEXT_PUBLIC_TENANT_SLUG");
      return NextResponse.json(
        { error: "Missing API env configuration" },
        { status: 500 },
      );
    }

    // Remove internal-only field before forwarding upstream
    incoming.delete("careerId");

    const submitUrl = `${base}/api/v1/public/careers/${encodeURIComponent(
      String(careerId),
    )}/applications?slug=${encodeURIComponent(slug)}`;

    const response = await fetch(submitUrl, {
      method: "POST",
      body: incoming,
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type") || "";
    const text = await response.text();

    if (!response.ok) {
      console.error(`Upstream careers API error (${response.status}):`, text);
    }

    return new NextResponse(text, {
      status: response.status,
      headers: {
        "content-type": contentType || "application/json",
      },
    });
  } catch (error) {
    console.error("api/application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
