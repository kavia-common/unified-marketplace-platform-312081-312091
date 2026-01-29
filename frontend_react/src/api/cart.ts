import { apiGet, apiPatch, apiPost } from './client';
import type { CartOut } from './types';

// PUBLIC_INTERFACE
export async function fetchCart() {
  /** Get server-side cart via GET /api/cart. */
  return apiGet<CartOut>('/cart');
}

// PUBLIC_INTERFACE
export async function addCartItem(productId: string, quantity: number) {
  /** Add cart item via POST /api/cart/items. */
  return apiPost<CartOut>('/cart/items', { product_id: productId, quantity });
}

// PUBLIC_INTERFACE
export async function updateCartItem(cartItemId: string, quantity: number) {
  /** Update cart item quantity via PATCH /api/cart/items/{cart_item_id}. */
  return apiPatch<CartOut>(`/cart/items/${cartItemId}`, { quantity });
}

// PUBLIC_INTERFACE
export async function checkoutCart() {
  /** Create order from cart via POST /api/orders. */
  return apiPost<any>('/orders');
}
