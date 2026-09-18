import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import ContactForm from "@/components/common/ContactForm";
import CtaSection from "@/components/common/CtaSection";

export const metadata: Metadata = {
  title: "Contact Us | Marma Security",
  description:
    "Get in touch with Marma Security. Reach out to our engineering, sales, and support teams in the USA and India.",
};

export default function ContactUsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Contact"
        title="Tell us what you are trying to protect."
        lede="Drop us a note below or reach our engineering and operations centers directly. We respond to all inquiries within one business day."
      />

      <section className="sec">
        <div className="wrap">
          <div className="split">
            {/* Functional Contact Form */}
            <ContactForm
              title="Send a message"
              defaultInterest="Endpoint protection"
              note="For urgent product support or existing customer tickets, use the support portal."
              submitButtonText="Send enquiry →"
            />

            {/* Direct contact and offices */}
            <div className="rv">
              <div className="eyebrow">Direct contact</div>
              <h2 style={{ margin: "20px 0 24px" }}>Or reach us directly.</h2>

              <div className="card glass glass-hi mb-4">
                <span className="idx">USA Headquarters</span>
                <h3 style={{ margin: "6px 0 10px", fontSize: "1.15rem" }}>Marma Security Inc.</h3>
                <p className="text-[0.9rem] text-[var(--mute)] leading-relaxed">
                  180 Promenade Ste. 300<br />
                  Sacramento, CA 95834, United States
                </p>
                <div className="mt-3">
                  <a
                    href="tel:+14085828962"
                    className="font-mono text-[0.8rem] text-[var(--red)] hover:underline"
                  >
                    +1 408 582 8962
                  </a>
                </div>
              </div>

              <div className="card glass glass-hi mb-6">
                <span className="idx">India R&D & Operations</span>
                <h3 style={{ margin: "6px 0 10px", fontSize: "1.15rem" }}>Marmasec Private Limited</h3>
                <p className="text-[0.9rem] text-[var(--mute)] leading-relaxed">
                  J 1002, Mhada Towers<br />
                  Pimpri, Pune 411017, Maharashtra, India
                </p>
                <div className="mt-3">
                  <a
                    href="tel:+919175511808"
                    className="font-mono text-[0.8rem] text-[var(--red)] hover:underline"
                  >
                    +91 91755 11808
                  </a>
                </div>
              </div>

              <div className="chips">
                <span className="chip-n chip">
                  <a href="mailto:info@marmasec.com">info@marmasec.com</a>
                </span>
                <span className="chip-n chip">Sales enquiry</span>
                <span className="chip-n chip">Emergency support</span>
                <span className="chip-n chip">
                  <a href="https://www.linkedin.com/company/marmasecurity/" target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
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
