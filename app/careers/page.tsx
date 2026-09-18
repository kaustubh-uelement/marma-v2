import React from "react";
import PageHero from "@/components/common/PageHero";
import CtaSection from "@/components/common/CtaSection";
import JobBoard from "@/components/careers/JobBoard";
import { getJobs, buildApplicationUrl } from "@/lib/careers";

export const metadata = {
  title: "Careers | Marma Security",
  description:
    "Help build the most radically simplified security stack in the world. Explore open engineering, product, and sales roles.",
};

export default async function CareersPage() {
  const jobs = await getJobs();
  const jobsWithSubmitUrl = jobs.map((job) => ({
    ...job,
    submitUrl: buildApplicationUrl(job.id),
  }));

  const expectations = [
    {
      idx: "01",
      title: "High autonomy, clear mandate",
      desc: "We hire people who know their craft and give them the room to do it. You define the solution, own the delivery, and stand behind the result.",
    },
    {
      idx: "02",
      title: "Solving hard problems simply",
      desc: "Anyone can make security complicated; it takes real engineering discipline to make deep network inspection install in under five minutes.",
    },
    {
      idx: "03",
      title: "Competitive compensation & equity",
      desc: "Top-of-market compensation packages, meaningful equity grants, comprehensive health coverage, and flexible remote-first working arrangements.",
    },
    {
      idx: "04",
      title: "Global team, focused delivery",
      desc: "Work alongside veterans from Palo Alto Networks, Juniper, and top research labs across our offices in California, Pune, and globally.",
    },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        eyebrow="Careers"
        title="Help build the most radically simplified security stack in the world."
        lede="Enterprise security does not have to feel like filing tax returns. We build for the organisations that never had a security engineer and never will."
        primaryCta={{ text: "View open roles ↓", href: "#openings" }}
        secondaryCta={{ text: "What to expect", href: "#culture" }}
      />

      {/* Openings */}
      <section className="sec" id="openings">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">Open positions</div>
            <h2>Where we need people now.</h2>
            <p className="lede">
              Join a high-cadence engineering and product team solving fundamental network defense problems.
            </p>
          </div>

          <div className="mt">
            <JobBoard jobs={jobsWithSubmitUrl} />
          </div>
        </div>
      </section>

      {/* Working here / Culture */}
      <section className="sec" id="culture">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">Working here</div>
            <h2>What to expect.</h2>
            <p className="lede">
              The values that dictate how we build products, treat teammates, and make decisions every day.
            </p>
          </div>

          <div className="g4 mt">
            {expectations.map((exp) => (
              <div key={exp.idx} className="card glass glass-hi glass-hover rv">
                <span className="idx">{exp.idx}</span>
                <h3>{exp.title}</h3>
                <p>{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        eyebrow="Don't see your role?"
        title="We're always looking for exceptional engineers."
        lede="If you have deep experience in Windows NT internals, network packet filtering, or AI threat models, let's talk."
        primaryText="Get in touch →"
        primaryHref="/contact-us"
      />
    </>
  );
}
