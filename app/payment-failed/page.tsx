import Link from "next/link";
import { XCircle, ArrowLeft, RefreshCcw } from "lucide-react";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 font-sans text-neutral-100">
      <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl text-center flex flex-col items-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[200px] max-h-[200px] bg-red-500/20 blur-[100px] rounded-full pointer-events-none" 
        />
        
        <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.3)]">
            <XCircle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3 tracking-tight">Payment Failed</h1>
          <p className="text-neutral-400 mb-8">
            We were unable to process your payment. Your card has not been charged. Please try another payment method or try again later.
          </p>
          
          <div className="flex flex-col gap-3 w-full">
            <Link 
              href="/store" 
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-red-900/20 hover:shadow-red-900/40"
            >
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </Link>
            
            <Link 
              href="/store" 
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium transition-colors border border-neutral-700 hover:border-neutral-600"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
