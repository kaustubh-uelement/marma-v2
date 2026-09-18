import Link from "next/link";
import PageHero from "@/components/common/PageHero";
import MetricBand from "@/components/common/MetricBand";
import FaqAccordion from "@/components/common/FaqAccordion";
import CtaSection from "@/components/common/CtaSection";
import { SolutionPageData } from "@/lib/solutionsData";

export interface SolutionDetailViewProps {
  data: SolutionPageData;
}

export default function SolutionDetailView({ data }: SolutionDetailViewProps) {
  const otherSectorCards = [
    { slug: "healthcare", idx: "HC", title: "Healthcare", desc: "Patient records, connected devices and HIPAA evidence in one control set." },
    { slug: "finance", idx: "FS", title: "Finance", desc: "Payment fraud and vendor impersonation caught before funds move." },
    { slug: "legal", idx: "LG", title: "Legal", desc: "Matter files monitored for external sharing and link exposure." },
    { slug: "manufacturing", idx: "MF", title: "Manufacturing", desc: "Plant networks and OT segments protected without touching uptime." },
    { slug: "education", idx: "ED", title: "Education", desc: "Distributed campuses, unmanaged devices, research data kept separate." },
    { slug: "smb", idx: "SM", title: "Small business", desc: "The full stack for organisations with no dedicated IT function." },
    { slug: "residential", idx: "RC", title: "Residential & commercial", desc: "Building-wide protection for CCTV, access control and IoT." },
    { slug: "enterprise", idx: "EN", title: "Enterprise", desc: "Multi-site estates, private-DC hosting and SIEM integration." },
  ].filter((s) => s.slug !== data.slug);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: data.sectorName },
        ]}
        eyebrow={data.eyebrow}
        title={data.h1}
        lede={data.lede}
        primaryCta={{ text: "Start 30-day trial →", href: "/contact" }}
        secondaryCta={{ text: "Talk to an engineer", href: "/contact" }}
      />

      {data.metrics && data.metrics.length > 0 && (
        <MetricBand metrics={data.metrics} />
      )}

      {/* Threats Section */}
      {data.threats && data.threats.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <div className="sec-hd rv">
              <div className="eyebrow">Threats</div>
              <h2>What actually goes wrong here.</h2>
            </div>
            <div className="g3 mt">
              {data.threats.map((card, idx) => (
                <div key={idx} className="card glass glass-hi glass-hover rv">
                  <span className="idx">{card.idx}</span>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Controls Section */}
      {data.controls && data.controls.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <div className="sec-hd rv">
              <div className="eyebrow">Controls</div>
              <h2>What gets switched on.</h2>
            </div>
            <div className="g3 mt">
              {data.controls.map((card, idx) => (
                <div key={idx} className="card glass glass-hi glass-hover rv">
                  <span className="idx">{card.idx}</span>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <div className="sec-hd rv">
              <div className="eyebrow">Questions</div>
              <h2>Asked in most evaluations here.</h2>
            </div>
            <FaqAccordion
              items={data.faqs.map((f) => ({
                q: f.q,
                a: f.a,
              }))}
            />
          </div>
        </section>
      )}

      {/* Other Sectors Section */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">Other sectors</div>
            <h2>Other sectors.</h2>
          </div>
          <div className="g4 mt">
            {otherSectorCards.slice(0, 4).map((sector) => (
              <Link
                key={sector.slug}
                className="card glass glass-hover rv"
                href={`/solutions/${sector.slug === "smb" ? "small-and-medium-business" : sector.slug}`}
              >
                <span className="idx">{sector.idx}</span>
                <h4>{sector.title}</h4>
                <p>{sector.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection primaryHref="/contact-us" secondaryHref="/contact-us" />
    </>
  );
}
