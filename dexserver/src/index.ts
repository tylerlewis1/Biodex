import express from 'express';
import { Pool } from 'pg';

const app = express();
const port = process.env.PORT || 3000;

// Connection pool to Postgres, reading the URL from the environment
// (this is set in docker-compose.yml, pointing at the "postgres" service)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

// Simple health check that also confirms the database connection works
app.get('/health', async (_req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'ok',
      db_time: result.rows[0].now,
    });
  } catch (err) {
    console.error('Database connection failed:', err);
    res.status(500).json({ status: 'error', message: 'Database connection failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});