const express = require('express');
const router = express.Router();
const banksController = require('../controllers/banks');

/**
 * GET /api/banks
 * Get all banks with their latest metrics
 */
router.get('/', banksController.getAllBanks);

/**
 * GET /api/banks/:ticker
 * Get a specific bank by ticker symbol
 */
router.get('/:ticker', banksController.getBankByTicker);

/**
 * GET /api/banks/:ticker/history
 * Get historical metrics for a specific bank
 */
router.get('/:ticker/history', banksController.getBankHistory);

/**
 * POST /api/banks/refresh
 * Manually trigger data refresh for all banks
 */
router.post('/refresh', banksController.triggerRefreshAll);

/**
 * POST /api/banks/:ticker/refresh
 * Manually trigger data refresh for a specific bank
 */
router.post('/:ticker/refresh', banksController.triggerRefreshBank);

module.exports = router;
