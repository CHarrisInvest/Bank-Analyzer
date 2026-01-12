#!/usr/bin/env node
/**
 * Test script to verify database connection and basic functionality
 */

require('dotenv').config();
const { pool } = require('../src/db/connection');

async function testConnection() {
  console.log('Testing database connection...\n');

  try {
    // Test basic connection
    const result = await pool.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✓ Database connection successful!');
    console.log(`  Current time: ${result.rows[0].current_time}`);
    console.log(`  PostgreSQL version: ${result.rows[0].pg_version.split(',')[0]}\n`);

    // Check if tables exist
    const tablesResult = await pool.query(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
      ORDER BY tablename
    `);

    if (tablesResult.rows.length === 0) {
      console.log('⚠ No tables found. Run: npm run db:init\n');
    } else {
      console.log('✓ Tables found:');
      tablesResult.rows.forEach(row => {
        console.log(`  - ${row.tablename}`);
      });
      console.log('');
    }

    // Check bank count
    const bankCount = await pool.query('SELECT COUNT(*) as count FROM banks');
    const metricsCount = await pool.query('SELECT COUNT(*) as count FROM bank_metrics');

    console.log('Database Statistics:');
    console.log(`  Banks: ${bankCount.rows[0].count}`);
    console.log(`  Metrics records: ${metricsCount.rows[0].count}\n`);

    if (parseInt(bankCount.rows[0].count) === 0) {
      console.log('⚠ No bank data found.');
      console.log('  Trigger data refresh: curl -X POST http://localhost:3001/api/banks/refresh\n');
    } else {
      console.log('✓ Database is ready!\n');
    }

    process.exit(0);
  } catch (error) {
    console.error('✗ Database connection failed:');
    console.error(`  ${error.message}\n`);
    console.error('Troubleshooting:');
    console.error('  1. Check if PostgreSQL is running: pg_isready');
    console.error('  2. Verify .env configuration');
    console.error('  3. Ensure database exists: createdb bank_analyzer');
    console.error('  4. Initialize schema: npm run db:init\n');
    process.exit(1);
  }
}

testConnection();
