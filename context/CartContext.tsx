"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { fetchApi } from "@/lib/api";
import {
  fetchCart,
  addToCart,
  updateCartItemQuantity,
  removeCartItem,
  clearCart as clearCartApi,
} from "@/lib/cartApi";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => boolean;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, openAuthModal, setPendingCartItem, pendingCartItem } = useAuth();
  const hasSyncedCartRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setItems([]);
      hasSyncedCartRef.current = false;
      return;
    }

    if (hasSyncedCartRef.current) {
      return;
    }

    const token = localStorage.getItem("marma_access_token");
    if (!token) return;

    hasSyncedCartRef.current = true;

    const syncCart = async () => {
      try {
        let cart;
        if (pendingCartItem) {
          const itemToWait = pendingCartItem;
          // Clear pendingCartItem immediately so it doesn't get processed again
          setPendingCartItem(null);
          // Add to cart on server
          cart = await addToCart(token, itemToWait.item.id, itemToWait.quantity);
          setIsOpen(true);
        } else {
          // Just fetch the existing cart
          cart = await fetchCart(token);
        }

        if (cart && cart.items) {
          setItems(
            cart.items.map((i: any) => ({
              id: i.productId,
              name: i.product?.name || i.name || "Unknown Product",
              image: i.product?.image || i.image || "",
              price: i.product?.price || i.price || 0,
              quantity: i.quantity,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to sync cart after auth:", err);
      }
    };

    syncCart();
  }, [isAuthenticated, pendingCartItem, setPendingCartItem]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity: number = 1): boolean => {
      if (!isAuthenticated) {
        setPendingCartItem({ item, quantity });
        openAuthModal();
        return false;
      }

      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { ...item, quantity }];
      });
      setIsOpen(true);

      const token = localStorage.getItem("marma_access_token");
      if (token) {
        addToCart(token, item.id, quantity).catch((err) =>
          console.error("Failed to add to cart:", err)
        );
      }
      return true;
    },
    [isAuthenticated, openAuthModal, setPendingCartItem]
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));

    const token = localStorage.getItem("marma_access_token");
    if (token) {
      removeCartItem(token, id).catch((err) =>
        console.error("Failed to remove cart item:", err)
      );
    }
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );

    const token = localStorage.getItem("marma_access_token");
    if (token) {
      updateCartItemQuantity(token, id, quantity).catch((err) =>
        console.error("Failed to update cart item quantity:", err)
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);

    const token = localStorage.getItem("marma_access_token");
    if (token) {
      clearCartApi(token).catch((err) =>
        console.error("Failed to clear cart:", err)
      );
    }
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
