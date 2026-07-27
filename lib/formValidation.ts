// ─── Regex Patterns ─────────────────────────────────────────────
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^[+]?[\d\s()-]{7,15}$/;
export const NAME_REGEX = /^[a-zA-Z\s.'-]{2,60}$/;

// ─── Sanitizers ─────────────────────────────────────────────────
export function sanitizePhone(value: string) {
  return value.replace(/[^\d+\s()-]/g, "").slice(0, 15);
}

// ─── Field-Level Validators ─────────────────────────────────────
export function validateName(
  value: string,
  label = "Name",
): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return `${label} is required`;
  if (trimmed.length < 2) return `${label} must be at least 2 characters`;
  if (!NAME_REGEX.test(trimmed)) return `${label} contains invalid characters`;
  return undefined;
}

export function validateEmail(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required";
  if (!EMAIL_REGEX.test(trimmed)) return "Enter a valid email address";
  return undefined;
}

export function validatePhone(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Phone number is required";
  if (!PHONE_REGEX.test(trimmed)) return "Enter a valid phone number";
  return undefined;
}

export function validateRequiredText(
  value: string,
  label: string,
  minLen = 1,
): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return `${label} is required`;
  if (trimmed.length < minLen) return `${label} looks too short`;
  return undefined;
}

// ─── File Validation (resume/document uploads) ──────────────────
export const ALLOWED_DOC_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const ALLOWED_DOC_EXTENSIONS = [".pdf", ".doc", ".docx"];
export const MAX_DOC_SIZE_MB = 5;
export const MAX_DOC_SIZE_BYTES = MAX_DOC_SIZE_MB * 1024 * 1024;

export function validateDocumentFile(file: File | null): string | undefined {
  if (!file) return "Please attach your resume before submitting.";
  if (!ALLOWED_DOC_MIME_TYPES.includes(file.type)) {
    return "Invalid file type. Only PDF, DOC, or DOCX files are allowed.";
  }
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!ALLOWED_DOC_EXTENSIONS.includes(ext)) {
    return "Invalid file extension. Only .pdf, .doc, .docx are allowed.";
  }
  if (file.size > MAX_DOC_SIZE_BYTES) {
    return `File too large. Maximum allowed size is ${MAX_DOC_SIZE_MB}MB.`;
  }
  return undefined;
}

// ─── Contact / Footer Forms ──────────────────────────────────────
export interface ContactFieldsInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type ContactFieldErrors = Partial<
  Record<keyof ContactFieldsInput, string>
>;

export function validateContactFields(
  data: ContactFieldsInput,
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  const nameErr = validateName(data.name);
  if (nameErr) errors.name = nameErr;

  const emailErr = validateEmail(data.email);
  if (emailErr) errors.email = emailErr;

  const phoneErr = validatePhone(data.phone);
  if (phoneErr) errors.phone = phoneErr;

  const messageErr = validateRequiredText(data.message, "Message", 10);
  if (messageErr) errors.message = messageErr;

  return errors;
}

// ─── Careers Application Form ────────────────────────────────────
export interface ApplicationFieldsInput {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  totalExperience: string;
  relevantExperience: string;
  currentCTC: string;
  expectedCTC: string;
  noticePeriod: string;
}

export type ApplicationFieldErrors = Partial<
  Record<keyof ApplicationFieldsInput, string>
>;

export function validateApplicationFields(
  data: ApplicationFieldsInput,
): ApplicationFieldErrors {
  const errors: ApplicationFieldErrors = {};

  const nameErr = validateName(data.fullName, "Full name");
  if (nameErr) errors.fullName = nameErr;

  const emailErr = validateEmail(data.email);
  if (emailErr) errors.email = emailErr;

  const phoneErr = validatePhone(data.phone);
  if (phoneErr) errors.phone = phoneErr;

  const cityErr = validateRequiredText(data.city, "City", 2);
  if (cityErr) errors.city = cityErr;

  const totalExpErr = validateRequiredText(
    data.totalExperience,
    "Total experience",
  );
  if (totalExpErr) errors.totalExperience = totalExpErr;

  const relExpErr = validateRequiredText(
    data.relevantExperience,
    "Relevant experience",
  );
  if (relExpErr) errors.relevantExperience = relExpErr;

  const currentCTCErr = validateRequiredText(data.currentCTC, "Current CTC");
  if (currentCTCErr) errors.currentCTC = currentCTCErr;

  const expectedCTCErr = validateRequiredText(data.expectedCTC, "Expected CTC");
  if (expectedCTCErr) errors.expectedCTC = expectedCTCErr;

  const noticeErr = validateRequiredText(data.noticePeriod, "Notice period");
  if (noticeErr) errors.noticePeriod = noticeErr;

  return errors;
}
