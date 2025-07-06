import express from 'express';    
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';      
import cors from 'cors';

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors()); // allow cross-origin requests from your frontend on a different port

// Set up a MySQL connection pool using details from your .env file
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,      // e.g. 127.0.0.1 (through SSH tunnel)
  port: process.env.MYSQL_PORT,      // e.g. 3307 on local, forwarding to 3306 remotely
  user: process.env.MYSQL_USER,      // DB user
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,          // wait if no connections available
  connectionLimit: 10,               // max connections in pool
});

// A simple API route: GET /api/addresses
// This runs a SELECT query on the database and returns JSON
app.get('/api/addresses', async (req, res) => {
  try {
    console.log('Trying DB query...');
    const [rows] = await pool.query('SELECT * FROM addresses LIMIT 50'); // change this as needed
    console.log('Query successful:', rows);
    res.json(rows); // send back as JSON to your React app
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' }); // something went wrong
  }
});

// Start the Express server on port 3001
app.listen(3001, () => console.log('API server running on http://localhost:3001'));