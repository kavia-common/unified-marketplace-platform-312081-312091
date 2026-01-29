import { useSyncExternalStore } from 'react';
import { addCartItem, fetchCart, updateCartItem } from '../api/cart';
import type { CartOut } from '../api/types';
import { sessionStore } from './session';

export type CartItem = {
  /** Local/UI cart item representation derived from backend cart. */
  id: string; // cart_item_id
  productId: string;
  name: string;
  price: number;
  qty: number;
  storeId: string;
};

type CartState = {
  items: CartItem[];
  loading: boolean;
  error: string | null;
};

type CartStore = {
  getState: () => CartState;
  subscribe: (listener: () => void) => () => void;
  refresh: () => Promise<void>;
  addItem: (item: { productId: string; name: string; price: number; storeId: string }, qty?: number) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  updateQty: (cartItemId: string, qty: number) => Promise<void>;
  clearLocal: () => void;
};

const listeners = new Set<() => void>();
let state: CartState = { items: [], loading: false, error: null };

function emit() {
  for (const l of listeners) l();
}

function toNumber(v: string | number): number {
  if (typeof v === 'number') return v;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function fromBackendCart(cart: CartOut): CartItem[] {
  return cart.items.map((it) => ({
    id: it.id,
    productId: it.product.id,
    name: it.product.name,
    price: toNumber(it.product.price),
    qty: it.quantity,
    storeId: it.product.store_id,
  }));
}

async function doRefresh() {
  if (!sessionStore.getState().token) {
    state = { ...state, items: [], loading: false, error: null };
    emit();
    return;
  }

  state = { ...state, loading: true, error: null };
  emit();

  const r = await fetchCart();
  if (!r.ok) {
    state = { ...state, loading: false, error: r.error };
    emit();
    return;
  }
  state = { items: fromBackendCart(r.data), loading: false, error: null };
  emit();
}

export const cartStore: CartStore = {
  getState: () => state,
  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  refresh: async () => {
    await doRefresh();
  },
  addItem: async (item, qty = 1) => {
    // Optimistic UI: update local first.
    const optimisticId = `optimistic-${item.productId}`;
    const existing = state.items.find((it) => it.productId === item.productId);
    if (existing) {
      state = {
        ...state,
        items: state.items.map((it) => (it.productId === item.productId ? { ...it, qty: it.qty + qty } : it)),
      };
    } else {
      state = {
        ...state,
        items: [
          ...state.items,
          {
            id: optimisticId,
            productId: item.productId,
            name: item.name,
            price: item.price,
            qty,
            storeId: item.storeId,
          },
        ],
      };
    }
    emit();

    const r = await addCartItem(item.productId, qty);
    if (!r.ok) {
      // Re-sync from server on error.
      state = { ...state, error: r.error };
      emit();
      await doRefresh();
      return;
    }
    state = { items: fromBackendCart(r.data), loading: false, error: null };
    emit();
  },
  removeItem: async (cartItemId) => {
    // Backend has no DELETE endpoint; set quantity to 0.
    await cartStore.updateQty(cartItemId, 0);
  },
  updateQty: async (cartItemId, qty) => {
    // Optimistic update.
    state = { ...state, items: state.items.map((it) => (it.id === cartItemId ? { ...it, qty } : it)) };
    // If qty=0 remove locally.
    state = { ...state, items: state.items.filter((it) => it.qty > 0) };
    emit();

    // If the item is optimistic, server doesn't know cartItemId. Re-sync.
    if (cartItemId.startsWith('optimistic-')) {
      await doRefresh();
      return;
    }

    const r = await updateCartItem(cartItemId, qty);
    if (!r.ok) {
      state = { ...state, error: r.error };
      emit();
      await doRefresh();
      return;
    }
    state = { items: fromBackendCart(r.data), loading: false, error: null };
    emit();
  },
  clearLocal: () => {
    state = { items: [], loading: false, error: null };
    emit();
  },
};

// PUBLIC_INTERFACE
export function useCart() {
  /** React hook for backend-synced cart state/actions. */
  const snap = useSyncExternalStore(cartStore.subscribe, cartStore.getState, cartStore.getState);
  return {
    items: snap.items,
    loading: snap.loading,
    error: snap.error,
    refresh: cartStore.refresh,
    addItem: cartStore.addItem,
    removeItem: cartStore.removeItem,
    updateQty: cartStore.updateQty,
    clearLocal: cartStore.clearLocal,
  };
}
