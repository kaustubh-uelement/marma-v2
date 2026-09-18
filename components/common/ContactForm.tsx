"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/contactApi";

export interface ContactFormProps {
  title?: string;
  defaultInterest?: string;
  note?: string;
  submitButtonText?: string;
}

export default function ContactForm({
  title = "Talk to us",
  defaultInterest = "Endpoint protection",
  note = "We reply within one business day. For urgent product support, use the support page instead.",
  submitButtonText = "Send enquiry",
}: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState({
    fn: "",
    ln: "",
    em: "",
    ph: "",
    co: "",
    ai: defaultInterest,
    ms: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await submitContactForm({
        name: (formData.fn + " " + formData.ln).trim(),
        firstName: formData.fn.trim(),
        lastName: formData.ln.trim(),
        email: formData.em.trim(),
        phone: formData.ph.trim(),
        company: formData.co.trim(),
        message: formData.ms.trim(),
        extra_field: {
          areaOfInterest: formData.ai,
          source: title,
        },
      });

      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(res.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <form className="form glass glass-hi rv" onSubmit={handleSubmit}>
      <h3>{title}</h3>
      {status === "success" ? (
        <div style={{ padding: "20px 0" }}>
          <div className="eyebrow" style={{ marginBottom: "10px" }}>
            Message received
          </div>
          <h4 style={{ margin: "0 0 10px", fontSize: "1.15rem" }}>
            Thank you for reaching out.
          </h4>
          <p style={{ color: "var(--mute)", fontSize: "0.92rem", lineHeight: 1.6 }}>
            Our engineering team has received your enquiry and will follow up within one business day.
          </p>
          <button
            type="button"
            className="btn btn-glass"
            style={{ marginTop: "20px" }}
            onClick={() => {
              setStatus("idle");
              setFormData({
                fn: "",
                ln: "",
                em: "",
                ph: "",
                co: "",
                ai: defaultInterest,
                ms: "",
              });
            }}
          >
            Send another enquiry
          </button>
        </div>
      ) : (
        <>
          {status === "error" && errorMessage && (
            <div style={{ color: "var(--red)", fontSize: "0.85rem", padding: "8px 12px", background: "var(--red-wash)", borderRadius: "8px", border: "1px solid var(--red-line)" }}>
              {errorMessage}
            </div>
          )}
          <div className="row">
            <div>
              <label className="field-l" htmlFor="fn">
                First name
              </label>
              <input
                className="inp"
                id="fn"
                name="fn"
                type="text"
                autoComplete="given-name"
                required
                value={formData.fn}
                onChange={(e) => setFormData({ ...formData, fn: e.target.value })}
              />
            </div>
            <div>
              <label className="field-l" htmlFor="ln">
                Last name
              </label>
              <input
                className="inp"
                id="ln"
                name="ln"
                type="text"
                autoComplete="family-name"
                required
                value={formData.ln}
                onChange={(e) => setFormData({ ...formData, ln: e.target.value })}
              />
            </div>
          </div>

          <div className="row">
            <div>
              <label className="field-l" htmlFor="em">
                Work email
              </label>
              <input
                className="inp"
                id="em"
                name="em"
                type="email"
                autoComplete="email"
                required
                value={formData.em}
                onChange={(e) => setFormData({ ...formData, em: e.target.value })}
              />
            </div>
            <div>
              <label className="field-l" htmlFor="ph">
                Phone
              </label>
              <input
                className="inp"
                id="ph"
                name="ph"
                type="tel"
                autoComplete="tel"
                value={formData.ph}
                onChange={(e) => setFormData({ ...formData, ph: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="field-l" htmlFor="co">
              Organisation
            </label>
            <input
              className="inp"
              id="co"
              name="co"
              type="text"
              autoComplete="organization"
              required
              value={formData.co}
              onChange={(e) => setFormData({ ...formData, co: e.target.value })}
            />
          </div>

          <div>
            <label className="field-l" htmlFor="ai">
              Area of interest
            </label>
            <select
              className="inp"
              id="ai"
              name="ai"
              value={formData.ai}
              onChange={(e) => setFormData({ ...formData, ai: e.target.value })}
            >
              <option>Endpoint protection</option>
              <option>Email security</option>
              <option>Cloud data protection</option>
              <option>Compliance 360</option>
              <option>Security gateways</option>
              <option>Partner programme</option>
              <option>Something else</option>
            </select>
          </div>

          <div>
            <label className="field-l" htmlFor="ms">
              What are you trying to solve?
            </label>
            <textarea
              className="inp"
              id="ms"
              name="ms"
              rows={4}
              value={formData.ms}
              onChange={(e) => setFormData({ ...formData, ms: e.target.value })}
            />
          </div>

          <button
            className="btn btn-red"
            type="submit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending..." : submitButtonText}
          </button>

          {note && <p className="form-note">{note}</p>}
        </>
      )}
    </form>
  );
}
