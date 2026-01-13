# GitHub Pages Setup Guide

**Zero downloads. Zero accounts (beyond GitHub). Completely free.**

This is the simplified deployment using GitHub Actions + GitHub Pages. No backend server, no database, no local setup required!

---

## How It Works

```
GitHub Actions              Static JSON File           GitHub Pages
(Runs Daily at 2 AM)  →    (public/data/banks.json)  →  (Your Site)
     ↓                             ↓                         ↓
Fetches SEC data          Commits to repo           Serves to users
Calculates metrics        Auto-deploys              Real-time screener
```

**Benefits:**
- ✅ Completely free (GitHub Actions + Pages)
- ✅ No apps to download
- ✅ No accounts to create (you already have GitHub)
- ✅ Automated daily updates at 2 AM UTC
- ✅ No server maintenance
- ✅ Instant deployment on push

---

## Quick Setup (5 Minutes)

### Step 1: Enable GitHub Pages (1 minute)

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Build and deployment":
   - **Source:** GitHub Actions
   - (That's it! No branch selection needed)

### Step 2: Set Repository Secrets (2 minutes)

GitHub Actions needs API credentials for SEC and stock price data:

#### Secret 1: SEC User-Agent

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `EDGAR_USER_AGENT`
4. Value: `YourCompany contact@youremail.com` (use real info!)
5. Click **Add secret**

**Example:**
```
Acme Investments info@acme.com
```

#### Secret 2: Alpha Vantage API Key (for stock prices)

1. Get a free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Click **New repository secret**
3. Name: `ALPHA_VANTAGE_API_KEY`
4. Value: Your API key (e.g., `ABC123XYZ`)
5. Click **Add secret**

**Note:** The free tier allows 25 API requests/day (sufficient for ~25 banks). For commercial use or more banks, you'll need a [paid plan](https://www.alphavantage.co/premium/) ($49.99+/month). Alpha Vantage is a NASDAQ-licensed data provider, making it suitable for commercial applications.

### Step 3: Trigger Initial Data Load (1 minute)

1. Go to **Actions** tab
2. Click **Update Bank Data from SEC EDGAR** workflow
3. Click **Run workflow** → **Run workflow** button
4. Wait 5-10 minutes for completion
5. Check the **Summary** to see banks processed

### Step 4: Deploy to GitHub Pages (2 minutes)

1. In your repo root, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

2. Commit and push:
```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment"
git push
```

3. Site deploys automatically! Visit:
   ```
   https://[your-username].github.io/Bank-Analyzer/
   ```

---

## That's It! 🎉

Your bank screener is now live with automated daily SEC data updates.

---

## What Happens Automatically

### Daily at 2 AM UTC:
1. GitHub Actions runs `scripts/fetch-sec-data.cjs`
2. Fetches latest SEC EDGAR data for all banks
3. Calculates Graham Number, ROE, ROTA, etc.
4. Saves to `public/data/banks.json`
5. Commits changes to repo
6. GitHub Pages auto-deploys updated site

### On Every Push to Main:
1. Builds your frontend
2. Deploys to GitHub Pages
3. Live within 1-2 minutes

---

## Managing Your Bank List

Edit the tickers in `scripts/fetch-sec-data.cjs`:

```javascript
bankTickers: [
  'JPM', 'BAC', 'WFC',  // Add your tickers here
]
```

Push changes and next workflow run will update data.

---

## Manual Data Refresh

Anytime you want to refresh data manually:

1. Go to **Actions** tab
2. Click **Update Bank Data from SEC EDGAR**
3. Click **Run workflow**
4. Wait 5-10 minutes

---

## Monitoring

### Check Workflow Status:
- Go to **Actions** tab
- See latest runs and their status
- Click any run to see detailed logs

### View Current Data:
- Check `public/data/banks.json` in your repo
- See commit history for update times
- Each commit shows date/time of update

---

## Customization

### Change Update Schedule

Edit `.github/workflows/fetch-data.yml`:

```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
    # Change to:
    # - cron: '0 */6 * * *'  # Every 6 hours
    # - cron: '0 0 * * 1'    # Weekly on Mondays
```

### Add More Metrics

Edit `scripts/fetch-sec-data.cjs` in the `calculateMetrics` function to add custom calculations.

### Change Data Source

The script fetches from:
- **SEC EDGAR API** - Financial metrics (free, no API key required)
- **Alpha Vantage** - Stock prices (requires free API key, NASDAQ-licensed)

**Important:** Alpha Vantage is a NASDAQ-licensed data provider, making it suitable for commercial use. The free tier is for testing/personal use. For commercial applications, obtain a [commercial license](https://www.alphavantage.co/premium/).

---

## Troubleshooting

### "Workflow failed with 403 error"

**Problem:** SEC rejected request due to missing/invalid User-Agent

**Solution:**
1. Go to **Settings** → **Secrets** → **Actions**
2. Check `EDGAR_USER_AGENT` secret
3. Must be: `"CompanyName email@example.com"`
4. Update and rerun workflow

### "Stock prices showing null"

**Problem:** Alpha Vantage API key missing or rate limit exceeded

**Solution:**
1. Ensure `ALPHA_VANTAGE_API_KEY` secret is set in repository settings
2. Free tier limit: 25 requests/day, 5 requests/minute
3. If you have more than 25 banks, consider a [paid plan](https://www.alphavantage.co/premium/)
4. Wait 24 hours if daily limit reached, or upgrade to higher tier

### "No data appearing on site"

**Problem:** Data file not yet generated

**Solution:**
1. Check **Actions** tab for failed runs
2. Manually trigger workflow
3. Wait for completion (5-10 minutes)
4. Refresh your GitHub Pages site

### "Some banks showing null values"

**Problem:** Bank doesn't have recent SEC filings or uses different XBRL tags

**Solution:** This is normal. Not all banks report consistently. The workflow continues with banks that have data.

### "GitHub Pages site not updating"

**Problem:** Deployment workflow not running

**Solution:**
1. Check **Actions** tab for deploy workflow
2. Ensure `.github/workflows/deploy.yml` exists
3. Push a commit to trigger rebuild

---

## Cost Breakdown

| Service | Cost |
|---------|------|
| GitHub Actions | **Free** (2,000 minutes/month) |
| GitHub Pages | **Free** (100 GB bandwidth/month) |
| SEC EDGAR API | **Free** (no limits) |
| Alpha Vantage | **Free tier** (25 req/day) or **$49.99+/mo** for commercial |
| **Total** | **$0/month** (testing) or **$49.99+/mo** (commercial) |

**Usage:**
- Data refresh: ~15 minutes/day = 450 min/month (well under limit)
- Pages bandwidth: Typical usage < 1 GB/month
- Alpha Vantage: 25 banks/day on free tier (sufficient for included bank list)

**Note for Commercial Use:** Alpha Vantage is NASDAQ-licensed, making it appropriate for commercial applications. Contact Alpha Vantage for commercial licensing.

---

## Advanced: Adding Historical Data

The current setup stores only the latest data. To track history:

1. **Option A:** Commit data file daily (repo grows over time)
2. **Option B:** Add JSON file per date in `public/data/history/`
3. **Option C:** Use GitHub Gists for historical snapshots

See `backend/` folder if you need full database with historical tracking.

---

## Comparison: GitHub Actions vs Full Backend

| Feature | GitHub Actions (This Setup) | Full Backend |
|---------|---------------------------|--------------|
| **Setup Time** | 5 minutes | 1-2 hours |
| **Downloads** | None | PostgreSQL, Node.js |
| **Accounts** | GitHub only | Database hosting, etc. |
| **Cost** | Free | $5-12/month |
| **Updates** | Daily automatic | Daily automatic |
| **Historical Data** | Limited | Full database |
| **Real-time Refresh** | Manual trigger | On-demand API |
| **Maintenance** | None | Server monitoring |

**Choose GitHub Actions if:**
- You want simplicity
- Cost is important ($0 vs $5-12/month)
- Don't need historical data tracking
- Happy with daily updates

**Choose Full Backend if:**
- Need historical data analysis
- Want on-demand refresh capability
- Building complex features
- Need more than 25-30 banks (rate limiting)

---

## Migration to Full Backend

If you later want the full backend:

1. The `backend/` folder is already in your repo
2. Follow `SETUP_GUIDE.md` for full setup
3. Both can coexist - GitHub Actions updates static file, backend provides API

---

## Next Steps

✅ **You're done!** Your site is live with automated updates.

**Optional enhancements:**
1. **Custom domain** - Add in GitHub Pages settings
2. **Analytics** - Add Google Analytics to `index.html`
3. **More banks** - Edit ticker list in script
4. **Custom metrics** - Add calculations in script
5. **Alerts** - Use GitHub Actions to send notifications

---

## Support

- **Workflow issues:** Check Actions tab for error logs
- **Data issues:** Review `public/data/banks.json` commits
- **Site issues:** Check browser console for errors
- **SEC API:** https://www.sec.gov/edgar/sec-api-documentation

---

## Quick Reference

```bash
# Check your site URL
https://[your-username].github.io/Bank-Analyzer/

# Manual data refresh
Actions → Update Bank Data → Run workflow

# View current data
Browse to: public/data/banks.json

# Check workflow runs
Actions tab → Select workflow

# Update bank list
Edit: scripts/fetch-sec-data.cjs

# Deploy changes
git add .
git commit -m "your changes"
git push
```

**That's it! Enjoy your zero-maintenance bank screener! 🚀**
