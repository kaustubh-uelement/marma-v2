import { Suspense } from "react";
import PaymentSuccessClient from "./PaymentSuccessClient";

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
          <div className="w-20 h-20 bg-neutral-800/50 rounded-full flex items-center justify-center ring-1 ring-white/10 shadow-inner">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      }
    >
      <PaymentSuccessClient />
    </Suspense>
  );
}
