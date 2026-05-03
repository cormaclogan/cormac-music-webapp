const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

console.log("DB FILE IS RUNNING");

// database path
const dbPath = path.join(__dirname, 'data', 'app.db');

// connect (better-sqlite3)
const db = new Database(dbPath);

// read model.sql
const sql = fs.readFileSync(path.join(__dirname, 'model.sql'), 'utf8');

// run SQL (synchronous)
try {
    db.exec(sql);
    console.log("Tables created successfully");
} catch (err) {
    console.error("Error running SQL:", err.message);
}

module.exports = db;