# Deployment Guide

This guide covers deploying the Bank Analyzer application to production.

## Prerequisites

- PostgreSQL database (managed or self-hosted)
- Node.js 16+ runtime environment
- Domain name (optional, for custom domain)

## Architecture Overview

```
┌─────────────┐
│   Frontend  │ ─── Vite Build ───> Static Files (CDN/S3/Netlify)
└─────────────┘

┌─────────────┐
│   Backend   │ ─── Node.js ───────> Server (Heroku/Railway/VPS)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  PostgreSQL │ ─────────────────> Database (AWS RDS/Heroku/Supabase)
└─────────────┘
```

## Option 1: Deploy to Heroku (Recommended for Quick Start)

### Backend Deployment

1. **Create Heroku App:**
```bash
heroku create bank-analyzer-api
```

2. **Add PostgreSQL:**
```bash
heroku addons:create heroku-postgresql:mini
```

3. **Set Environment Variables:**
```bash
heroku config:set NODE_ENV=production
heroku config:set EDGAR_USER_AGENT="YourCompany contact@youremail.com"
```

4. **Deploy Backend:**
```bash
cd backend
git subtree push --prefix backend heroku main
```

5. **Initialize Database:**
```bash
heroku run npm run db:init
```

6. **Trigger Initial Data Load:**
```bash
heroku run npm run refresh
```

### Frontend Deployment

1. **Set Backend URL:**
```bash
# .env.production
VITE_API_URL=https://bank-analyzer-api.herokuapp.com
```

2. **Build and Deploy to Netlify/Vercel:**
```bash
npm run build
# Upload dist/ folder to Netlify or Vercel
```

## Option 2: Deploy to Railway

Railway provides easy PostgreSQL + Node.js deployment.

### Backend + Database

1. **Create New Project** on railway.app

2. **Add PostgreSQL Database:**
   - Click "+ New" → "Database" → "PostgreSQL"
   - Railway auto-provisions and connects the database

3. **Add Backend Service:**
   - Click "+ New" → "GitHub Repo"
   - Select your Bank-Analyzer repo
   - Set root directory: `/backend`

4. **Configure Environment Variables:**
```
NODE_ENV=production
EDGAR_USER_AGENT=YourCompany contact@youremail.com
```

5. **Run Database Initialization:**
   - Open backend service console
   - Run: `npm run db:init`

6. **Trigger Data Refresh:**
   - Run: `npm run refresh`

### Frontend

Deploy to Vercel or Netlify with environment variable:
```
VITE_API_URL=https://your-backend.railway.app
```

## Option 3: VPS Deployment (DigitalOcean, AWS EC2, etc.)

### Server Setup

1. **Install Dependencies:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y nodejs npm postgresql postgresql-contrib nginx

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

2. **Create Database:**
```bash
sudo -u postgres createdb bank_analyzer
sudo -u postgres psql -c "CREATE USER bank_user WITH PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE bank_analyzer TO bank_user;"
```

3. **Clone and Setup Backend:**
```bash
git clone https://github.com/yourusername/Bank-Analyzer.git
cd Bank-Analyzer/backend
npm install --production

# Create .env
cat > .env << EOF
PORT=3001
NODE_ENV=production
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bank_analyzer
DB_USER=bank_user
DB_PASSWORD=your_password
EDGAR_USER_AGENT="YourCompany contact@youremail.com"
EOF

# Initialize database
npm run db:init

# Test connection
npm run db:test
```

4. **Setup PM2 (Process Manager):**
```bash
sudo npm install -g pm2
pm2 start server.js --name bank-analyzer-api
pm2 startup
pm2 save
```

