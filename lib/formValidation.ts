export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^[+]?[\d\s()-]{7,15}$/;

export function sanitizePhone(value: string) {
  return value.replace(/[^\d+\s()-]/g, "").slice(0, 15);
}

export function validateContactFields(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const errors: Record<string, string> = {};
  const name = data.name.trim();
  const email = data.email.trim();
  const phone = data.phone.trim();
  const message = data.message.trim();

  if (!name) errors.name = "Name is required";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters";

  if (!email) errors.email = "Email is required";
  else if (!EMAIL_REGEX.test(email))
    errors.email = "Enter a valid email address";

  if (!phone) errors.phone = "Phone number is required";
  else if (!PHONE_REGEX.test(phone))
    errors.phone = "Enter a valid phone number";

  if (!message) errors.message = "Message is required";
  else if (message.length < 10)
    errors.message = "Message must be at least 10 characters";

  return errors;
}
