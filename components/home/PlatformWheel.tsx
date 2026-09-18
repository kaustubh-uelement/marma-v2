"use client";

import { useState } from "react";

interface WheelItem {
  l1: string;
  l2: string;
  kind: string;
  title: string;
  body: string;
  list: string[];
}

const CX = 310;
const CY = 310;
const IN_R0 = 86;
const IN_R1 = 160;
const OUT_R0 = 172;
const OUT_R1 = 258;

const CORE: WheelItem = {
  l1: "Marma",
  l2: "AI Cloud",
  kind: "Intelligence core",
  title: "Marma AI Security Cloud",
  body: "The shared brain for every Marma control. It correlates signals from endpoints, mailboxes, cloud drives and gateways into one verdict per user and per device, then pushes enforcement back out, without an analyst writing a rule.",
  list: [
    "One identity and risk model across all surfaces",
    "Continuous learning from global telemetry",
    "Hosted in Marma cloud or your own data centre",
  ],
};

const INNER: WheelItem[] = [
  {
    l1: "Zero-day",
    l2: "detection",
    kind: "AI service",
    title: "Zero-day threat detection",
    body: "Verdicts are reached from behaviour and structure rather than a known signature, so malware and phishing that has never been seen before is still stopped on first contact.",
    list: [
      "Behavioural classification at execution time",
      "No dependency on signature release cycles",
      "Applies to files, links and network flows",
    ],
  },
  {
    l1: "Predictive",
    l2: "risk score",
    kind: "AI service",
    title: "Predictive risk scoring",
    body: "Every user, device and site carries a live risk score built from its own history and from patterns across the estate. Controls tighten automatically as the score climbs.",
    list: [
      "Per-user and per-device scoring",
      "Drives adaptive access decisions",
      "Surfaces the riskiest 1% before an incident",
    ],
  },
  {
    l1: "Behaviour",
    l2: "anomaly",
    kind: "AI service",
    title: "AI/ML behaviour anomaly detection",
    body: "Marma learns what normal looks like for each user and each IoT device, then flags the deviation: the account that suddenly enumerates file shares, the camera that starts scanning a subnet.",
    list: [
      "Separate baselines for users and devices",
      "Catches insider and compromised-account activity",
      "Tuned to reduce noise, not maximise alerts",
    ],
  },
  {
    l1: "Attack",
    l2: "correlation",
    kind: "AI service",
    title: "Multi-stage attack correlation",
    body: "A phishing click, a credential replay and a lateral connection are one incident, not three alerts in three consoles. Marma stitches the sequence together and acts on the chain.",
    list: [
      "Cross-surface event stitching",
      "One incident timeline per campaign",
      "Response applied at every stage found",
    ],
  },
  {
    l1: "Adaptive",
    l2: "access",
    kind: "AI service",
    title: "Adaptive access policies",
    body: "Access is granted against current risk, not a rule written last year. A device whose score rises loses reach to sensitive destinations until it is clean again.",
    list: [
      "Risk-conditioned access to apps and data",
      "Automatic step-up and restriction",
      "Reverts on its own once risk falls",
    ],
  },
  {
    l1: "Automated",
    l2: "response",
    kind: "AI service",
    title: "Automated incident response",
    body: "Containment happens in the seconds after detection: the device is quarantined, the mail is isolated, the link is revoked. Your team reviews what was done rather than doing it.",
    list: [
      "Quarantine, isolate, revoke, block",
      "Runs without an analyst in the loop",
      "Every action logged and reversible",
    ],
  },
  {
    l1: "AI SOC",
    l2: "analyst",
    kind: "AI service",
    title: "AI SOC analyst",
    body: "The triage layer a small team never gets to staff. It writes the incident narrative, ranks what needs a human, and hands the rest off already resolved.",
    list: [
      "Plain-language incident summaries",
      "Prioritised queue instead of a raw feed",
      "Escalates to your SOC or MSSP on rules you set",
    ],
  },
  {
    l1: "Scam",
    l2: "signals",
    kind: "AI service",
    title: "Real-time scam detection",
    body: "Scam architectures change weekly. Marma trains on cybercrime reporting and live attack models to recognise the shape of a fraud: fake payment pages, delivery lures, support impersonation.",
    list: [
      "Fraudulent sites and payment pages",
      "Social engineering across mail and web",
      "Model refreshed against live campaign data",
    ],
  },
];

