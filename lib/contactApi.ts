interface ContactPayload {
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  extra_field?: Record<string, any>;
}

interface ContactResponse {
  success: boolean;
  message: string;
  data?: any;
}

export async function submitContactForm(
  payload: ContactPayload,
): Promise<ContactResponse> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (response.ok) {
      return {
        success: true,
        message: data?.message || "Your message has been sent successfully!",
        data: data?.data,
      };
    }

    return {
      success: false,
      message:
        data?.message ||
        `Submission failed (${response.status}). Please try again.`,
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
}
