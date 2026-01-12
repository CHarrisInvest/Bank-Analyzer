require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('./connection');

/**
 * Initialize the database by running the schema.sql file
 */
async function initDatabase() {
  console.log('Initializing database...');

  try {
    // Read the schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute the schema
    await pool.query(schema);

    console.log('Database initialized successfully!');
    console.log('Tables created:');
    console.log('  - banks');
    console.log('  - bank_metrics');
    console.log('Views created:');
    console.log('  - latest_bank_metrics');

    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase };
