require('./db');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// routes
const artistRoutes = require('./routes/artists');
app.use('/artists', artistRoutes);

const albumRoutes = require('./routes/albums');
app.use('/albums', albumRoutes);

const songRoutes = require('./routes/songs');
app.use('/songs', songRoutes);

// test route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// ✅ FIXED PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});