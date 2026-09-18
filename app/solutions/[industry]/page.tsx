import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionDetailView from "@/components/solutions/SolutionDetailView";
import { SOLUTIONS_DATA, SolutionPageData } from "@/lib/solutionsData";
import { getIndustryBySlug } from "./industryData";

export const dynamic = "force-dynamic";

function resolveKey(param: string): string {
  const lower = param.toLowerCase();
  if (lower === "small-and-medium-business") return "smb";
  return lower;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const key = resolveKey(resolved.industry);
  const v2Data = SOLUTIONS_DATA[key];

  if (v2Data) {
    return {
      title: v2Data.title,
      description: v2Data.desc,
    };
  }

  const dynamicData = await getIndustryBySlug(resolved.industry);
  const display = resolved.industry.replace(/-/g, " ");
  return {
    title: typeof dynamicData.hero.title === "string" ? dynamicData.hero.title : `${display} Cybersecurity | Marma Security`,
    description: typeof dynamicData.hero.description === "string" ? dynamicData.hero.description : `Tailored cybersecurity solutions for ${display}.`,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const resolved = await params;
  const key = resolveKey(resolved.industry);

  let pageData: SolutionPageData | undefined = SOLUTIONS_DATA[key];

  // If not found in static v2 records, create from dynamic CMS/API data
  if (!pageData) {
    try {
      const dynamicData = await getIndustryBySlug(resolved.industry);
      const display = resolved.industry
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      pageData = {
        slug: resolved.industry,
        title: `${display} Cybersecurity | Marma Security`,
        desc: typeof dynamicData.hero.description === "string" ? dynamicData.hero.description : `Protection tailored for ${display}.`,
        eyebrow: display,
        sectorName: display,
        h1: typeof dynamicData.hero.title === "string" ? dynamicData.hero.title : `Defend vital points in ${display}.`,
        lede: typeof dynamicData.hero.description === "string" ? dynamicData.hero.description : `Automated protection for ${display}.`,
        metrics: [],
        threats: (dynamicData.sections || []).map((s: any, idx: number) => ({
          idx: `0${idx + 1}`,
          title: typeof s.title === "string" ? s.title : `Risk Point 0${idx + 1}`,
          desc: typeof s.content === "string" ? s.content : "",
        })),
        controls: [],
        faqs: [],
      };
    } catch {
      notFound();
    }
  }

  return <SolutionDetailView data={pageData} />;
}
