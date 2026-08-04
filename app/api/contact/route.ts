import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  extra_field?: Record<string, any>;
};

const trimTrailingSlash = (value = "") =>
  typeof value === "string" ? value.replace(/\/+$/, "") : "";

const getApiBaseUrl = () =>
  trimTrailingSlash(process.env.NEXT_PUBLIC_API_URL || "");

const getTenantSlug = () => process.env.NEXT_PUBLIC_TENANT_SLUG || "";
const getWeb3FormsKey = () =>
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";

async function submitToPrimary(payload: ContactPayload) {
  const baseUrl = getApiBaseUrl();
  const tenantSlug = getTenantSlug();

  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_API_URL");
  }

  const response = await fetch(`${baseUrl}/api/v1/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-tenant-slug": tenantSlug,
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const raw = await response.text();
  return { response, raw };
}

async function submitToWeb3Forms(payload: ContactPayload) {
  const accessKey = getWeb3FormsKey();

  if (!accessKey) {
    throw new Error("Missing NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY");
  }

  const formData = new FormData();
  formData.append("access_key", accessKey);

  const getFieldName = (key: string) =>
    key === "subject" ? "Area of Interest" : key;

  Object.entries(payload).forEach(([key, value]) => {
    if (key !== "extra_field" && value !== undefined && value !== null) {
      formData.append(
        getFieldName(key),
        typeof value === "object" ? JSON.stringify(value) : String(value),
      );
    }
  });

  if (payload.extra_field) {
    Object.entries(payload.extra_field).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(
          getFieldName(key),
          typeof value === "object" ? JSON.stringify(value) : String(value),
        );
      }
    });
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  const raw = await response.text();
  return { response, raw };
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as ContactPayload;

    if (!payload?.email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 },
      );
    }

    let primaryResult: { response: Response; raw: string } | undefined;

    try {
      primaryResult = await submitToPrimary(payload);
      console.log("Primary contact API status:", primaryResult.response.status);
      console.log("Primary contact API response:", primaryResult.raw);
    } catch (error) {
      console.error("Primary contact API error:", error);
    }

    if (primaryResult) {
      const { response, raw } = primaryResult;

      if (response.ok) {
        return NextResponse.json(
          {
            success: true,
            message: "Your message has been sent successfully!",
            data: raw ? JSON.parse(raw) : null,
            provider: "primary",
          },
          { status: 200 },
        );
      }

      if (response.status >= 400 && response.status < 500) {
        let parsed: any = null;
        try {
          parsed = raw ? JSON.parse(raw) : null;
        } catch {}

        return NextResponse.json(
          {
            success: false,
            message:
              parsed?.message ||
              `Submission failed (${response.status}). Please try again.`,
          },
          { status: response.status },
        );
      }
    }

    try {
      const fallbackResult = await submitToWeb3Forms(payload);
      console.log("Web3Forms status:", fallbackResult.response.status);
      console.log("Web3Forms response:", fallbackResult.raw);

      let parsed: any = null;
      try {
        parsed = fallbackResult.raw ? JSON.parse(fallbackResult.raw) : null;
      } catch {}

      if (fallbackResult.response.ok && parsed?.success !== false) {
        return NextResponse.json(
          {
            success: true,
            message: "Your message has been sent successfully!",
            data: parsed,
            provider: "fallback",
          },
          { status: 200 },
        );
      }

      return NextResponse.json(
        {
          success: false,
          message:
            parsed?.message ||
            "Fallback submission failed. Please try again shortly.",
        },
        { status: 502 },
      );
    } catch (fallbackError) {
      console.error("Web3Forms fallback error:", fallbackError);

      return NextResponse.json(
        {
          success: false,
          message: "Submission failed. Please try again shortly.",
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Contact route error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Network error. Please check your connection and try again.",
      },
      { status: 500 },
    );
  }
}
