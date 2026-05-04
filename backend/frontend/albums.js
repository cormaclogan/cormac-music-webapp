const API_URL = window.location.origin + "/albums";

// =========================
// LOAD ALL ALBUMS
// =========================
async function loadAlbums() {
    try {
        const res = await fetch(API_URL);

        if (!res.ok) {
            const text = await res.text();
            throw new Error(text);
        }

        const data = await res.json();

        const table = document.querySelector("#albumTable tbody");
        if (!table) return;

        table.innerHTML = "";

        data.forEach(album => {
            const row = `
                <tr>
                    <td>${album.album_id}</td>
                    <td>${album.album_name}</td>
                    <td>${album.release_year}</td>
                    <td>${album.number_of_listens}</td>
                    <td>${album.artist_id}</td>
                    <td>
                        <button onclick="deleteAlbum(${album.album_id})">Delete</button>
                        <button onclick='editAlbum(${album.album_id}, ${JSON.stringify(album.album_name)}, ${album.release_year}, ${album.number_of_listens}, ${album.artist_id})'>Edit</button>
                    </td>
                </tr>
            `;
            table.innerHTML += row;
        });

    } catch (err) {
        console.error("Error loading albums:", err);
        alert("Backend error");
    }
}

// =========================
// CREATE ALBUM
// =========================
async function createAlbum() {
    const album_name = document.getElementById("albumName").value.trim();
    const release_year = parseInt(document.getElementById("releaseYear").value);
    const number_of_listens = parseInt(document.getElementById("listens").value);
    const artist_id = parseInt(document.getElementById("artistId").value);

    if (!album_name || isNaN(release_year) || isNaN(number_of_listens) || isNaN(artist_id)) {
        alert("Fill all fields");
        return;
    }

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                album_name,
                release_year,
                number_of_listens,
                artist_id
            })
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(text);
        }

        document.getElementById("albumName").value = "";
        document.getElementById("releaseYear").value = "";
        document.getElementById("listens").value = "";
        document.getElementById("artistId").value = "";

        loadAlbums();

    } catch (err) {
        console.error("Error creating album:", err);
    }
}

// =========================
// DELETE ALBUM
// =========================
async function deleteAlbum(id) {
    if (!confirm("Delete this album?")) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            throw new Error("Delete failed");
        }

        loadAlbums();

    } catch (err) {
        console.error("Error deleting album:", err);
    }
}

// =========================
// EDIT
// =========================
function editAlbum(id, name, year, listens, artistId) {
    const newName = prompt("Album name:", name);
    if (newName === null) return;

    const newYear = prompt("Year:", year);
    if (newYear === null) return;

    const newListens = prompt("Listens:", listens);
    if (newListens === null) return;

    const newArtistId = prompt("Artist ID:", artistId);
    if (newArtistId === null) return;

    updateAlbum(id, newName, parseInt(newYear), parseInt(newListens), parseInt(newArtistId));
}

// =========================
// UPDATE ALBUM
// =========================
async function updateAlbum(id, album_name, release_year, number_of_listens, artist_id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                album_name,
                release_year,
                number_of_listens,
                artist_id
            })
        });

        if (!res.ok) {
            throw new Error("Update failed");
        }

        loadAlbums();

    } catch (err) {
        console.error("Error updating album:", err);
    }
}

// =========================
// GLOBAL FUNCTIONS
// =========================
window.createAlbum = createAlbum;
window.deleteAlbum = deleteAlbum;
window.editAlbum = editAlbum;

// =========================
// LOAD ON PAGE OPEN
// =========================
loadAlbums();