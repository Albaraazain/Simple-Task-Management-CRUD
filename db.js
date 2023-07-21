const { Pool } = require('pg');

// Create a new pool instance with your database connection details
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'task_management',
  password: 'your password here',
  port: 5432, // Default PostgreSQL port
});

// Test query
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Connected successfully', res.rows[0]);
  }
});

module.exports = pool;
