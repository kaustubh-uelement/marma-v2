"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

export default function FloatingCartButton() {
  const { toggleCart, totalItems } = useCart();

  if (totalItems === 0) return null;

  return (
    <button
      onClick={toggleCart}
      className="fixed bottom-6 right-6 z-[990] group"
      aria-label="Open cart"
    >
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" style={{ animationDuration: "2s" }} />

      {/* Main button */}
      <div className="relative w-14 h-14 bg-text-dark rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-transform group-hover:scale-110 group-active:scale-95">
        {/* Cart Icon */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>

        {/* Badge */}
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold min-w-[20px] h-[20px] px-1 rounded-full flex items-center justify-center leading-none shadow-sm">
          {totalItems}
        </span>
      </div>
    </button>
  );
}
