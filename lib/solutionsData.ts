export interface MetricData {
  count: string;
  dec?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface SolutionCard {
  idx: string;
  title: string;
  desc: string;
}

export interface FaqData {
  q: string;
  a: string;
}

export interface SolutionPageData {
  slug: string;
  title: string;
  desc: string;
  eyebrow: string;
  sectorName: string;
  h1: string;
  lede: string;
  metrics: MetricData[];
  threats: SolutionCard[];
  controls: SolutionCard[];
  faqs: FaqData[];
}

export const SOLUTIONS_DATA: Record<string, SolutionPageData> = {
  "education": {
    "slug": "education",
    "title": "Education cybersecurity | Marma Security",
    "desc": "Campuses hold academic records, financial aid data and research alongside a device population nobody controls. Marma protects the network without trying to",
    "eyebrow": "Education",
    "h1": "Thousands of unmanaged devices, one network, no security team.",
    "lede": "Campuses hold academic records, financial aid data and research alongside a device population nobody controls. Marma protects the network without trying to manage every laptop on it.",
    "metrics": [],
    "threats": [
      {
        "idx": "01",
        "title": "Ransomware closing a campus",
        "desc": "Recovery in education is slow because systems are distributed and IT teams are small. Behavioural detection stops the encryption run rather than relying on restoring from backup afterwards."
      },
      {
        "idx": "02",
        "title": "Student and staff data exposure",
        "desc": "Records, aid information and health data sit across many systems and drives. Cloud data protection finds the sharing that should not exist."
      },
      {
        "idx": "03",
        "title": "Unmanaged devices on the network",
        "desc": "Student laptops and phones cannot carry an agent. Gateways watch their traffic, quarantine compromised devices and keep them off administrative segments."
      }
    ],
    "controls": [],
    "faqs": [
      {
        "q": "Can we protect students without managing their devices?",
        "a": "Yes. Unmanaged devices are protected at the network layer: traffic inspection, DNS security and quarantine, with no agent required."
      },
      {
        "q": "How do we keep research data separate from campus traffic?",
        "a": "Gateways enforce segmentation between research, administrative and general-access networks, with policy set per segment in one console."
      },
      {
        "q": "Is there a path for multi-campus institutions?",
        "a": "The management platform supports multi-site hierarchy, so each campus has local visibility while central IT sees the whole estate."
      }
    ],
    "sectorName": "Education"
  },
  "enterprise": {
    "slug": "enterprise",
    "title": "Enterprise cybersecurity | Marma Security",
    "desc": "Multi-site organisations rarely fail on technology choice. They fail on the operational load of running four vendors across fourteen locations. Marma conso",
    "eyebrow": "Enterprise",
    "h1": "A distributed estate, run by a team that is smaller than it should be.",
    "lede": "Multi-site organisations rarely fail on technology choice. They fail on the operational load of running four vendors across fourteen locations. Marma consolidates that into one policy model and one console.",
    "metrics": [],
    "threats": [
      {
        "idx": "01",
        "title": "Coverage gaps between vendors",
        "desc": "Incidents live in the space between an email vendor, an endpoint vendor and a network vendor. One correlation layer removes the seam."
      },
      {
        "idx": "02",
        "title": "Policy drift across sites",
        "desc": "Fourteen locations become fourteen slightly different configurations. One policy model applied to every enforcement point stops drift structurally."
      },
      {
        "idx": "03",
        "title": "Audit load across frameworks",
        "desc": "Multiple frameworks assessed by hand each cycle. Compliance 360 keeps control status live across DPDP, ISO 27001, NIST and CIS simultaneously."
      }
    ],
    "controls": [],
    "faqs": [
      {
        "q": "Can we host the management platform ourselves?",
        "a": "Yes. The enterprise platform runs in a private data centre with the same interface and policy model as the cloud version."
      },
      {
        "q": "How does this fit with an existing SOC?",
        "a": "Marma streams normalised events with full incident context into your SIEM, so analysts triage in the tool they already use."
      },
      {
        "q": "Is there a multi-tenant model for group structures?",
        "a": "Yes. Sites, tenants and user groups roll up hierarchically, which is also how MSSP partners run Marma across client bases."
      }
    ],
    "sectorName": "Enterprise"
  },
  "finance": {
    "slug": "finance",
    "title": "Finance cybersecurity | Marma Security",
    "desc": "Payment fraud rarely involves malware. It involves a plausible email about changed bank details arriving on a Friday afternoon. Marma reads intent rather t",
    "eyebrow": "Finance",
    "h1": "Most financial losses start with a convincing message, not a breached firewall.",
    "lede": "Payment fraud rarely involves malware. It involves a plausible email about changed bank details arriving on a Friday afternoon. Marma reads intent rather than reputation, and stops the transfer before it is authorised.",
    "metrics": [],
    "threats": [
      {
        "idx": "01",
        "title": "Vendor and executive impersonation",
        "desc": "A payload-free message asking finance to update payment details passes every reputation check. Marma's multi-model engine scores intent, isolates the message to a Scam folder and flags the vendor relationship for review."
      },
      {
        "idx": "02",
        "title": "Credential theft against banking portals",
        "desc": "Credential-harvesting pages are blocked at the DNS and inspection layers before they render, on the endpoint and at the gateway alike."
      },
      {
        "idx": "03",
        "title": "Regulated data leaving the perimeter",
        "desc": "Statements, KYC packs and account spreadsheets get shared externally in the ordinary course of work. Cloud data protection ranks the exposure and lets you close it."
      }
    ],
    "controls": [],
    "faqs": [
      {
        "q": "How is this different from our existing email gateway?",
        "a": "A gateway scores reputation, attachments and links. Marma additionally scores what the message is asking for, which is what catches payment redirection attempts that carry no technical indicators at all."
      },
      {
        "q": "Does quarantining risk losing legitimate mail?",
        "a": "Suspect messages are isolated to a Scam folder rather than deleted, so a false positive costs a click rather than a lost thread."
      },
      {
        "q": "Can we prove control coverage to an auditor?",
        "a": "Compliance 360 keeps control status live against PCI DSS and DPDP and exports an evidence pack on demand."
      }
    ],
    "sectorName": "Finance"
  },
  "healthcare": {
    "slug": "healthcare",
    "title": "Healthcare cybersecurity | Marma Security",
    "desc": "Patient records are among the most valuable records on the criminal market, and the systems holding them sit alongside imaging equipment and infusion pumps",
    "eyebrow": "Healthcare",
    "h1": "Care doesn't stop for an incident, so neither can the network.",
    "lede": "Patient records are among the most valuable records on the criminal market, and the systems holding them sit alongside imaging equipment and infusion pumps that cannot be patched on your schedule. Marma protects both without changing how clinical systems run.",
    "metrics": [],
    "threats": [
      {
        "idx": "01",
        "title": "Ransomware on clinical systems",
        "desc": "Encryption of scheduling, records or imaging systems turns into diverted ambulances and cancelled procedures within hours. Marma watches for the encryption pattern itself rather than waiting on a signature, and halts the process mid-run."
      },
      {
        "idx": "02",
        "title": "Unpatchable connected devices",
        "desc": "Infusion pumps, monitors and imaging hardware often run software that cannot be updated without revalidation. Marma protects them at the network layer, watching traffic to and from each device and quarantining anything that starts behaving unlike itself."
      },
      {
        "idx": "03",
        "title": "Records leaving through the cloud",
        "desc": "Referral letters and discharge summaries end up in shared drives with links that never expire. Cloud data protection finds the exposure and lets you revoke it from the console."
      }
    ],
    "controls": [],
    "faqs": [
      {
        "q": "Will Marma interfere with medical devices?",
        "a": "No agent is installed on clinical hardware. Protection for biomedical devices happens at the network layer, so device software and its validation state are untouched."
      },
      {
        "q": "Can we segment biomedical equipment from staff networks?",
        "a": "Yes. Gateways enforce segmentation and quarantine, so a compromised device cannot reach clinical systems even if it is infected."
      },
      {
        "q": "Does this help with HIPAA evidence?",
        "a": "Compliance 360 maps the controls you run in Marma to HIPAA safeguards and keeps their status current, so evidence is assembled continuously rather than before an audit."
      }
    ],
    "sectorName": "Healthcare"
  },
  "legal": {
    "slug": "legal",
    "title": "Legal cybersecurity | Marma Security",
    "desc": "Privilege survives right up until a matter folder is shared with a link that has no expiry. Marma finds the exposure you already have and stops the next on",
    "eyebrow": "Legal",
    "h1": "Client confidentiality is a network configuration problem.",
    "lede": "Privilege survives right up until a matter folder is shared with a link that has no expiry. Marma finds the exposure you already have and stops the next one from being created.",
    "metrics": [],
    "threats": [
      {
        "idx": "01",
        "title": "Matter files shared beyond the matter",
        "desc": "Documents shared org-wide or with external counsel accumulate quietly. Marma inventories the exposure by sensitivity and lets you revoke access without hunting through drive settings."
      },
      {
        "idx": "02",
        "title": "Phishing aimed at partners",
        "desc": "Senior fee earners are targeted directly because their access is broad and their time is short. Multi-model email scoring catches impersonation that carries no technical signal."
      },
      {
        "idx": "03",
        "title": "Devices outside the office",
        "desc": "Laptops on hotel and home networks fall outside the firm's perimeter. The endpoint agent applies the same policy anywhere, without routing traffic through a tunnel."
      }
    ],
    "controls": [],
    "faqs": [
      {
        "q": "Does Marma read the contents of client documents?",
        "a": "Classification runs against your cloud drives to identify sensitivity and sharing state. Session content is not transmitted to Marma's cloud by the endpoint agent."
      },
      {
        "q": "Can we run this without a security team?",
        "a": "Yes, that is the design point. Most firms run it with existing IT support and no dedicated security staff."
      },
      {
        "q": "What do we show a client conducting a security review?",
        "a": "An evidence pack from Compliance 360 covering control status, exposure remediation and incident history."
      }
    ],
    "sectorName": "Legal"
  },
  "manufacturing": {
    "slug": "manufacturing",
    "title": "Manufacturing cybersecurity | Marma Security",
    "desc": "Legacy industrial control systems and unmanaged IoT create gaps that were never designed to be defended. Marma protects at the network layer so production ",
    "eyebrow": "Manufacturing",
    "h1": "A stopped line costs more than the ransom, which is exactly why they ask.",
    "lede": "Legacy industrial control systems and unmanaged IoT create gaps that were never designed to be defended. Marma protects at the network layer so production hardware stays untouched.",
    "metrics": [],
    "threats": [
      {
        "idx": "01",
        "title": "Ransomware halting production",
        "desc": "Downtime, not data theft, is the leverage. Behavioural detection stops encryption runs before they spread from IT into the systems that schedule and control production."
      },
      {
        "idx": "02",
        "title": "Legacy ICS that cannot be patched",
        "desc": "Control systems running unsupported software are protected at the network layer with segmentation, quarantine and traffic inspection rather than agents."
      },
      {
        "idx": "03",
        "title": "Supply chain and IP exposure",
        "desc": "Drawings, BOMs and supplier contracts are shared across organisational boundaries constantly. Cloud data protection surfaces where that sharing has outlived its purpose."
      }
    ],
    "controls": [],
    "faqs": [
      {
        "q": "Do we need to install anything on plant equipment?",
        "a": "No. OT protection is delivered at the network layer through gateways, so control systems and their certification state are unaffected."
      },
      {
        "q": "Will inspection add latency to the control network?",
        "a": "Inspection happens locally at the gateway rather than through a cloud tunnel, so there is no round trip added to plant traffic."
      },
      {
        "q": "Can this coexist with an existing industrial firewall?",
        "a": "Yes. Marma is commonly deployed alongside existing edge equipment during evaluation and integrates into the SOC through the event stream."
      }
    ],
    "sectorName": "Manufacturing"
  },
  "residential": {
    "slug": "residential",
    "title": "Residential &amp; commercial cybersecurity | Marma Security",
    "desc": "CCTV, access control, HVAC and lift systems all sit on the property network, often installed by different contractors with default credentials. Marma prote",
    "eyebrow": "Residential &amp; commercial",
    "h1": "Every smart building is a network somebody forgot to secure.",
    "lede": "CCTV, access control, HVAC and lift systems all sit on the property network, often installed by different contractors with default credentials. Marma protects the building the way it protects an office.",
    "metrics": [],
    "threats": [
      {
        "idx": "01",
        "title": "Compromised connected infrastructure",
        "desc": "Cameras, locks and controllers are rarely updated after commissioning. Marma watches their traffic and isolates any device that starts scanning or calling out unexpectedly."
      },
      {
        "idx": "02",
        "title": "Ransomware against building operations",
        "desc": "Access control and management software locked mid-tenancy disrupts residents and tenants immediately. Behavioural detection stops the encryption run before it spreads."
      },
      {
        "idx": "03",
        "title": "Tenant data exposure",
        "desc": "Lease agreements, payment details and access credentials are held by property teams with light IT support. Cloud data protection finds where they have been over-shared."
      }
    ],
    "controls": [],
    "faqs": [
      {
        "q": "Do installers need to change how building systems are commissioned?",
        "a": "No. Protection is applied at the network layer, so existing devices and their configuration remain as installed."
      },
      {
        "q": "Can one console cover multiple properties?",
        "a": "Yes. The management platform supports multi-site hierarchy, so a portfolio is managed centrally with per-building visibility."
      },
      {
        "q": "What happens when a device is compromised?",
        "a": "It is quarantined automatically, kept operational where possible but cut off from the rest of the network until reviewed."
      }
    ],
    "sectorName": "Residential & commercial"
  },
  "smb": {
    "slug": "smb",
    "title": "Small &amp; medium business cybersecurity | Marma Security",
    "desc": "Small businesses are targeted because their defences are thin, not because their data is less valuable. Marma gives them the same controls large enterprise",
    "eyebrow": "Small &amp; medium business",
    "h1": "Enterprise-grade protection for organisations with no IT department.",
    "lede": "Small businesses are targeted because their defences are thin, not because their data is less valuable. Marma gives them the same controls large enterprises run, deployed in an afternoon.",
    "metrics": [],
    "threats": [
      {
        "idx": "01",
        "title": "Phishing and credential theft",
        "desc": "The most common way a small business is breached is also the cheapest to stop: block the harvesting page before it loads, on every device."
      },
      {
        "idx": "02",
        "title": "Ransomware with no recovery plan",
        "desc": "Smaller organisations rarely have tested backups. Prevention has to work the first time, which is why detection is behavioural rather than signature-dependent."
      },
      {
        "idx": "03",
        "title": "Payment and invoice fraud",
        "desc": "A single redirected invoice can exceed a year of security spend. Email scoring catches the request itself, not just the attachment."
      }
    ],
    "controls": [],
    "faqs": [
      {
        "q": "Do we need someone technical to run this?",
        "a": "No. Deployment is plug-and-play, the platform updates itself, and the mobile app covers the day-to-day view of what was blocked."
      },
      {
        "q": "What does it cost compared to what we have?",
        "a": "Partners typically price the Marma stack at around a quarter of a comparable multi-vendor set, with setup measured in minutes rather than days."
      },
      {
        "q": "Can our IT provider manage it for us?",
        "a": "Yes. Most SMB deployments are delivered by an MSP or IT service provider through the Marma partner programme."
      }
    ],
    "sectorName": "Small & medium business"
  }
};
