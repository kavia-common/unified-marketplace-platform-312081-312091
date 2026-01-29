export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };

/**
 * Base URL strategy:
 * - In dev, prefer Vite proxy via `/api` (configured in vite.config.ts) to avoid CORS.
 * - In prod/preview, can be overridden via VITE_API_URL.
 */
const API_BASE = (import.meta as any).env?.VITE_API_URL ?? '/api';

// PUBLIC_INTERFACE
export async function apiGet<T>(path: string): Promise<ApiResult<T>> {
  /** Basic GET client with minimal error handling. */
  try {
    const res = await fetch(`${API_BASE}${path}`, { headers: { 'Content-Type': 'application/json' } });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const data = (await res.json()) as T;
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}
