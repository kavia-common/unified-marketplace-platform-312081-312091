export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string; status?: number };

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

/**
 * Base URL strategy:
 * - In dev, prefer Vite proxy via `/api` (configured in vite.config.ts) to avoid CORS.
 * - In prod/preview, can be overridden via VITE_API_URL.
 */
const API_BASE = (import.meta as any).env?.VITE_API_URL ?? '/api';

let accessTokenMemory: string | null = null;
const TOKEN_STORAGE_KEY = 'um_access_token';

/**
 * PUBLIC_INTERFACE
 * Set (or clear) the current JWT access token used for API calls.
 *
 * Persists to localStorage for page refresh continuity and keeps an in-memory copy
 * for fast access.
 */
export function setAccessToken(token: string | null) {
  /** Sets the access token used for Authorization header. */
  accessTokenMemory = token;
  try {
    if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
    else localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    // Ignore storage errors (e.g., privacy mode). We'll still keep in-memory token.
  }
}

/**
 * PUBLIC_INTERFACE
 * Get the current JWT access token (memory first, then localStorage).
 */
export function getAccessToken(): string | null {
  /** Returns the current access token, if any. */
  if (accessTokenMemory) return accessTokenMemory;
  try {
    const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (stored) {
      accessTokenMemory = stored;
      return stored;
    }
  } catch {
    // ignore
  }
  return null;
}

/**
 * PUBLIC_INTERFACE
 * Clear the current auth session.
 *
 * Also dispatches a custom event so UI can react (e.g., show Login modal).
 */
export function clearSession(reason?: string) {
  /** Clears token and notifies listeners. */
  setAccessToken(null);
  window.dispatchEvent(new CustomEvent('um:auth:required', { detail: { reason } }));
}

async function safeReadJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function request<T>(method: HttpMethod, path: string, body?: unknown): Promise<ApiResult<T>> {
  try {
    const token = getAccessToken();
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (res.status === 401) {
      // Token invalid/expired or missing; clear and prompt re-login.
      clearSession('unauthorized');
      return { ok: false, error: 'Unauthorized', status: 401 };
    }

    if (!res.ok) {
      const data = await safeReadJson(res);
      const msg =
        (data && typeof data === 'object' && 'detail' in data && typeof (data as any).detail === 'string'
          ? (data as any).detail
          : null) ?? `HTTP ${res.status}`;
      return { ok: false, error: msg, status: res.status };
    }

    // Some endpoints may return empty body; treat as {}.
    const data = (await safeReadJson(res)) as T;
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}

// PUBLIC_INTERFACE
export async function apiGet<T>(path: string): Promise<ApiResult<T>> {
  /** Basic GET client with minimal error handling + auth support. */
  return request<T>('GET', path);
}

// PUBLIC_INTERFACE
export async function apiPost<T>(path: string, body?: unknown): Promise<ApiResult<T>> {
  /** Basic POST client with minimal error handling + auth support. */
  return request<T>('POST', path, body);
}

// PUBLIC_INTERFACE
export async function apiPatch<T>(path: string, body?: unknown): Promise<ApiResult<T>> {
  /** Basic PATCH client with minimal error handling + auth support. */
  return request<T>('PATCH', path, body);
}

// PUBLIC_INTERFACE
export async function apiPut<T>(path: string, body?: unknown): Promise<ApiResult<T>> {
  /** Basic PUT client with minimal error handling + auth support. */
  return request<T>('PUT', path, body);
}

// PUBLIC_INTERFACE
export async function apiDelete<T>(path: string): Promise<ApiResult<T>> {
  /** Basic DELETE client with minimal error handling + auth support. */
  return request<T>('DELETE', path);
}