5. **Configure Nginx Reverse Proxy:**
```nginx
# /etc/nginx/sites-available/bank-analyzer
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/bank-analyzer /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

6. **Setup SSL with Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

### Frontend

1. **Build:**
```bash
cd Bank-Analyzer
npm install
VITE_API_URL=https://api.yourdomain.com npm run build
```

2. **Deploy to Nginx:**
```bash
sudo cp -r dist/* /var/www/bank-analyzer/
```

3. **Configure Nginx for Frontend:**
```nginx
# /etc/nginx/sites-available/bank-analyzer-frontend
server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/bank-analyzer;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Option 4: Docker Deployment

### Create docker-compose.yml

```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: bank_analyzer
      POSTGRES_USER: bank_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    environment:
      NODE_ENV: production
      DB_HOST: db
      DB_PORT: 5432
      DB_NAME: bank_analyzer
      DB_USER: bank_user
      DB_PASSWORD: ${DB_PASSWORD}
      EDGAR_USER_AGENT: ${EDGAR_USER_AGENT}
    ports:
      - "3001:3001"
    depends_on:
      - db

  frontend:
    build: .
    environment:
      VITE_API_URL: http://localhost:3001
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

### Deploy:
```bash
docker-compose up -d
docker-compose exec backend npm run db:init
docker-compose exec backend npm run refresh
```

## Post-Deployment

### 1. Verify Backend Health:
```bash
curl https://api.yourdomain.com/health
```

Expected response:
```json
{"status":"ok","timestamp":"2024-01-12T10:30:00.000Z"}
```

### 2. Check Database:
```bash
# On server
npm run db:test
```

### 3. Trigger Initial Data Load:
```bash
curl -X POST https://api.yourdomain.com/api/banks/refresh
```

### 4. Monitor Logs:
```bash
# Heroku
heroku logs --tail

# Railway
# Use Railway dashboard

# PM2 on VPS
pm2 logs bank-analyzer-api

# Docker
docker-compose logs -f backend
```

## Monitoring & Maintenance

### Daily Cron Job
The backend automatically refreshes data at 2 AM. Verify it's running:
- Check logs daily
- Set up alerting for failed refreshes
- Monitor database size growth

### Database Backups
```bash
# Manual backup
pg_dump bank_analyzer > backup_$(date +%Y%m%d).sql

# Automated daily backup (cron)
0 3 * * * pg_dump bank_analyzer > /backups/bank_analyzer_$(date +\%Y\%m\%d).sql
```

### Performance Optimization
- Add database indexes if queries are slow
- Enable query caching for API responses
- Use CDN for frontend static assets
- Implement rate limiting on API endpoints

## Troubleshooting

### Backend Won't Start
1. Check environment variables: `heroku config` or `pm2 env`
2. Verify database connection: `npm run db:test`
3. Check logs for errors

### No Data Appearing
1. Trigger manual refresh: `npm run refresh` or POST to `/api/banks/refresh`
2. Check SEC EDGAR User-Agent is set correctly
3. Verify database has data: `SELECT COUNT(*) FROM banks;`

### Frontend Can't Connect to Backend
1. Verify CORS settings in backend
2. Check `VITE_API_URL` environment variable
3. Test API directly: `curl https://api.yourdomain.com/api/banks`

## Security Checklist

- [ ] Use environment variables for secrets (never commit `.env`)
- [ ] Enable HTTPS/SSL for production
- [ ] Set strong database password
- [ ] Configure CORS to allow only your frontend domain
- [ ] Enable rate limiting on API endpoints
- [ ] Regular security updates: `npm audit fix`
- [ ] Database backups automated and tested
- [ ] Monitor logs for suspicious activity

## Cost Estimates

### Heroku (Simplest)
- Hobby Dyno: $7/month
- Mini PostgreSQL: $5/month
- **Total: ~$12/month**

### Railway (Modern)
- Backend + Database: $5-10/month (usage-based)
- **Total: ~$5-10/month**

### VPS (Most Control)
- DigitalOcean Droplet: $12/month (2GB RAM)
- **Total: ~$12/month**

### Free Tier Options
- Frontend: Netlify/Vercel (free)
- Backend: Railway (free $5 credit/month)
- Database: Supabase (free tier)
- **Total: $0/month** (with limitations)

## Support

For deployment issues, check:
- Backend README: `backend/README.md`
- Main README: `README.md`
- Open GitHub issue for help
