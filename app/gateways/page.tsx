import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/common/PageHero";
import FaqAccordion from "@/components/common/FaqAccordion";
import CtaSection from "@/components/common/CtaSection";

export const metadata: Metadata = {
  title: "Security Gateways & Hardware | Marma Security",
  description:
    "SafeEnterprise 100, 200 and 400 plus SafeBiz and SafeHome. Firewall, IPS, DNS security and secure Wi-Fi, made in India.",
};

export default function GatewaysPage() {
  const seModels = [
    {
      model: "SafeEnterprise 400",
      form: "2U rack",
      throughput: "10 Gbps",
      wan: "1 × 10G, 2 × 2.5G",
      lan: "24 × 1G (Ethernet / PoE / SFP)",
      wifi: "Wi-Fi 6E / 7",
      users: "Up to 400",
    },
    {
      model: "SafeEnterprise 200",
      form: "1U rack",
      throughput: "2 Gbps",
      wan: "2 × 2.5G",
      lan: "10 × 1G (Ethernet / PoE / SFP)",
      wifi: "Wi-Fi 6E / 7",
      users: "Up to 200",
    },
    {
      model: "SafeEnterprise 100",
      form: "Desktop / wall",
      throughput: "1 Gbps",
      wan: "1 × 2.5G",
      lan: "4 × 1G Ethernet",
      wifi: "Wi-Fi 5 / 6E",
      users: "Up to 64",
    },
  ];

  const seCards = [
    {
      idx: "SE 400",
      title: "Regional office or campus",
      desc: "Protects every connected device across a site, with PoE and SFP options for mixed cabling and enough headroom for a 400-person floor.",
    },
    {
      idx: "SE 200",
      title: "Branch office",
      desc: "Deep packet inspection, AI threat detection and secure SD-WAN in a 1U unit sized for branches and mid-sized organisations.",
    },
    {
      idx: "SE 100",
      title: "Remote worker",
      desc: "The same controls in a desk-side unit, so a home office runs the corporate policy without a tunnel back to head office.",
    },
  ];

  const comparisonTable = [
    { cap: "Security gateway", ent: "SE 100 / 200 / 400", smb: "SafeBiz firewall", home: "SafeHome firewall" },
    { cap: "Peak throughput", ent: "10 Gbps", smb: "1 Gbps", home: "1 Gbps" },
    { cap: "Wi-Fi", ent: "6E / 7", smb: "5 / 6E", home: "5 / 6E" },
    { cap: "Max users", ent: "400 per appliance", smb: "128", home: "64" },
    { cap: "Management platform", ent: "Cloud + private DC", smb: "Cloud only", home: "App only" },
    { cap: "Windows endpoint agent", ent: "Yes", smb: "Yes", home: "-", entYes: true, smbYes: true },
    { cap: "Mobile app", ent: "-", smb: "iOS & Android", home: "iOS & Android", smbYes: true, homeYes: true },
    { cap: "Email protection", ent: "Cloud service", smb: "-", home: "-", entYes: true },
    { cap: "SIEM / SOC integration", ent: "Yes", smb: "-", home: "-", entYes: true },
    { cap: "Made in India", ent: "All gateways", smb: "Yes", home: "Yes", entYes: true, smbYes: true, homeYes: true },
  ];

  const faqs = [
    {
      q: "How long does a gateway take to install?",
      a: "Under five minutes for a standard deployment. Enrolment is zero-touch: the unit registers against your tenant and pulls its policy on first boot.",
    },
    {
      q: "Can gateways be managed from a private data centre?",
      a: "Yes. The enterprise management platform runs in Marma's cloud or in yours, and gateways report to whichever you deploy.",
    },
    {
      q: "Does 'Made in India' apply to the whole range?",
      a: "Every Marma gateway is manufactured in India, which is a procurement requirement for a number of public-sector and defence-adjacent buyers.",
    },
    {
      q: "What happens to the gateway if the cloud is unreachable?",
      a: "Enforcement is local. A gateway that loses management connectivity continues to apply its last known policy and syncs when the link returns.",
    },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Products & Gateways" }]}
        eyebrow="Hardware"
        title="Where the edge still needs a box."
        lede="Three SafeEnterprise appliances plus SafeBiz and SafeHome, all managed from the same console as the software. Every gateway is manufactured in India."
        primaryCta={{ text: "Start 30-day trial →", href: "/contact-us" }}
        secondaryCta={{ text: "Visit Store", href: "/store" }}
      />

      {/* SafeEnterprise Line */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">SafeEnterprise</div>
            <h2>Campus, branch and remote worker.</h2>
            <p className="lede">
              Firewall, intrusion prevention, DNS security, content control, device quarantine and
              secure Wi-Fi in each unit. Sizing is by concurrent users, not by feature tier:
              the smallest appliance runs the same controls as the largest.
            </p>
          </div>

          <div className="tscroll mt">
            <table className="spec">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Form factor</th>
                  <th>Throughput</th>
                  <th>WAN</th>
                  <th>LAN</th>
                  <th>Wi-Fi</th>
                  <th>Users</th>
                </tr>
              </thead>
              <tbody>
                {seModels.map((m, idx) => (
                  <tr key={idx}>
                    <td>{m.model}</td>
                    <td>{m.form}</td>
                    <td>{m.throughput}</td>
                    <td>{m.wan}</td>
                    <td>{m.lan}</td>
                    <td>{m.wifi}</td>
                    <td>{m.users}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="g3 mt">
            {seCards.map((card, idx) => (
              <div key={idx} className="card glass glass-hi glass-hover rv">
                <span className="idx">{card.idx}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Range Comparison */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">Full range</div>
            <h2>How the three lines compare.</h2>
            <p className="lede">
              SafeBiz and SafeHome carry the consumer and small-business path; SafeEnterprise
              carries everything that needs a console, endpoints and email behind it.
            </p>
          </div>

          <div className="tscroll mt">
            <table className="spec">
              <thead>
                <tr>
                  <th>Capability</th>
                  <th>Enterprise</th>
                  <th>SMB</th>
                  <th>Home</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.cap}</td>
                    <td className={row.entYes ? "yes" : ""}>{row.ent}</td>
                    <td className={row.smbYes ? "yes" : ""}>{row.smb}</td>
                    <td className={row.homeYes ? "yes" : ""}>{row.home}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">Questions</div>
            <h2>Deployment and procurement.</h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        primaryHref="/contact-us"
        secondaryHref="/store"
        secondaryText="Explore Hardware in Store"
      />
    </>
  );
}