const OUTER: WheelItem[] = [
  {
    l1: "Endpoint",
    l2: "protection",
    kind: "Protected surface",
    title: "Endpoint threat protection",
    body: "A Windows agent doing local deep packet inspection on all inbound and outbound traffic, blocking malware, ransomware and fileless attacks without shipping your traffic to the cloud.",
    list: [
      "Deep packet inspection, no VPN tunnel",
      "DNS security, URL filtering, DLP",
      "Runs alongside existing firewall and AV",
    ],
  },
  {
    l1: "Email",
    l2: "security",
    kind: "Protected surface",
    title: "Email security",
    body: "Inbound mail scored by multiple LLMs to catch phishing, business email compromise and payload-free social engineering. Suspect messages land in a Scam folder rather than disappearing.",
    list: [
      "Multi-model detection engine",
      "Zero-day phishing and BEC",
      "SaaS deployment, no MX rebuild",
    ],
  },
  {
    l1: "Cloud data",
    l2: "protection",
    kind: "Protected surface",
    title: "Cloud data protection",
    body: "Continuous scanning of your cloud drives to show how sensitive documents are actually shared: externally, org-wide, or through public links nobody remembers creating.",
    list: [
      "Exposure ranked by sensitivity",
      "Revoke access from the console",
      "Evidence trail for governance",
    ],
  },
  {
    l1: "Network",
    l2: "gateways",
    kind: "Protected surface",
    title: "Network security gateways",
    body: "Where the edge needs hardware, SafeEnterprise appliances carry firewall, IPS, DNS security, content control, secure Wi-Fi and device quarantine, from a 400-user campus down to a single remote worker.",
    list: [
      "SE 100 / 200 / 400 · 1 to 10 Gbps",
      "Wi-Fi 6E and 7, PoE and SFP options",
      "Made in India, managed from the same console",
    ],
  },
  {
    l1: "Scam",
    l2: "protection",
    kind: "Protected surface",
    title: "Scam protection",
    body: "User-facing defence against fraudulent sites, malicious messages and impersonation, on desktop through the agent and on iOS and Android through the Marma app.",
    list: [
      "Fraudulent site and message blocking",
      "Mobile app for iOS and Android",
      "Protects the people policy can't reach",
    ],
  },
  {
    l1: "Compliance",
    l2: "360",
    kind: "Protected surface",
    title: "Compliance 360",
    body: "Regulatory readiness kept current: controls assessed continuously, gaps registered with owners, remediation tracked and evidence exported when the auditor arrives.",
    list: [
      "DPDP, ISO 27001, NIST, CIS",
      "HIPAA and PCI modules",
      "Live posture, not a quarterly snapshot",
    ],
  },
];

