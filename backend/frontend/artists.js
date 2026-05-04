const API_URL = "http://localhost:5000/artists"; // 🔥 force correct backend

// =========================
// LOAD ALL ARTISTS
// =========================
async function loadArtists() {
    try {
        const res = await fetch(API_URL);

        // 🔥 HANDLE SERVER ERRORS PROPERLY
        if (!res.ok) {
            const text = await res.text();
            throw new Error("Server error: " + text);
        }

        const data = await res.json();

        const table = document.querySelector("#artistTable tbody");
        if (!table) {
            console.error("❌ Table not found");
            return;
        }

        table.innerHTML = "";

        data.forEach(artist => {
            const row = `
                <tr>
                    <td>${artist.artist_id}</td>
                    <td>${artist.artist_name}</td>
                    <td>${artist.genre}</td>
                    <td>${artist.monthly_listeners}</td>
                    <td>
                        <button onclick="deleteArtist(${artist.artist_id})">Delete</button>
                        <button onclick='editArtist(${artist.artist_id}, ${JSON.stringify(artist.artist_name)}, ${JSON.stringify(artist.genre)}, ${artist.monthly_listeners})'>Edit</button>
                    </td>
                </tr>
            `;
            table.innerHTML += row;
        });

    } catch (err) {
        console.error("❌ Error loading artists:", err);
        alert("Backend error — check server!");
    }
}

// =========================
// CREATE ARTIST
// =========================
async function createArtist() {
    const artist_name = document.getElementById("artistName").value.trim();
    const genre = document.getElementById("genre").value.trim();
    const monthly_listeners = parseInt(document.getElementById("listeners").value);

    if (!artist_name || !genre || isNaN(monthly_listeners)) {
        alert("Fill all fields correctly!");
        return;
    }

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                artist_name,
                genre,
                monthly_listeners
            })
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(text);
        }

        alert("✅ Artist added");

        document.getElementById("artistName").value = "";
        document.getElementById("genre").value = "";
        document.getElementById("listeners").value = "";

        loadArtists();

    } catch (err) {
        console.error("❌ Error creating artist:", err);
        alert("Create failed");
    }
}

// =========================
// DELETE ARTIST
// =========================
async function deleteArtist(id) {
    if (!confirm("Delete this artist?")) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            throw new Error("Delete failed");
        }

        loadArtists();

    } catch (err) {
        console.error("❌ Error deleting artist:", err);
    }
}

// =========================
// EDIT ARTIST
// =========================
function editArtist(id, name, genre, listeners) {
    const newName = prompt("New name:", name);
    if (newName === null) return;

    const newGenre = prompt("New genre:", genre);
    if (newGenre === null) return;

    const newListeners = prompt("New listeners:", listeners);
    if (newListeners === null) return;

    updateArtist(id, newName, newGenre, parseInt(newListeners));
}

// =========================
// UPDATE ARTIST
// =========================
async function updateArtist(id, artist_name, genre, monthly_listeners) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                artist_name,
                genre,
                monthly_listeners
            })
        });

        if (!res.ok) {
            throw new Error("Update failed");
        }

        alert("✏️ Artist updated");

        loadArtists();

    } catch (err) {
        console.error("❌ Error updating artist:", err);
    }
}

// =========================
// GLOBAL FUNCTIONS
// =========================
window.createArtist = createArtist;
window.deleteArtist = deleteArtist;
window.editArtist = editArtist;

// =========================
// LOAD ON PAGE OPEN
// =========================
loadArtists();