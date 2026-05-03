const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all songs
router.get('/', (req, res) => {
    db.all("SELECT * FROM song", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET one song by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM song WHERE song_id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.json(row);
    });
});
// CREATE song
router.post('/', (req, res) => {
    const { song_name, release_year, album_id } = req.body;

    const sql = `
        INSERT INTO song (song_name, release_year, album_id)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [song_name, release_year, album_id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: "Song created successfully",
            song_id: this.lastID
        });
    });
});
// UPDATE song
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { song_name, release_year} = req.body;

    const sql = `
        UPDATE song
        SET song_name = ?, release_year = ?
        WHERE song_id = ?
    `;

    db.run(sql, [song_name, release_year, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: "Song updated successfully" });
    });
});
//DELETE aritst
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    const sql = `
        DELETE FROM song
        WHERE song_id = ?
    `;
    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: "Song deleted successfully. Good Job!!!" });
});
});

module.exports = router;