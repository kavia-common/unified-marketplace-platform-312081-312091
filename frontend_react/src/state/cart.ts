import { useSyncExternalStore } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  storeId: string;
};

type CartState = {
  items: CartItem[];
};

type CartStore = {
  getState: () => CartState;
  subscribe: (listener: () => void) => () => void;
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
};

const listeners = new Set<() => void>();
let state: CartState = { items: [] };

function emit() {
  for (const l of listeners) l();
}

export const cartStore: CartStore = {
  getState: () => state,
  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  addItem: (item, qty = 1) => {
    const existing = state.items.find((it) => it.id === item.id);
    if (existing) {
      state = {
        items: state.items.map((it) => (it.id === item.id ? { ...it, qty: it.qty + qty } : it)),
      };
    } else {
      state = { items: [...state.items, { ...item, qty }] };
    }
    emit();
  },
  removeItem: (id) => {
    state = { items: state.items.filter((it) => it.id !== id) };
    emit();
  },
  updateQty: (id, qty) => {
    state = { items: state.items.map((it) => (it.id === id ? { ...it, qty } : it)) };
    emit();
  },
  clear: () => {
    state = { items: [] };
    emit();
  },
};

// PUBLIC_INTERFACE
export function useCart() {
  /** React hook for cart state/actions. */
  const snap = useSyncExternalStore(cartStore.subscribe, cartStore.getState, cartStore.getState);
  return {
    items: snap.items,
    addItem: cartStore.addItem,
    removeItem: cartStore.removeItem,
    updateQty: cartStore.updateQty,
    clear: cartStore.clear,
  };
}
