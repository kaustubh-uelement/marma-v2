import { fetchApi } from "./api";

export interface CartItemResponse {
  id: string; // The cart item ID
  cartId?: string;
  productId: string;
  quantity: number;
  product?: {
    id: string;
    name: string;
    price: number;
    image?: string;
  };
  name?: string;
  price?: number;
  image?: string;
}

export interface CartResponse {
  id: string;
  userId: string;
  items: CartItemResponse[];
  totalPrice: number;
}

export async function fetchCart(token: string): Promise<CartResponse> {
  const res = await fetchApi("/api/v1/cart", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

export async function addToCart(
  token: string,
  productId: string,
  quantity: number = 1
): Promise<CartResponse> {
  const res = await fetchApi("/api/v1/cart", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  return fetchCart(token);
}

export async function updateCartItemQuantity(
  token: string,
  productId: string,
  quantity: number
): Promise<CartResponse> {
  const res = await fetchApi("/api/v1/cart", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) throw new Error("Failed to update cart item");
  return fetchCart(token);
}

export async function removeCartItem(
  token: string,
  productId: string
): Promise<CartResponse> {
  const res = await fetchApi(`/api/v1/cart/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to remove cart item");
  return fetchCart(token);
}

export async function clearCart(token: string): Promise<void> {
  const res = await fetchApi("/api/v1/cart", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to clear cart");
}
