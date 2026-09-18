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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10 border-b border-[var(--line-soft)]">
            
            {/* Left Col: Brand & Addresses */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <Link className="logo" href="/" aria-label="Marma Security">
                <Image
                  src="/logo.png"
                  alt="Marma Security"
                  width={188}
                  height={25}
                  className="logo-img"
                />
              </Link>

              <div className="foot-addr flex flex-col gap-3 text-[0.83rem] text-[var(--mute)] leading-relaxed mt-2">
                <div>
                  <strong className="block text-[var(--ink)] font-semibold uppercase tracking-wider text-[0.7rem] font-mono mb-1">
                    USA Headquarters
                  </strong>
                  Marma Security Inc.<br />
                  180 Promenade Ste. 300, Sacramento, CA 95834<br />
                  <a href="tel:+14085828962" className="hover:text-[var(--red)] transition-colors">
                    +1 408 582 8962
                  </a>
                </div>

                <div className="mt-1">
                  <strong className="block text-[var(--ink)] font-semibold uppercase tracking-wider text-[0.7rem] font-mono mb-1">
                    India Office
                  </strong>
                  Marmasec Private Limited<br />
                  J 1002, Mhada Towers, Pimpri, Pune 411017<br />
                  <a href="tel:+919175511808" className="hover:text-[var(--red)] transition-colors">
                    +91 91755 11808
                  </a>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <a
                    href="mailto:info@marmasec.com"
                    className="hover:text-[var(--red)] transition-colors flex items-center gap-2"
                  >
                    <span>info@marmasec.com</span>
                  </a>
                  <span>&middot;</span>
                  <a
                    href="https://www.linkedin.com/company/marmasecurity/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[var(--red)] transition-colors font-mono uppercase text-[0.7rem]"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Middle Col: Navigation Links */}
            <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-2 gap-8">
              <div>
                <h5 className="font-mono text-[0.63rem] tracking-[0.16em] uppercase text-[var(--mute-2)] mb-4 font-semibold">
                  Platform
                </h5>
                <ul className="list-none p-0 m-0 grid gap-2.5 text-[0.86rem] text-[var(--mute)]">
                  <li>
                    <Link href="/technology" className="hover:text-[var(--red)] transition-colors">
                      Technology
                    </Link>
                  </li>
                  <li>
                    <Link href="/product" className="hover:text-[var(--red)] transition-colors">
                      Products & Gateways
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions" className="hover:text-[var(--red)] transition-colors">
                      Solutions
                    </Link>
                  </li>
                  <li>
                    <Link href="/store" className="hover:text-[var(--red)] transition-colors">
                      Store
                    </Link>
                  </li>
                </ul>

                <h5 className="font-mono text-[0.63rem] tracking-[0.16em] uppercase text-[var(--mute-2)] mt-6 mb-4 font-semibold">
                  Company
                </h5>
                <ul className="list-none p-0 m-0 grid gap-2.5 text-[0.86rem] text-[var(--mute)]">
                  <li>
                    <Link href="/about-us" className="hover:text-[var(--red)] transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/partners" className="hover:text-[var(--red)] transition-colors">
                      Partners
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="hover:text-[var(--red)] transition-colors">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/blogs" className="hover:text-[var(--red)] transition-colors">
                      Blogs
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-mono text-[0.63rem] tracking-[0.16em] uppercase text-[var(--mute-2)] mb-4 font-semibold">
                  Support & Legal
                </h5>
                <ul className="list-none p-0 m-0 grid gap-2.5 text-[0.86rem] text-[var(--mute)]">
                  <li>
                    <Link href="/support" className="hover:text-[var(--red)] transition-colors">
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-us" className="hover:text-[var(--red)] transition-colors">
                      Contact
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
              </div>
            </div>

            {/* Right Col: Interactive Contact Form */}
            <div className="lg:col-span-4">
              <FooterContactForm />
            </div>

          </div>

          <div className="foot-bot pt-6 flex justify-between items-center flex-wrap gap-4 text-[var(--mute-2)] font-mono text-[0.66rem] uppercase tracking-wider">
            <span>&copy; {new Date().getFullYear()} Marma Security Inc. All rights reserved.</span>
            <span>Gateways made in India</span>
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
    <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.5)] border border-[var(--line-soft)]">
      <div className="eyebrow mb-2">Quick Enquiry</div>
      <h4 style={{ fontSize: "1.05rem", margin: "0 0 12px" }}>Send us a message</h4>

      {submitStatus ? (
        <div
          className={`p-3.5 rounded-xl text-xs font-medium mb-3 ${
            submitStatus.type === "success"
              ? "bg-[rgba(34,197,94,0.1)] text-green-700 border border-green-200"
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
            className="inp text-[0.85rem] py-2 px-3"
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
              className="inp text-[0.85rem] py-2 px-3"
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
              className="inp text-[0.85rem] py-2 px-3"
            />
            {errors.phone && <span className="text-[var(--red)] text-[0.65rem] font-mono mt-0.5 block">{errors.phone}</span>}
          </div>
        </div>

        <div>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="inp text-[0.85rem] py-2 px-3"
          >
            <option value="">Select subject / interest</option>
            <option value="Demo Request">Request a Demo</option>
            <option value="Product Enquiry">Product Enquiry</option>
            <option value="Partnership">Partnership Programme</option>
            <option value="Support">Support Inquiry</option>
            <option value="Other">Other</option>
          </select>
          {errors.subject && <span className="text-[var(--red)] text-[0.65rem] font-mono mt-0.5 block">{errors.subject}</span>}
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Your message"
            rows={2}
            value={formData.message}
            onChange={handleChange}
            className="inp text-[0.85rem] py-2 px-3 min-h-[60px]"
          />
          {errors.message && <span className="text-[var(--red)] text-[0.65rem] font-mono mt-0.5 block">{errors.message}</span>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-red w-full justify-center py-2.5 text-[0.7rem]"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
