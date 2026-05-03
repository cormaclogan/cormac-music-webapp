const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all albums
router.get('/', (req, res) => {
    db.all("SELECT * FROM album", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET one album by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM album WHERE album_id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ message: "Album not found" });
        }

        res.json(row);
    });
});
// CREATE album
router.post('/', (req, res) => {
    const { album_name, release_year, number_of_listens, artist_id } = req.body;

    const sql = `
        INSERT INTO album (album_name, release_year, number_of_listens, artist_id)
        VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [album_name, release_year, number_of_listens, artist_id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: "Album created successfully",
            album_id: this.lastID
        });
    });
});
// UPDATE album
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { album_name, release_year, number_of_listens} = req.body;

    const sql = `
        UPDATE album
        SET album_name = ?, release_year = ?, number_of_listens = ?
        WHERE album_id = ?
    `;

    db.run(sql, [album_name, release_year, number_of_listens, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: "Album updated successfully" });
    });
});
//DELETE aritst
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    const sql = `
        DELETE FROM album
        WHERE album_id = ?
    `;
    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: "Album deleted successfully. Good Job!!!" });
});
});


module.exports = router;