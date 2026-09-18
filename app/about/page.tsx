import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/common/PageHero";
import MetricBand from "@/components/common/MetricBand";
import CtaSection from "@/components/common/CtaSection";

export const metadata: Metadata = {
  title: "About Us | Marma Security",
  description:
    "Security that works without an expert in the room. Built by cybersecurity veterans from Palo Alto Networks and Juniper.",
};

export default function AboutUsPage() {
  const principles = [
    {
      idx: "01",
      title: "Do not ask the user",
      desc: "Every pop-up that asks a user to make a security decision is a failure of product design. Marma acts autonomously on evidence, then tells you what it did.",
    },
    {
      idx: "02",
      title: "Keep traffic where it belongs",
      desc: "Local deep packet inspection at the endpoint and edge removes the need to funnel your private traffic to a third-party cloud tunnel.",
    },
    {
      idx: "03",
      title: "Make compliance a side-effect",
      desc: "Audits should verify good security posture that already exists, not trigger frantic manual evidence-gathering drills.",
    },
    {
      idx: "04",
      title: "One console means one console",
      desc: "Endpoints, email, cloud data, and gateways share a unified risk score, identity baseline, and policy model.",
    },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        eyebrow="Company"
        title="Security that works without an expert in the room."
        lede="Most organisations don't lose to exotic zero-days. They lose to the everyday mechanics of phishing, unpatched devices and misplaced files — because the enterprise security they bought was never fully deployed or watched."
        primaryCta={{ text: "Start 30-day trial →", href: "/contact-us" }}
        secondaryCta={{ text: "See the platform", href: "/technology" }}
      />

      {/* Principles */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">Our approach</div>
            <h2>Making enterprise-grade security ordinary.</h2>
            <p className="lede">
              Four fundamental architectural convictions that define how we build every piece of the Marma ecosystem.
            </p>
          </div>

          <div className="g4 mt">
            {principles.map((p) => (
              <div key={p.idx} className="card glass glass-hi glass-hover rv">
                <span className="idx">{p.idx}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <MetricBand />

      {/* Philosophy / The Name */}
      <section className="sec">
        <div className="wrap">
          <div className="split">
            <div className="card glass glass-hi glass-hover rv" style={{ padding: "36px 32px" }}>
              <div className="eyebrow">The philosophy</div>
              <h2 style={{ margin: "20px 0 20px" }}>
                Defending the <span className="text-[var(--red)]">Marma</span> points of your infrastructure.
              </h2>
              <p className="lede">
                In classical Ayurvedic medicine, <em>Marma</em> refers to the vital junctions of the human anatomy where life energy flows. Protecting these vital centers preserves the vitality of the entire system.
              </p>
              <p className="lede" style={{ marginTop: "16px" }}>
                Every digital infrastructure has its own vital points: the employee inbox, the workstation endpoint, the corporate cloud repository, and the network perimeter. Marma Security fortifies all of them with autonomous, coordinated intelligence.
              </p>
            </div>

            <div className="card glass glass-hi glass-hover rv">
              <div className="eyebrow">Pedigree</div>
              <h3 style={{ margin: "10px 0 14px" }}>Decades of Security Engineering</h3>
              <p className="text-[0.9rem] text-[var(--mute)] leading-relaxed mb-4">
                Our founders and core engineering leadership bring over 30 years of direct experience architecting and shipping foundational networking and security infrastructure at industry trailblazers including Palo Alto Networks, Juniper Networks, and Cisco.
              </p>
              <ul className="ticks">
                <li>
                  <span className="n">01</span>
                  <span>Headquartered in Sacramento, California</span>
                </li>
                <li>
                  <span className="n">02</span>
                  <span>Advanced R&D and manufacturing facility in Pune, India</span>
                </li>
                <li>
                  <span className="n">03</span>
                  <span>Hardware gateways proudly designed and manufactured in India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection primaryHref="/contact-us" secondaryHref="/contact-us" />
    </>
  );
}
