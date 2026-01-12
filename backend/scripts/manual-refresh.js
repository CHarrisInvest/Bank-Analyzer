#!/usr/bin/env node
/**
 * Manual script to trigger data refresh for all banks
 * Usage: node scripts/manual-refresh.js
 */

require('dotenv').config();
const { refreshAllBanks } = require('../src/jobs/dataRefresh');

async function run() {
  console.log('Starting manual data refresh...\n');

  try {
    const results = await refreshAllBanks();

    console.log('\n=== Refresh Summary ===');
    console.log(`Total banks: ${results.total}`);
    console.log(`Successful: ${results.successful}`);
    console.log(`Failed: ${results.failed}`);

    if (results.errors.length > 0) {
      console.log('\nFailed banks:');
      results.errors.forEach(err => {
        console.log(`  - ${err.ticker}: ${err.error}`);
      });
    }

    process.exit(results.failed > 0 ? 1 : 0);
  } catch (error) {
    console.error('Fatal error during refresh:', error);
    process.exit(1);
  }
}

run();
