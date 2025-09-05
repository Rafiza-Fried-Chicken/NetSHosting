const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const DB_PATH = process.env.NODE_ENV === "production"
  ? "/tmp/files.db"
  : path.resolve(__dirname, "../files.db");

let db;

function connect() {
  if (db) return db;
  db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error("Failed to connect to SQLite:", err.message);
      process.exit(1);
    }
    console.log("Connected to SQLite at", DB_PATH);
  });
  return db;
}

function ensureSchema() {
  const db = connect();
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS files (
      id TEXT PRIMARY KEY,
      original_name TEXT,
      mime TEXT,
      size INTEGER,
      storage_key TEXT,
      url TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )`);
  });
}

function insertFile({ id, original_name, mime, size, storage_key, url }) {
  const db = connect();
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO files (id, original_name, mime, size, storage_key, url) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, original_name, mime, size, storage_key, url],
      function (err) {
        if (err) return reject(err);
        resolve();
      }
    );
  });
}

function getFile(id) {
  const db = connect();
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM files WHERE id = ?`, [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

module.exports = { connect, ensureSchema, insertFile, getFile };
