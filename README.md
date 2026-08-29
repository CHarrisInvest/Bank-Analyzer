# BankSift

Bank Investment Tools. Sift through the noise.

A comprehensive bank screening tool with SEC EDGAR data integration. Analyze publicly traded banks using financial metrics, value investing criteria, and custom filters.

## 🚀 Quick Start (Recommended)

**Want the simplest setup? Use GitHub Pages!**

✅ No downloads required
✅ No accounts beyond GitHub
✅ Completely free
✅ Automated daily updates
✅ Live in 5 minutes

👉 **[Follow the GitHub Pages Setup Guide](GITHUB_PAGES_SETUP.md)** 👈

---

## Features

- **Real SEC Filing Data**: Direct integration with SEC EDGAR API for official financial data
- **Automated Metrics**: Calculates Graham Number, ROE, ROTA, P/E, and more
- **Stock Pricing**: Fetches prior close prices from Marketstack API
- **Advanced Filtering**: Screen banks by multiple criteria
- **Historical Tracking**: Store and track metrics over time (backend only)
- **Daily Updates**: Automated daily data refresh via GitHub Actions

## Deployment Options

Choose the setup that fits your needs:

### Option 1: GitHub Pages (Recommended ⭐)

**Perfect for:** Simple deployment, no maintenance, zero cost

| Feature | Details |
|---------|---------|
| **Setup Time** | 5 minutes |
| **Cost** | $0/month |
| **Requirements** | GitHub account only |
| **Updates** | Automated daily via GitHub Actions |
| **Hosting** | GitHub Pages (free) |
| **Historical Data** | Limited to file commits |

📖 **[GitHub Pages Setup Guide →](GITHUB_PAGES_SETUP.md)**

### Option 2: Full Backend (Advanced)

**Perfect for:** Historical data analysis, custom features, on-demand updates

| Feature | Details |
|---------|---------|
| **Setup Time** | 1-2 hours |
| **Cost** | $5-12/month |
| **Requirements** | Node.js, PostgreSQL, hosting |
| **Updates** | Daily cron + on-demand API |
| **Hosting** | Heroku, Railway, VPS, etc. |
| **Historical Data** | Full database tracking |

📖 **[Backend Setup Guide →](SETUP_GUIDE.md)** | **[Deployment Guide →](DEPLOYMENT.md)**

---

## Architecture

### GitHub Pages Approach (Simplified)
```
GitHub Actions → Fetch SEC Data → Save JSON → Deploy to Pages
```

### Full Backend Approach (Advanced)
```
SEC EDGAR API → Backend Service → PostgreSQL → REST API → React Frontend
```

---

## Quick Start - Full Backend

> **Note:** For GitHub Pages setup, see [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md)

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- npm or yarn

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials and EDGAR User-Agent

# Create database
createdb banksift

# Initialize database schema
npm run db:init

# Start the backend server
npm run dev
```

The backend will start on http://localhost:3001

See `backend/README.md` for detailed backend documentation.

### 2. Frontend Setup

```bash
# Install frontend dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env to point to your backend
# VITE_API_URL=http://localhost:3001
```

### 3. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 4. Initial Data Load

Trigger the initial data refresh:
```bash
curl -X POST http://localhost:3001/api/banks/refresh
```

Wait a few minutes for the data to populate (SEC EDGAR API can be slow).

## Checks

```bash
npm run check          # unit tests + statement invariants
npm test               # unit tests only
```

`npm run check` is what CI runs (`.github/workflows/checks.yml`), and the
update-sec-data workflow runs the invariant half against freshly generated data
before committing it.

The invariants are properties that are wrong at any count, whatever the
quarter: a blank or mangled row label, a duplicated or out-of-order period
column, a subtotal shown negative over positive components, a balance sheet
that does not foot. They are deliberately not snapshot comparisons — the data
changes every quarter, and a check that fails on ordinary change gets ignored.

For a fuller picture of what the statement tables look like, the same scripts
report without asserting, and can diff against a committed snapshot:

```bash
npm run audit:labels                                       # what every row is called
npm run audit:presentation                                 # how the tables hold together
node scripts/audit-labels.mjs --compare tests/label-snapshot.json
```

The compare mode is the one to use when changing the label rules: it separates
labels that got better from labels that got worse, and flags any that lost a
descriptive word, which a single summary count hides.

## Project Structure

```
Bank-Analyzer/
├── backend/                  # Backend service (Node.js/Express)
│   ├── src/
│   │   ├── api/             # REST API routes & controllers
│   │   ├── services/        # SEC EDGAR client & calculator
│   │   ├── db/              # Database connection & schema
│   │   ├── jobs/            # Cron jobs for data refresh
│   │   └── config/          # Configuration
│   ├── server.js
│   └── package.json
│
├── src/                     # Frontend source code
│   ├── components/          # React components
│   ├── data/
│   │   └── sheets.js        # API client (now calls backend)
│   └── utils/
└── ...
```

## Tech Stack

### Backend
- **Node.js + Express** - REST API server
- **PostgreSQL** - Relational database for financial data
- **SEC EDGAR API** - Official SEC data source
- **node-cron** - Scheduled data refresh
- **axios** - HTTP client for API calls

### Frontend
- React 18
- Vite
- Modern CSS

## Quick Start

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your database credentials and contact info

# Create database
createdb banksift

# Initialize database schema
npm run db:init

# Start backend server
npm run dev
```

