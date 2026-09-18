import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import ContactForm from "@/components/common/ContactForm";
import CtaSection from "@/components/common/CtaSection";

export const metadata: Metadata = {
  title: "Customer Support & Troubleshooting | Marma Security",
  description:
    "Raise a support ticket, view self-help troubleshooting tips, or contact our 24/7 technical lines in the USA and India.",
};

export default function SupportPage() {
  const tips = [
    {
      n: "01",
      text: "Check the console for a device showing as unhealthy or unenrolled; most connectivity issues surface there first.",
    },
    {
      n: "02",
      text: "If a legitimate message was quarantined, release it from the Scam folder; the model learns from the correction.",
    },
    {
      n: "03",
      text: "A gateway that has lost management connectivity keeps enforcing its last policy. Protection is not interrupted while you investigate.",
    },
    {
      n: "04",
      text: "Agent updates apply automatically. If a machine is behind, it is usually powered off or off-network rather than failing.",
    },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Support" }]}
        eyebrow="Support"
        title="Something not behaving? Start here."
        lede="Existing customers can raise a ticket below, or call the number for the region where your account is held. Partner-managed accounts should contact their partner first, who has direct Tier III escalation to us."
        primaryCta={{ text: "Start 30-day trial →", href: "/contact-us" }}
        secondaryCta={{ text: "Talk to an engineer", href: "/contact-us" }}
      />

      <section className="sec">
        <div className="wrap">
          <div className="split">
            <ContactForm
              title="Raise a support request"
              submitButtonText="Submit ticket"
              note="Include your tenant name or hardware serial number if available to expedite routing."
            />

            <div className="rv">
              <div className="eyebrow">Before you write</div>
              <h2 style={{ margin: "20px 0 22px" }}>Things that resolve most tickets.</h2>
              <ul className="ticks">
                {tips.map((item) => (
                  <li key={item.n}>
                    <span className="n">{item.n}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="chips">
                <span className="chip-n chip">
                  <a href="tel:+14085828962">USA &middot; +1 408 582 8962</a>
                </span>
                <span className="chip-n chip">
                  <a href="tel:+919175511808">India &middot; +91 91755 11808</a>
                </span>
                <span className="chip-n chip">
                  <a href="mailto:info@marmasec.com">info@marmasec.com</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection primaryHref="/contact-us" secondaryHref="/contact-us" />
    </>
  );
}
