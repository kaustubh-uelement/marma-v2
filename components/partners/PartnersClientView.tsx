// @ts-nocheck
"use client";

import React, { useState } from "react";
import PageHero from "@/components/common/PageHero";
import CtaSection from "@/components/common/CtaSection";
import ContactModal from "@/components/contact/ContactModal";
import { Partner, RegionKey } from "@/lib/partnerData";

interface PartnersClientViewProps {
  partnersData: Record<RegionKey, Partner[]>;
}

export default function PartnersClientView({ partnersData }: PartnersClientViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const economics = [
    { stat: "25%", title: "Off list on resale", desc: "Buy at a 25% discount, mark up as you see fit and layer your own managed-service pricing on top." },
    { stat: "10%", title: "Referral commission", desc: "For opportunities you would rather not carry on your own paper, the partner buys at list and you take commission." },
    { stat: "Tier III", title: "Direct technical support", desc: "Escalation straight to Marma engineering, plus sales and technical enablement for your team." },
    { stat: "Co-sell", title: "Joint pursuit", desc: "Marketing support and joint selling on qualified opportunities where it helps close." },
  ];

  const reasons = [
    { idx: "01", title: "Flexible partnering model", desc: "Healthy margins and pricing models that adapt to how you already sell." },
    { idx: "02", title: "Improves profitability", desc: "Around a quarter of the cost of comparable solutions, no truck rolls, roughly fifteen minutes to set up." },
    { idx: "03", title: "Opens new markets", desc: "Pricing that makes managed security viable for segments you previously had to turn down, including remote workers." },
    { idx: "04", title: "Reduces manpower requirements", desc: "Fewer engineers needed to support a larger client base, because the platform runs itself." },
    { idx: "05", title: "Faster time to value", desc: "Simple setup means clients are turned up and billing sooner." },
    { idx: "06", title: "Technology pedigree", desc: "A team with three decades building market-leading security products at companies including Palo Alto Networks and Juniper." },
  ];

  const whatYouGet = [
    { n: "01", text: "Marketing support and co-branded material" },
    { n: "02", text: "Sales enablement and technical training" },
    { n: "03", text: "Co-sell on selected opportunities" },
    { n: "04", text: "Tier III technical support with direct escalation" },
    { n: "05", text: "Multi-tenant console for managing client estates" },
  ];

  const regionKeys = Object.keys(partnersData);

  const getCleanDomain = (url: string) => {
    try {
      const u = new URL(url.startsWith("http") ? url : `https://${url}`);
      return u.hostname.replace(/^www\./, "");
    } catch {
      return url;
    }
  };

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Partners" }]}
        eyebrow="Partner programme"
        title="Built to be sold by someone else."
        lede="Marma's go-to-market runs through VARs, MSPs, MSSPs and system integrators. The pitch to a partner is not the feature list: it is that faster turn-up means more clients per engineer."
        primaryCta={{ text: "Apply for Partner Programme →", href: "#apply" }}
        secondaryCta={{ text: "See the platform", href: "/technology" }}
      >
        <div className="mt-4" id="apply">
          <button
            type="button"
            className="btn btn-red"
            onClick={() => setIsModalOpen(true)}
          >
            Apply as a Partner &rarr;
          </button>
        </div>
      </PageHero>

      {/* Economics */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">Economics</div>
            <h2>Why the numbers work for a service provider.</h2>
            <p className="lede">
              Margin matters, but headcount matters more. A stack that deploys in minutes and runs
              itself changes how many clients one engineer can carry.
            </p>
          </div>
          <div className="g4 mt">
            {economics.map((item, idx) => (
              <div key={idx} className="card glass glass-hi glass-hover rv">
                <div className="stat">{item.stat}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reasons */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">The proposition</div>
            <h2>Six reasons partners take Marma on.</h2>
          </div>
          <div className="g3 mt">
            {reasons.map((r) => (
              <div key={r.idx} className="card glass glass-hi glass-hover rv">
                <span className="idx">{r.idx}</span>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where Marma is already represented */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">Directory</div>
            <h2>Where Marma is already represented.</h2>
            <p className="lede">
              VARs, MSPs and system integrators delivering Marma across North America, India,
              the Caribbean and Southeast Asia.
            </p>
          </div>

          {regionKeys.map((region) => {
            const list = partnersData[region] || [];
            if (list.length === 0) return null;
            return (
              <div key={region} className="rv">
                <div className="region-l">{region}</div>
                <div className="plist">
                  {list.map((p) => (
                    <a
                      key={p.name}
                      href={p.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="plogo"
                    >
                      <div>{p.name}</div>
                      <span>{getCleanDomain(p.website)}</span>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* What you get */}
      <section className="sec">
        <div className="wrap">
          <div className="split">
            <div className="rv">
              <div className="eyebrow">Onboarding</div>
              <h2 style={{ margin: "20px 0 20px" }}>What you get on enrolment.</h2>
              <p className="lede">
                We do not ask partners to certify three engineers before they can register an
                opportunity. Enablement happens alongside live pursuit.
              </p>
              <div className="phero-cta" style={{ marginTop: "28px" }}>
                <button
                  type="button"
                  className="btn btn-red"
                  onClick={() => setIsModalOpen(true)}
                >
                  Join Partner Network
                </button>
              </div>
            </div>

            <div className="card glass glass-hi rv">
              <div className="eyebrow">Included with partnership</div>
              <ul className="ticks">
                {whatYouGet.map((item) => (
                  <li key={item.n}>
                    <span className="n">{item.n}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        eyebrow="Ready to partner?"
        title="Start offering simpler, more profitable security."
        primaryText="Apply to partner programme →"
        primaryHref="#apply"
      />

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
