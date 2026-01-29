import { apiGet } from './client';
import type { OrderOut } from './types';

// PUBLIC_INTERFACE
export async function listOrders() {
  /** List orders for current user (or vendor/admin) via GET /api/orders. */
  return apiGet<OrderOut[]>('/orders');
}

// PUBLIC_INTERFACE
export async function getOrderById(orderId: string) {
  /** Get order by id via GET /api/orders/{order_id}. */
  return apiGet<OrderOut>(`/orders/${orderId}`);
}
