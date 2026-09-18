// @ts-nocheck
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { submitContactForm } from "@/lib/contactApi";
import { validateContactFields, sanitizePhone } from "@/lib/formValidation";

type FooterFormErrors = Partial<{
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}>;

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-card glass glass-hi">
          {/* Top Brand & Health Status Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-[var(--line-soft)]">
            <div className="flex items-center gap-3">
              <Link className="logo" href="/" aria-label="Marma Security">
                <Image
                  src="/logo.png"
                  alt="Marma Security"
                  width={188}
                  height={25}
                  className="logo-img"
                />
              </Link>
              <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--red-wash)] border border-[var(--red-line)] text-[0.66rem] font-mono font-medium text-[var(--red)] uppercase tracking-wider">
                Autonomous Defense
              </span>
            </div>

            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-[var(--line)] shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[0.68rem] text-[var(--ink)] font-semibold uppercase tracking-wider">
                Global Edge Operational
              </span>
              <span className="text-[var(--line)]">·</span>
              <span className="font-mono text-[0.65rem] text-[var(--mute)]">
                &lt;1.4ms P99
              </span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-10 border-b border-[var(--line-soft)]">
            
            {/* Left Col: Overview & Global Offices (Col-Span 4) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <p className="text-[0.88rem] text-[var(--mute)] leading-relaxed max-w-sm">
                Next-generation, network-level cybersecurity engineered to protect vital endpoints, email, cloud data, and perimeter edge with autonomous, coordinated intelligence.
              </p>

              {/* Office Cards */}
              <div className="flex flex-col gap-3 mt-1">
                {/* USA HQ */}
                <div className="p-3.5 rounded-xl bg-white/60 border border-[var(--line-soft)]">
                  <div className="flex items-center justify-between mb-1">
                    <strong className="block text-[var(--ink)] font-semibold uppercase tracking-wider text-[0.7rem] font-mono">
                      USA Headquarters
                    </strong>
                    <span className="font-mono text-[0.63rem] text-[var(--mute-2)] uppercase">
                      Sacramento, CA
                    </span>
                  </div>
                  <p className="text-[0.82rem] text-[var(--mute)] leading-snug">
                    Marma Security Inc.<br />
                    180 Promenade Ste. 300, Sacramento, CA 95834
                  </p>
                  <a
                    href="tel:+14085828962"
                    className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-[var(--ink-2)] hover:text-[var(--red)] transition-colors mt-1.5 font-mono"
                  >
                    <span>+1 408 582 8962</span>
                  </a>
                </div>

                {/* India Office */}
                <div className="p-3.5 rounded-xl bg-white/60 border border-[var(--line-soft)]">
                  <div className="flex items-center justify-between mb-1">
                    <strong className="block text-[var(--ink)] font-semibold uppercase tracking-wider text-[0.7rem] font-mono">
                      India R&amp;D &amp; Operations
                    </strong>
                    <span className="font-mono text-[0.63rem] text-[var(--mute-2)] uppercase">
                      Pune, MH
                    </span>
                  </div>
                  <p className="text-[0.82rem] text-[var(--mute)] leading-snug">
                    Marmasec Private Limited<br />
                    J 1002, Mhada Towers, Pimpri, Pune 411017
                  </p>
                  <a
                    href="tel:+919175511808"
                    className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-[var(--ink-2)] hover:text-[var(--red)] transition-colors mt-1.5 font-mono"
                  >
                    <span>+91 91755 11808</span>
                  </a>
                </div>
              </div>

              {/* Direct Communication Badges */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="mailto:info@marmasec.com"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/80 border border-[var(--line)] text-[0.8rem] font-medium text-[var(--ink)] hover:text-[var(--red)] hover:border-[var(--red-line)] transition-all"
                >
                  <svg className="w-3.5 h-3.5 text-[var(--red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@marmasec.com</span>
                </a>

                <a
                  href="https://www.linkedin.com/company/marmasecurity/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-[var(--line)] font-mono uppercase text-[0.7rem] font-semibold text-[var(--ink)] hover:text-[var(--red)] hover:border-[var(--red-line)] transition-all"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-[var(--red)]" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Middle Col: Navigation Links (Col-Span 4 -> 2 sub-columns) */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h5 className="font-mono text-[0.68rem] tracking-[0.16em] uppercase text-[var(--ink)] mb-4 font-semibold">
                  Platform
                </h5>
                <ul className="list-none p-0 m-0 grid gap-2.5 text-[0.88rem] text-[var(--ink-2)]">
                  <li>
                    <Link href="/technology" className="hover:text-[var(--red)] transition-colors">
                      Technology
                    </Link>
                  </li>
                  <li>
                    <Link href="/product" className="hover:text-[var(--red)] transition-colors">
                      Products &amp; Gateways
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions" className="hover:text-[var(--red)] transition-colors">
                      Solutions
                    </Link>
                  </li>
                  <li>
                    <Link href="/store" className="hover:text-[var(--red)] transition-colors">
                      Hardware Store
                    </Link>
                  </li>
                </ul>

                <h5 className="font-mono text-[0.68rem] tracking-[0.16em] uppercase text-[var(--ink)] mt-7 mb-4 font-semibold">
                  Company
                </h5>
                <ul className="list-none p-0 m-0 grid gap-2.5 text-[0.88rem] text-[var(--ink-2)]">
                  <li>
                    <Link href="/about-us" className="hover:text-[var(--red)] transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/partners" className="hover:text-[var(--red)] transition-colors">
                      Partners &amp; MSSP
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="hover:text-[var(--red)] transition-colors">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/blogs" className="hover:text-[var(--red)] transition-colors">
                      Security Blogs
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-mono text-[0.68rem] tracking-[0.16em] uppercase text-[var(--ink)] mb-4 font-semibold">
                  Trust &amp; Legal
                </h5>
                <ul className="list-none p-0 m-0 grid gap-2.5 text-[0.88rem] text-[var(--ink-2)]">
                  <li>
                    <Link href="/support" className="hover:text-[var(--red)] transition-colors">
                      Customer Support
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-us" className="hover:text-[var(--red)] transition-colors">
                      Contact &amp; Demos
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-[var(--red)] transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/account-deletion" className="hover:text-[var(--red)] transition-colors">
                      Account Deletion
                    </Link>
                  </li>
                </ul>

                <div className="mt-7 p-3 rounded-xl bg-white/50 border border-[var(--line-soft)] text-[0.74rem] text-[var(--mute)] leading-relaxed">
                  <span className="font-mono font-semibold text-[var(--ink)] block uppercase tracking-wider text-[0.65rem] mb-1">
                    Compliance Baselines
                  </span>
                  Continuous mapping for ISO 27001, DPDP Act, HIPAA, and CIS v8.
                </div>
              </div>
            </div>

            {/* Right Col: Consultation Form (Col-Span 4) */}
            <div className="lg:col-span-4">
              <FooterContactForm />
            </div>

          </div>

          {/* Bottom Bar: Copyright & Compliance */}
          <div className="foot-bot pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[var(--mute)] font-mono text-[0.68rem] uppercase tracking-wider">
            <span>&copy; {new Date().getFullYear()} Marma Security Inc. All rights reserved.</span>
            <div className="flex items-center gap-4 text-[var(--ink-2)]">
              <span>Gateways Engineered in India</span>
              <span>·</span>
              <span>Sacramento HQ</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FooterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FooterFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitStatus) setSubmitStatus(null);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizePhone(e.target.value);
    setFormData((prev) => ({ ...prev, phone: sanitized }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fieldErrors = validateContactFields({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    });

    const newErrors: FooterFormErrors = { ...fieldErrors };
    if (!formData.subject) {
      newErrors.subject = "Please select an option";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitStatus({
        type: "error",
        message: "Please fix the errors and try again.",
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        extra_field: {
          source: "Footer Form",
          subject: formData.subject,
        },
      });

      setIsSubmitting(false);

      if (result.success) {
        setSubmitStatus({ type: "success", message: result.message });
        setFormData({ name: "", email: "", phone: "", message: "", subject: "" });
      } else {
        setSubmitStatus({ type: "error", message: result.message });
      }
    } catch {
      setIsSubmitting(false);
      setSubmitStatus({ type: "error", message: "Failed to send. Please try again." });
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white/80 border border-[var(--line)] shadow-sm">
      <div className="eyebrow mb-1.5">Direct Engineering Access</div>
      <h4 className="text-[var(--ink)] font-semibold" style={{ fontSize: "1.08rem", margin: "0 0 12px" }}>
        Quick Consultation
      </h4>

      {submitStatus ? (
        <div
          className={`p-3.5 rounded-xl text-xs font-medium mb-3.5 ${
            submitStatus.type === "success"
              ? "bg-[rgba(34,197,94,0.12)] text-green-800 border border-green-300"
              : "bg-[var(--red-wash)] text-[var(--red-deep)] border border-[var(--red-line)]"
          }`}
        >
          {submitStatus.message}
          {submitStatus.type === "success" && (
            <button
              type="button"
              className="block mt-2 text-[var(--red)] underline font-mono text-[0.7rem] cursor-pointer bg-transparent border-0 p-0"
              onClick={() => setSubmitStatus(null)}
            >
              Send another message
            </button>
          )}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5" noValidate>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="inp text-[0.86rem] py-2 px-3 bg-white border border-[var(--line)] text-[var(--ink)] placeholder:text-[var(--mute)]"
            required
          />
          {errors.name && <span className="text-[var(--red)] text-[0.65rem] font-mono mt-0.5 block">{errors.name}</span>}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="inp text-[0.86rem] py-2 px-3 bg-white border border-[var(--line)] text-[var(--ink)] placeholder:text-[var(--mute)]"
              required
            />
            {errors.email && <span className="text-[var(--red)] text-[0.65rem] font-mono mt-0.5 block">{errors.email}</span>}
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handlePhoneChange}
              className="inp text-[0.86rem] py-2 px-3 bg-white border border-[var(--line)] text-[var(--ink)] placeholder:text-[var(--mute)]"
            />
            {errors.phone && <span className="text-[var(--red)] text-[0.65rem] font-mono mt-0.5 block">{errors.phone}</span>}
          </div>
        </div>

        <div>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="inp text-[0.86rem] py-2 px-3 bg-white border border-[var(--line)] text-[var(--ink)]"
          >
            <option value="">Select subject / interest</option>
            <option value="Demo Request">Request an Architecture Demo</option>
            <option value="Product Enquiry">Gateway &amp; Software Pricing</option>
            <option value="Partnership">MSSP &amp; Reseller Program</option>
            <option value="Support">Enterprise Support Inquiry</option>
            <option value="Other">General Question</option>
          </select>
          {errors.subject && <span className="text-[var(--red)] text-[0.65rem] font-mono mt-0.5 block">{errors.subject}</span>}
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Tell us about your infrastructure or enquiry"
            rows={2}
            value={formData.message}
            onChange={handleChange}
            className="inp text-[0.86rem] py-2 px-3 min-h-[64px] bg-white border border-[var(--line)] text-[var(--ink)] placeholder:text-[var(--mute)]"
          />
          {errors.message && <span className="text-[var(--red)] text-[0.65rem] font-mono mt-0.5 block">{errors.message}</span>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-red w-full justify-center py-2.5 text-[0.72rem] tracking-wider font-semibold shadow-md"
        >
          {isSubmitting ? "Submitting Inquiry..." : "Submit Consultation Request →"}
        </button>
      </form>
    </div>
  );
}
