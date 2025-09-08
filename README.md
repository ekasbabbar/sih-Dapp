## Marketplace DApp

A simple full‑stack marketplace DApp with:
- **Smart contract** scaffolding in `contracts/`
- **Backend API** (Express + SQLite) in `server/`
- **Frontend** (React + Vite + ethers) in `frontend/`

### Prerequisites
- Node.js 18+ and npm
- Git
- Optional: A Web3 wallet (e.g., MetaMask) for interacting with the DApp

### Project Structure
```
contracts/            # Solidity contract(s)
server/               # Express API + SQLite
frontend/             # React + Vite SPA
```

### Environment Variables
Backend (`server/.env`):
```
HOST=0.0.0.0         # default
PORT=5000            # default
DB_PATH=./server/marketplace.db  # optional, defaults internally
```

Frontend (`frontend/.env`):
```
VITE_API_URL=http://localhost:5000
```

The frontend dev server proxies requests from `/api/*` to `VITE_API_URL`.

### Install
Run these from the repository root in two terminals or sequentially:

Terminal A (backend):
```bash
cd server
npm install
```

Terminal B (frontend):
```bash
cd frontend
npm install
```

### Run (Development)
Start the backend:
```bash
cd server
npm run dev    # or: npm start
```
This starts the API at `http://localhost:5000` by default.

Start the frontend:
```bash
cd frontend
npm run dev
```
This starts the app at `http://localhost:5173` and proxies `/api` to the backend.

### API Endpoints (Server)
- `GET /` → health check: "Marketplace API running"
- `USE /products` → product routes
- `USE /users` → user routes

SQLite database file is created at `server/marketplace.db` by default. You can override with `DB_PATH`.

### Contract Configuration
- Contract config lives at `frontend/src/config/marketplaceConfig.js`.
- Update `marketplaceAddress` and `marketplaceABI` after you deploy your contract.

Example:
```js
// frontend/src/config/marketplaceConfig.js
export const marketplaceAddress = "0xYourDeployedAddress";
export const marketplaceABI = [ /* your ABI */ ];
```

Note: `contracts/marketplace.sol` is included as a placeholder. Deploy with your preferred toolchain (e.g., Hardhat/Foundry), then update the frontend config above.

### Build (Frontend)
```bash
cd frontend
npm run build
npm run preview   # serves the production build locally
```

### Common Issues
- If the frontend cannot reach the API, ensure `VITE_API_URL` matches the backend host/port and that the backend is running.
- On Windows/PowerShell, use the same commands; no special flags are required.

### Scripts Reference
Backend (`server/package.json`):
- `npm run dev` → start with nodemon
- `npm start` → start with Node

Frontend (`frontend/package.json`):
- `npm run dev` → start Vite dev server (port 5173)
- `npm run build` → production build
- `npm run preview` → preview built app

### License
MIT (or your preferred license).

# Marketplace DApp

A full-stack demo Marketplace DApp with:

- Smart contract interactions (ethers v6) for creating listings, bidding, ending auctions, and releasing funds.
- Node/Express + SQLite backend for managing off-chain product catalog (/api/products).
- React + Vite frontend with light/dark theme and role-based menus.

## Prerequisites
- Node.js 18+
- npm 9+
- MetaMask (or any EIP-1193 compatible wallet) in your browser

## Project Structure
```
contracts/           # Solidity contracts (placeholder)
server/              # Express API + SQLite DB
frontend/            # React app (Vite)
```

## Setup
1) Install dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../frontend
npm install
```

2) Configure environment (optional)
- Frontend proxies /api to the backend via Vite. Default target is http://localhost:5000.
- To override, create frontend/.env and set:

```bash
VITE_API_URL=http://localhost:5000
```

## Running
1) Start the backend API

```bash
cd server
npm run dev
# or
npm start
```

API runs at http://localhost:5000. Routes:
- GET /products – list items
- POST /products – create item { name, description?, price? }

2) Start the frontend

```bash
cd ../frontend
npm run dev
```

Open the URL shown (typically http://localhost:5173).

## Using the App
- Click "Connect Wallet" to connect MetaMask.
- Choose role:
  - Farmer (Seller): create listing on-chain, end auction.
  - Distributor (Buyer): place bid on-chain, release funds.
- Fetch on-chain listing details with "Fetch Listing".
- Use "Fetch Available Items" to load items from the backend catalog (/api/products).

## API Notes
- Frontend uses frontend/src/utils/api.js with base of /api. Vite proxies /api to VITE_API_URL.
- Products model uses SQLite at server/marketplace.db.

## Troubleshooting
- If API calls fail, confirm backend is running and VITE_API_URL matches the backend URL.
- If MetaMask is not detected, install it and ensure window.ethereum is available.
- If contract calls fail, verify marketplaceAddress and marketplaceABI in frontend/src/config/marketplaceConfig.js for your network.

## Scripts
Backend:
- npm run dev – start with nodemon (if configured)
- npm start – start server

Frontend:
- npm run dev – Vite dev server
- npm run build – build production assets
- npm run preview – preview built app

## License
MIT
