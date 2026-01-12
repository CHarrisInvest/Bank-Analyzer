# Bank Analyzer Setup Guide

Complete step-by-step instructions for setting up your production backend.

---

## Step 1: Set Up PostgreSQL Database

### Option A: Install PostgreSQL Locally (Development)

#### **macOS:**
```bash
# Install via Homebrew
brew install postgresql@15

# Start PostgreSQL service
brew services start postgresql@15

# Verify installation
psql --version
# Should show: psql (PostgreSQL) 15.x

# Check if PostgreSQL is running
pg_isready
# Should show: /tmp:5432 - accepting connections
```

#### **Ubuntu/Debian Linux:**
```bash
# Update package list
sudo apt update

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql  # Auto-start on boot

# Check status
sudo systemctl status postgresql

# Verify installation
psql --version
```

#### **Windows:**
1. Download installer from: https://www.postgresql.org/download/windows/
2. Run installer (default settings work fine)
3. Remember the password you set for the `postgres` user
4. Add PostgreSQL to PATH: `C:\Program Files\PostgreSQL\15\bin`
5. Open Command Prompt and verify: `psql --version`

### Option B: Use Managed PostgreSQL (Production/Quick Start)

#### **Free Tier Options:**

**Supabase (Recommended - Easiest):**
1. Go to https://supabase.com
2. Create free account
3. Create new project
4. Copy connection string from Settings → Database
5. Format: `postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres`

**Heroku Postgres:**
```bash
# Install Heroku CLI first
brew install heroku/brew/heroku  # macOS
# or download from: https://devcenter.heroku.com/articles/heroku-cli

# Login and create app
heroku login
heroku create my-bank-analyzer-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Get connection string
heroku config:get DATABASE_URL
```

**Railway:**
1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Add PostgreSQL
4. Copy connection string from Variables tab

---

### Create the Database

#### **Local PostgreSQL:**

**macOS/Linux:**
```bash
# Connect as default postgres user
psql postgres

# Inside psql, run:
CREATE DATABASE bank_analyzer;
CREATE USER bank_user WITH PASSWORD 'your_secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE bank_analyzer TO bank_user;

# Quit psql
\q
```

**Or using command line directly:**
```bash
# Create database
createdb bank_analyzer

# The default user will have access
# Test connection:
psql bank_analyzer
```

**Windows:**
```cmd
# Open Command Prompt as Administrator
# Connect to PostgreSQL
psql -U postgres

# Then run same SQL commands as above
CREATE DATABASE bank_analyzer;
CREATE USER bank_user WITH PASSWORD 'your_secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE bank_analyzer TO bank_user;
\q
```

#### **Managed PostgreSQL:**
- Database is already created
- Use the connection string provided
- Skip user creation (already configured)

---

### Verify Database Connection

```bash
# Test connection
psql -h localhost -U bank_user -d bank_analyzer -c "SELECT version();"

# Should show PostgreSQL version info
```

---

## Step 2: Configure Environment Variables

### Backend Configuration

```bash
cd backend

# Copy example file
cp .env.example .env

# Open .env in your editor
nano .env   # or: code .env (VS Code), vim .env, etc.
```

### Edit `.env` file:

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# ===================================
# DATABASE CONFIGURATION
# ===================================

# Option A: Local PostgreSQL (default)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bank_analyzer
DB_USER=bank_user
DB_PASSWORD=your_secure_password_here

# Option B: Managed PostgreSQL (Supabase, Heroku, Railway)
# Uncomment and use connection string instead:
# DATABASE_URL=postgresql://user:password@host:5432/database

# ===================================
# SEC EDGAR API CONFIGURATION
# ===================================
# REQUIRED: Must include your contact information
# SEC requires this to identify who is accessing their API
# Format: "CompanyName email@example.com" or "Your Name email@example.com"

EDGAR_USER_AGENT="YourCompany contact@youremail.com"

