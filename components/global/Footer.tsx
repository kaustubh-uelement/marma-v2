"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { usePathname } from "next/navigation";
import CustomSelect from "./CustomSelect";
import { submitContactForm } from "@/lib/contactApi";
import { MapPin } from "lucide-react";
import { validateContactFields, sanitizePhone } from "@/lib/formValidation";

type FooterFormErrors = Partial<{
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}>;

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className={`footer-container`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row justify-between w-full gap-0 lg:gap-24">
          <div className="flex flex-col h-full grow">
            {/* Top: Logo & Description */}
            <div className="flex flex-col items-start pb-6 md:pb-8 lg:pb-15 gap-4 md:gap-10 w-full">
              <Image
                src="/images/global/marmalogofooter.svg"
                alt="Marma Security"
                width={200}
                height={40}
                className="w-[140px] md:w-[280px] h-auto object-contain"
              />
            </div>

            {/* ======================================= */}
            {/* DESKTOP-ONLY MIDDLE NAV & CONTACT GRID */}
            {/* ======================================= */}
            <div
              className={`hidden md:flex flex-col w-full justify-between gap-20 mb-20`}
            >
              <div className={`grid grow grid-cols-4 gap-6`}>
                <Link
                  href="/technology"
                  className="hover:text-white/70 transition-colors h-fit"
                >
                  Technology
                </Link>
                <Link
                  href="/product"
                  className="hover:text-white/70 transition-colors"
                >
                  Products
                </Link>
                <Link
                  href="/about-us"
                  className="hover:text-white/70 transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/blogs"
                  className="hover:text-white/70 transition-colors"
                >
                  Blogs
                </Link>

                <Link
                  href="/partners"
                  className="hover:text-white/70 transition-colors"
                >
                  Partners
                </Link>
                <Link
                  href="/careers"
                  className="hover:text-white/70 transition-colors"
                >
                  Careers
                </Link>
                <Link
                  href="/contact-us"
                  className="hover:text-white/70 transition-colors"
                >
                  Contact
                </Link>
                <Link
                  href="/support"
                  className="hover:text-white/70 transition-colors"
                >
                  Support
                </Link>
                <Link
                  href="/privacy"
                  className="hover:text-white/70 transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/account-deletion"
                  className="hover:text-white/70 transition-colors"
                >
                  Account Deletion
                </Link>
              </div>

              <div className="flex flex-col gap-10">
                <div className="grid grid-cols-2 gap-10 justify-between items-start">
                  {/* USA Column */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4 transition-opacity break-all sm:break-normal">
                      <MapPin size={22} className="shrink-0 mt-1" />
                      <span>
                        <span className="uppercase font-semibold">
                          USA HeadQuarters
                        </span>
                        <br />
                        Marma Security Inc.,
                        <br />
                        180 Promenade Ste. 300,
                        <br />
                        Sacramento, CA - 95834
                      </span>
                    </div>
                    <a
                      href="tel:+14085828962"
                      className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-[2px]"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>+1-408-582-8962</span>
                    </a>
                  </div>

                  {/* India Column */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4 transition-opacity break-all sm:break-normal">
                      <MapPin size={22} className="shrink-0 mt-1" />
                      <span>
                        <span className="uppercase font-semibold">
                          India Office
                        </span>
                        <br />
                        Marmasec Private Limited,
                        <br />
                        J 1002, Mhada Towers,
                        <br />
                        Pimpri, Pune - 411017
                      </span>
                    </div>
                    <a
                      href="tel:+919175511808"
                      className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-[2px]"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>+91 9175511808</span>
                    </a>
                  </div>
                </div>

                {/* Email and Social */}
                <div className="grid grid-cols-2 gap-10 justify-between items-center w-full mt-2">
                  <a
                    href="mailto:info@marmasec.com"
                    className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>info@marmasec.com</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/company/marmasecurity/"
                    target="_blank"
                    aria-label="LinkedIn"
                    className="hover:opacity-80 transition-opacity flex items-center"
                  >
                    <Image
                      src="/images/global/linkedin.svg"
                      alt="LinkedIn"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* ======================================= */}
            {/* MOBILE-ONLY UNIFIED 3-COLUMN GRID       */}
            {/* ======================================= */}
            <div className="flex md:hidden flex-col w-full pb-8">
              <div className="grid grid-cols-[1fr_1fr] gap-x-2 gap-y-6 w-full items-start">
                {/* Column 1 */}
                <div className="flex flex-col gap-3 footer-nav-grid text-[10px] ps-5">
                  <Link
                    href="/technology"
                    className="hover:text-white/70 transition-colors"
                  >
                    Technology
                  </Link>
                  <Link
                    href="/about-us"
                    className="hover:text-white/70 transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/blogs"
                    className="hover:text-white/70 transition-colors"
                  >
                    Blogs
                  </Link>
                  <Link
                    href="/product"
                    className="hover:text-white/70 transition-colors"
                  >
                    Products
                  </Link>
                  <Link
                    href="/partners"
                    className="hover:text-white/70 transition-colors"
                  >
                    Partners
                  </Link>
                  <Link
                    href="/account-deletion"
                    className="hover:text-white/70 transition-colors"
                  >
                    Account Deletion
                  </Link>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-3 footer-nav-grid text-[10px] ps-4">
                  <Link
                    href="/careers"
                    className="hover:text-white/70 transition-colors"
                  >
                    Careers
                  </Link>
                  <Link
                    href="/contact-us"
                    className="hover:text-white/70 transition-colors"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/support"
                    className="hover:text-white/70 transition-colors"
                  >
                    Support
                  </Link>
                  <Link
                    href="/privacy"
                    className="hover:text-white/70 transition-colors"
                  >
                    Privacy
                  </Link>
                </div>

                {/* Column 3 - Contact Links */}
                <div className="flex flex-col gap-8 footer-contact-text text-[9px] pl-1 break-all col-span-2">
                  <div className="grid grid-cols-2 gap-4 w-full pr-4">
                    {/* USA Column */}
                    <div className="flex flex-col gap-3 min-w-0">
                      <div className="flex items-start gap-1 break-all sm:break-normal">
                        <MapPin size={16} className="shrink-0 mt-[2px]" />
                        <span>
                          <span className="uppercase font-semibold">
                            USA HeadQuarters
                          </span>
                          <br />
                          Marma Security Inc.,
                          <br />
                          180 Promenade Ste. 300, Sacramento, CA - 95834
                        </span>
                      </div>
                      <a
                        href="tel:+14085828962"
                        className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="shrink-0 ml-[2px]"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>+1-408-582-8962</span>
                      </a>
                    </div>

                    {/* India Column */}
                    <div className="flex flex-col gap-3 min-w-0">
                      <div className="flex items-start gap-1 break-all sm:break-normal">
                        <MapPin size={16} className="shrink-0 mt-[2px]" />
                        <span>
                          <span className="uppercase font-semibold">
                            India Office
                          </span>
                          <br />
                          Marmasec Private Limited,
                          <br />
                          J 1002, Mhada Towers,
                          <br />
                          Pimpri, Pune - 411017
                        </span>
                      </div>
                      <a
                        href="tel:+919175511808"
                        className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="shrink-0 ml-[2px]"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>+91 9175511808</span>
                      </a>
                    </div>
                  </div>

                  {/* Email and Social */}
                  <div className="grid grid-cols-2 gap-8 w-full items-center pr-4 mt-2">
                    <a
                      href="mailto:info@marmasec.com"
                      className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span>info@marmasec.com</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/company/marmasecurity/"
                      target="_blank"
                      aria-label="LinkedIn"
                      className="hover:opacity-80 transition-opacity flex items-center shrink-0"
                    >
                      <Image
                        src="/images/global/linkedin.svg"
                        alt="LinkedIn"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="flex flex-col items-center lg:items-end justify-center lg:justify-end mt-4 lg:mt-0 lg:mb-0 md:w-1/2">
            <div className="footer-form-glass">
              <FooterContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div
        className="footer-bottom-bar"
        style={{
          background: `
                            linear-gradient(
                            90deg,
                            #7D0202 0%,
                            rgba(187,4,4,0.93) 25%,
                            #7D0202 50%,
                            #BB0404 75%,
                            #7D0202 100%
                            )`,
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-center">
          <p className="footer-copyright text-white">
            &copy; Copyright {new Date().getFullYear()} - Marma Security Inc
          </p>
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
    message: "",
    subject: "",
  });
  const [errors, setErrors] = useState<FooterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
        message: "Please fix the errors below and try again.",
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitStatus(null);

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
  };

  return (
    <form
      className="flex flex-col gap-5 md:gap-4"
      onSubmit={handleSubmit}
      noValidate
    >
      {submitStatus && (
        <div
          className={`px-3 py-2 rounded-lg text-xs font-medium ${
            submitStatus.type === "success"
              ? "bg-green-900/30 text-green-300 border border-green-700/40"
              : "bg-red-900/30 text-red-300 border border-red-700/40"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className={`footer-input-field ${errors.name ? "border border-red-500" : ""}`}
          disabled={isSubmitting}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <span className="text-xs text-red-400 px-1">{errors.name}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          className={`footer-input-field ${errors.email ? "border border-red-500" : ""}`}
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <span className="text-xs text-red-400 px-1">{errors.email}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <CustomSelect
          options={[
            { value: "sales-agent", label: "Becoming a Sales Agent" },
            { value: "partnership", label: "Partnership" },
            { value: "investors", label: "Investors" },
            { value: "product-question", label: "Product Questions" },
            { value: "other", label: "Other" },
          ]}
          value={formData.subject}
          placeholder="Area of interest"
          onChange={(val) => {
            setFormData((prev) => ({ ...prev, subject: val }));
            if (errors.subject)
              setErrors((prev) => ({ ...prev, subject: undefined }));
          }}
          disabled={isSubmitting}
          triggerClassName={`footer-input-field ${errors.subject ? "border border-red-500" : ""}`}
          menuClassName="bg-[#1A1818] border-white/20"
          activeOptionClassName="bg-brand-red text-white"
          hoverOptionClassName="hover:bg-white/10 hover:text-white"
          placeholderColorClass="text-[#FFFFFFCC]"
          valueColorClass="text-white"
          arrowColor="white"
          openDirection="down"
        />
        {errors.subject && (
          <span className="text-xs text-red-400 px-1">{errors.subject}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handlePhoneChange}
          className={`footer-input-field ${errors.phone ? "border border-red-500" : ""}`}
          disabled={isSubmitting}
          aria-invalid={!!errors.phone}
          inputMode="tel"
          maxLength={15}
        />
        {errors.phone && (
          <span className="text-xs text-red-400 px-1">{errors.phone}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <textarea
          name="message"
          placeholder="Let us know how we can help..."
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`footer-input-field resize-none min-h-[80px] md:min-h-[100px] ${errors.message ? "border border-red-500" : ""}`}
          disabled={isSubmitting}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <span className="text-xs text-red-400 px-1">{errors.message}</span>
        )}
      </div>

      <div className="flex justify-center lg:justify-end pt-3">
        <Button icon label={isSubmitting ? "Submitting..." : "Submit"} />
      </div>
    </form>
  );
}
