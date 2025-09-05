// utils/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.resolve(__dirname, '../files.db');

let db;

function connect() {
  if (db) return db;
  db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error('Failed to connect to SQLite database:', err.message);
      process.exit(1);
    }
    console.log('Connected to SQLite database at', DB_PATH);
  });
  return db;
}

/**
 * Initialize database tables if not exist
 */
function init() {
  const db = connect();
  // Example: create a files table for uploaded files metadata
  db.run(`
    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      filename TEXT NOT NULL,
      mimetype TEXT NOT NULL,
      size INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Failed to create files table:', err.message);
    }
  });
}

/**
 * Insert a new file record
 * @param {Object} fileData - { slug, filename, mimetype, size }
 * @param {Function} callback - (err, lastID)
 */
function insertFile(fileData, callback) {
  const db = connect();
  const { slug, filename, mimetype, size } = fileData;
  const sql = `INSERT INTO files (slug, filename, mimetype, size) VALUES (?, ?, ?, ?)`;
  db.run(sql, [slug, filename, mimetype, size], function (err) {
    callback(err, this ? this.lastID : null);
  });
}

/**
 * Get file metadata by slug
 * @param {string} slug
 * @param {Function} callback - (err, row)
 */
function getFileBySlug(slug, callback) {
  const db = connect();
  const sql = `SELECT * FROM files WHERE slug = ? LIMIT 1`;
  db.get(sql, [slug], (err, row) => {
    callback(err, row);
  });
}

module.exports = {
  connect,
  init,
  insertFile,
  getFileBySlug,
};
