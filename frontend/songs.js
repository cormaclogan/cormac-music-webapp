const API_URL = "http://localhost:5000/songs";

// =========================
// LOAD ALL SONGS
// =========================
async function loadSongs() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        const table = document.querySelector("#songTable tbody");
        table.innerHTML = "";

        data.forEach(song => {
            const row = `
                <tr>
                    <td>${song.song_id}</td>
                    <td>${song.song_name}</td>
                    <td>${song.release_year}</td>
                    <td>${song.album_id}</td>
                    <td>
                        <button onclick="deleteSong(${song.song_id})">Delete</button>
                        <button onclick="editSong(${song.song_id}, '${song.song_name}', ${song.release_year}, ${song.album_id})">Edit</button>
                    </td>
                </tr>
            `;
            table.innerHTML += row;
        });

    } catch (err) {
        console.error("Error loading songs:", err);
    }
}

// =========================
// CREATE SONG
// =========================
async function createSong() {
    const song_name = document.getElementById("songName").value;
    const release_year = document.getElementById("releaseYear").value;
    const album_id = document.getElementById("albumId").value;

    if (!song_name || !release_year || !album_id) {
        alert("Fill all fields!");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            song_name,
            release_year,
            album_id
        })
    });

    alert("Song added successfully");

    document.getElementById("songName").value = "";
    document.getElementById("releaseYear").value = "";
    document.getElementById("albumId").value = "";

    loadSongs();
}

// =========================
// DELETE SONG
// =========================
async function deleteSong(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadSongs();
}

// =========================
// UPDATE SONG
// =========================
function editSong(id, name, year, albumId) {
    const newName = prompt("Song name:", name);
    const newYear = prompt("Year:", year);
    const newAlbumId = prompt("Album ID:", albumId);

    if (!newName || !newYear || !newAlbumId) return;

    updateSong(id, newName, newYear, newAlbumId);
}

async function updateSong(id, song_name, release_year, album_id) {
    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            song_name,
            release_year,
            album_id
        })
    });

    loadSongs();
}

// =========================
// LOAD ON PAGE OPEN
// =========================
loadSongs();