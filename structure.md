root/
│
├── page.tsx
├── api/
│   ├── generate-qr/
│   └── qr-codes/
│
├── auth/
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   └── dashboard/
│       └── page.tsx
│
├── qr-codes/
│   ├── edit/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── my-codes/
│   │   └── page.tsx
│   └── new/
│       └── page.tsx
│
├── settings/
│   ├── account/
│   │   └── page.tsx
│   ├── company/
│   │   └── page.tsx
│   ├── domains/
│   │   └── page.tsx
│   ├── members/
│   │   └── page.tsx
│   ├── plan-billing/
│   │   └── page.tsx
│   └── refer/
│       └── page.tsx
│
├── layout.tsx
├── support/
│   ├── layout.tsx
│   └── page.tsx
│
├── cache/
│
├── components/
│   ├── analytics/
│   │   ├── ScanActivityChart.tsx
│   │   ├── ScansByCity.tsx
│   │   ├── ScansByCountry.tsx
│   │   └── ScansByOS.tsx
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── RecentQRCodes.tsx
│   ├── layout/
│   │   ├── ClientComponent.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   ├── MobileMenu.tsx
│   │   └── Sidebar.tsx
│   ├── qr-tools/
│   │   ├── BusinessTool.tsx
│   │   ├── FacebookTool.tsx
│   │   ├── LinkTool.tsx
│   │   ├── MenuTool.tsx
│   │   ├── QRCodeDisplay.tsx
│   │   ├── QRCodeGenerator.tsx
│   │   ├── VCardTool.tsx
│   │   └── UITool.tsx
│   └── QRCodeCustomizer.tsx
│
├── hooks/
│   └── useQRCode.ts
│
├── public/
├── services/
│   ├── api.ts
│   ├── firebase.ts
│   └── supabase.ts
│
├── styles/
│   └── globals.css
│
├── tests/
├── types/
│   ├── analytics.ts
│   ├── DataPoint.ts
│   ├── index.ts
│   └── recharts.d.ts
│
├── utils/
│
├── .env.local
├── .eslintcrc.json
├── components.json
├── middleware.ts
├── next-env.d.ts
├── next.config.js
├── postcss.config.js
├── README.md
├── structure.md
├── tailwind.config.js
├── tsconfig.json
└── .gitignore
