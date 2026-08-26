import { fetchApi } from "./api";

const CLIENT_USERS_BASE = "/api/v1/client-users";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FullAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country_code?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  is_email_verified?: boolean;
  is_active?: boolean;
  address?: FullAddress;
  avatar_url?: string;
  created_at?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: FullAddress;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}

export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: FullAddress;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// ─── Helper ──────────────────────────────────────────────────────────────────

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  if (!response.ok) {
    const error: ApiError = {
      message: data.message || data.error || "Something went wrong",
      statusCode: response.status,
      errors: data.errors,
    };
    throw error;
  }
  return data as T;
}

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
  };
}

// ─── API Functions ───────────────────────────────────────────────────────────

/** Register a new client user */
export async function registerUser(
  payload: RegisterPayload
): Promise<AuthResponse> {
  const response = await fetchApi(`${CLIENT_USERS_BASE}/register`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return handleResponse<AuthResponse>(response);
}

/** Login existing client user */
export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const response = await fetchApi(`${CLIENT_USERS_BASE}/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return handleResponse<AuthResponse>(response);
}

/** Verify email with OTP */
export async function verifyEmail(
  payload: VerifyEmailPayload
): Promise<{ message: string }> {
  const response = await fetchApi(`${CLIENT_USERS_BASE}/verify-email`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return handleResponse<{ message: string }>(response);
}

/** Get current user profile */
export async function getCurrentUser(token: string): Promise<AuthUser> {
  const response = await fetchApi(`${CLIENT_USERS_BASE}/me`, {
    method: "GET",
    headers: authHeaders(token),
  });
  return handleResponse<AuthUser>(response);
}

/** Update user profile */
export async function updateProfile(
  token: string,
  payload: UpdateProfilePayload
): Promise<AuthUser> {
  const response = await fetchApi(`${CLIENT_USERS_BASE}/me`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  return handleResponse<AuthUser>(response);
}

/** Refresh access token */
export async function refreshAccessToken(
  refreshToken: string
): Promise<AuthTokens> {
  const response = await fetchApi(`${CLIENT_USERS_BASE}/refresh-token`, {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
  return handleResponse<AuthTokens>(response);
}
