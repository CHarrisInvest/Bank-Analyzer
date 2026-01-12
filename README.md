# Bank Analyzer

A comprehensive bank screening tool with SEC EDGAR data integration. Analyze publicly traded banks using financial metrics, value investing criteria, and custom filters.

## Features

- **Real SEC Filing Data**: Direct integration with SEC EDGAR API for official financial data
- **Automated Metrics**: Calculates Graham Number, ROE, ROTA, P/E, and more
- **Real-time Pricing**: Fetches current stock prices from Yahoo Finance
- **Advanced Filtering**: Screen banks by multiple criteria
- **Historical Tracking**: Store and track metrics over time
- **Daily Updates**: Automated daily data refresh

## Architecture

This project consists of two main components:

### Frontend (React + Vite)
- Modern React application with screener interface
- Fetches data from backend API
- Client-side filtering and sorting
- Responsive design for financial data analysis

### Backend (Node.js + Express)
- SEC EDGAR API integration for official financial data
- PostgreSQL database for persistent storage
- Automatic daily data refresh via cron job
- REST API for frontend consumption

## Quick Start

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
createdb bank_analyzer

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
createdb bank_analyzer

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

## Data Sources

### Current: SEC EDGAR API (Recommended)
- **Source**: Official SEC EDGAR database
- **Frequency**: Daily automatic refresh (2 AM)
- **Pros**: Real SEC filing data, automated updates, historical tracking
- **Cons**: Requires PostgreSQL database and backend server

### Legacy: Google Sheets (Deprecated)
- Previous implementation used published Google Sheets
- Replaced by SEC EDGAR integration for production use
- Provides real-time SEC filing data instead of manual spreadsheet updates

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
createdb bank_analyzer
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
