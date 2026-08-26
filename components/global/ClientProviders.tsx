"use client";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import CartSidebar from "@/components/store/CartSidebar";
import FloatingCartButton from "@/components/store/FloatingCartButton";
import AuthModal from "@/components/auth/AuthModal";

import { CurrencyProvider } from "@/context/CurrencyContext";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CurrencyProvider>
      <AuthProvider>
        <CartProvider>
          {children}
          <CartSidebar />
          <FloatingCartButton />
          <AuthModal />
        </CartProvider>
      </AuthProvider>
    </CurrencyProvider>
  );
}

