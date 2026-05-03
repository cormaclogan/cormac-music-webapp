const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

console.log("DB FILE IS RUNNING");

// database path
const dbPath = path.join(__dirname, 'data', 'app.db');

// connect to database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error connecting to DB:", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

// read model.sql
const sql = fs.readFileSync(path.join(__dirname, 'model.sql')).toString();

// execute SQL
db.exec(sql, (err) => {
    if (err) {
        console.error("Error running SQL:", err.message);
    } else {
        console.log("Tables created successfully");
    }
});

module.exports = db;