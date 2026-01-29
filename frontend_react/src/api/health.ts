import { apiGet } from './client';

// PUBLIC_INTERFACE
export async function fetchHealth() {
  /** Calls backend health endpoint (currently GET /). */
  return apiGet<any>('/');
}
