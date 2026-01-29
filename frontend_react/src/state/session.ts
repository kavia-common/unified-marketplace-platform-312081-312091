import { useSyncExternalStore } from 'react';
import { clearSession, getAccessToken, setAccessToken } from '../api/client';
import type { UserOut, Role as AppRole } from '../api/types';

export type Role = AppRole;

type SessionState = {
  role: Role;
  token: string | null;
  user: UserOut | null;
  authRequired: boolean;
};

type SessionStore = {
  getState: () => SessionState;
  subscribe: (listener: () => void) => () => void;
  setRole: (role: Role) => void;
  setToken: (token: string | null) => void;
  setUser: (user: UserOut | null) => void;
  setAuthRequired: (required: boolean) => void;
  logout: () => void;
};

const listeners = new Set<() => void>();
let state: SessionState = {
  role: 'customer',
  token: getAccessToken(),
  user: null,
  authRequired: false,
};

function emit() {
  for (const l of listeners) l();
}

function mapBackendRoleToAppRole(role: UserOut['role']): Role {
  if (role === 'admin') return 'admin';
  if (role === 'vendor') return 'vendor';
  return 'customer';
}

export const sessionStore: SessionStore = {
  getState: () => state,
  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  setRole: (role) => {
    state = { ...state, role };
    emit();
  },
  setToken: (token) => {
    setAccessToken(token);
    state = { ...state, token };
    emit();
  },
  setUser: (user) => {
    state = { ...state, user, role: user ? mapBackendRoleToAppRole(user.role) : state.role };
    emit();
  },
  setAuthRequired: (required) => {
    state = { ...state, authRequired: required };
    emit();
  },
  logout: () => {
    clearSession('logout');
    state = { ...state, token: null, user: null, role: 'customer', authRequired: true };
    emit();
  },
};

// PUBLIC_INTERFACE
export function useSession() {
  /** React hook for session state/actions. */
  const snap = useSyncExternalStore(sessionStore.subscribe, sessionStore.getState, sessionStore.getState);
  return {
    role: snap.role,
    token: snap.token,
    user: snap.user,
    authRequired: snap.authRequired,
    setRole: sessionStore.setRole,
    setToken: sessionStore.setToken,
    setUser: sessionStore.setUser,
    logout: sessionStore.logout,
    setAuthRequired: sessionStore.setAuthRequired,
  };
}
useSession.getState = sessionStore.getState;
