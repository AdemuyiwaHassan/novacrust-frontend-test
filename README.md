# NOVACRUST FRONTEND TEST

A small Next.js + TypeScript frontend demo for a checkout flow using the Shadcn-UI font and Tailwind utilities.

## Quick start

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Build and run production:

```bash
npm run build
npm run start
```

## Project files

- App entry: [app/page.tsx](app/page.tsx)
- Layout: [app/layout.tsx](app/layout.tsx)
- Key components: [components/checkout.tsx](components/checkout.tsx), [components/checkout-tabs.tsx](components/checkout-tabs.tsx), [components/currency-input.tsx](components/currency-input.tsx), [components/currency-selector.tsx](components/currency-selector.tsx), [components/recipient-details.tsx](components/recipient-details.tsx), [components/wallet-selector.tsx](components/wallet-selector.tsx)
- UI primitives: [components/ui](components/ui)
- Icons: [icons.tsx](icons.tsx)
- Utilities: [lib](lib), [utils.ts](utils.ts)
- Config: [package.json](package.json), [next.config.ts](next.config.ts), [tsconfig.json](tsconfig.json)

## Deployment

Deployed on Vercel [live demo](https://novacrust-frontend-test-flame.vercel.app/)
