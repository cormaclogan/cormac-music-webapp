const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const dbDir = path.join(__dirname, 'data');

// create folder if it doesn't exist
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
}

const dbPath = path.join(dbDir, 'app.db');

// ✅ CORRECT sqlite3 INIT
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("DB ERROR:", err);
        process.exit(1);
    } else {
        console.log("✅ Database connected");
    }
});

module.exports = db;