const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const app = express();
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) console.error('SQLite connection error:', err);
  else console.log('SQLite connected');
});

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(fileUpload());
app.use('/uploads', express.static('uploads'));

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT CHECK(role IN ('student', 'instructor'))
    )
  `);
});

app.get('/', (req, res) => res.send('Backend running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));