# Example:
# EDGAR_USER_AGENT="Acme Investments info@acmeinvestments.com"
# EDGAR_USER_AGENT="John Doe john.doe@gmail.com"

# ===================================
# OPTIONAL: CORS Configuration
# ===================================
# Comma-separated list of allowed frontend origins
# CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

**Important Notes:**
- **EDGAR_USER_AGENT is REQUIRED** - SEC will block requests without proper User-Agent
- Use a **real email address** you can be reached at
- **Never commit `.env` to git** - it's already in `.gitignore`

### Frontend Configuration

```bash
# Go back to root directory
cd ..

# Copy example file
cp .env.example .env

# Edit .env
nano .env
```

```bash
# Backend API URL
# For local development:
VITE_API_URL=http://localhost:3001

# For production (after deploying backend):
# VITE_API_URL=https://your-backend.herokuapp.com
# VITE_API_URL=https://your-backend.railway.app
# VITE_API_URL=https://api.yourdomain.com
```

---

## Step 3: Install Dependencies & Initialize Database

### Backend Setup

```bash
cd backend

# Install dependencies (takes 1-2 minutes)
npm install

# You should see installation of:
# - express, pg, dotenv, node-cron, cors, axios, compression, helmet
# - nodemon (dev dependency)
```

### Initialize Database Schema

This creates all tables, indexes, views, and triggers:

```bash
npm run db:init
```

**Expected Output:**
```
Initializing database...
Database initialized successfully!
Tables created:
  - banks
  - bank_metrics
Views created:
  - latest_bank_metrics
```

**If you see errors:**

**"Connection refused" or "ECONNREFUSED":**
```bash
# PostgreSQL isn't running
# macOS:
brew services start postgresql@15

# Linux:
sudo systemctl start postgresql

# Windows:
# Start PostgreSQL service from Services panel
```

**"password authentication failed":**
```bash
# Wrong credentials in .env
# Double-check DB_USER and DB_PASSWORD
# Try connecting manually:
psql -h localhost -U bank_user -d bank_analyzer
```

**"database does not exist":**
```bash
# Create the database first:
createdb bank_analyzer
# Then retry npm run db:init
```

### Verify Database Setup

```bash
npm run db:test
```

**Expected Output:**
```
Testing database connection...

✓ Database connection successful!
  Current time: 2024-01-12 15:30:45
  PostgreSQL version: PostgreSQL 15.1

✓ Tables found:
  - banks
  - bank_metrics

Database Statistics:
  Banks: 0
  Metrics records: 0

⚠ No bank data found.
  Trigger data refresh: curl -X POST http://localhost:3001/api/banks/refresh
```

---

## Step 4: Run Initial Data Refresh

### Start the Backend Server

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Expected Output:**
```
[nodemon] starting `node server.js`
Connected to PostgreSQL database
Bank Analyzer API running on port 3001
Environment: development
Scheduled data refresh: Daily at 2:00 AM
```

Keep this terminal running!

### Trigger Initial Data Load

**Terminal 2 - Data Refresh:**

**Option A: Using API endpoint (easiest):**
```bash
curl -X POST http://localhost:3001/api/banks/refresh
```

**Response:**
```json
{
  "success": true,
  "message": "Data refresh started",
  "status": "processing"
}
```

**Option B: Using npm script:**
```bash
cd backend
npm run refresh
```

**What Happens:**
1. Backend fetches CIK numbers for each bank ticker
2. Queries SEC EDGAR API for financial data (10-K filings)
3. Calculates all metrics (Graham Number, ROE, ROTA, etc.)
4. Stores data in PostgreSQL database
5. Takes **5-10 minutes** for ~25 banks (SEC rate limiting)

**Watch Progress in Terminal 1:**
```
Processing JPM...
  Found existing bank: JPMorgan Chase & Co. (CIK: 0000019617)
  Fetched company facts from SEC EDGAR
  Extracted metrics from SEC filings
  Current price: $150.25
  Calculated all metrics
  ✓ Successfully stored metrics for JPM

Processing BAC...
  Found existing bank: Bank of America Corp (CIK: 0000070858)
  ...
```

