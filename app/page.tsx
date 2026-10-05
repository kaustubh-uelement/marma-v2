import Link from "next/link";
import SaaSHero from "@/components/home/SaaSHero";
import TrustedByStrip from "@/components/home/TrustedByStrip";
import PlatformWheel from "@/components/home/PlatformWheel";
import ModuleTabs from "@/components/home/ModuleTabs";
import MetricBand from "@/components/common/MetricBand";
import CtaSection from "@/components/common/CtaSection";

export const metadata = {
  title: "Marma Security | Defend the vital points",
  description:
    "One AI security platform for endpoints, email, cloud data and the network edge. Deploys in under five minutes.",
};

export default function HomePage() {
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
      {/* Hero Section */}
      <SaaSHero />

      {/* Trusted By Strip */}
      <TrustedByStrip />

      {/* The Platform */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">The platform</div>
            <h2>One intelligence core. Six protected surfaces.</h2>
            <p className="lede">
              Marma runs a single AI security cloud underneath every control. Detection learned on
              email is applied at the endpoint; a risk score raised by a gateway changes what a user
              can reach in the cloud. Select any ring to see what sits behind it.
            </p>
          </div>
          <PlatformWheel />
        </div>
      </section>

      {/* Software */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">Software</div>
            <h2>The products your team actually opens.</h2>
            <p className="lede">
              Marma is a software platform first. Hardware gateways are available where the
              network edge needs them; everything below runs without any appliance at all.
            </p>
          </div>
          <ModuleTabs />
        </div>
      </section>

      {/* Why Marma */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">Why Marma</div>
            <h2>Enterprise-grade, minus the enterprise overhead.</h2>
            <p className="lede">
              Most organisations don&apos;t lose to exotic attacks. They lose because the security they
              bought was never fully deployed, tuned or watched. Marma is built for the team that
              doesn&apos;t have a spare analyst.
            </p>
          </div>

          <div className="g4 mt">
            <div className="card glass glass-hi glass-hover rv">
              <div className="stat">5 min</div>
              <h3>Deploys before the meeting ends</h3>
              <p>
                Software and gateways come up with zero-touch enrolment. No professional services
                engagement, no six-week rollout plan.
              </p>
            </div>
            <div className="card glass glass-hi glass-hover rv">
              <div className="stat">0 bytes</div>
              <h3>Your traffic stays yours</h3>
              <p>
                The endpoint agent inspects locally and never transmits customer data to the cloud.
                No VPN backhaul, so no latency tax either.
              </p>
            </div>
            <div className="card glass glass-hi glass-hover rv">
              <div className="stat">1 console</div>
              <h3>Four surfaces, one policy</h3>
              <p>
                Endpoint, email, cloud data and network edge share an identity model. Write the
                rule once; it holds everywhere.
              </p>
            </div>
            <div className="card glass glass-hi glass-hover rv">
              <div className="stat">25%</div>
              <h3>Of comparable spend</h3>
              <p>
                Partners price Marma at roughly a quarter of like-for-like stacks, and support a
                larger client base with fewer engineers.
              </p>
            </div>
          </div>

          <div className="shift rv">
            <div className="shift-row">
              <div className="shift-cell was">
                <span className="lbl">Usually</span>
                <p>
                  Four vendors, four consoles, four support contracts, and the gaps between
                  them are where incidents live.
                </p>
              </div>
              <div className="shift-cell now glass glass-hi">
                <span className="lbl">With Marma</span>
                <p>
                  One platform where a signal at the mailbox changes what the endpoint and the
                  gateway will allow.
                </p>
              </div>
            </div>
            <div className="shift-row">
              <div className="shift-cell was">
                <span className="lbl">Usually</span>
                <p>
                  Tuning and policy work assumes a security engineer on staff who has time to do it.
                </p>
              </div>
              <div className="shift-cell now glass glass-hi">
                <span className="lbl">With Marma</span>
                <p>
                  The platform runs autonomously and updates itself. Configuration is a decision,
                  not a project.
                </p>
              </div>
            </div>
            <div className="shift-row">
              <div className="shift-cell was">
                <span className="lbl">Usually</span>
                <p>
                  Compliance evidence gets assembled by hand in the weeks before an audit.
                </p>
              </div>
              <div className="shift-cell now glass glass-hi">
                <span className="lbl">With Marma</span>
                <p>
                  Control status against DPDP, ISO 27001, NIST and CIS is a live number with an owner
                  attached.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <MetricBand />

      {/* Where it fits */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">Where it fits</div>
            <h2>Tuned to what you&apos;re actually protecting.</h2>
            <p className="lede">
              The platform is the same everywhere. What changes is the policy baseline, the
              compliance modules and the data classes Marma treats as sensitive.
            </p>
          </div>
          <div className="g4 mt">
            {solutions.map((sol) => (
              <Link
                key={sol.href}
                className="card glass glass-hover rv"
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

      {/* CTA */}
      <CtaSection
        primaryHref="/contact-us"
        secondaryHref="/contact-us"
      />
    </>
  );
}