Backend will start on `http://localhost:3001`

### 2. Frontend Setup

```bash
# In the root directory
npm install

# Copy environment file
cp .env.example .env

# Edit .env to set VITE_API_URL if needed (defaults to http://localhost:3001)

# Start frontend
npm run dev
```

Frontend will start on `http://localhost:5173`

## Initial Data Setup

After starting the backend, trigger an initial data refresh:

```bash
curl -X POST http://localhost:3001/api/banks/refresh
```

This will fetch data from SEC EDGAR for all configured banks. The first run may take 5-10 minutes depending on the number of banks.

## Architecture

### System Architecture
```
┌────────────────┐         ┌──────────────────┐
│   Frontend     │────────▶│  Backend API     │
│   (React/Vite) │         │  (Express.js)    │
└────────────────┘         └────────┬─────────┘
                                     │
                                     ▼
                          ┌──────────────────┐
                          │   PostgreSQL     │
                          │    Database      │
                          └────────┬─────────┘
                                   ▲
                                   │
                          ┌────────┴─────────┐
                          │                  │
                     ┌────▼────┐      ┌─────▼────────┐
                     │  Cron   │      │  Manual API  │
                     │  Job    │      │   Trigger    │
                     └─────────┘      └──────────────┘
```

## Quick Start

### Option 1: Run with Backend (Recommended for Production)

1. **Start PostgreSQL**:
```bash
# Ensure PostgreSQL is running
pg_isready
```

2. **Set up backend**:
```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials
npm install
npm run db:init
npm start
```

3. **Set up frontend environment**:
```bash
cp .env.example .env
# Edit .env and set VITE_API_URL=http://localhost:3001
```

4. **Install and run frontend**:
```bash
npm install
npm run dev
```

5. **Trigger initial data load**:
```bash
curl -X POST http://localhost:3001/api/banks/refresh
```

Wait 2-5 minutes for data to populate from SEC EDGAR.

### Option 2: Google Sheets (Legacy)

If you want to continue using Google Sheets:
1. Keep the old data fetching code
2. Comment out the backend API configuration

## Data Sources & Bank Discovery

### Bank List Generation (SEC EDGAR + SIC)

The bank list is **automatically generated** from SEC EDGAR using SIC (Standard Industrial Classification) codes. This replaces any hardcoded ticker lists.

**SIC Codes for Banks:**
| SIC Code | Description |
|----------|-------------|
| 6021 | National Commercial Banks |
| 6022 | State Commercial Banks |
| 6035 | Savings Institutions, Federally Chartered |
| 6036 | Savings Institutions, Not Federally Chartered |
| 6712 | Bank Holding Companies |

**How it works:**
1. `scripts/discover-banks.cjs` queries SEC EDGAR for all companies with bank SIC codes
2. For each company, it resolves ticker symbols via SEC's ticker-to-CIK mapping
3. Exchange information is determined by checking:
   - NASDAQ Symbol Directory (includes NYSE, NASDAQ, AMEX)
   - OTC Markets Directory (OTCQX, OTCQB, Pink Sheets)
