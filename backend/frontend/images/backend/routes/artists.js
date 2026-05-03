const express = require('express');
const router = express.Router();
const db = require('../db');

// =========================
// GET all artists
// =========================
router.get('/', (req, res) => {
    db.all("SELECT * FROM artist", [], (err, rows) => {
        if (err) {
            console.error("GET ERROR:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// =========================
// GET one artist by ID
// =========================
router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM artist WHERE artist_id = ?", [id], (err, row) => {
        if (err) {
            console.error("GET ONE ERROR:", err.message);
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ message: "Artist not found" });
        }

        res.json(row);
    });
});

// =========================
// CREATE artist
// =========================
router.post('/', (req, res) => {
    console.log("BODY RECEIVED:", req.body); // 🔥 IMPORTANT

    const { artist_name, genre, monthly_listeners } = req.body;

    const sql = `
        INSERT INTO artist (artist_name, genre, monthly_listeners)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [artist_name, genre, monthly_listeners], function (err) {
        if (err) {
            console.error("SQL ERROR:", err.message); // 🔥 IMPORTANT
            return res.status(500).json({ error: err.message });
        }

        console.log("INSERT SUCCESS"); // 🔥 IMPORTANT

        res.status(201).json({
            message: "Artist created successfully",
            artist_id: this.lastID
        });
    });
});

// =========================
// UPDATE artist
// =========================
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { artist_name, genre, monthly_listeners } = req.body;

    const sql = `
        UPDATE artist
        SET artist_name = ?, genre = ?, monthly_listeners = ?
        WHERE artist_id = ?
    `;

    db.run(sql, [artist_name, genre, monthly_listeners, id], function (err) {
        if (err) {
            console.error("UPDATE ERROR:", err.message);
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: "Artist updated successfully" });
    });
});

// =========================
// DELETE artist
// =========================
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    const sql = `
        DELETE FROM artist
        WHERE artist_id = ?
    `;

    db.run(sql, [id], function (err) {
        if (err) {
            console.error("DELETE ERROR:", err.message);
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: "Artist deleted successfully" });
    });
});

// =========================
// COUNT
// =========================
router.get('/count/all', (req, res) => {
    db.get("SELECT COUNT(*) as total FROM artist", [], (err, row) => {
        if (err) {
            console.error("COUNT ERROR:", err.message);
            return res.status(500).json({ error: err.message });
        }

        res.json(row);
    });
});

module.exports = router;