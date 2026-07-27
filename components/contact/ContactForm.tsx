"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../global/Button";
import CustomSelect from "../global/CustomSelect";
import { submitContactForm } from "@/lib/contactApi";
import { validateContactFields, sanitizePhone } from "@/lib/formValidation";

interface ContactFormProps {
  onSuccess?: () => void;
  isSupport?: boolean;
}

type FormErrors = Partial<{
  name: string;
  email: string;
  phone: string;
  subject: string;
  issue: string;
  message: string;
}>;

export default function ContactForm({
  onSuccess,
  isSupport = false,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    issue: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizePhone(e.target.value);
    setFormData((prev) => ({ ...prev, phone: sanitized }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
    if (submitStatus) setSubmitStatus(null);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
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

    const newErrors: FormErrors = { ...fieldErrors };
    if (isSupport) {
      if (!formData.issue) newErrors.issue = "Please select an issue";
    } else {
      if (!formData.subject) newErrors.subject = "Please select an option";
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
        source: isSupport ? "Support Page" : "Contact Us Page",
        ...(isSupport
          ? { issue: formData.issue }
          : { subject: formData.subject }),
      },
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitStatus({ type: "success", message: result.message });
      setFormData({
        name: "",
        email: "",
        subject: "",
        issue: "",
        phone: "",
        message: "",
      });
      if (onSuccess) onSuccess();
    } else {
      setSubmitStatus({ type: "error", message: result.message });
    }
  };

  return (
    <div className="bg-white rounded-[12px] border border-[#E5E5E5] shadow-sm p-6 md:p-8 lg:p-10 flex flex-col h-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
        {submitStatus && (
          <div
            className={`px-4 py-3 rounded-lg text-sm font-medium ${
              submitStatus.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        {/* Row 1: Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex flex-col gap-1.5">
            {isSupport && (
              <label className="text-sm font-medium text-text-dark px-1">
                Name
              </label>
            )}
            <input
              type="text"
              name="name"
              placeholder="Your name here"
              value={formData.name}
              onChange={handleChange}
              className={`contact-form-input ${errors.name ? "border-red-500" : ""}`}
              disabled={isSubmitting}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <span className="text-xs text-red-600 px-1">{errors.name}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            {isSupport && (
              <label className="text-sm font-medium text-text-dark px-1">
                Email
              </label>
            )}
            <input
              type="email"
              name="email"
              placeholder="Your email here"
              value={formData.email}
              onChange={handleChange}
              className={`contact-form-input ${errors.email ? "border-red-500" : ""}`}
              disabled={isSubmitting}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <span className="text-xs text-red-600 px-1">{errors.email}</span>
            )}
          </div>
        </div>

        {/* Row 2: Subject/Issue + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex flex-col gap-1.5">
            {isSupport && (
              <label className="text-sm font-medium text-text-dark px-1">
                Issue
              </label>
            )}
            {!isSupport ? (
              <>
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
                  triggerClassName={`contact-form-input ${errors.subject ? "border-red-500" : ""}`}
                  menuClassName="bg-white border-[#E5E5E5]"
                  activeOptionClassName="bg-brand-red text-white"
                  hoverOptionClassName="hover:bg-black/5"
                  placeholderColorClass="text-[#989898]"
                  valueColorClass="text-text-dark"
                  arrowColor="#989898"
                  openDirection="down"
                />
                {errors.subject && (
                  <span className="text-xs text-red-600 px-1">
                    {errors.subject}
                  </span>
                )}
              </>
            ) : (
              <>
                <CustomSelect
                  options={[
                    {
                      value: "delivery-issue",
                      label: "Product was not delivered to me",
                    },
                    {
                      value: "installation-issue",
                      label: "Installation issue",
                    },
                    { value: "app-issue", label: "Mobile App Issue" },
                    { value: "product-question", label: "Product Questions" },
                    { value: "other", label: "Other" },
                  ]}
                  value={formData.issue}
                  placeholder="Select an issue"
                  onChange={(val) => {
                    setFormData((prev) => ({ ...prev, issue: val }));
                    if (errors.issue)
                      setErrors((prev) => ({ ...prev, issue: undefined }));
                  }}
                  disabled={isSubmitting}
                  triggerClassName={`contact-form-input ${errors.issue ? "border-red-500" : ""}`}
                  menuClassName="bg-[#555555] border-[#E5E5E5]"
                  optionClassName="text-white text-[14px] md:text-[16px]"
                  activeOptionClassName="bg-brand-red text-white"
                  hoverOptionClassName="hover:bg-white/10"
                  placeholderColorClass="text-[#989898]"
                  valueColorClass="text-text-dark"
                  arrowColor="#989898"
                  openDirection="down"
                />
                {errors.issue && (
                  <span className="text-xs text-red-600 px-1">
                    {errors.issue}
                  </span>
                )}
              </>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            {isSupport && (
              <label className="text-sm font-medium text-text-dark px-1">
                Phone Number
              </label>
            )}
            <input
              type="tel"
              name="phone"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={handlePhoneChange}
              className={`contact-form-input ${errors.phone ? "border-red-500" : ""}`}
              disabled={isSubmitting}
              aria-invalid={!!errors.phone}
              inputMode="tel"
              maxLength={15}
            />
            {errors.phone && (
              <span className="text-xs text-red-600 px-1">{errors.phone}</span>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          {isSupport && (
            <label className="text-sm font-medium text-text-dark px-1">
              How can we help?
            </label>
          )}
          <textarea
            name="message"
            placeholder="Tell us a few words"
            rows={8}
            value={formData.message}
            onChange={handleChange}
            className={`contact-form-input resize-none ${errors.message ? "border-red-500" : ""}`}
            disabled={isSubmitting}
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <span className="text-xs text-red-600 px-1">{errors.message}</span>
          )}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4">
            <Link
              href="https://www.linkedin.com/company/marmasecurity/"
              target="_blank"
              aria-label="LinkedIn"
              className="hover:opacity-70 transition-opacity"
            >
              <Image
                src="/images/contact/contact-us-linkedin.svg"
                alt="LinkedIn"
                width={72}
                height={72}
                className="object-contain"
              />
            </Link>
          </div>

          <Button icon label={isSubmitting ? "Submitting..." : "Submit"} />
        </div>
      </form>
    </div>
  );
}
