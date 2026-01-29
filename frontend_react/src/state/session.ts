import { useSyncExternalStore } from 'react';

export type Role = 'customer' | 'vendor' | 'admin';

type SessionState = {
  role: Role;
};

type SessionStore = {
  getState: () => SessionState;
  subscribe: (listener: () => void) => () => void;
  setRole: (role: Role) => void;
};

const listeners = new Set<() => void>();
let state: SessionState = { role: 'customer' };

function emit() {
  for (const l of listeners) l();
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
};

// PUBLIC_INTERFACE
export function useSession() {
  /** React hook for session role. */
  const snap = useSyncExternalStore(sessionStore.subscribe, sessionStore.getState, sessionStore.getState);
  return { role: snap.role, setRole: sessionStore.setRole };
}
useSession.getState = sessionStore.getState;
