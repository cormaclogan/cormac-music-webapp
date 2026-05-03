document.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("bgMusic");
    const startBtn = document.getElementById("startAudioBtn");
    const hoverSound = document.getElementById("hoverSound");

    const popup = document.getElementById("videoPopup");
    const closeBtn = document.getElementById("closePopup");
    const video = document.getElementById("popupVideo");

    const popup2 = document.getElementById("videoPopup2");
    const video2 = document.getElementById("popupVideo2");
    const closeBtn2 = document.getElementById("closePopup2");

    // 🔊 BASE VOLUME
    if (music) music.volume = 0.15;
    if (hoverSound) hoverSound.volume = 1;

    // =========================
    // 💰 START AUDIO BUTTON
    // =========================
    if (startBtn) {

        startBtn.addEventListener("mouseenter", () => {
            if (hoverSound) {
                hoverSound.currentTime = 0;
                hoverSound.play().catch(()=>{});
            }
        });

        startBtn.addEventListener("click", () => {
            if (music) {
                music.muted = false;
                music.volume = 0.3;
                music.play();
            }

            if (hoverSound) {
                hoverSound.currentTime = 0;
                hoverSound.play().catch(()=>{});
            }

            startBtn.classList.add("clicked");

            setTimeout(() => {
                startBtn.style.display = "none";
            }, 500);
        });
    }

    // =========================
    // 🔥 SCAN BOX
    // =========================
    setInterval(() => {
        const box = document.getElementById("scanBox");
        if (!box) return;

        box.style.display = "block";

        let percent = 0;

        const scanInterval = setInterval(() => {
            percent += 10;
            box.textContent = "🔍 Scanning... " + percent + "%";

            if (percent >= 100) {
                clearInterval(scanInterval);
                box.textContent = "⚠️ VIRUS DETECTED!";
            }
        }, 800);

        setTimeout(() => {
            box.style.display = "none";
        }, 10000);

    }, 50000);

    // =========================
    // 🎬 VIDEO POPUP
    // =========================
    function showAd() {
        if (!popup || !video || !music) return;

        popup.style.display = "block";
        if (music) music.volume = 0.02;

        video.currentTime = 0;
        video.muted = false;
        video.play().catch(()=>{});

        video.onended = () => {
            popup.style.display = "none";
            if (music) music.volume = 0.3;
        };
    }

    setTimeout(showAd, 10000);
    setInterval(showAd, 45000);

    // =========================
    // ❌ CLOSE LOGIC (CLEAN)
    // =========================
    let secondPopupShown = false;
    document.addEventListener("click", (e) => {
    if (e.target.id === "closePopup2") {

        popup2.style.display = "none";

        video2.pause();
        video2.currentTime = 0;

        secondPopupShown = false;
    }
});

    // FIRST POPUP X
    if (closeBtn) {
        closeBtn.onclick = () => {

            // FIRST CLICK → show popup2
            if (!secondPopupShown) {
                secondPopupShown = true;

                if (popup2 && video2) {
                    popup2.style.display = "block";

                    video2.currentTime = 0;
                    video2.load();
                    video2.play().catch(()=>{});
                }

                return;
            }

            // SECOND CLICK → close everything
            popup.style.display = "none";
            popup2.style.display = "none";

            video.pause();
            video2.pause();

            if (music) music.volume = 0.3;

            secondPopupShown = false;
        };
    }

    // SECOND POPUP X (independent close)
    if (closeBtn2) {
    closeBtn2.onclick = () => {
        popup2.style.display = "none";

        video2.pause();
        video2.currentTime = 0;

        // 🔥 THIS LINE FIXES YOUR ISSUE
        secondPopupShown = false;
    };
}

    // =========================
    // 🔊 IMAGE HOVER SOUND
    // =========================
    const imagesHover = document.querySelectorAll(".image-row img");

    imagesHover.forEach(img => {
        img.addEventListener("mouseenter", () => {
            if (!hoverSound) return;

            hoverSound.currentTime = 0;
            hoverSound.play().catch(()=>{});
        });
    });

    // =========================
    // 😈 SCAM GLITCH EFFECT
    // =========================
    const word = document.getElementById("glitchWord");

    setInterval(() => {
        if (!word) return;

        word.textContent = "SCAM";
        word.style.transform = "scale(1.6) rotate(-5deg)";
        word.style.fontWeight = "900";

        let flickers = 0;
        const colors = ["red", "yellow", "lime", "cyan", "magenta", "white"];

        const flickerInterval = setInterval(() => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            word.style.color = randomColor;

            word.style.textShadow = `
                0 0 10px ${randomColor},
                0 0 20px ${randomColor},
                0 0 40px ${randomColor}
            `;

            word.style.visibility =
                (word.style.visibility === "hidden") ? "visible" : "hidden";

            flickers++;

            if (flickers > 15) {
                clearInterval(flickerInterval);

                word.style.visibility = "visible";
                word.textContent = '"MUSIC"';
                word.style.color = "";
                word.style.textShadow = "none";
                word.style.transform = "scale(1)";
            }

        }, 20);

    }, 5000);

});