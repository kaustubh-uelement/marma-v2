import React from "react";
import CareerHero from "@/components/careers/CareerHero";
import WhyMarma from "@/components/careers/WhyMarma";
import JobBoard from "@/components/careers/JobBoard";
import { getJobs } from "@/lib/careers";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.marmasec.com";
const absoluteImageUrl = `${baseUrl}/images/partners/Job_hero.webp`;

export const metadata = {
  title: "Careers | Join Marma Security",
  description:
    "Join the mission to radically simplify cybersecurity. Explore open roles at Marma Security and build the future of digital defense.",
  openGraph: {
    title: "Careers | Join Marma Security",
    description:
      "Join the mission to radically simplify cybersecurity. Explore open roles at Marma Security and build the future of digital defense.",
    url: "/careers",
    siteName: "Marma Security",
    images: [
      {
        url: absoluteImageUrl,
        width: 1200,
        height: 630,
        alt: "Marma Security Careers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Join Marma Security",
    description:
      "Join the mission to radically simplify cybersecurity. Explore open roles at Marma Security and build the future of digital defense.",
    images: [absoluteImageUrl],
  },
};

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <CareerHero />

      {/* Why Join Marma Content */}
      <WhyMarma />

      {/* Job Board Section */}
      <JobBoard jobs={jobs} />
    </main>
  );
}
