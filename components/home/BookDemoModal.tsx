"use client";

import React, { useState } from "react";
import Button from "../global/Button";

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookDemoTitle?: string;
}

export default function BookDemoModal({
  isOpen,
  onClose,
  bookDemoTitle,
}: BookDemoModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const body = new FormData();
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";
      body.append("access_key", accessKey);
      body.append("name", formData.name);
      body.append("email", formData.email);
      body.append("phone", formData.phone);
      body.append("company", formData.companyName);
      body.append("source", "Book a Demo");
      body.append("message", `Demo request from ${formData.companyName}`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body,
      });

      const data = await response.json();
      setIsSubmitting(false);

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message:
            "Demo request submitted successfully! We'll be in touch soon.",
        });
        setFormData({ name: "", email: "", companyName: "", phone: "" });
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Submission failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Book Demo submission error:", error);
      setIsSubmitting(false);
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal  */}
      <div
        className="relative w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden"
        style={{ maxHeight: "calc(100dvh - 32px)" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Scrollable inner */}
        <div
          className="bg-white overflow-y-auto"
          style={{ maxHeight: "calc(100dvh - 32px)" }}
        >
          <div
            style={{ padding: "clamp(20px, 4vh, 40px) clamp(20px, 4vw, 40px)" }}
          >
            <h3
              className="fl-banner-title text-text-dark font-semibold! text-center"
              style={{ marginBottom: "clamp(4px, 1vh, 8px)" }}
            >
              {bookDemoTitle || "Book a Demo"}
            </h3>

            <p
              className="text-center text-[#989898]"
              style={{
                fontSize: "clamp(13px, 1.5vh, 16px)",
                marginBottom: "clamp(12px, 2.5vh, 32px)",
              }}
            >
              Fill in your details to start your free trial and experience how
              Marma Security can protect your business.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(10px, 1.8vh, 20px)",
              }}
            >
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

              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text-dark px-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="contact-form-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text-dark px-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="contact-form-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Company + Phone — side by side on wide short screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-dark px-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Your company name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="contact-form-input"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-dark px-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="contact-form-input"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Submit */}
              <div
                className="flex justify-end"
                style={{ paddingTop: "clamp(4px, 1vh, 8px)" }}
              >
                <Button
                  icon
                  label={isSubmitting ? "Submitting..." : "Submit"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
