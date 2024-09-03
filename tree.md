project-root/
│
├── tests/
│   └── components/
│       └── Button.test.tsx
│
├── types/
│   ├── analytics.ts
│   ├── DataPoint.ts
│   ├── index.ts
│   └── recharts.d.ts
│
├── utils/
│   └── helpers.ts
│
├── .env.local
├── .eslintrc.json
├── .gitignore
├── components.json
├── global.d.ts
├── next-env.d.ts
├── next.config.js
├── postcss.config.js
├── README.md
├── structure.md
├── tailwind.config.js
├── tsconfig.json
├── .upm/
├── node_modules/
├── package-lock.json
├── package.json
└── yarn.lock

components/
├── analytics/
│   ├── ScanActivityChart.tsx
│   ├── ScansByCity.tsx
│   ├── ScansByCountry.tsx
│   └── ScansByOS.tsx
│
├── common/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── ProgressSteps.tsx
│   └── RecentQRCodes.tsx
│
├── layout/
│   ├── ClientComponent.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   ├── MobileMenu.tsx
│   └── Sidebar.tsx
│
├── qr-tools/
│   ├── BusinessTool.tsx
│   ├── FacebookTool.tsx
│   ├── LinkTool.tsx
│   ├── MenuTool.tsx
│   ├── QRCodeDisplay.tsx
│   ├── QRCodeGenerator.tsx
│   ├── VCardTool.tsx
│   └── WiFiTool.tsx
│
├── ui/
│   ├── QRCodeCustomizer.tsx
│   └── UserOnboarding.tsx
│
└── context/
    └── AuthContext.tsx

hooks/
└── useQRCode.ts

lib/
├── firebase.ts
├── supabase.ts
└── utils.ts

public/
├── logo.png
├── logo.svg
└── favicon.ico

services/
├── api.ts
├── qrCodeService.ts
└── supabase.ts

styles/
└── globals.css

app/
├── analytics/
│   └── page.tsx
│
├── api/
│   ├── generate-qr/
│   └── qr-codes/
│
├── auth/
│   ├── callback/
│   │   └── route.ts
│   ├── forgot-password/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   └── reset-password/
│       └── page.tsx
│
├── checkout/
│   └── page.tsx
│
├── dashboard/
│   └── page.tsx
│
├── qr-codes/
│   ├── [id]/
│   │   └── page.tsx
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
│   ├── refer/
│   │   └── page.tsx
│   └── layout.tsx
│
└── support/
    ├── layout.tsx
    └── page.tsx
