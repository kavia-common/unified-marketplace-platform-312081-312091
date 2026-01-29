import { apiGet, apiPost } from './client';
import type { TokenResponse, UserOut } from './types';

// PUBLIC_INTERFACE
export async function login(email: string, password: string) {
  /** Login via POST /api/auth/login. Returns JWT access token. */
  return apiPost<TokenResponse>('/auth/login', { email, password });
}

// PUBLIC_INTERFACE
export async function fetchMe() {
  /** Fetch current user profile via GET /api/me (requires Authorization). */
  return apiGet<UserOut>('/me');
}
