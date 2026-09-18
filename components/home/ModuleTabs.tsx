"use client";

import { useState } from "react";

export default function ModuleTabs() {
  const [activeTab, setActiveTab] = useState<string>("m1");

  const tabs = [
    { id: "m1", label: "Endpoint agent" },
    { id: "m2", label: "Email security" },
    { id: "m3", label: "Cloud data" },
    { id: "m4", label: "Compliance 360" },
    { id: "m5", label: "Management console" },
    { id: "m6", label: "SIEM & SOC" },
  ];

  return (
    <>
      <div className="mod-tabs glass glass-hi rv" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`mod-tab ${activeTab === tab.id ? "on" : ""}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* m1: Endpoint agent */}
      <div
        className={`mod-panel ${activeTab === "m1" ? "on" : ""}`}
        id="m1"
        role="tabpanel"
      >
        <div>
          <h3>Inspection at the endpoint, without sending your traffic anywhere.</h3>
          <p className="lede">
            The Windows agent performs deep packet inspection on inbound and outbound traffic
            locally. There is no VPN tunnel to backhaul through and no customer traffic shipped to
            the cloud; only verdicts and telemetry move.
          </p>
          <ul className="ticks">
            <li>
              <span className="n">01</span>
              <span>Deep packet inspection on every connection, in real time</span>
            </li>
            <li>
              <span className="n">02</span>
              <span>Phishing, ransomware, malware and fileless behaviour</span>
            </li>
            <li>
              <span className="n">03</span>
              <span>DNS security and URL filtering with per-group policy</span>
            </li>
            <li>
              <span className="n">04</span>
              <span>Data loss prevention on outbound uploads</span>
            </li>
            <li>
              <span className="n">05</span>
              <span>Coexists with existing firewall and anti-virus</span>
            </li>
            <li>
              <span className="n">06</span>
              <span>Signature and model updates applied automatically</span>
            </li>
          </ul>
        </div>
        <div className="mock glass glass-hover">
          <div className="mock-bar">
            <i />
            <i />
            <i />
            <span>app.marmasec.com / endpoints</span>
          </div>
          <div className="mock-body">
            <div className="mock-kpis">
              <div className="mock-kpi">
                <b className="cool">1,284</b>
                <span>Agents</span>
              </div>
              <div className="mock-kpi">
                <b className="cool">99.4%</b>
                <span>Healthy</span>
              </div>
              <div className="mock-kpi">
                <b className="hot">37</b>
                <span>Blocks today</span>
              </div>
            </div>
            <div className="bars" aria-hidden="true">
              <i style={{ height: "34%" }} />
              <i style={{ height: "52%" }} />
              <i style={{ height: "28%" }} />
              <i style={{ height: "71%" }} />
              <i style={{ height: "45%" }} />
              <i style={{ height: "88%" }} />
              <i style={{ height: "39%" }} />
              <i style={{ height: "61%" }} />
              <i style={{ height: "30%" }} />
              <i style={{ height: "76%" }} />
              <i style={{ height: "48%" }} />
              <i style={{ height: "57%" }} />
            </div>
            <div className="mock-list">
              <div className="mock-item">
                <b>FIN-LT-0442</b>
                <span>Ransomware behaviour &middot; stopped</span>
              </div>
              <div className="mock-item">
                <b>OPS-DT-1180</b>
                <span>Phishing domain &middot; blocked</span>
              </div>
              <div className="mock-item">
                <b>HR-LT-0071</b>
                <span>Upload to personal drive &middot; held</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* m2: Email security */}
      <div
        className={`mod-panel ${activeTab === "m2" ? "on" : ""}`}
        id="m2"
        role="tabpanel"
      >
        <div>
          <h3>Read the intent of an email, not just its reputation.</h3>
          <p className="lede">
            Every inbound message is scored by several large language models in parallel. That
            catches the invoice redirect and the CEO request that carry no link, no attachment
            and no reputation history: the attacks a gateway waves through.
          </p>
          <ul className="ticks">
            <li>
              <span className="n">01</span>
              <span>Zero-day phishing and business email compromise</span>
            </li>
            <li>
              <span className="n">02</span>
              <span>Multi-model detection engine, verdicts compared</span>
            </li>
            <li>
              <span className="n">03</span>
              <span>Suspect mail isolated to a Scam folder, not deleted</span>
            </li>
            <li>
              <span className="n">04</span>
              <span>Malicious attachments and payload-free social engineering</span>
            </li>
            <li>
              <span className="n">05</span>
              <span>SaaS deployment: no MX cutover marathon</span>
            </li>
            <li>
              <span className="n">06</span>
              <span>Detection improves continuously from global signal</span>
            </li>
          </ul>
        </div>
        <div className="mock glass glass-hover">
          <div className="mock-bar">
            <i />
            <i />
            <i />
            <span>app.marmasec.com / email</span>
          </div>
          <div className="mock-body">
            <div className="mock-kpis">
              <div className="mock-kpi">
                <b className="cool">48.1k</b>
                <span>Scanned</span>
              </div>
              <div className="mock-kpi">
                <b className="hot">312</b>
                <span>Quarantined</span>
              </div>
              <div className="mock-kpi">
                <b className="hot">19</b>
                <span>BEC attempts</span>
              </div>
            </div>
            <div className="mock-list">
              <div className="mock-item">
                <b>&ldquo;Updated bank details&rdquo;</b>
                <span>Vendor impersonation &middot; 0.97</span>
              </div>
              <div className="mock-item">
                <b>&ldquo;Payroll correction form&rdquo;</b>
                <span>Credential phish &middot; 0.94</span>
              </div>
              <div className="mock-item">
                <b>&ldquo;Quick task, are you free?&rdquo;</b>
                <span>CEO fraud &middot; 0.91</span>
              </div>
              <div className="mock-item">
                <b>&ldquo;Invoice 88214 overdue&rdquo;</b>
                <span>Attachment &middot; 0.88</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* m3: Cloud data */}
      <div
        className={`mod-panel ${activeTab === "m3" ? "on" : ""}`}
        id="m3"
        role="tabpanel"
      >
        <div>
          <h3>Find the documents that are already public.</h3>
          <p className="lede">
            Cloud data protection scans your organisation&apos;s drives continuously and shows how each
            sensitive file is actually shared: externally, org-wide, or by an open link
            someone created two years ago and forgot.
          </p>
          <ul className="ticks">
            <li>
              <span className="n">01</span>
              <span>Full visibility of sharing across connected drives</span>
            </li>
            <li>
              <span className="n">02</span>
              <span>Public-link and external-share exposure, ranked by risk</span>
            </li>
            <li>
              <span className="n">03</span>
              <span>Classification of sensitive and regulated content</span>
            </li>
            <li>
              <span className="n">04</span>
              <span>Revoke or restrict access from the console</span>
            </li>
            <li>
              <span className="n">05</span>
              <span>Evidence trail for governance and audit</span>
            </li>
            <li>
              <span className="n">06</span>
              <span>Connects in minutes, no agent on the file</span>
            </li>
          </ul>
        </div>
        <div className="mock glass glass-hover">
          <div className="mock-bar">
            <i />
            <i />
            <i />
            <span>app.marmasec.com / cloud-data</span>
          </div>
          <div className="mock-body">
            <div className="mock-kpis">
              <div className="mock-kpi">
                <b className="cool">184k</b>
                <span>Files</span>
              </div>
              <div className="mock-kpi">
                <b className="hot">96</b>
                <span>Public links</span>
              </div>
              <div className="mock-kpi">
                <b className="hot">1,203</b>
                <span>External shares</span>
              </div>
            </div>
            <div className="mock-list">
              <div className="mock-item">
                <b>/Finance/FY26-Model.xlsx</b>
                <span>Public link &middot; 41 views</span>
              </div>
              <div className="mock-item">
                <b>/HR/Offer-Letters</b>
                <span>Shared org-wide</span>
              </div>
              <div className="mock-item">
                <b>/Legal/MSA-Drafts</b>
                <span>3 external domains</span>
              </div>
              <div className="mock-item">
                <b>/Product/Roadmap-Q3.pdf</b>
                <span>Link &middot; no expiry</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* m4: Compliance 360 */}
      <div
        className={`mod-panel ${activeTab === "m4" ? "on" : ""}`}
        id="m4"
        role="tabpanel"
      >
        <div>
          <h3>Audit readiness as a running number, not a quarterly scramble.</h3>
          <p className="lede">
            Compliance 360 maps the controls you already run in Marma to the frameworks you&apos;re
            held to, then keeps assessing them. You see the gap, the owner and the remediation
            status in one place.
          </p>
          <ul className="ticks">
            <li>
              <span className="n">01</span>
              <span>India DPDP Act readiness tracking</span>
            </li>
            <li>
              <span className="n">02</span>
              <span>ISO 27001, NIST and CIS control mapping</span>
            </li>
            <li>
              <span className="n">03</span>
              <span>HIPAA and PCI DSS modules for regulated sectors</span>
            </li>
            <li>
              <span className="n">04</span>
              <span>Continuous control assessment against live config</span>
            </li>
            <li>
              <span className="n">05</span>
              <span>Gap register with owners and remediation state</span>
            </li>
            <li>
              <span className="n">06</span>
              <span>Exportable evidence pack for auditors</span>
            </li>
          </ul>
        </div>
        <div className="mock glass glass-hover">
          <div className="mock-bar">
            <i />
            <i />
            <i />
            <span>app.marmasec.com / compliance</span>
          </div>
          <div className="mock-body">
            <div className="mock-kpis">
              <div className="mock-kpi">
                <b className="cool">87%</b>
                <span>ISO 27001</span>
              </div>
              <div className="mock-kpi">
                <b className="hot">72%</b>
                <span>DPDP</span>
              </div>
              <div className="mock-kpi">
                <b className="cool">91%</b>
                <span>CIS v8</span>
              </div>
            </div>
            <div className="mock-list">
              <div className="mock-item">
                <b>A.8.7 Malware protection</b>
                <span>Met &middot; evidence live</span>
              </div>
              <div className="mock-item">
                <b>A.5.15 Access control</b>
                <span>Partial &middot; 2 gaps</span>
              </div>
              <div className="mock-item">
                <b>DPDP &middot; breach notification</b>
                <span>Owner assigned</span>
              </div>
              <div className="mock-item">
                <b>CIS 3.3 Data access lists</b>
                <span>Met</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* m5: Management console */}
      <div
        className={`mod-panel ${activeTab === "m5" ? "on" : ""}`}
        id="m5"
        role="tabpanel"
      >
        <div>
          <h3>One console for gateways, endpoints, mailboxes and drives.</h3>
          <p className="lede">
            Run it from Marma&apos;s cloud or host it in your own data centre: same interface,
            same policy model. Sites, tenants and user groups roll up so a two-person team can
            manage a distributed estate.
          </p>
          <ul className="ticks">
            <li>
              <span className="n">01</span>
              <span>Cloud-hosted or private data centre deployment</span>
            </li>
            <li>
              <span className="n">02</span>
              <span>Multi-site and multi-tenant hierarchy for MSPs</span>
            </li>
            <li>
              <span className="n">03</span>
              <span>One policy applied across every enforcement point</span>
            </li>
            <li>
              <span className="n">04</span>
              <span>Role-based access with full change history</span>
            </li>
            <li>
              <span className="n">05</span>
              <span>Zero-touch enrolment for new sites and devices</span>
            </li>
            <li>
              <span className="n">06</span>
              <span>99.99% uptime service level</span>
            </li>
          </ul>
        </div>
        <div className="mock glass glass-hover">
          <div className="mock-bar">
            <i />
            <i />
            <i />
            <span>app.marmasec.com / dashboard</span>
          </div>
          <div className="mock-body">
            <div className="mock-kpis">
              <div className="mock-kpi">
                <b className="cool">14</b>
                <span>Sites</span>
              </div>
              <div className="mock-kpi">
                <b className="hot">2,450</b>
                <span>Threats / day</span>
              </div>
              <div className="mock-kpi">
                <b className="cool">99.99%</b>
                <span>Uptime</span>
              </div>
            </div>
            <div className="bars" aria-hidden="true">
              <i style={{ height: "34%" }} />
              <i style={{ height: "52%" }} />
              <i style={{ height: "28%" }} />
              <i style={{ height: "71%" }} />
              <i style={{ height: "45%" }} />
              <i style={{ height: "88%" }} />
              <i style={{ height: "39%" }} />
              <i style={{ height: "61%" }} />
              <i style={{ height: "30%" }} />
              <i style={{ height: "76%" }} />
              <i style={{ height: "48%" }} />
              <i style={{ height: "57%" }} />
            </div>
            <div className="mock-list">
              <div className="mock-item">
                <b>Pune HQ</b>
                <span>412 devices &middot; healthy</span>
              </div>
              <div className="mock-item">
                <b>Sacramento</b>
                <span>188 devices &middot; 1 alert</span>
              </div>
              <div className="mock-item">
                <b>Remote workers</b>
                <span>96 agents &middot; healthy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* m6: SIEM & SOC */}
      <div
        className={`mod-panel ${activeTab === "m6" ? "on" : ""}`}
        id="m6"
        role="tabpanel"
      >
        <div>
          <h3>Feed the stack you&apos;ve already bought.</h3>
          <p className="lede">
            Marma is not asking to be your system of record. Detections, verdicts and enforcement
            actions stream into your existing SIEM and SOC workflows in the format your analysts
            already query.
          </p>
          <ul className="ticks">
            <li>
              <span className="n">01</span>
              <span>Custom integration with third-party enterprise SIEM</span>
            </li>
            <li>
              <span className="n">02</span>
              <span>SOC workflow integration for triage and escalation</span>
            </li>
            <li>
              <span className="n">03</span>
              <span>Normalised event schema across all Marma surfaces</span>
            </li>
            <li>
              <span className="n">04</span>
              <span>Full incident context, not just an alert line</span>
            </li>
            <li>
              <span className="n">05</span>
              <span>Retention and export controlled by you</span>
            </li>
          </ul>
        </div>
        <div className="mock glass glass-hover">
          <div className="mock-bar">
            <i />
            <i />
            <i />
            <span>event stream</span>
          </div>
          <div className="mock-body">
            <div className="mock-list">
              <div className="mock-item">
                <b>marma.endpoint.dpi</b>
                <span>verdict=block &middot; sev=high</span>
              </div>
              <div className="mock-item">
                <b>marma.email.llm</b>
                <span>verdict=quarantine &middot; bec</span>
              </div>
              <div className="mock-item">
                <b>marma.cloud.exposure</b>
                <span>action=revoke_link</span>
              </div>
              <div className="mock-item">
                <b>marma.gateway.ips</b>
                <span>verdict=drop &middot; scan</span>
              </div>
              <div className="mock-item">
                <b>marma.identity.risk</b>
                <span>score=0.81 &middot; step_up</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