4. Results are saved to `public/data/bank-list.json` and `public/data/bank-list.csv`

**Exchange Assignment Rules:**
1. If ticker is found in NASDAQ directory → use directory's exchange (NYSE/NASDAQ)
2. Else if found in OTC Markets → assign OTC with tier info
3. Else → assign "N/A" (may be delisted or private)

**Running the Discovery:**
```bash
npm run discover-banks  # Generate bank list from SEC EDGAR
npm run fetch-data      # Fetch financial data for discovered banks
npm run refresh-all     # Run both in sequence
```

### Financial Data: SEC EDGAR API
- **Source**: Official SEC EDGAR XBRL API
- **Frequency**: Daily automatic refresh (2 AM UTC)
- **Data**: Balance sheet, income statement, shares outstanding
- **Metrics**: TTM (Trailing Twelve Months) calculations for income-based metrics

### Stock Prices: Marketstack API
- Requires `MARKETSTACK_API_KEY` environment variable
- Fetches prior close prices for Graham Number calculations

### Why Some Banks Show Exchange = "N/A"

Some banks identified via SIC codes may show `Exchange = "N/A"` because:
- The company is **delisted** (no longer publicly traded)
- The ticker is **not found** in exchange directories (data lag)
- The company trades on an **unlisted exchange** not covered by our directories
- The company is **private** (files with SEC but has no public shares)

These entries are included for completeness but may have limited trading data.

## Project Structure

```
Bank-Analyzer/
├── src/                      # Frontend source code
│   ├── components/          # React components
│   ├── data/
│   │   └── sheets.js        # API client (formerly Google Sheets)
│   └── utils/
│       └── csv.js           # Utility functions
├── backend/                 # Backend API (NEW)
│   ├── server.js
│   ├── src/
│   │   ├── api/             # REST API endpoints
│   │   ├── services/        # SEC EDGAR client & calculator
│   │   ├── db/              # Database layer
│   │   ├── jobs/            # Cron jobs
│   │   └── config/          # Configuration
│   └── package.json
├── package.json
└── .env
```

## Quick Start

### Option 1: Backend + Frontend (Recommended for Production)

1. **Set up PostgreSQL database:**
```bash
createdb banksift
```

2. **Backend setup:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run db:init  # Initialize database
npm run dev      # Start backend server on port 3001
```

3. **Frontend setup:**
```bash
# In root directory
npm install
cp .env.example .env
# Edit .env to set VITE_API_URL=http://localhost:3001
npm run dev      # Start frontend on port 5173
```

### Option 2: Frontend Only (Legacy Google Sheets Mode)

If you don't want to run the backend:

1. Comment out the backend API call in `src/data/sheets.js`
2. Use the Google Sheets integration (requires published Google Sheet)

## Features

### Current Features
- **Real-time SEC EDGAR Data**: Fetches actual financial data from SEC filings
- **Automated Calculations**: Computes Graham Number, ROE, ROTA, and other metrics
- **Multi-criteria Screening**: Filter by ROE, P/NI, P/TBV, Market Cap, Graham MoS, Exchange
- **Sortable Results**: Click column headers to sort
- **Persistent Storage**: PostgreSQL database with historical data
- **Daily Updates**: Automated cron job refreshes data at 2 AM
- **Professional UI**: Clean, finance-focused interface

### Metrics Calculated
- **Price to Net Income (P/NI)**: Valuation ratio
- **Price to Tangible Book Value (P/TBV)**: Asset-based valuation
- **Return on Equity (ROE)**: Profitability metric
- **Return on Total Assets (ROTA)**: Asset efficiency
- **Graham Number**: Benjamin Graham's intrinsic value formula
- **Graham Margin of Safety**: Difference between intrinsic and market value

## API Endpoints

### GET /api/banks
Returns all banks with latest metrics

### GET /api/banks/:ticker
Returns specific bank data

### GET /api/banks/:ticker/history
Returns historical metrics

### POST /api/banks/refresh
Manually trigger data refresh

## Architecture

```
┌─────────────────┐
│  SEC EDGAR API  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Backend API    │
│  (Node.js)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  PostgreSQL DB  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  React Frontend │
└─────────────────┘
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT

## Support

For issues and questions:
- Backend documentation: See `backend/README.md`
- Open an issue on GitHub
