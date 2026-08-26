"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { verifyPayment, type Order, type OrderApiError } from "@/lib/orderApi";

type VerificationStatus = "loading" | "success" | "error";

function PaymentVerification() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [order, setOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const verifiedRef = useRef(false);

  useEffect(() => {
    if (!sessionId || verifiedRef.current) return;
    verifiedRef.current = true;

    async function verify() {
      try {
        const token = localStorage.getItem("marma_access_token");
        if (!token) {
          setErrorMessage("Authentication required. Please log in.");
          setStatus("error");
          return;
        }

        const response = await verifyPayment(token, { sessionId: sessionId! });
        setOrder(response.order);
        // Clear local cart since backend has already cleared server-side cart
        clearCart();
        setStatus("success");
      } catch (err: unknown) {
        const apiError = err as OrderApiError;
        setErrorMessage(
          apiError?.message || "Payment verification failed. Please contact support."
        );
        setStatus("error");
      }
    }

    verify();
  }, [sessionId, clearCart]);

  // ─── Loading State ─────────────────────────────────────────────────
  if (status === "loading") {
    return (
      <main className="flex flex-col bg-[#F9F9F9] min-h-screen overflow-x-hidden pt-24 lg:pt-32 pb-20">
        <div className="max-w-[600px] mx-auto px-6 w-full text-center">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
            {/* Animated spinner */}
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
              <div className="absolute inset-0 border-4 border-transparent border-t-red-500 rounded-full animate-spin" />
            </div>
            <h1 className="text-xl font-bold text-black mb-2">Verifying Payment</h1>
            <p className="text-sm text-gray-500">
              Please wait while we confirm your payment with Stripe...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ─── Error State ───────────────────────────────────────────────────
  if (status === "error") {
    return (
      <main className="flex flex-col bg-[#F9F9F9] min-h-screen overflow-x-hidden pt-24 lg:pt-32 pb-20">
        <div className="max-w-[600px] mx-auto px-6 w-full text-center">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
            {/* Error icon */}
            <div className="w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9l-6 6M9 9l6 6" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-black mb-2">Payment Verification Failed</h1>
            <p className="text-sm text-gray-500 mb-6">{errorMessage}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/store"
                className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-black hover:bg-gray-50 transition-colors"
              >
                Return to Store
              </Link>
              <a
                href="mailto:support@marmasecurity.com"
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ─── Success State ─────────────────────────────────────────────────
  return (
    <main className="flex flex-col bg-[#F9F9F9] min-h-screen overflow-x-hidden pt-24 lg:pt-32 pb-20">
      <div className="max-w-[600px] mx-auto px-6 w-full text-center">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
          {/* Animated success checkmark */}
          <div className="w-20 h-20 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center animate-[bounce_0.5s_ease-in-out]">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-black mb-2">Order Confirmed!</h1>
          <p className="text-sm text-gray-500 mb-8">
            Thank you for your purchase. Your order has been placed successfully.
          </p>

          {/* Order Details Card */}
          {order && (
            <div className="bg-[#F9F9F9] rounded-xl p-5 mb-8 text-left">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                <span className="text-sm text-gray-500">Order ID</span>
                <span className="text-sm font-bold text-black">{order.id}</span>
              </div>
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                <span className="text-sm text-gray-500">Order Status</span>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                  {order.orderStatus || (order as any).status || "PROCESSING"}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                <span className="text-sm text-gray-500">Payment Status</span>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                  {order.paymentStatus || "PAID"}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                <span className="text-sm text-gray-500">Items</span>
                <span className="text-sm font-medium text-black">
                  {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-base font-bold text-red-500">
                  ₹{order.totalAmount?.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/store"
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-all shadow-[0_4px_14px_rgba(239,68,68,0.3)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.4)]"
            >
              Continue Shopping
            </Link>
          </div>

          <p className="text-[11px] text-gray-400 mt-6">
            A confirmation email will be sent to your registered email address.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-col bg-[#F9F9F9] min-h-screen overflow-x-hidden pt-24 lg:pt-32 pb-20">
          <div className="max-w-[600px] mx-auto px-6 w-full text-center">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-6 relative">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
                <div className="absolute inset-0 border-4 border-transparent border-t-red-500 rounded-full animate-spin" />
              </div>
              <h1 className="text-xl font-bold text-black mb-2">Loading...</h1>
            </div>
          </div>
        </main>
      }
    >
      <PaymentVerification />
    </Suspense>
  );
}
