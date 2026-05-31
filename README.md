# Vynamic POS

A modern point-of-sale application built with React and TypeScript, inspired by retail POS systems used in enterprise environments.

🔗 **Live demo:** [vynamic-pos.onrender.com](https://vynamic-pos.onrender.com)

---

## Features

- **Product catalog** — browse products with category filtering
- **Cart management** — add, remove, and update quantities in real time
- **Cart detail view** — review full order before checkout
- **Transaction summary** — VAT 23% breakdown (net + gross)
- **Receipt confirmation** — print receipt and start a new transaction
- **Live clock** — real-time date and time display in the header

## Tech Stack

- **React 18** with TypeScript
- **Vite** — build tool and dev server
- **CSS Modules** — scoped component styles
- **No external UI libraries** — custom components from scratch

## Project Structure

```
src/
├── components/
│   ├── Header/
│   ├── Product/
│   │   ├── ProductList.tsx
│   │   └── ProductCard.tsx
│   ├── Cart/
│   │   ├── Cart.tsx
│   │   ├── CartItem.tsx
│   │   └── CartDetail.tsx
│   └── Confirmation/
│       └── Confirmation.tsx
├── constants/
│   └── products.ts
├── App.tsx
└── main.tsx
```

## Architecture Decisions

**Lifting state up** — cart state lives in `App.tsx` and is shared between `ProductList` and `Cart` via props and callbacks. This follows React's unidirectional data flow.

**CSS Modules** — each component has its own scoped stylesheet using CSS custom properties (design tokens) defined globally in `global.css`.

**View-based navigation** — three views (`pos`, `cart`, `confirmation`) managed by a single `useState` in `App.tsx` — no routing library needed for this scope.

**Immutable state updates** — all state updates use the functional form of `setState` with spread operators to avoid direct mutation.

## Getting Started

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/vynamic-pos.git
cd vynamic-pos

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Screenshots

| POS Screen | Cart Detail | Confirmation |
|---|---|---|
| Product catalog with category filters | Full order review with VAT breakdown | Transaction receipt |

## What I'd Add Next

- Backend API (Node.js + Express) with `GET /api/products` and `POST /api/orders`
- Product search by name
- Cashier authentication (JWT)
- Order history