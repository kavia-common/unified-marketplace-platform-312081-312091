import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CartDrawer } from './components/cart/CartDrawer';
import { LoginModal } from './components/modals/LoginModal';
import { CheckoutModal } from './components/modals/CheckoutModal';
import { useCart } from './state/cart';
import { sessionStore, useSession } from './state/session';
import { HomePage } from './pages/HomePage';
import { StoresPage } from './pages/StoresPage';
import { StoreDetailPage } from './pages/StoreDetailPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { OrdersPage } from './pages/OrdersPage';
import { AccountPage } from './pages/AccountPage';
import { VendorDashboardPage } from './pages/vendor/VendorDashboardPage';
import { VendorProductsPage } from './pages/vendor/VendorProductsPage';
import { VendorOrdersPage } from './pages/vendor/VendorOrdersPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminVendorsPage } from './pages/admin/AdminVendorsPage';
import { NotFoundPage } from './pages/NotFoundPage';

type LayoutProps = {
  children: React.ReactNode;
};

function AppLayout({ children }: LayoutProps) {
  const { role, token, authRequired, logout, setAuthRequired } = useSession();
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const showSidebar = role === 'admin' || role === 'vendor';
  const totalQty = useMemo(() => cart.items.reduce((sum, it) => sum + it.qty, 0), [cart.items]);

  useEffect(() => {
    function onAuthRequired() {
      setAuthRequired(true);
      setLoginOpen(true);
    }
    window.addEventListener('um:auth:required', onAuthRequired as any);
    return () => window.removeEventListener('um:auth:required', onAuthRequired as any);
  }, [setAuthRequired]);

  useEffect(() => {
    if (authRequired) setLoginOpen(true);
  }, [authRequired]);

  useEffect(() => {
    // When token is present, fetch latest server-side cart.
    if (token) cart.refresh();
    else cart.clearLocal();
  }, [token, cart]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header
        role={role}
        cartCount={totalQty}
        onOpenCart={() => setCartOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
        onLogout={logout}
        isLoggedIn={!!token}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: showSidebar ? 'var(--sidebar-w) 1fr' : '1fr',
          gap: 16,
          padding: 16,
        }}
      >
        {showSidebar ? (
          <div style={{ position: 'sticky', top: 'calc(var(--header-h) + 16px)', height: 'fit-content' }}>
            <Sidebar role={role} />
          </div>
        ) : null}

        <main className="container" style={{ padding: 0 }}>
          {children}
        </main>
      </div>

      <CartDrawer
        open={cartOpen}
        items={cart.items}
        onClose={() => setCartOpen(false)}
        onRemove={cart.removeItem}
        onUpdateQty={cart.updateQty}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <LoginModal
        open={loginOpen}
        onClose={() => {
          setLoginOpen(false);
          setAuthRequired(false);
        }}
        onLoggedIn={() => {
          setLoginOpen(false);
          setAuthRequired(false);
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onConfirm={() => {
          cart.refresh();
          setCheckoutOpen(false);
        }}
      />
    </div>
  );
}

function RoleGuard({ allow, children }: { allow: Array<'customer' | 'vendor' | 'admin'>; children: React.ReactNode }) {
  const { role } = useSession();
  const location = useLocation();

  if (!allow.includes(role)) {
    return <Navigate to="/account" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}

// PUBLIC_INTERFACE
export function App() {
  // On initial mount, we can attempt to restore token (handled by session store)
  // and let pages/components fetch data as needed.
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/stores/:storeId" element={<StoreDetailPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/account" element={<AccountPage />} />

          <Route
            path="/vendor"
            element={
              <RoleGuard allow={['vendor']}>
                <VendorDashboardPage />
              </RoleGuard>
            }
          />
          <Route
            path="/vendor/products"
            element={
              <RoleGuard allow={['vendor']}>
                <VendorProductsPage />
              </RoleGuard>
            }
          />
          <Route
            path="/vendor/orders"
            element={
              <RoleGuard allow={['vendor']}>
                <VendorOrdersPage />
              </RoleGuard>
            }
          />

          <Route
            path="/admin"
            element={
              <RoleGuard allow={['admin']}>
                <AdminDashboardPage />
              </RoleGuard>
            }
          />
          <Route
            path="/admin/vendors"
            element={
              <RoleGuard allow={['admin']}>
                <AdminVendorsPage />
              </RoleGuard>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