const polar = (r: number, d: number): [number, number] => {
  const a = ((d - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
};

function arcp(r0: number, r1: number, a0: number, a1: number): string {
  const [x0, y0] = polar(r1, a0);
  const [x1, y1] = polar(r1, a1);
  const [x2, y2] = polar(r0, a1);
  const [x3, y3] = polar(r0, a0);
  const b = a1 - a0 > 180 ? 1 : 0;
  return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${r1} ${r1} 0 ${b} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} L${x2.toFixed(2)} ${y2.toFixed(2)} A${r0} ${r0} 0 ${b} 0 ${x3.toFixed(2)} ${y3.toFixed(2)} Z`;
}

export default function PlatformWheel() {
  const [activeItem, setActiveItem] = useState<WheelItem>(CORE);
  const [activeKey, setActiveKey] = useState<string>("core");

  const renderOuter = () => {
    const step = 360 / OUTER.length;
    const pad = 1.1;
    return OUTER.map((d, i) => {
      const a0 = i * step + pad;
      const a1 = (i + 1) * step - pad;
      const m = (a0 + a1) / 2;
      const [lx, ly] = polar((OUT_R0 + OUT_R1) / 2, m);
      const key = `outer-${i}`;
      const isSelected = activeKey === key;

      return (
        <g key={key}>
          <path
            d={arcp(OUT_R0, OUT_R1, a0, a1)}
            className={`seg seg-outer ${isSelected ? "on" : ""}`}
            tabIndex={0}
            role="button"
            aria-label={d.title}
            onMouseEnter={() => {
              setActiveItem(d);
              setActiveKey(key);
            }}
            onClick={() => {
              setActiveItem(d);
              setActiveKey(key);
            }}
            onFocus={() => {
              setActiveItem(d);
              setActiveKey(key);
            }}
          />
          <text
            x={lx.toFixed(1)}
            y={(ly - 1).toFixed(1)}
            className="seg-label"
            textAnchor="middle"
          >
            <tspan x={lx.toFixed(1)} dy="0">
              {d.l1}
            </tspan>
            <tspan x={lx.toFixed(1)} dy="1.15em">
              {d.l2}
            </tspan>
          </text>
        </g>
      );
    });
  };

  const renderInner = () => {
    const step = 360 / INNER.length;
    const pad = 1.4;
    return INNER.map((d, i) => {
      const a0 = i * step + pad;
      const a1 = (i + 1) * step - pad;
      const m = (a0 + a1) / 2;
      const [lx, ly] = polar((IN_R0 + IN_R1) / 2, m);
      const key = `inner-${i}`;
      const isSelected = activeKey === key;

      return (
        <g key={key}>
          <path
            d={arcp(IN_R0, IN_R1, a0, a1)}
            className={`seg seg-inner ${isSelected ? "on" : ""}`}
            tabIndex={0}
            role="button"
            aria-label={d.title}
            onMouseEnter={() => {
              setActiveItem(d);
              setActiveKey(key);
            }}
            onClick={() => {
              setActiveItem(d);
              setActiveKey(key);
            }}
            onFocus={() => {
              setActiveItem(d);
              setActiveKey(key);
            }}
          />
          <text
            x={lx.toFixed(1)}
            y={(ly - 1).toFixed(1)}
            className="seg-label-sm"
            textAnchor="middle"
          >
            <tspan x={lx.toFixed(1)} dy="0">
              {d.l1}
            </tspan>
            <tspan x={lx.toFixed(1)} dy="1.15em">
              {d.l2}
            </tspan>
          </text>
        </g>
      );
    });
  };

  const renderDecor = () => {
    const dots = [];
    for (let i = 0; i < 24; i++) {
      const [x, y] = polar(276, i * 15);
      dots.push(
        <circle
          key={`dot-${i}`}
          cx={x.toFixed(1)}
          cy={y.toFixed(1)}
          r={i % 6 === 0 ? 2.6 : 1.5}
          className="vital-pt"
        />
      );
    }
    const spokes = [];
    for (let i = 0; i < 6; i++) {
      const [a, b] = polar(70, i * 60);
      const [c, d] = polar(86, i * 60);
      spokes.push(
        <line
          key={`spoke-${i}`}
          x1={a.toFixed(1)}
          y1={b.toFixed(1)}
          x2={c.toFixed(1)}
          y2={d.toFixed(1)}
          className="spoke"
        />
      );
    }
    return (
      <g id="w-decor">
        {dots}
        {spokes}
        <circle
          cx={CX}
          cy={CY}
          r={268}
          fill="none"
          stroke="rgba(23,10,12,.08)"
          strokeWidth="1"
        />
      </g>
    );
  };

  return (
    <>
      <div className="wheel-layout">
        <div className="wheel-stage rv">
          <svg
            id="wheel"
            viewBox="0 0 620 620"
            role="img"
            aria-label="Marma platform: AI security core, eight AI services, six protected surfaces"
          >
            {renderDecor()}
            <g id="w-outer">{renderOuter()}</g>
            <g id="w-inner">{renderInner()}</g>
            <g
              id="w-core"
              style={{ cursor: "pointer" }}
              tabIndex={0}
              role="button"
              aria-label={CORE.title}
              onMouseEnter={() => {
                setActiveItem(CORE);
                setActiveKey("core");
              }}
              onClick={() => {
                setActiveItem(CORE);
                setActiveKey("core");
              }}
              onFocus={() => {
                setActiveItem(CORE);
                setActiveKey("core");
              }}
            >
              <circle className="core-ring" cx="310" cy="310" r="78" />
              <circle className="core-fill" cx="310" cy="310" r="70" />
              <text className="core-t1" x="310" y="296">
                Marma
              </text>
              <text className="core-t2" x="310" y="315">
                AI Security
              </text>
              <text className="core-t2" x="310" y="332">
                Cloud
              </text>
            </g>
          </svg>
        </div>
        <aside className="wheel-detail glass glass-hi rv" aria-live="polite">
          <span className="kind" id="d-kind">
            {activeItem.kind}
          </span>
          <h3 id="d-title">{activeItem.title}</h3>
          <p id="d-body">{activeItem.body}</p>
          <ul id="d-list">
            {activeItem.list.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
      <p className="wheel-hint">Hover or tap a ring segment</p>
    </>
  );
}
