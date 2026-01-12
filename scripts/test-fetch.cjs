#!/usr/bin/env node
/**
 * Quick diagnostic test for the data fetcher
 * Verifies dependencies and basic functionality
 */

console.log('========================================');
console.log('Data Fetcher Diagnostic Test');
console.log('========================================\n');

console.log('Node version:', process.version);
console.log('Working directory:', process.cwd());
console.log('Script location:', __dirname);
console.log();

// Test 1: Check if axios is available
console.log('Test 1: Checking axios...');
try {
  const axios = require('axios');
  console.log('✓ axios loaded successfully');
  console.log('  Type:', typeof axios);
} catch (err) {
  console.error('✗ axios not available:', err.message);
  console.error('  Run: npm install axios');
  process.exit(1);
}

// Test 2: Check if script file exists
console.log('\nTest 2: Checking script file...');
try {
  const fs = require('fs');
  const path = require('path');
  const scriptPath = path.join(__dirname, 'fetch-sec-data.cjs');

  if (!fs.existsSync(scriptPath)) {
    throw new Error('Script file not found');
  }
  console.log('✓ Script file exists');
  console.log('  Path:', scriptPath);
} catch (err) {
  console.error('✗ Script file issue:', err.message);
  process.exit(1);
}

// Test 3: Check output directory
console.log('\nTest 3: Checking output directory...');
try {
  const fs = require('fs');
  const path = require('path');
  const outputDir = path.join(__dirname, '..', 'public', 'data');

  if (!fs.existsSync(outputDir)) {
    console.log('  Creating output directory...');
    fs.mkdirSync(outputDir, { recursive: true });
  }
  console.log('✓ Output directory ready');
  console.log('  Path:', outputDir);
} catch (err) {
  console.error('✗ Output directory issue:', err.message);
  process.exit(1);
}

console.log('\n========================================');
console.log('All diagnostic tests passed! ✓');
console.log('========================================');
console.log('\nTo run the full data fetch:');
console.log('  npm run fetch-data');
console.log('or:');
console.log('  node scripts/fetch-sec-data.cjs');
console.log();
