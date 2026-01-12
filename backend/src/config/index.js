module.exports = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database configuration
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'bank_analyzer',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    max: 20, // Max number of clients in the pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },

  // SEC EDGAR API configuration
  edgar: {
    baseUrl: 'https://data.sec.gov',
    userAgent: process.env.EDGAR_USER_AGENT || 'Bank-Analyzer contact@example.com',
    requestDelay: 100, // Delay between requests in ms (SEC allows 10 req/sec)
  },

  // List of bank tickers to track
  // These should match your current Google Sheets data
  bankTickers: [
    // Major banks
    'JPM', 'BAC', 'WFC', 'C', 'USB', 'PNC', 'TFC',
    // Regional banks
    'RF', 'CFG', 'KEY', 'FITB', 'HBAN', 'MTB', 'ZION',
    // Community banks
    'SBNY', 'EWBC', 'WAL', 'UMBF', 'ONB', 'BANR', 'CATY',
    'CVBF', 'HTLF', 'IBOC', 'TOWN', 'FFNW', 'WASH'
  ]
};
