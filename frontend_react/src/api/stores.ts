import { apiGet } from './client';
import type { StoreOut } from './types';

// PUBLIC_INTERFACE
export async function listStores(q?: string) {
  /** List stores via GET /api/stores (optional q). */
  const qs = q ? `?q=${encodeURIComponent(q)}` : '';
  return apiGet<StoreOut[]>(`/stores${qs}`);
}

// PUBLIC_INTERFACE
export async function getStoreById(storeId: string) {
  /** Get store via GET /api/stores/{store_id}. */
  return apiGet<StoreOut>(`/stores/${storeId}`);
}
