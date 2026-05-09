document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // 🔥 SCAM GLITCH EFFECT
    // =========================
    const word = document.getElementById("scamWord");
    const heading = document.querySelector("h1");

    if (word && heading) {
        setInterval(() => {

            word.textContent = "SCAM";
            word.style.fontFamily = "'Rubik Glitch', cursive";
            word.style.color = "red";
            word.style.fontSize = "1.3em";
            word.style.letterSpacing = "2px";

            heading.setAttribute("data-text", "ABOUT CORMAC'S SCAM WEBSITE");

            let flickers = 0;

            const flicker = setInterval(() => {
                word.style.visibility =
                    (word.style.visibility === "hidden") ? "visible" : "hidden";

                flickers++;

                if (flickers > 6) {
                    clearInterval(flicker);

                    word.style.visibility = "visible";
                    word.textContent = "MUSIC";
                    word.style.fontFamily = "";
                    word.style.color = "";
                    word.style.fontSize = "";
                    word.style.letterSpacing = "";

                    heading.setAttribute("data-text", "ABOUT CORMAC'S MUSIC WEBSITE");
                }

            }, 60);

        }, 4000);
    }

    // =========================
    // ⏳ TIME COUNTER
    // =========================
    const timeEl = document.getElementById("timeLocked");

    if (timeEl) {
        let seconds = 15 * 365 * 24 * 60 * 60;

        setInterval(() => {

            if (Math.random() < 0.05) {
                seconds += Math.floor(Math.random() * 50000);
            }

            seconds++;

            const years = Math.floor(seconds / (365 * 24 * 60 * 60));
            const days = Math.floor((seconds % (365 * 24 * 60 * 60)) / (24 * 60 * 60));
            const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600);

            timeEl.textContent =
                `격리 시간: ${years}년 ${days}일 ${hours}시간`;

        }, 1000);
    }

    // =========================
    // 🔊 AUDIO
    // =========================
    const audio = document.getElementById("bgTrack");

    if (audio) {
        document.body.addEventListener("click", () => {
            audio.play().catch(()=>{});
            audio.volume = 0.2;
            audio.playbackRate = 0.92;
        }, { once: true });

        setInterval(() => {
            if (!audio.paused) {
                if (Math.random() < 0.3) {
                    audio.volume = 0.15 + Math.random() * 0.1;
                }
                if (Math.random() < 0.05) {
                    audio.currentTime += Math.random() * 0.08;
                }
            }
        }, 1500);
    }

    // =========================
    // 👁️ SYSTEM LOG
    // =========================
    const logBox = document.getElementById("systemLog");

    if (logBox) {
        const messages = [
            "사용자 감지됨",
            "데이터 스캔 중...",
            "접근 기록 확인됨",
            "위치 확인 실패",
            "추적 시작됨",
            "카메라 연결됨",
            "사용자 상태 분석 중...",
            "이상 행동 감지됨"
        ];

        setInterval(() => {
            const msg = messages[Math.floor(Math.random() * messages.length)];
            const p = document.createElement("p");

            if (Math.random() < 0.2) {

                p.textContent = "> YOU ARE BEING WATCHED";
                p.style.color = "white";
                p.style.textShadow = "0 0 10px red";

                let flickers = 0;

                const flicker = setInterval(() => {
                    p.style.visibility =
                        (p.style.visibility === "hidden") ? "visible" : "hidden";

                    flickers++;

                    if (flickers > 6) {
                        clearInterval(flicker);
                        p.style.visibility = "visible";

                        p.textContent = "> " + msg;
                        p.style.color = "";
                        p.style.textShadow = "";
                    }

                }, 80);

            } else {
                p.textContent = "> " + msg;
            }

            logBox.appendChild(p);

            if (logBox.children.length > 6) {
                logBox.removeChild(logBox.children[0]);
            }

        }, 2000);
    }

    // =========================
    // 🫀 KIDNEY BUTTON
    // =========================
    const kidneyBtn = document.getElementById("kidneyBtn");

    if (kidneyBtn) {
        setInterval(() => {

            kidneyBtn.textContent = "CHEAP HUMAN KIDNEYS";
            kidneyBtn.style.color = "white";

            let flickers = 0;

            const flicker = setInterval(() => {
                kidneyBtn.style.visibility =
                    (kidneyBtn.style.visibility === "hidden") ? "visible" : "hidden";

                flickers++;

                if (flickers > 5) {
                    clearInterval(flicker);

                    kidneyBtn.style.visibility = "visible";
                    kidneyBtn.textContent = "저가 인간 신장";
                    kidneyBtn.style.color = "";
                }

            }, 70);

        }, 5000);
    }

    // =========================
    // 🎬 VIDEO POPUPS
    // =========================
    const popup1 = document.getElementById("cornerPopup");
    const video1 = document.getElementById("cornerVideo");
    const closeBtn1 = document.getElementById("closeVideo1");

    const popup2 = document.getElementById("cornerPopup2");
    const video2 = document.getElementById("cornerVideo2");
    const closeBtn2 = document.getElementById("closeVideo2");

    // show first popup on click
    document.body.addEventListener("click", () => {
        if (popup1 && video1) {
            popup1.style.display = "block";
            video1.muted = false;       // 🔥 THIS FIXES IT
            video1.volume = 0.2;  
            video1.play().catch(()=>{});
        }
    }, { once: true });

    // first → open second
    if (closeBtn1) {
        closeBtn1.onclick = () => {
            popup1.style.display = "none";
            video1.pause();

            popup2.style.display = "block";
            video2.currentTime = 0;
            video2.muted = false;
            video2.volume = 0.2;
            video2.play().catch(()=>{});
        };
    }

    // second → close
    if (closeBtn2) {
        closeBtn2.onclick = () => {
            popup2.style.display = "none";
            video2.pause();
        };
    }

});