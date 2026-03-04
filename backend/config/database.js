const sqlite3 = require('sqlite3').verbose();
const { promisify } = require('util');
const path = require('path');

const dbPath = path.join(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath);

// Promisify database methods
const dbRun = promisify(db.run.bind(db));
const dbGet = promisify(db.get.bind(db));
const dbAll = promisify(db.all.bind(db));

// Initialize database tables
const initDatabase = async () => {
  try {
    await dbRun(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await dbRun(`
      CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price_per_night REAL NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await dbRun(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        room_id INTEGER NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
      )
    `);

    await dbRun(`CREATE INDEX IF NOT EXISTS idx_room_dates ON bookings(room_id, start_date, end_date)`);

    // Insert sample rooms if none exist
    const roomCount = await dbGet('SELECT COUNT(*) as count FROM rooms');
    if (roomCount.count === 0) {
      const rooms = [
        ['Deluxe Suite', 150.00, 'Spacious suite with king bed and city view'],
        ['Standard Room', 80.00, 'Comfortable room with queen bed'],
        ['Ocean View Room', 200.00, 'Beautiful ocean view with balcony'],
        ['Family Room', 120.00, 'Large room with two queen beds'],
        ['Executive Suite', 250.00, 'Luxury suite with separate living area']
      ];

      for (const room of rooms) {
        await dbRun('INSERT INTO rooms (name, price_per_night, description) VALUES (?, ?, ?)', room);
      }
    }

    console.log('✓ Database initialized successfully');
  } catch (error) {
    console.error('✗ Database initialization failed:', error.message);
  }
};

initDatabase();

// Adapter to make SQLite work like MySQL pool
const pool = {
  execute: async (query, params = []) => {
    // Convert MySQL ? placeholders to work with SQLite
    if (query.includes('INSERT')) {
      const result = await new Promise((resolve, reject) => {
        db.run(query, params, function(err) {
          if (err) reject(err);
          else resolve({ insertId: this.lastID, affectedRows: this.changes });
        });
      });
      return [result];
    } else if (query.includes('SELECT')) {
      const rows = await dbAll(query, params);
      return [rows];
    } else {
      const result = await dbRun(query, params);
      return [{ affectedRows: result ? 1 : 0 }];
    }
  },
  getConnection: async () => {
    return {
      beginTransaction: async () => { await dbRun('BEGIN TRANSACTION'); },
      commit: async () => { await dbRun('COMMIT'); },
      rollback: async () => { await dbRun('ROLLBACK'); },
      execute: async (query, params = []) => {
        if (query.includes('FOR UPDATE')) {
          query = query.replace('FOR UPDATE', '');
        }
        if (query.includes('INSERT')) {
          const result = await new Promise((resolve, reject) => {
            db.run(query, params, function(err) {
              if (err) reject(err);
              else resolve({ insertId: this.lastID });
            });
          });
          return [result];
        } else {
          const rows = await dbAll(query, params);
          return [rows];
        }
      },
      release: () => {}
    };
  }
};

module.exports = pool;
