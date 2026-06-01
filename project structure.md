patsy-scoffee/
├── src/
│   ├── app/
│   │   ├── (auth)/                    # Auth routes group (no sidebar)
│   │   │   ├── layout.tsx             # Auth layout (centered card)
│   │   │   ├── login/
│   │   │   │   └── page.tsx           # /login
│   │   │   └── register/
│   │   │       └── page.tsx           # /register
│   │   │
│   │   ├── (dashboard)/               # Dashboard routes group (with sidebar)
│   │   │   ├── layout.tsx             # Dashboard layout with sidebar
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx           # /dashboard (overview/stats)
│   │   │   │
│   │   │   ├── management/
│   │   │   │   ├── layout.tsx         # Management sub-layout
│   │   │   │   ├── member/
│   │   │   │   │   └── page.tsx       # /management/member
│   │   │   │   ├── product/
│   │   │   │   │   └── page.tsx       # /management/product
│   │   │   │   └── inventory/
│   │   │   │       └── page.tsx       # /management/inventory
│   │   │   │
│   │   │   └── reports/
│   │   │       ├── layout.tsx         # Reports sub-layout
│   │   │       ├── sales/
│   │   │       │   └── page.tsx       # /reports/sales
│   │   │       ├── transactions/
│   │   │       │   └── page.tsx       # /reports/transactions
│   │   │       └── product/
│   │   │           └── page.tsx       # /reports/product
│   │   │
│   │   ├── api/                       # API routes
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts
│   │   │
│   │   └── layout.tsx                 # Root layout
│   │
│   ├── stores/                        # Zustand stores
│   │   ├── slices/
│   │   │   ├── auth-slice.ts
│   │   │   ├── member-slice.ts
│   │   │   ├── product-slice.ts
│   │   │   ├── inventory-slice.ts
│   │   │   └── report-slice.ts
│   │   ├── app-store.ts               # Main store combining all slices
│   │   └── use-store.ts               # SSR-safe hook
│   │
│   ├── modules/                       # Business logic
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── auth.service.ts
│   │   │   └── auth.schema.ts
│   │   ├── member/
│   │   │   ├── components/
│   │   │   ├── member.service.ts
│   │   │   └── member.schema.ts
│   │   ├── product/
│   │   ├── inventory/
│   │   └── report/
│   │
│   ├── components/                    # Shared components
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── table.tsx
│   │   ├── layout/
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── mobile-nav.tsx
│   │   └── charts/
│   │       ├── sales-chart.tsx
│   │       └── inventory-status.tsx
│   │
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   └── utils.ts
│   │
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   ├── use-permissions.ts
│   │   └── use-report-data.ts
│   │
│   ├── types/
│   │   ├── member.ts
│   │   ├── product.ts
│   │   ├── inventory.ts
│   │   └── report.ts
│   │
│   └── middleware.ts                  # Auth & role protection
│
├── .env.local
├── next.config.js
├── package.json
└── tsconfig.json