### Verify Data Was Loaded

```bash
# Check health
curl http://localhost:3001/health

# Check banks loaded
curl http://localhost:3001/api/banks | jq '.count'
# Should show number of banks (e.g., 25)

# View sample data
curl http://localhost:3001/api/banks | jq '.data[0]'
```

**Or use database directly:**
```bash
psql bank_analyzer -c "SELECT ticker, name, exchange FROM banks LIMIT 5;"
psql bank_analyzer -c "SELECT COUNT(*) as total_banks FROM banks;"
psql bank_analyzer -c "SELECT COUNT(*) as total_metrics FROM bank_metrics;"
```

---

## Step 5: Start the Frontend

**Terminal 3 - Frontend:**

```bash
# In root directory
npm install

# Start dev server
npm run dev
```

**Expected Output:**
```
  VITE v5.x.x  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Open Your Browser

Go to: **http://localhost:5173**

You should see:
- Bank screener interface loading
- Data fetched from your backend API
- All metrics displayed (ROE, P/NI, Graham MoS, etc.)
- Ability to filter and sort

---

## Step 6: Test the Complete System

### Test Basic Functionality

1. **Load the frontend** - Should show banks with data
2. **Apply filters** - Try filtering by ROE > 10%
3. **Sort columns** - Click column headers
4. **Check specific bank** - Look for JPM or BAC

### Test API Endpoints

```bash
# Get all banks
curl http://localhost:3001/api/banks

# Get specific bank
curl http://localhost:3001/api/banks/JPM

# Get bank history
curl http://localhost:3001/api/banks/JPM/history?limit=5

# Health check
curl http://localhost:3001/health
```

### Test Manual Refresh

```bash
# Refresh all banks
curl -X POST http://localhost:3001/api/banks/refresh

# Refresh specific bank
curl -X POST http://localhost:3001/api/banks/JPM/refresh
```

---

## Step 7: Deploy to Production

Now that everything works locally, you're ready to deploy!

### Quick Deploy Options

#### **Option A: Railway (Easiest, ~$5/month)**

1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Add PostgreSQL
4. New Service → GitHub Repo (select Bank-Analyzer)
5. Set root directory: `/backend`
6. Add environment variables:
   ```
   NODE_ENV=production
   EDGAR_USER_AGENT=YourCompany contact@youremail.com
   ```
7. Railway auto-connects the database
8. Deploy! (automatic)
9. Run initial refresh:
   - Open backend service → Variables tab
   - Get public URL
   - `curl -X POST https://your-backend.railway.app/api/banks/refresh`

**Deploy Frontend:**
1. Create `.env.production` in root:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```
2. Build: `npm run build`
3. Deploy `dist/` folder to Netlify or Vercel

#### **Option B: Heroku (Reliable, ~$12/month)**

```bash
# Install Heroku CLI
brew install heroku/brew/heroku

# Login
heroku login

# Create app
cd backend
heroku create my-bank-analyzer-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set EDGAR_USER_AGENT="YourCompany contact@email.com"

# Deploy
git subtree push --prefix backend heroku main

# Initialize database
heroku run npm run db:init

# Load initial data
heroku run npm run refresh

# View logs
heroku logs --tail
```

**Deploy Frontend:**
```bash
# Set backend URL
echo "VITE_API_URL=https://my-bank-analyzer-api.herokuapp.com" > .env.production

# Build
npm run build

# Deploy to Netlify/Vercel (upload dist/ folder)
```

#### **Option C: VPS (Most Control, ~$12/month)**

See detailed guide in `DEPLOYMENT.md`

---

## Troubleshooting Common Issues

### Issue: "No data appearing in frontend"

**Solution:**
```bash
# 1. Check backend is running
curl http://localhost:3001/health

