import { apiGet } from './client';
import type { ApiMessage } from './types';

// PUBLIC_INTERFACE
export async function fetchHealth() {
  /** Calls backend health endpoint: GET /api/health */
  return apiGet<ApiMessage>('/health');
}
