"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { fetchApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { isLoading: isAuthLoading } = useAuth();
  const { clearCart } = useCart();
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const verifiedRef = useRef(false);

  useEffect(() => {
    // Only proceed if auth has finished loading
    if (isAuthLoading) return;

    if (!sessionId) {
      setStatus("error");
      setErrorMessage("No session ID found.");
      return;
    }

    if (verifiedRef.current) return;
    verifiedRef.current = true;

    const verifyPayment = async () => {
      try {
        const token = localStorage.getItem("marma_access_token");
        const headers: Record<string, string> = {};
        
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        
        const tenantId = process.env.NEXT_PUBLIC_TENANT_ID || process.env.NEXT_PUBLIC_TENANT_SLUG || "";
        if (tenantId) {
          headers["x-tenant-id"] = tenantId;
        }
        
        // POST /api/v1/orders/verify-payment
        const res = await fetchApi("/api/v1/orders/verify-payment", {
          method: "POST",
          headers,
          body: JSON.stringify({ sessionId }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || "Payment verification failed");
        }
        
        setStatus("success");
        // Clear the cart if successful
        clearCart();
        
      } catch (err: any) {
        console.error("Payment verification error:", err);
        setStatus("error");
        setErrorMessage(err.message || "An unexpected error occurred during verification.");
      }
    };

    verifyPayment();
  }, [sessionId, isAuthLoading, clearCart]);

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 font-sans text-neutral-100">
      <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl text-center flex flex-col items-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[200px] max-h-[200px] bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none transition-opacity duration-1000" 
          style={{ opacity: status === 'success' ? 1 : 0 }} 
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[200px] max-h-[200px] bg-red-500/20 blur-[100px] rounded-full pointer-events-none transition-opacity duration-1000" 
          style={{ opacity: status === 'error' ? 1 : 0 }} 
        />
        
        {status === "loading" && (
          <>
            <div className="w-20 h-20 bg-neutral-800/50 rounded-full flex items-center justify-center mb-6 ring-1 ring-white/10 shadow-inner">
              <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3 tracking-tight">Verifying Payment</h1>
            <p className="text-neutral-400">Please wait while we confirm your order details with our secure payment provider.</p>
          </>
        )}

        {status === "success" && (
          <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3 tracking-tight">Payment Successful!</h1>
            <p className="text-neutral-400 mb-8">Your order has been confirmed and is now being processed. We will email you a receipt and shipping updates shortly.</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Link 
                href="/store" 
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.3)]">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3 tracking-tight">Verification Failed</h1>
            <p className="text-neutral-400 mb-8">{errorMessage || "We couldn't verify your payment. If you were charged, please contact support."}</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Link 
                href="/store" 
                className="flex-1 py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium transition-colors border border-neutral-700 hover:border-neutral-600"
              >
                Return to Store
              </Link>
              <button 
                onClick={() => window.location.reload()}
                className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors border border-white/5 hover:border-white/10"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
