import { apiGet } from './client';
import type { ProductOut } from './types';

// PUBLIC_INTERFACE
export async function listProducts(params?: { storeId?: string; q?: string }) {
  /** List products via GET /api/products (optional store_id, q). */
  const search = new URLSearchParams();
  if (params?.storeId) search.set('store_id', params.storeId);
  if (params?.q) search.set('q', params.q);
  const qs = search.toString();
  return apiGet<ProductOut[]>(`/products${qs ? `?${qs}` : ''}`);
}

// PUBLIC_INTERFACE
export async function getProductById(productId: string) {
  /** Get product via GET /api/products/{product_id}. */
  return apiGet<ProductOut>(`/products/${productId}`);
}
