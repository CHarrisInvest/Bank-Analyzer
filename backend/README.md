# Bank Analyzer Backend

Backend service for Bank Analyzer with SEC EDGAR data integration. This service fetches historical financial data from SEC filings, calculates banking metrics, and provides a REST API for the frontend.

## Features

- **SEC EDGAR Integration**: Fetches real financial data from SEC EDGAR database
- **Automated Metrics Calculation**: Computes Graham Number, ROE, ROTA, and other banking metrics
- **PostgreSQL Storage**: Persistent storage with historical data tracking
- **Daily Cron Job**: Automatic data refresh at 2 AM daily
- **REST API**: Clean API endpoints for frontend consumption
- **Rate Limiting**: Respectful API usage with SEC's 10 req/sec limit

## Prerequisites

- Node.js 16+
- PostgreSQL 12+
- npm or yarn

## Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure:
```env
PORT=3001
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=bank_analyzer
DB_USER=postgres
DB_PASSWORD=your_password

EDGAR_USER_AGENT="YourCompany contact@youremail.com"
```

**Important**: The `EDGAR_USER_AGENT` must include your contact information as required by SEC.

3. Create PostgreSQL database:
```bash
createdb bank_analyzer
```

4. Initialize database schema:
```bash
npm run db:init
```

This will create:
- `banks` table - Stores bank information
- `bank_metrics` table - Stores calculated financial metrics
- `latest_bank_metrics` view - Pre-joined view for latest data
- Indexes and triggers

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

Server will start on port 3001 (or PORT from .env).

## API Endpoints

### Get All Banks
```
GET /api/banks
```

Returns all banks with their latest metrics.

**Response:**
```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "id": "bank-0",
      "ticker": "JPM",
      "bankName": "JPMorgan Chase & Co.",
      "exchange": "NYSE",
      "price": 150.25,
      "marketCap": 430000,
      "pni": 12.5,
      "ptbvps": 1.8,
      "roe": 15.2,
      "rota": 1.1,
      "grahamNum": 165.50,
      "grahamMoS": 15.25,
      "grahamMoSPct": 10.15
    }
  ]
}
```

### Get Bank by Ticker
```
GET /api/banks/:ticker
```

Example: `GET /api/banks/JPM`

### Get Bank History
```
GET /api/banks/:ticker/history?limit=10
```

Returns historical metrics for a specific bank.

### Manual Data Refresh
```
POST /api/banks/refresh
```

Triggers manual refresh for all banks (runs in background).

```
POST /api/banks/:ticker/refresh
```

Triggers refresh for a specific bank.

### Health Check
```
GET /health
```

Returns server health status.

## Data Refresh

### Automatic Refresh
Data is automatically refreshed daily at 2:00 AM via cron job.

### Manual Refresh
You can trigger manual refresh via the API:
```bash
curl -X POST http://localhost:3001/api/banks/refresh
```

### Adding More Banks

Edit `src/config/index.js` and add tickers to the `bankTickers` array:

```javascript
bankTickers: [
  'JPM', 'BAC', 'WFC', // existing banks
  'NEWBANK', // add your bank ticker here
]
```

Then run a manual refresh or wait for the daily cron job.

## Database Schema

### Banks Table
- `id` - Primary key
- `ticker` - Stock ticker (unique)
- `cik` - SEC CIK number (unique)
- `name` - Company name
- `exchange` - Stock exchange
- `created_at`, `updated_at` - Timestamps

### Bank Metrics Table
- `id` - Primary key
- `bank_id` - Foreign key to banks
- `price` - Current stock price
- `market_cap` - Market capitalization
- `total_assets`, `total_equity` - Balance sheet items
- `net_income` - Income statement
- `pni`, `ptbvps`, `roe`, `rota` - Calculated ratios
- `graham_number`, `graham_mos`, `graham_mos_pct` - Graham metrics
- `data_date` - Date of the financial data
- `created_at`, `updated_at` - Timestamps

## Architecture

```
┌─────────────────┐
│  SEC EDGAR API  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  SEC EDGAR Client       │
│  (services/edgar.js)    │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Metrics Calculator     │
│  (services/calculator)  │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Data Refresh Job       │
│  (jobs/dataRefresh.js)  │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  PostgreSQL Database    │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  REST API Controllers   │
│  (api/controllers)      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Frontend Application   │
└─────────────────────────┘
```

## Metrics Calculated

### Valuation Metrics
- **P/NI (P/E)**: Price to Net Income ratio
- **P/TBV**: Price to Tangible Book Value per Share
- **Mkt Cap/SE**: Market Cap to Shareholder Equity

### Performance Metrics
- **ROE**: Return on Equity (%)
- **ROTA**: Return on Total Assets (%)
- **NI/TBV**: Net Income to Tangible Book Value

### Graham Value Investing
- **Graham Number**: √(22.5 × EPS × Book Value per Share)
- **Graham MoS**: Margin of Safety in dollars
- **Graham MoS %**: Margin of Safety as percentage

## Troubleshooting

### Database Connection Issues
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution**: Ensure PostgreSQL is running:
```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Check status
pg_isready
```

### SEC EDGAR Rate Limiting
```
Error: 403 Forbidden
```

**Solution**: Ensure your `EDGAR_USER_AGENT` includes valid contact information.

### Empty Data Response
```
No valid bank records found
```

**Solution**: Run initial data refresh:
```bash
curl -X POST http://localhost:3001/api/banks/refresh
```

Wait a few minutes for data to populate (SEC API can be slow).

## Development

### Project Structure
```
backend/
├── server.js                 # Express server entry point
├── src/
│   ├── api/
│   │   ├── controllers/      # Request handlers
│   │   └── routes/           # API routes
│   ├── services/
│   │   ├── edgar.js          # SEC EDGAR API client
│   │   └── calculator.js     # Metrics calculation
│   ├── db/
│   │   ├── connection.js     # Database pool
│   │   ├── schema.sql        # Database schema
│   │   └── init.js           # DB initialization script
│   ├── jobs/
│   │   └── dataRefresh.js    # Data refresh job
│   └── config/
│       └── index.js          # Configuration
├── package.json
└── .env
```

### Running Tests
```bash
npm test
```

## Deployment

### Environment Variables
Set these in your production environment:
- `NODE_ENV=production`
- `DATABASE_URL` or individual `DB_*` variables
- `EDGAR_USER_AGENT` with valid contact info

### Database Migration
```bash
npm run db:init
```

### Process Manager
Use PM2 for production:
```bash
npm install -g pm2
pm2 start server.js --name bank-analyzer-api
pm2 save
pm2 startup
```

## License

MIT
