import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/common/PageHero";
import PlatformWheel from "@/components/home/PlatformWheel";
import FaqAccordion from "@/components/common/FaqAccordion";
import CtaSection from "@/components/common/CtaSection";

export const metadata: Metadata = {
  title: "Technology & Platform | Marma Security",
  description:
    "Enterprise-grade controls orchestrated by one AI layer. Local deep packet inspection, zero tunnels, and unified risk scores.",
};

export default function TechnologyPage() {
  const controls = [
    {
      idx: "01",
      title: "PhishBlock",
      desc: "Phishing accounts for a large share of successful intrusions because it targets people, not software. PhishBlock watches network traffic for the signature of a credential-harvesting flow and cuts it before the page loads.",
    },
    {
      idx: "02",
      title: "NetImmunity",
      desc: "Denial-of-service floods, brute-force attempts and exploitation of exposed device vulnerabilities all look like traffic. NetImmunity recognises the pattern and drops it at the edge.",
    },
    {
      idx: "03",
      title: "MalwareGuard",
      desc: "Inspects traffic moving into and across the network for malicious payloads, blocking them before they reach a device rather than after execution.",
    },
    {
      idx: "04",
      title: "NetStealth",
      desc: "Automated bots scan constantly for reachable services and known weaknesses. NetStealth keeps the network's attack surface unadvertised so scans return nothing worth pursuing.",
    },
    {
      idx: "05",
      title: "RansomGuard",
      desc: "Ransomware announces itself in behaviour before it announces itself in a ransom note. RansomGuard watches for the encryption pattern and halts it mid-run.",
    },
    {
      idx: "06",
      title: "SafeID",
      desc: "Monitors traffic for identity-theft attempts — credential replay, personal-data exfiltration and the fraud flows that follow a successful theft.",
    },
    {
      idx: "07",
      title: "SafeDevices",
      desc: "Antivirus and VPNs cannot protect a smart doorbell, a camera or a TV. SafeDevices watches traffic to and from unmanaged hardware and stops device-level infiltration.",
    },
    {
      idx: "08",
      title: "ScamGuard",
      desc: "Scam architectures change weekly. ScamGuard trains on published cybercrime reporting and live attack models so detection keeps pace with what fraudsters are running now.",
    },
  ];

  const faqs = [
    {
      q: "Does Marma send our traffic to your cloud?",
      a: "No. The endpoint agent performs deep packet inspection locally and does not transmit customer traffic to the cloud. Verdicts, telemetry and policy sync do travel; the content of your sessions does not.",
    },
    {
      q: "Do we have to remove our existing firewall or antivirus?",
      a: "No. The agent is designed to run alongside an existing firewall and AV. Most deployments run Marma in parallel for the trial period before deciding what to retire.",
    },
    {
      q: "Can the management platform be self-hosted?",
      a: "Yes. The enterprise management platform runs either in Marma's cloud or in your own data centre, with the same interface and policy model in both.",
    },
    {
      q: "How do updates reach the platform?",
      a: "Signature and model updates apply automatically. There is no maintenance window to schedule and no manual patch cycle for the detection layer.",
    },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Technology" }]}
        eyebrow="Technology"
        title="Enterprise-grade controls, orchestrated by one AI layer."
        lede="Firewall, intrusion prevention, DNS security, content filtering and endpoint inspection are the foundation. What makes them work without a security team is the automation layer above them: continuous machine learning, behavioural analysis and global cloud intelligence deciding what to do with each signal."
        primaryCta={{ text: "Start 30-day trial →", href: "/contact-us" }}
        secondaryCta={{ text: "See the platform", href: "#wheel-section" }}
      />

      {/* Wheel */}
      <section className="sec" id="wheel-section">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">The wheel</div>
            <h2>One intelligence core. Six protected surfaces.</h2>
            <p className="lede">
              Every control reports into the same cloud, and every enforcement point acts on the same verdict. Select a segment to see what sits behind it.
            </p>
          </div>
          <PlatformWheel />
        </div>
      </section>

      {/* Defence set */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">The defence set</div>
            <h2>Eight controls, named for what they stop.</h2>
            <p className="lede">
              These run underneath the platform on gateways and endpoints alike. You never configure them individually — they are the enforcement vocabulary the AI layer draws on.
            </p>
          </div>
          <div className="g4 mt">
            {controls.map((c) => (
              <div key={c.idx} className="card glass glass-hi glass-hover rv">
                <span className="idx">{c.idx}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="sec">
        <div className="wrap">
          <div className="split">
            <div className="card glass glass-hi glass-hover rv">
              <div className="eyebrow">Architecture</div>
              <h2 style={{ margin: "20px 0 20px" }}>
                A SASE platform that doesn&apos;t route your traffic through someone else.
              </h2>
              <p className="lede">
                Most secure-access architectures work by sending your traffic to the vendor. Marma inverts that: inspection happens locally at the endpoint or the gateway, and only verdicts, telemetry and policy travel over the wire. You get cloud-scale intelligence without cloud-scale data exposure — or the latency that comes with a tunnel.
              </p>
              <div className="chips">
                <span className="chip">Zero-day phishing</span>
                <span className="chip">Dark web monitoring</span>
                <span className="chip">Smart device protection</span>
                <span className="chip">AI data loss prevention</span>
                <span className="chip">IoT anomaly detection</span>
                <span className="chip">User behaviour analytics</span>
                <span className="chip">Predictive risk scoring</span>
                <span className="chip">Zero-day ransomware</span>
              </div>
            </div>

            <div className="card glass glass-hi glass-hover rv">
              <div className="eyebrow">How a verdict travels</div>
              <ul className="ticks">
                <li>
                  <span className="n">01</span>
                  <span>A control observes something — a connection, a message, a share, a process.</span>
                </li>
                <li>
                  <span className="n">02</span>
                  <span>Local inspection classifies it without the content leaving the device or site.</span>
                </li>
                <li>
                  <span className="n">03</span>
                  <span>The signal is correlated against everything else known about that user and device.</span>
                </li>
                <li>
                  <span className="n">04</span>
                  <span>A verdict is issued and the risk score for the identity is updated.</span>
                </li>
                <li>
                  <span className="n">05</span>
                  <span>Every enforcement point — agent, gateway, mail, cloud — acts on the new state.</span>
                </li>
                <li>
                  <span className="n">06</span>
                  <span>The action is logged, reversible, and available to your SIEM.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">Questions</div>
            <h2>What people ask about the architecture.</h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <CtaSection primaryHref="/contact-us" secondaryHref="/contact-us" />
    </>
  );
}
