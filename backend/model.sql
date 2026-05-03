-- model.sql
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS  artist (
    artist_id INTEGER PRIMARY KEY,
    artist_name TEXT NOT NULL,
    genre TEXT,
    monthly_listeners INTEGER
);
CREATE TABLE IF NOT EXISTS  album (
    album_id INTEGER PRIMARY KEY,
    album_name TEXT NOT NULL,
    release_year INTEGER,
    number_of_listens INTEGER,
    artist_id INTEGER,
    FOREIGN KEY (artist_id)
    REFERENCES artist(artist_id)
    ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS song (
    song_id INTEGER PRIMARY KEY,
    song_name TEXT NOT NULL,
    release_year INTEGER,
    album_id INTEGER,
    FOREIGN KEY (album_id)
    REFERENCES album(album_id)
    ON DELETE CASCADE
);
---ARTISTS
INSERT INTO artist (artist_name, genre, monthly_listeners)VALUES
('Winston Zinkine', 'Eccentric Dutch Jazz', 34),
('Michael Jefferson', 'Techno-punk', 300000000000),
('Werlick Stanks', 'Pop', 201);
---ALBUMS
INSERT INTO album (album_name, release_year, number_of_listens, artist_id)VALUES
('To Be a Bee', 1975, 3345, 1),
('WOWZA', 1977, 4, 1),
('NOT GOOD', 1984, 5400000000, 2),
('Thrilla', 1990, 44443344, 2),
('Smells Like Teen P***y', 1993, 123223, 3),
('In Utero', 1999, 22222, 3);
---SONGS
INSERT INTO song (song_name, release_year, album_id) VALUES
('Come As You Were', 1975, 1),
('In My Fantasy', 1975, 1),
('WOWWWZA', 1977, 2),
('Fair Trade', 1977, 2),
('Blank Space', 1984, 3),
('Shake It Off', 1984, 3),
('Lover', 1990, 4),
('You Need To Calm Down', 1990, 4),
('Anti-Hero', 1990, 4),
('Lavender Haze', 1990, 4),
-- Album 5 songs
('Teen Chaos', 1993, 5),
('Broken Strings', 1993, 5),
-- Album 6 songs
('Inner Noise', 1999, 6),
('Last Exit', 1999, 6);