# 2. Check database has data
psql bank_analyzer -c "SELECT COUNT(*) FROM banks;"

# 3. If count is 0, refresh data
curl -X POST http://localhost:3001/api/banks/refresh

# 4. Check frontend .env
cat .env
# Should have: VITE_API_URL=http://localhost:3001

# 5. Restart frontend
npm run dev
```

### Issue: "SEC EDGAR returns 403 Forbidden"

**Solution:**
```bash
# Check EDGAR_USER_AGENT in backend/.env
# Must be: "Your Name email@example.com"
# Cannot be empty or generic

# Good:
EDGAR_USER_AGENT="Acme Corp info@acme.com"

# Bad:
EDGAR_USER_AGENT="User-Agent"
EDGAR_USER_AGENT=""
```

### Issue: "Database connection failed"

**Solution:**
```bash
# 1. Is PostgreSQL running?
pg_isready

# 2. Can you connect manually?
psql -h localhost -U bank_user -d bank_analyzer

# 3. Check credentials in backend/.env
cat backend/.env | grep DB_

# 4. Try recreating database
dropdb bank_analyzer
createdb bank_analyzer
cd backend && npm run db:init
```

### Issue: "Some banks failing to load"

**Solution:**
This is normal! Some banks may:
- Not have recent SEC filings
- Use different XBRL tags
- Have CIK lookup issues

Check logs for specific error messages. The system will skip failed banks and continue with others.

### Issue: "Data refresh is very slow"

**Solution:**
This is normal for first run:
- SEC rate limit: 10 requests/second
- Each bank needs 2-3 requests (CIK lookup + company facts)
- ~25 banks = 50-75 requests = 5-10 minutes
- Subsequent refreshes use cached CIKs and are faster

---

## Daily Operations

### Automatic Updates
The backend automatically refreshes data at 2:00 AM daily. No action needed!

### Manual Refresh
If you want to refresh immediately:
```bash
curl -X POST http://localhost:3001/api/banks/refresh
```

### Monitor Logs
```bash
# Development
# Check Terminal 1 where backend is running

# Production (Heroku)
heroku logs --tail

# Production (Railway)
# Use Railway dashboard

# Production (PM2 on VPS)
pm2 logs bank-analyzer-api
```

### Database Backups
```bash
# Manual backup
pg_dump bank_analyzer > backup_$(date +%Y%m%d).sql

# Restore from backup
psql bank_analyzer < backup_20240112.sql
```

---

## Next Steps After Setup

1. **Customize bank list** - Edit `backend/src/config/index.js` → `bankTickers` array
2. **Add more metrics** - Extend calculator in `backend/src/services/calculator.js`
3. **Setup monitoring** - Use PM2, DataDog, or New Relic
4. **Add authentication** - Protect API with JWT or API keys
5. **Enable caching** - Add Redis for faster API responses
6. **Create dashboards** - Build charts with historical data

---

## Support & Resources

- **Backend README**: `backend/README.md`
- **Deployment Guide**: `DEPLOYMENT.md`
- **Main README**: `README.md`
- **SEC EDGAR API Docs**: https://www.sec.gov/edgar/sec-api-documentation
- **Issues**: https://github.com/CHarrisInvest/Bank-Analyzer/issues

---

## Quick Reference Commands

```bash
# Database
npm run db:init        # Initialize schema
npm run db:test        # Test connection
psql bank_analyzer     # Connect to database

# Backend
npm run dev            # Start with auto-reload
npm run start          # Start production
npm run refresh        # Manual data refresh

# Frontend
npm run dev            # Start dev server
npm run build          # Build for production

# Deployment
heroku logs --tail     # View Heroku logs
pm2 logs              # View PM2 logs (VPS)
```

---

**You're all set!** 🚀

Your Bank Analyzer now has a production-ready backend with real SEC EDGAR data instead of Google Sheets.
