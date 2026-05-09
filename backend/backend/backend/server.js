require('./db');

const express = require('express');
const cors = require('cors');
const path = require('path'); // ✅ MOVE HERE

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'frontend')));

// routes
const artistRoutes = require('./routes/artists');
app.use('/artists', artistRoutes);

const albumRoutes = require('./routes/albums');
app.use('/albums', albumRoutes);

const songRoutes = require('./routes/songs');
app.use('/songs', songRoutes);

// homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});