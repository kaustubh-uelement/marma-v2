import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/common/PageHero";
import CtaSection from "@/components/common/CtaSection";

export const metadata: Metadata = {
  title: "Industry Solutions | Marma Security",
  description:
    "Cybersecurity solutions tuned for healthcare, finance, legal, manufacturing, education, SMBs, and enterprise estates.",
};

export default function SolutionsPage() {
  const solutions = [
    {
      idx: "HC",
      title: "Healthcare",
      desc: "Patient records, connected devices and HIPAA evidence in one control set.",
      href: "/solutions/healthcare",
    },
    {
      idx: "FS",
      title: "Finance",
      desc: "Payment fraud and vendor impersonation caught before funds move.",
      href: "/solutions/finance",
    },
    {
      idx: "LG",
      title: "Legal",
      desc: "Matter files monitored for external sharing and link exposure.",
      href: "/solutions/legal",
    },
    {
      idx: "MF",
      title: "Manufacturing",
      desc: "Plant networks and OT segments protected without touching uptime.",
      href: "/solutions/manufacturing",
    },
    {
      idx: "ED",
      title: "Education",
      desc: "Distributed campuses, unmanaged devices, research data kept separate.",
      href: "/solutions/education",
    },
    {
      idx: "SM",
      title: "Small business",
      desc: "The full stack for organisations with no dedicated IT function.",
      href: "/solutions/small-and-medium-business",
    },
    {
      idx: "RC",
      title: "Residential & commercial",
      desc: "Building-wide protection for CCTV, access control and IoT.",
      href: "/solutions/residential",
    },
    {
      idx: "EN",
      title: "Enterprise",
      desc: "Multi-site estates, private-DC hosting and SIEM integration.",
      href: "/solutions/enterprise",
    },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
        eyebrow="Solutions"
        title="Same platform. Different threat model."
        lede="The underlying AI core and enforcement modules are the same across every deployment. What changes is what Marma watches for, what it treats as sensitive, and which compliance frameworks it maps to."
        primaryCta={{ text: "Start 30-day trial →", href: "/contact-us" }}
        secondaryCta={{ text: "See the platform", href: "/technology" }}
      />

      <section className="sec">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">Industry Sectors</div>
            <h2>Tuned to what you're actually protecting.</h2>
          </div>
          <div className="g4 mt">
            {solutions.map((sol) => (
              <Link
                key={sol.href}
                className="card glass glass-hi glass-hover rv"
                href={sol.href}
              >
                <span className="idx">{sol.idx}</span>
                <h4>{sol.title}</h4>
                <p>{sol.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection primaryHref="/contact-us" secondaryHref="/contact-us" />
    </>
  );
}
