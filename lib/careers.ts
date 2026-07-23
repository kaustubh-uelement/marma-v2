export interface Job {
  id: number | string;
  isFilled: boolean;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  goodToHave?: string[];
  responsibilities: string[];
}

const getRuntimeEnv = () =>
  typeof window !== "undefined" && (window as any).__ENV__
    ? (window as any).__ENV__
    : {};

const getBuildEnv = () =>
  typeof process !== "undefined" && process.env ? process.env : {};

const readEnv = (key: string, fallback = "") => {
  const runtimeValue = getRuntimeEnv()?.[key];
  if (runtimeValue !== undefined && runtimeValue !== "") return runtimeValue;
  const buildValue = (getBuildEnv() as any)?.[key];
  if (buildValue !== undefined && buildValue !== "") return buildValue;
  return fallback;
};

const trimTrailingSlash = (value = "") =>
  typeof value === "string" ? value.replace(/\/+$/, "") : "";

const withLeadingSlash = (value = "") =>
  typeof value === "string" && value.startsWith("/") ? value : `/${value}`;

export const getCareersApiBaseUrl = () =>
  trimTrailingSlash(readEnv("NEXT_PUBLIC_API_URL", "http://localhost:8000"));

export const getTenantSlug = () => readEnv("NEXT_PUBLIC_TENANT_SLUG", "");

const buildPublicCareersBaseUrl = () => {
  const base = getCareersApiBaseUrl();
  return `${base}${withLeadingSlash("api/v1/public/careers")}`;
};

// Fallback data — identical to the current hardcoded jobs array in JobBoard.tsx
const fallbackJobs: Job[] = [
  {
    id: 4,
    isFilled: false,
    title: "Sales Executive / Manager (2-5 Years)",
    department: "Sales",
    location: "Delhi, India",
    type: "Full-time",
    description:
      "Join our fast-growing product company to drive B2B and B2C sales for Marma Security products. We're looking for a motivated individual to build our partner ecosystem and own customer acquisition.",
    requirements: [
      "2–5 years of experience in Sales / Business Development",
      "Proven ability to drive revenue and manage customer relationships",
      "Strong networking and channel partner management skills",
      "Excellent communication and strategic thinking",
    ],
    goodToHave: ["Exposure to the Cyber Security domain"],
    responsibilities: [
      "Drive B2B & B2C sales for Marma Security products",
      "Build and scale a strong channel partner ecosystem",
      "Own revenue targets and customer acquisition",
      "Work closely with leadership in a fast-growing product company",
    ],
  },
  {
    id: 3,
    isFilled: false,
    title: "Sales Executive / Manager (2-5 Years)",
    department: "Sales",
    location: "Kolkata, India",
    type: "Full-time",
    description:
      "Join our fast-growing product company to drive B2B and B2C sales for Marma Security products. We're looking for a motivated individual to build our partner ecosystem and own customer acquisition.",
    requirements: [
      "2–5 years of experience in Sales / Business Development",
      "Proven ability to drive revenue and manage customer relationships",
      "Strong networking and channel partner management skills",
      "Excellent communication and strategic thinking",
    ],
    goodToHave: ["Exposure to the Cyber Security domain"],
    responsibilities: [
      "Drive B2B & B2C sales for Marma Security products",
      "Build and scale a strong channel partner ecosystem",
      "Own revenue targets and customer acquisition",
      "Work closely with leadership in a fast-growing product company",
    ],
  },
  {
    id: 2,
    isFilled: true,
    title: "Sales Executive / Manager (2-5 Years)",
    department: "Sales",
    location: "Mumbai, India",
    type: "Full-time",
    description:
      "Join our fast-growing product company to drive B2B and B2C sales for Marma Security products. We're looking for a motivated individual to build our partner ecosystem and own customer acquisition.",
    requirements: [
      "2–5 years of experience in Sales / Business Development",
      "Proven ability to drive revenue and manage customer relationships",
      "Strong networking and channel partner management skills",
      "Excellent communication and strategic thinking",
    ],
    goodToHave: ["Exposure to the Cyber Security domain"],
    responsibilities: [
      "Drive B2B & B2C sales for Marma Security products",
      "Build and scale a strong channel partner ecosystem",
      "Own revenue targets and customer acquisition",
      "Work closely with leadership in a fast-growing product company",
    ],
  },
  {
    id: 1,
    isFilled: true,
    title: "Digital Marketing Executive (1-3 Years)",
    department: "Marketing",
    location: "Pune, India",
    type: "Full-time",
    description:
      "Looking to grow in a fast-paced cybersecurity product company? This could be your next big move. We are looking for a creative and data-driven marketer to drive our growth initiatives.",
    requirements: [
      "1–3 years of experience in Digital Marketing",
      "Hands-on experience with Google Ads, SEO, LinkedIn, and Analytics",
      "Strong interest in performance marketing & lead generation",
      "Excellent written and verbal communication skills",
    ],
    goodToHave: ["Exposure to Cybersecurity / SaaS / Product-based companies"],
    responsibilities: [
      "Experiment with and scale marketing campaigns",
      "Drive high-quality lead generation",
      "Work closely with tech and product teams to refine messaging",
      "Analyze and report on campaign performance",
    ],
  },
];

