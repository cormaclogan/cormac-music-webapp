const API_URL = window.location.origin + "/songs";

// =========================
// LOAD ALL SONGS
// =========================
async function loadSongs() {
    try {
        const res = await fetch(API_URL);

        if (!res.ok) {
            const text = await res.text();
            throw new Error(text);
        }

        const data = await res.json();

        const table = document.querySelector("#songTable tbody");
        if (!table) return;

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
                        <button onclick='editSong(${song.song_id}, ${JSON.stringify(song.song_name)}, ${song.release_year}, ${song.album_id})'>Edit</button>
                    </td>
                </tr>
            `;
            table.innerHTML += row;
        });

    } catch (err) {
        console.error("Error loading songs:", err);
        alert("Backend error");
    }
}

// =========================
// CREATE SONG
// =========================
async function createSong() {
    const song_name = document.getElementById("songName").value.trim();
    const release_year = parseInt(document.getElementById("releaseYear").value);
    const album_id = parseInt(document.getElementById("albumId").value);

    if (!song_name || isNaN(release_year) || isNaN(album_id)) {
        alert("Fill all fields");
        return;
    }

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                song_name,
                release_year,
                album_id
            })
        });

        if (!res.ok) throw new Error(await res.text());

        document.getElementById("songName").value = "";
        document.getElementById("releaseYear").value = "";
        document.getElementById("albumId").value = "";

        loadSongs();

    } catch (err) {
        console.error("Error creating song:", err);
    }
}

// =========================
// DELETE SONG
// =========================
async function deleteSong(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) throw new Error("Delete failed");

        loadSongs();

    } catch (err) {
        console.error("Error deleting song:", err);
    }
}

// =========================
// EDIT SONG
// =========================
function editSong(id, name, year, albumId) {
    const newName = prompt("Song name:", name);
    if (newName === null) return;

    const newYear = prompt("Year:", year);
    if (newYear === null) return;

    const newAlbumId = prompt("Album ID:", albumId);
    if (newAlbumId === null) return;

    updateSong(id, newName, parseInt(newYear), parseInt(newAlbumId));
}

// =========================
// UPDATE SONG
// =========================
async function updateSong(id, song_name, release_year, album_id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                song_name,
                release_year,
                album_id
            })
        });

        if (!res.ok) throw new Error("Update failed");

        loadSongs();

    } catch (err) {
        console.error("Error updating song:", err);
    }
}

// =========================
// GLOBAL (important)
// =========================
window.createSong = createSong;
window.deleteSong = deleteSong;
window.editSong = editSong;

// =========================
// LOAD ON PAGE OPEN
// =========================
loadSongs();