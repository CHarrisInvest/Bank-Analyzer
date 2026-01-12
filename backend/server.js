require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const cron = require('node-cron');
const config = require('./src/config');
const bankRoutes = require('./src/api/routes/banks');
const { refreshAllBanks } = require('./src/jobs/dataRefresh');

const app = express();
const PORT = config.port || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/banks', bankRoutes);

// Schedule daily data refresh at 2 AM
cron.schedule('0 2 * * *', async () => {
  console.log('Running scheduled data refresh...');
  try {
    await refreshAllBanks();
    console.log('Data refresh completed successfully');
  } catch (error) {
    console.error('Data refresh failed:', error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Bank Analyzer API running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('Scheduled data refresh: Daily at 2:00 AM');
});

module.exports = app;
