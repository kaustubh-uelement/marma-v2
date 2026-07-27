"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Paperclip } from "lucide-react";
import { submitApplication } from "@/lib/careers";
import type { JobWithSubmitUrl } from "@/lib/careers";
import {
  validateApplicationFields,
  validateDocumentFile,
  sanitizePhone,
  type ApplicationFieldErrors,
} from "@/lib/formValidation";

interface ApplicationFormProps {
  job: JobWithSubmitUrl;
  onSuccess: () => void;
  isFilled?: boolean;
}

export default function ApplicationForm({
  job,
  onSuccess,
  isFilled = false,
}: ApplicationFormProps) {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    totalExperience: "",
    relevantExperience: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
  });
  const [errors, setErrors] = useState<ApplicationFieldErrors>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ApplicationFieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (validationError) setValidationError("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizePhone(e.target.value);
    setFormValues((prev) => ({ ...prev, phone: sanitized }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
    if (validationError) setValidationError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    const fileErr = validateDocumentFile(file);

    if (fileErr) {
      setResumeError(fileErr);
      setResumeFile(null);
      e.target.value = "";
      return;
    }

    setResumeError("");
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fieldErrors = validateApplicationFields(formValues);
    const fileErr = validateDocumentFile(resumeFile);

    if (fileErr) setResumeError(fileErr);
    if (Object.keys(fieldErrors).length > 0 || fileErr) {
      setErrors(fieldErrors);
      setValidationError("Please fix the errors below and try again.");
      return;
    }

    setErrors({});
    setResumeError("");
    setValidationError("");
    setIsSubmitting(true);

    const numericExperienceMatch = formValues.totalExperience.match(/[\d.]+/);
    const yearsOfExperience = numericExperienceMatch
      ? parseFloat(numericExperienceMatch[0])
      : undefined;

    const formData = new FormData();
    formData.append("fullName", formValues.fullName.trim());
    formData.append("email", formValues.email.trim());
    formData.append("phone", formValues.phone.trim());
    formData.append("currentLocation", formValues.city.trim());
    if (yearsOfExperience !== undefined) {
      formData.append("yearsOfExperience", String(yearsOfExperience));
    }
    formData.append("currentCompensation", formValues.currentCTC.trim());
    formData.append("expectedCompensation", formValues.expectedCTC.trim());
    formData.append("noticePeriod", formValues.noticePeriod.trim());
    formData.append("consentToDataProcessing", "true");
    formData.append("source", "careers-page");
    formData.append("resume", resumeFile as File);

    formData.append(
      "additionalQuestions[totalExperience]",
      formValues.totalExperience.trim(),
    );
    formData.append(
      "additionalQuestions[relevantExperience]",
      formValues.relevantExperience.trim(),
    );
    formData.append("additionalQuestions[jobTitle]", job.title);

    const result = await submitApplication(job.submitUrl, formData);

    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      setResumeFile(null);
      setTimeout(() => {
        onSuccess();
      }, 3000);
    } else {
      setValidationError(result.message);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="font-banner text-[24px] text-[#1E293B] mb-2">
          Application Submitted!
        </h3>
        <p className="font-title text-[#64748B] mb-6 max-w-[300px]">
          Thank you for applying to the {job.title} role. Our team will review
          your application and get back to you soon.
        </p>
      </div>
    );
  }

  const inputClass = (hasError?: string) =>
    `w-full px-5 py-3 bg-[#F8FAFC] border rounded-xl focus:outline-none focus:border-brand-red/50 transition-colors placeholder-slate-400/60 disabled:opacity-50 disabled:cursor-not-allowed ${
      hasError ? "border-red-400" : "border-[#E2E8F0]"
    }`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {validationError && (
        <div className="p-4 bg-red-50 text-brand-red rounded-xl flex items-center gap-3 font-title text-[15px] border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#1E293B] capitalize tracking-wider">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
            disabled={isFilled}
            placeholder={isFilled ? "Applications Closed" : "John Doe"}
            className={inputClass(errors.fullName)}
          />
          {errors.fullName && (
            <span className="text-xs text-red-600 px-1">{errors.fullName}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#1E293B] capitalize tracking-wider">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            disabled={isFilled}
            placeholder={isFilled ? "Applications Closed" : "john@example.com"}
            className={inputClass(errors.email)}
          />
          {errors.email && (
            <span className="text-xs text-red-600 px-1">{errors.email}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#1E293B] capitalize tracking-wider">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formValues.phone}
            onChange={handlePhoneChange}
            disabled={isFilled}
            placeholder={isFilled ? "Applications Closed" : "+91 98765 43210"}
            className={inputClass(errors.phone)}
            inputMode="tel"
            maxLength={15}
          />
          {errors.phone && (
            <span className="text-xs text-red-600 px-1">{errors.phone}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#1E293B] capitalize tracking-wider">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formValues.city}
            onChange={handleChange}
            disabled={isFilled}
            placeholder={isFilled ? "Applications Closed" : "Pune"}
            className={inputClass(errors.city)}
          />
          {errors.city && (
            <span className="text-xs text-red-600 px-1">{errors.city}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#1E293B] capitalize tracking-wider">
            Total Experience
          </label>
          <input
            type="text"
            name="totalExperience"
            value={formValues.totalExperience}
            onChange={handleChange}
            disabled={isFilled}
            placeholder={isFilled ? "Applications Closed" : "e.g., 3 Years"}
            className={inputClass(errors.totalExperience)}
          />
          {errors.totalExperience && (
            <span className="text-xs text-red-600 px-1">
              {errors.totalExperience}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#1E293B] capitalize tracking-wider">
            Relevant Experience
          </label>
          <input
            type="text"
            name="relevantExperience"
            value={formValues.relevantExperience}
            onChange={handleChange}
            disabled={isFilled}
            placeholder={isFilled ? "Applications Closed" : "e.g., 2 Years"}
            className={inputClass(errors.relevantExperience)}
          />
          {errors.relevantExperience && (
            <span className="text-xs text-red-600 px-1">
              {errors.relevantExperience}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#1E293B] capitalize tracking-wider">
            Current CTC
          </label>
          <input
            type="text"
            name="currentCTC"
            value={formValues.currentCTC}
            onChange={handleChange}
            disabled={isFilled}
            placeholder={isFilled ? "Applications Closed" : "e.g., 8 LPA"}
            className={inputClass(errors.currentCTC)}
          />
          {errors.currentCTC && (
            <span className="text-xs text-red-600 px-1">
              {errors.currentCTC}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#1E293B] capitalize tracking-wider">
            Expected CTC
          </label>
          <input
            type="text"
            name="expectedCTC"
            value={formValues.expectedCTC}
            onChange={handleChange}
            disabled={isFilled}
            placeholder={isFilled ? "Applications Closed" : "e.g., 10 LPA"}
            className={inputClass(errors.expectedCTC)}
          />
          {errors.expectedCTC && (
            <span className="text-xs text-red-600 px-1">
              {errors.expectedCTC}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-semibold text-[#1E293B] capitalize tracking-wider">
          Notice Period
        </label>
        <input
          type="text"
          name="noticePeriod"
          value={formValues.noticePeriod}
          onChange={handleChange}
          disabled={isFilled}
          placeholder={isFilled ? "Applications Closed" : "e.g., 30 Days"}
          className={inputClass(errors.noticePeriod)}
        />
        {errors.noticePeriod && (
          <span className="text-xs text-red-600 px-1">
            {errors.noticePeriod}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-semibold text-[#1E293B] capitalize tracking-wider border-0 h-auto p-0 m-0 leading-none">
          Attach Resume
        </label>
        <label
          className={`w-full px-5 py-4 bg-[#F8FAFC] border border-dashed rounded-xl transition-colors flex items-center justify-center gap-3 ${
            isFilled
              ? "cursor-not-allowed bg-slate-50 border-slate-200"
              : "cursor-pointer hover:bg-[#F1F5F9] border-[#CBD5E1]"
          } ${resumeError ? "border-red-400" : ""}`}
        >
          <Paperclip className="w-5 h-5 text-[#64748B]" />
          <span className="text-[#64748B] font-medium text-[15px]">
            {isFilled
              ? "Applications Closed"
              : resumeFile
                ? resumeFile.name
                : "Click to upload resume (PDF, DOCX — max 5MB)"}
          </span>
          <input
            type="file"
            name="Attachment"
            disabled={isFilled}
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </label>
        {resumeError && (
          <span className="text-xs text-red-600 px-1">{resumeError}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isFilled}
        className="w-full bg-brand-red text-white py-4 mt-2 rounded-xl font-title font-semibold text-[18px] transition-all hover:bg-brand-red-hover hover:shadow-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:grayscale disabled:cursor-not-allowed"
      >
        {isFilled
          ? "Position Filled"
          : isSubmitting
            ? "Sending Application..."
            : "Submit Application"}
        {!isFilled && <Send className="w-5 h-5" />}
      </button>
    </form>
  );
}
