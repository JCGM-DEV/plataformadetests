/**
 * Easter Egg: Random Meme Display
 * Triggered at the end of exams/labs.
 */

function triggerEasterEgg() {
    // List of images in the easteregg folder
    const memes = [
        "1000709_213824535434843_716374899_n.jpg",
        "10346314_477967195687241_6738430905776096079_n.jpg",
        "1069141_214889808661649_243565120_n.jpg",
        "1069313_215344645282832_710466361_n.jpg",
        "1239835_238923209591642_1695933582_n.jpg",
        "130830051724675381.jpg",
        "130830051727315795.jpg",
        "130830052008465190.jpg",
        "13083005201017183.gif",
        "130830052013470392.gif",
        "meme1.jpg",
        "meme2.jpg",
        "meme3.jpg",
        "novia.png",
        "xfeliz-dia-informaticos-154171891.jpg"
    ];

    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    
    // Determine base path based on current location
    let basePath = 'easteregg/';
    let audioPath = 'risitas/Voicy_El Risitas Laugh.mp3';
    
    if (window.location.pathname.includes('/practica')) {
        basePath = '../easteregg/';
        audioPath = '../risitas/Voicy_El Risitas Laugh.mp3';
    }

    const imgUrl = basePath + randomMeme;

    // Inject CSS if not already present
    if (!document.getElementById('easteregg-style')) {
        const style = document.createElement('style');
        style.id = 'easteregg-style';
        style.textContent = `
            @keyframes memeIn {
                0% { transform: scale(0.5) rotate(-5deg); opacity: 0; }
                70% { transform: scale(1.1) rotate(2deg); opacity: 1; }
                100% { transform: scale(1) rotate(0deg); opacity: 1; }
            }
            .easteregg-active {
                animation: memeIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
        `;
        document.head.appendChild(style);
    }

    // Create or get overlay
    let overlay = document.getElementById('easteregg-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'easteregg-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            z-index: 100000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.5s ease;
            pointer-events: none;
            backdrop-filter: blur(10px);
        `;
        
        const img = document.createElement('img');
        img.id = 'easteregg-img';
        img.style.cssText = `
            max-width: 90%;
            max-height: 80%;
            border-radius: 24px;
            box-shadow: 0 0 80px rgba(255, 255, 255, 0.2);
            border: 4px solid rgba(255, 255, 255, 0.1);
        `;
        
        const text = document.createElement('div');
        text.innerHTML = '<span style="font-size:3rem">😂</span><br>¡MOMENTO RELAX!';
        text.style.cssText = `
            color: white;
            margin-top: 30px;
            font-family: 'Outfit', sans-serif;
            font-weight: 800;
            font-size: 2rem;
            text-align: center;
            text-shadow: 0 4px 20px rgba(0,0,0,0.8);
            letter-spacing: 2px;
        `;

        overlay.appendChild(img);
        overlay.appendChild(text);
        document.body.appendChild(overlay);
    }

    const imgEl = document.getElementById('easteregg-img');
    imgEl.src = imgUrl;
    imgEl.classList.remove('easteregg-active');
    void imgEl.offsetWidth; // Trigger reflow
    imgEl.classList.add('easteregg-active');

    // Show overlay
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'all';

    // Play Risitas sound
    const audio = new Audio(audioPath);
    audio.volume = 0.7;
    audio.play().catch(e => console.warn("Audio play failed (user interaction required?):", e));

    // Hide after 10 seconds
    setTimeout(() => {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        
        // Fade out audio
        const fadeInterval = setInterval(() => {
            if (audio.volume > 0.1) {
                audio.volume -= 0.1;
            } else {
                audio.pause();
                clearInterval(fadeInterval);
            }
        }, 100);
    }, 10000);
}

// Global aliases for compatibility
window.triggerCunaoEffect = function() { triggerEasterEgg(); };
window.triggerRisitas = function() { triggerEasterEgg(); };
