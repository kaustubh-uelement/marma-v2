"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useAuth, type ApiError } from "@/context/AuthContext";

type AuthStep = "login" | "register" | "otp";

export default function AuthModal() {
  const {
    showAuthModal,
    closeAuthModal,
    login,
    register,
    verifyEmail,
    pendingCheckout,
    pendingCartItem,
  } = useAuth();

  const [step, setStep] = useState<AuthStep>("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP fields
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);

  // Reset on open
  useEffect(() => {
    if (showAuthModal) {
      setStep("login");
      setError("");
      setSuccessMsg("");
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setOtp(["", "", "", "", "", ""]);
      setShowPassword(false);
    }
  }, [showAuthModal]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuthModal();
    };
    if (showAuthModal) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [showAuthModal, closeAuthModal]);

  const getErrorMessage = (err: unknown): string => {
    if (typeof err === "object" && err !== null && "message" in err) {
      return (err as ApiError).message;
    }
    return "Something went wrong. Please try again.";
  };

  // ── Login handler ──────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login({ email, password });
      closeAuthModal();
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Register handler ───────────────────────────────────────────────────
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (phone && !/^\d{10}$/.test(phone)) {
      setError("Phone number must be 10 digits");
      return;
    }
    setIsSubmitting(true);
    try {
      await register({
        email,
        password,
        first_name: firstName || undefined,
        last_name: lastName || undefined,
        phone: phone || undefined,
      });
      setSuccessMsg("Account created! Please verify your email.");
      setStep("otp");
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── OTP handler ────────────────────────────────────────────────────────
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    const focusIdx = Math.min(pasted.length, 5);
    otpRefs.current[focusIdx]?.focus();
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter the full 6-digit code");
      return;
    }
    setIsSubmitting(true);
    try {
      await verifyEmail({ email, otp: otpString });
      setSuccessMsg("Email verified successfully!");
      setTimeout(() => closeAuthModal(), 1200);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showAuthModal) return null;

  // ── Shared UI pieces ──────────────────────────────────────────────────

  const LockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );

  const MailIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );

  const UserIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const inputClass =
    "w-full pl-11 pr-4 py-3 bg-[#F9F9F9] border border-[#E8E8E8] rounded-xl text-[14px] text-[#333] placeholder:text-[#BBBBBB] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/10 transition-all duration-200";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1100] transition-opacity duration-300"
        onClick={closeAuthModal}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[1101] flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="relative w-full max-w-[440px] bg-white rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden animate-[authSlideUp_0.35s_ease-out]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top accent bar */}
          <div className="h-1 bg-gradient-to-r from-red-500 via-red-400 to-orange-400" />

          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="px-8 pt-8 pb-8">
            {/* Header */}
            <div className="text-center mb-7">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/20">
                <LockIcon />
              </div>
              <h2 className="text-[22px] font-bold text-[#1a1a1a] tracking-tight">
                {step === "login" && "Welcome Back"}
                {step === "register" && "Create Account"}
                {step === "otp" && "Verify Email"}
              </h2>
              <p className="text-[13px] text-[#888] mt-1.5">
                {step === "login" && (pendingCheckout ? "Sign in to continue to checkout" : pendingCartItem ? "Sign in to add to cart" : "Sign in to continue")}
                {step === "register" && (pendingCheckout ? "Create an account to place your order" : pendingCartItem ? "Create an account to add to cart" : "Create an account to continue")}
                {step === "otp" && `We sent a 6-digit code to ${email}`}
              </p>
              {pendingCheckout && step !== "otp" && (
                <div className="mt-3 inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[12px] font-medium px-3 py-1.5 rounded-full border border-amber-200/60">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                  Sign in required to checkout
                </div>
              )}
              {pendingCartItem && !pendingCheckout && step !== "otp" && (
                <div className="mt-3 inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[12px] font-medium px-3 py-1.5 rounded-full border border-amber-200/60">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                  Sign in required to add items to cart
                </div>
              )}
            </div>

            {/* Error / Success messages */}
            {error && (
              <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-600 text-[13px] px-4 py-3 rounded-xl animate-[authShake_0.4s_ease-in-out]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
                <span>{error}</span>
              </div>
            )}
            {successMsg && (
              <div className="mb-5 flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[13px] px-4 py-3 rounded-xl">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>
                <span>{successMsg}</span>
              </div>
            )}

            {/* ─── LOGIN FORM ─────────────────────────────────── */}
            {step === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2"><MailIcon /></div>
                  <input
                    id="auth-login-email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    className={inputClass}
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <input
                    id="auth-login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={inputClass + " pr-11"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold text-[14px] rounded-xl transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                  <div className="relative flex justify-center"><span className="bg-white px-4 text-[12px] text-gray-400 font-medium">New here?</span></div>
                </div>

                <button
                  type="button"
                  onClick={() => { setStep("register"); setError(""); setSuccessMsg(""); }}
                  className="w-full py-3 border border-gray-200 text-[14px] font-medium text-[#333] rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  Create an Account
                </button>
              </form>
            )}

            {/* ─── REGISTER FORM ──────────────────────────────── */}
            {step === "register" && (
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2"><UserIcon /></div>
                    <input
                      id="auth-register-firstname"
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2"><UserIcon /></div>
                    <input
                      id="auth-register-lastname"
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2"><MailIcon /></div>
                  <input
                    id="auth-register-email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <input
                    id="auth-register-phone"
                    type="tel"
                    placeholder="Phone (10 digits, optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className={inputClass}
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <input
                    id="auth-register-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password (min. 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className={inputClass + " pr-11"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>

                {/* Password strength indicator */}
                {password && (
                  <div className="flex gap-1.5 px-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          password.length >= level * 3
                            ? level <= 1 ? "bg-red-400" : level <= 2 ? "bg-orange-400" : level <= 3 ? "bg-yellow-400" : "bg-emerald-400"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold text-[14px] rounded-xl transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
                >
                  {isSubmitting ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <p className="text-center text-[13px] text-gray-400 pt-2">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => { setStep("login"); setError(""); setSuccessMsg(""); }}
                    className="text-red-500 font-medium hover:text-red-600 transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              </form>
            )}

            {/* ─── OTP VERIFICATION ───────────────────────────── */}
            {step === "otp" && (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="flex justify-center gap-2.5" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      id={`auth-otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      autoFocus={i === 0}
                      className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all duration-200 ${
                        digit
                          ? "border-red-400 bg-red-50/50 text-[#1a1a1a]"
                          : "border-gray-200 bg-[#F9F9F9] text-gray-600"
                      } focus:border-red-500 focus:ring-2 focus:ring-red-400/20`}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold text-[14px] rounded-xl transition-all duration-200 shadow-lg shadow-red-500/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Verifying...</>
                  ) : (
                    "Verify Email"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => closeAuthModal()}
                  className="w-full py-2.5 text-[13px] text-gray-400 hover:text-gray-600 transition-colors font-medium"
                >
                  Skip for now
                </button>
              </form>
            )}

            {/* Security footer */}
            <div className="flex items-center justify-center gap-1.5 mt-6 pt-5 border-t border-gray-100">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#BBB" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span className="text-[11px] text-gray-400">Secured with 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
