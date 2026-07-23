"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Paperclip } from "lucide-react";
import { submitApplication } from "@/lib/careers";

interface ApplicationFormProps {
  job: {
    id: string | number;
    title: string;
  };
  onSuccess: () => void;
  isFilled?: boolean;
}

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function ApplicationForm({
  job,
  onSuccess,
  isFilled = false,
}: ApplicationFormProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setValidationError(
        "Invalid file type. Only PDF, DOC, or DOCX files are allowed.",
      );
      e.target.value = "";
      setResumeFile(null);
      return;
    }

    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setValidationError(
        "Invalid file extension. Only .pdf, .doc, .docx are allowed.",
      );
      e.target.value = "";
      setResumeFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setValidationError(
        `File too large. Maximum allowed size is ${MAX_FILE_SIZE_MB}MB.`,
      );
      e.target.value = "";
      setResumeFile(null);
      return;
    }

    setValidationError("");
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!resumeFile) {
      setValidationError("Please attach your resume before submitting.");
      return;
    }

    if (!ALLOWED_MIME_TYPES.includes(resumeFile.type)) {
      setValidationError(
        "Invalid file type. Only PDF, DOC, or DOCX files are allowed.",
      );
      return;
    }

    if (resumeFile.size > MAX_FILE_SIZE_BYTES) {
      setValidationError(
        `Resume file size must be less than ${MAX_FILE_SIZE_MB}MB.`,
      );
      return;
    }

    setValidationError("");
    setIsSubmitting(true);

    const formEl = e.currentTarget;
    const getVal = (name: string) =>
      (formEl.elements.namedItem(name) as HTMLInputElement)?.value?.trim() ||
      "";

    const fullName = getVal("Name");
    const email = getVal("Email");
    const phone = getVal("Phone");
    const city = getVal("City");
    const totalExperience = getVal("Total Experience");
    const relevantExperience = getVal("Relevant Experience");
    const currentCTC = getVal("Current CTC");
    const expectedCTC = getVal("Expected CTC");
    const noticePeriod = getVal("Notice Period");

    // Backend expects yearsOfExperience as a number; extract leading digits
    // from free-text values like "3 Years" so validation doesn't fail.
    const numericExperienceMatch = totalExperience.match(/[\d.]+/);
    const yearsOfExperience = numericExperienceMatch
      ? parseFloat(numericExperienceMatch[0])
      : undefined;

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("currentLocation", city);
    if (yearsOfExperience !== undefined) {
      formData.append("yearsOfExperience", String(yearsOfExperience));
    }
    formData.append("currentCompensation", currentCTC);
    formData.append("expectedCompensation", expectedCTC);
    formData.append("noticePeriod", noticePeriod);
    formData.append("consentToDataProcessing", "true");
    formData.append("source", "careers-page");
    formData.append("resume", resumeFile);

    // Preserve original free-text values (e.g. "3 Years", "e.g., 2 Years")
    // in additionalQuestions so nothing entered by the applicant is lost,
    // even fields the backend schema doesn't explicitly model.
    formData.append("additionalQuestions[totalExperience]", totalExperience);
    formData.append(
      "additionalQuestions[relevantExperience]",
      relevantExperience,
    );
    formData.append("additionalQuestions[jobTitle]", job.title);

    const result = await submitApplication(job.id, formData);

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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Validation Error Banner */}
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
            required
            type="text"
            name="Name"
            disabled={isFilled}
            placeholder={isFilled ? "Applications Closed" : "John Doe"}
            className="w-full px-5 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-brand-red/50 transition-colors placeholder-slate-400/60 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#1E293B] capitalize tracking-wider">
            Email
          </label>
          <input
            required
            type="email"
            name="Email"
            disabled={isFilled}
            placeholder={isFilled ? "Applications Closed" : "john@example.com"}
            className="w-full px-5 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-brand-red/50 transition-colors placeholder-slate-400/60 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#1E293B] capitalize tracking-wider">
            Phone
          </label>
          <input
            required
            type="tel"
            name="Phone"
            disabled={isFilled}
            placeholder={isFilled ? "Applications Closed" : "+91 98765 43210"}
            className="w-full px-5 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-brand-red/50 transition-colors placeholder-slate-400/60 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#1E293B] capitalize tracking-wider">
            City
          </label>
          <input
            required
            type="text"
            name="City"
            disabled={isFilled}
            placeholder={isFilled ? "Applications Closed" : "Pune"}
            className="w-full px-5 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-brand-red/50 transition-colors placeholder-slate-400/60 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#1E293B] capitalize tracking-wider">
            Total Experience
          </label>
          <input
            required
            type="text"
            name="Total Experience"
            disabled={isFilled}
            placeholder={isFilled ? "Applications Closed" : "e.g., 3 Years"}
            className="w-full px-5 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-brand-red/50 transition-colors placeholder-slate-400/60 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#1E293B] capitalize tracking-wider">
            Relevant Experience
          </label>
          <input
            required
            type="text"
            name="Relevant Experience"
            disabled={isFilled}
            placeholder={isFilled ? "Applications Closed" : "e.g., 2 Years"}
            className="w-full px-5 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-brand-red/50 transition-colors placeholder-slate-400/60 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#1E293B] capitalize tracking-wider">
            Current CTC
          </label>
          <input
            required
            type="text"
            name="Current CTC"
            disabled={isFilled}
            placeholder={isFilled ? "Applications Closed" : "e.g., 8 LPA"}
            className="w-full px-5 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-brand-red/50 transition-colors placeholder-slate-400/60 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#1E293B] capitalize tracking-wider">
            Expected CTC
          </label>
          <input
            required
            type="text"
            name="Expected CTC"
            disabled={isFilled}
            placeholder={isFilled ? "Applications Closed" : "e.g., 10 LPA"}
            className="w-full px-5 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-brand-red/50 transition-colors placeholder-slate-400/60 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-semibold text-[#1E293B] capitalize tracking-wider">
          Notice Period
        </label>
        <input
          required
          type="text"
          name="Notice Period"
          disabled={isFilled}
          placeholder={isFilled ? "Applications Closed" : "e.g., 30 Days"}
          className="w-full px-5 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-brand-red/50 transition-colors placeholder-slate-400/60 disabled:opacity-50 disabled:cursor-not-allowed"
        />
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
          } ${
            validationError && !resumeFile && !isFilled ? "border-red-400" : ""
          }`}
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
