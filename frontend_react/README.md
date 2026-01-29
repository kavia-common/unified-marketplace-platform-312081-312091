# Unified Marketplace Frontend (React)

This container serves a minimal but functional **React + Vite** frontend for a multi-vendor marketplace.

## Dev server

Runs on port `3000`:

```bash
npm install
npm run start
```

## Features scaffolded

- Header navigation: Home, Stores, Cart, Account
- Role-based sidebars for vendor/admin (use Login modal to switch roles)
- Main content pages (placeholder): browsing, products, orders
- Cart drawer and checkout modal (stub)
- Stub API client pointing to backend on port `3001` (via `/api` proxy)

## Environment variables (optional)

- `VITE_API_URL` (optional): override API base URL (defaults to `/api` with dev proxy to `http://localhost:3001`)
"
