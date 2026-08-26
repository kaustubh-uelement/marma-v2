"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";

export default function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();
  
  const { formatPrice } = useCurrency();
  const { isAuthenticated, openAuthModal, setPendingCheckout, pendingCheckout } = useAuth();
  const router = useRouter();

  const sidebarRef = useRef<HTMLDivElement>(null);

  // When user authenticates with a pending checkout, proceed to checkout
  useEffect(() => {
    if (isAuthenticated && pendingCheckout) {
      setPendingCheckout(false);
      closeCart();
      router.push(`/order/checkout`);
    }
  }, [isAuthenticated, pendingCheckout, setPendingCheckout, closeCart, router]);

  const handleCheckout = () => {
    closeCart();
    router.push(`/order/checkout`);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[998] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Sidebar Panel */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[999] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-black tracking-tight">Your Cart</h2>
            {totalItems > 0 && (
              <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[22px] text-center">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-5">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#CCCCCC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <p className="text-gray-400 font-medium text-sm mb-1">Your cart is empty</p>
              <p className="text-gray-300 text-xs">Add products to get started</p>
              <Link
                href="/store"
                onClick={closeCart}
                className="mt-6 text-sm font-medium text-red-500 hover:text-red-600 transition-colors underline underline-offset-2"
              >
                Browse Store
              </Link>
            </div>
          ) : (
            <div className="px-6 py-4 space-y-0">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex gap-4 py-5 ${
                    index !== items.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  {/* Product Image */}
                  <div className="w-[80px] h-[80px] flex-shrink-0 bg-[#F6F6F6] rounded-lg relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                      sizes="80px"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-semibold text-sm text-black truncate">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 p-0.5"
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                        <button
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-xs"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="w-8 h-7 flex items-center justify-center text-xs font-medium text-black border-x border-gray-200 bg-white">
                          {item.quantity}
                        </span>
                        <button
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-xs"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-bold text-sm text-black">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-4 bg-white">
            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-lg font-bold text-black">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed">
              Shipping and taxes calculated at checkout
            </p>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm rounded-full transition-colors"
                onClick={handleCheckout}
              >
                Checkout
              </button>
              <Link
                href="/store"
                onClick={closeCart}
                className="block w-full py-3 border border-gray-200 text-center font-medium text-sm text-black rounded-full hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
