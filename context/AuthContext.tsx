"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  type AuthUser,
  type RegisterPayload,
  type LoginPayload,
  type VerifyEmailPayload,
  type ApiError,
  registerUser,
  loginUser,
  verifyEmail as verifyEmailApi,
  getCurrentUser,
  refreshAccessToken,
} from "@/lib/authApi";

// ─── Types ───────────────────────────────────────────────────────────────────

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  showAuthModal: boolean;

  // Auth actions
  register: (payload: RegisterPayload) => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  verifyEmail: (payload: VerifyEmailPayload) => Promise<void>;
  logout: () => void;

  // Modal control
  openAuthModal: () => void;
  closeAuthModal: () => void;

  // Pending action after auth
  setPendingCheckout: (pending: boolean) => void;
  pendingCheckout: boolean;

  setPendingCartItem: (item: any) => void;
  pendingCartItem: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Storage keys ────────────────────────────────────────────────────────────

const STORAGE_KEYS = {
  ACCESS_TOKEN: "marma_access_token",
  REFRESH_TOKEN: "marma_refresh_token",
  USER: "marma_user",
} as const;

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingCheckout, setPendingCheckout] = useState(false);
  const [pendingCartItem, setPendingCartItem] = useState<any>(null);
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ── Token helpers ──────────────────────────────────────────────────────

  const getAccessToken = useCallback(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }, []);

  const saveTokens = useCallback(
    (accessToken: string, refreshToken: string) => {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    },
    []
  );

  const clearTokens = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }, []);

  const saveUser = useCallback((userData: AuthUser) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    setUser(userData);
  }, []);

  // ── Auto-refresh token (every 14 min for a 15-min expiry) ──────────────

  const scheduleRefresh = useCallback(() => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    refreshTimerRef.current = setTimeout(async () => {
      try {
        const rt = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (!rt) return;
        const tokens = await refreshAccessToken(rt);
        saveTokens(tokens.accessToken, tokens.refreshToken);
        scheduleRefresh();
      } catch {
        // Refresh failed — session expired
        clearTokens();
        setUser(null);
      }
    }, 14 * 60 * 1000);
  }, [saveTokens, clearTokens]);

  // ── Init: restore session ──────────────────────────────────────────────

  useEffect(() => {
    async function restoreSession() {
      try {
        const token = getAccessToken();
        const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
        if (token && savedUser) {
          setUser(JSON.parse(savedUser));
          // Validate token by fetching fresh profile
          try {
            const freshUser = await getCurrentUser(token);
            saveUser(freshUser);
            scheduleRefresh();
          } catch {
            // Token expired — try refresh
            const rt = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
            if (rt) {
              try {
                const tokens = await refreshAccessToken(rt);
                saveTokens(tokens.accessToken, tokens.refreshToken);
                const freshUser = await getCurrentUser(tokens.accessToken);
                saveUser(freshUser);
                scheduleRefresh();
              } catch {
                clearTokens();
                setUser(null);
              }
            } else {
              clearTokens();
              setUser(null);
            }
          }
        }
      } catch {
        clearTokens();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    restoreSession();

    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    };
  }, [getAccessToken, saveUser, saveTokens, clearTokens, scheduleRefresh]);

  // ── Auth actions ───────────────────────────────────────────────────────

  const register = useCallback(
    async (payload: RegisterPayload) => {
      const data = await registerUser(payload);
      saveTokens(data.accessToken, data.refreshToken);
      saveUser(data.user);
      scheduleRefresh();
    },
    [saveTokens, saveUser, scheduleRefresh]
  );

  const login = useCallback(
    async (payload: LoginPayload) => {
      const data = await loginUser(payload);
      saveTokens(data.accessToken, data.refreshToken);
      saveUser(data.user);
      scheduleRefresh();
    },
    [saveTokens, saveUser, scheduleRefresh]
  );

  const verifyEmailAction = useCallback(
    async (payload: VerifyEmailPayload) => {
      await verifyEmailApi(payload);
      // After verification, update user state
      if (user) {
        const updated = { ...user, is_email_verified: true };
        saveUser(updated);
      }
    },
    [user, saveUser]
  );

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
  }, [clearTokens]);

  // ── Modal controls ─────────────────────────────────────────────────────

  const openAuthModal = useCallback(() => setShowAuthModal(true), []);
  const closeAuthModal = useCallback(() => {
    setShowAuthModal(false);
    
    // Only clear pending actions if the user did not log in
    const token = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) : null;
    if (!token) {
      setPendingCheckout(false);
      setPendingCartItem(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        showAuthModal,
        register,
        login,
        verifyEmail: verifyEmailAction,
        logout,
        openAuthModal,
        closeAuthModal,
        setPendingCheckout,
        pendingCheckout,
        setPendingCartItem,
        pendingCartItem,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export type { ApiError };
