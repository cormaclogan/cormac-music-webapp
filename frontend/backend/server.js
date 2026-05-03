require('./db');

const express = require('express');
const cors = require('cors');

// create app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// GET ARTIST
const artistRoutes = require('./routes/artists');
app.use('/artists', artistRoutes);
//GET ALBUM
const albumRoutes = require('./routes/albums');
app.use('/albums', albumRoutes);
//GET SONG
const songRoutes = require('./routes/songs');
app.use('/songs', songRoutes);

//
// test route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