const firstString = (...values: any[]) =>
  values.find((v) => typeof v === "string" && v.trim()) || "";

const firstValue = (...values: any[]) =>
  values.find((v) => v !== undefined && v !== null);

const normalizeList = (value: any): string[] => {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (typeof value !== "string") return [];
  return value
    .split(/\n|•/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const extractRows = (payload: any): any[] =>
  Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload?.items)
        ? payload.items
        : Array.isArray(payload?.results)
          ? payload.results
          : [];

const toJob = (career: any, index = 0): Job => {
  const rawId = firstValue(
    career?.id,
    career?.career_id,
    career?._id,
    career?.slug,
  );
  const id = rawId ?? `career-${index}`;

  return {
    id,
    isFilled: Boolean(career?.isFilled ?? career?.is_filled ?? false),
    title:
      firstString(career?.title, career?.job_title, career?.name) ||
      "Untitled Role",
    department: firstString(career?.department, career?.team) || "General",
    location: firstString(career?.location) || "Location not specified",
    type:
      firstString(
        career?.employmentType,
        career?.employment_type,
        career?.job_type,
      ) || "Full-time",
    description: firstString(career?.description, career?.summary),
    requirements: normalizeList(
      firstValue(
        career?.requirements,
        career?.required_skills,
        career?.qualifications,
      ),
    ),
    goodToHave: normalizeList(
      firstValue(career?.goodToHave, career?.preferred_skills),
    ),
    responsibilities: normalizeList(
      firstValue(
        career?.responsibilities,
        career?.key_responsibilities,
        career?.duties,
      ),
    ),
  };
};

const fetchJson = async (url: string) => {
  console.log("build url", url);

  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    next: { revalidate: 60 },
  });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return response.json();
};

export async function getJobs(): Promise<Job[]> {
  try {
    const slug = getTenantSlug();
    if (!slug) {
      console.warn("Missing NEXT_PUBLIC_TENANT_SLUG in env");
      return fallbackJobs;
    }

    const url = `${buildPublicCareersBaseUrl()}?slug=${encodeURIComponent(slug)}`;
    const payload = await fetchJson(url);
    const rows = extractRows(payload);
    // console.log("payload", payload);
    // console.log("rows", rows);

    if (rows.length === 0) return fallbackJobs;

    return rows.map((row, index) => toJob(row, index));
  } catch (error) {
    console.error("Error fetching careers:", error);
    return fallbackJobs;
  }
}

export const buildApplicationUrl = (careerId: string | number) => {
  const slug = getTenantSlug();
  const base = getCareersApiBaseUrl();
  return `${base}${withLeadingSlash(
    `api/v1/public/careers/${encodeURIComponent(String(careerId))}/applications`,
  )}?slug=${encodeURIComponent(slug)}`;
};

export interface ApplicationResult {
  success: boolean;
  message: string;
  isDuplicate?: boolean;
}

/**
 * Submits the job application via the real careers API using FormData
 * (multer-compatible multipart upload). Falls back to the formsubmit.co
 * relay if the primary API is unreachable, preserving existing behavior.
 */
export async function submitApplication(
  careerId: string | number,
  formData: FormData,
): Promise<ApplicationResult> {
  try {
    const response = await fetch(buildApplicationUrl(careerId), {
      method: "POST",
      body: formData,
      // No Content-Type header — browser sets multipart boundary automatically
    });

    console.log(response)

    if (response.status === 201 || response.ok) {
      return {
        success: true,
        message: "Your application has been submitted successfully!",
      };
    }

    if (response.status === 409) {
      return {
        success: false,
        isDuplicate: true,
        message:
          "You've already applied for this position with this email address.",
      };
    }

    const errorData = await response.json().catch(() => null);
    return {
      success: false,
      message:
        errorData?.message ||
        `Submission failed (${response.status}). Please try again.`,
    };
  } catch (error) {
    console.error(
      "Primary application submission failed, falling back:",
      error,
    );
    // return submitApplicationFallback(formData);
  }
}

/**
 * Backup submission path via formsubmit.co, matching the existing
 * hidden-iframe relay behavior in ApplicationForm.tsx.
 */
async function submitApplicationFallback(
  formData: FormData,
): Promise<ApplicationResult> {
  try {
    const email = process.env.NEXT_PUBLIC_FORM_SUBMIT_EMAIL;
    if (!email) {
      return {
        success: false,
        message: "Network error. Please check your connection and try again.",
      };
    }

    const response = await fetch(`https://formsubmit.co/${email}`, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });

    // formsubmit.co with no-cors returns opaque response; assume success if no throw
    return {
      success: true,
      message: "Your application has been submitted successfully!",
    };
  } catch (error) {
    console.error("Fallback submission error:", error);
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
}
