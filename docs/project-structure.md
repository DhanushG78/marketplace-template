# Marketplace Project Structure Guide

A clean, scalable, and modular folder structure for your Next.js App Router (TypeScript) marketplace. 

## Directory Tree (`src/`)

```text
src/
├── app/                  # Next.js App Router: Pages, Layouts, API routes
│   ├── (auth)/           # Route group for auth pages (login, register)
│   ├── (dashboard)/      # Route group for internal dashboard pages
│   ├── api/              # API routes (Next.js serverless functions)
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Root page
├── components/           # Reusable UI Components
│   ├── ui/               # Base UI elements (buttons, inputs, modals - shadcn/ui typical)
│   ├── common/           # Shared complex components (Navbar, Footer)
│   └── layouts/          # Reusable layout wrappers
├── modules/              # Domain-Driven Modules (The Core Logic)
│   ├── auth/             # Authentication module (components, schemas, logic)
│   ├── items/            # Marketplace items/products
│   ├── orders/           # Order management
│   └── users/            # User profiles & management
├── services/             # External Integrations & APIs
│   ├── api.ts            # Base API client (Axios/Fetch wrapper)
│   ├── auth.service.ts   # Auth-related network requests
│   └── item.service.ts   # Item-related network requests
├── store/                # Global State Management (Zustand / Redux)
│   ├── useAuthStore.ts   # Auth state
│   └── useCartStore.ts   # Shopping cart state
├── hooks/                # Custom React Hooks (Shared across domains)
│   ├── useDebounce.ts
│   └── useMediaQuery.ts
├── config/               # App Configuration & Constants
│   ├── site.ts           # Site metadata, nav links
│   └── env.ts            # Environment variables validation
├── types/                # Global TypeScript declarations
│   └── index.ts
├── utils/                # Helper functions / Purity utilities
│   ├── format.ts         # Formatting currencies, dates
│   └── cn.ts             # Tailwind class merger (clsx, tailwind-merge)
└── lib/                  # Third-party instance initialization
    └── firebase.ts       # E.g., Firebase, Supabase, Prisma clients
```

## How to use the Modular Architecture

This structure follows a modular, feature-based approach combined with Next.js specific paradigms.

### 1. `modules/` (Domain Logic)
Instead of having a giant `components/` folder, segregate your business logic into domains.
If you are building the `items` feature, everything related strictly to "items" that isn't totally generic goes here.

Example: `src/modules/items/`
- `components/` -> `ItemCard.tsx`, `ItemGrid.tsx`
- `types.ts` -> `Item` interfaces
- `schemas.ts` -> Zod validation rules
- `hooks/` -> `useFetchItems.ts`

### 2. `components/` vs `modules/`
- **`components/ui/`**: Extremely dumb UI components. A generic `Button`, `Input`, `Dialog`.
- **`components/common/`**: Shared combinations of UI components like `Header` or `Footer`.
- **`modules/.../components/`**: Highly coupled business components. e.g. `LoginForm` doesn't belong in shared UI because it is tied directly to the auth domain.

### 3. `app/` (Routing)
Keep the `app` directory files extremely minimal. They should primarily handle reading route parameters, fetching server-side data, and returning server components that consume the UI blocks from `modules` or `components`.

### 4. `services/` & `lib/`
Keep API calls abstracted away in `services/`. Use `lib/` to initialize external clients (Supabase, Firebase, Stripe) so there is always a single instantiated instance exported across your app.

### 5. `store/`
Keep global stores lightweight. If you use Zustand, write small, isolated stores (e.g. `useCartStore`, `useUserStore`) rather than single monolithic stores.
