const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const dbDir = path.join(__dirname, 'data');

// create folder if it doesn't exist
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
}

const dbPath = path.join(dbDir, 'app.db');

// 🔥 SAFE INIT
let db;
try {
    db = new Database(dbPath);
    console.log("Database connected");
} catch (err) {
    console.error("DB ERROR:", err);
    process.exit(1); // force crash with visible error
}

module.exports = db;