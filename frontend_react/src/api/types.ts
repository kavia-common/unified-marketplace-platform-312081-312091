export type Role = 'customer' | 'vendor' | 'admin';

export type ApiMessage = { message: string };

export type TokenResponse = { access_token: string; token_type: string };

export type UserOut = {
  id: string;
  email: string;
  name?: string | null;
  role: 'user' | 'vendor' | 'admin';
  is_active: boolean;
  created_at: string;
};

export type StoreOut = {
  id: string;
  owner_user_id: string;
  name: string;
  description?: string | null;
  is_active: boolean;
  created_at: string;
};

export type ProductOut = {
  id: string;
  store_id: string;
  name: string;
  description?: string | null;
  price: string | number;
  currency: string;
  sku?: string | null;
  image_url?: string | null;
  inventory_qty: number;
  is_active: boolean;
  created_at: string;
};

export type CartItemOut = {
  id: string;
  product: ProductOut;
  quantity: number;
};

export type CartOut = {
  items: CartItemOut[];
  subtotal: string | number;
  currency: string;
};

export type OrderItemOut = {
  id: string;
  store_id: string;
  product_id: string;
  quantity: number;
  unit_price: string | number;
  line_total: string | number;
};

export type PaymentOut = {
  id: string;
  provider: string;
  provider_reference?: string | null;
  amount: string | number;
  currency: string;
  status: string;
  created_at: string;
};

export type OrderOut = {
  id: string;
  user_id: string;
  status: string;
  currency: string;
  subtotal: string | number;
  discount_total: string | number;
  total: string | number;
  created_at: string;
  updated_at: string;
  items: OrderItemOut[];
  payments: PaymentOut[];
};
