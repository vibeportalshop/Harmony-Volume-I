// Scroll Progress + Navbar Shrink
window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";

    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Scroll Reveal
const faders = document.querySelectorAll(".fade");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));

// Magnetic Buttons
document.querySelectorAll(".magnetic").forEach(btn => {
    btn.addEventListener("mousemove", e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0)";
    });
});

// Floating Particles
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particlesArray = [];
for (let i = 0; i < 60; i++) {
    particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speed: Math.random() * 0.4 + 0.2
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) p.y = canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212,175,55,0.35)";
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();
// Volume Toggle
const volumeBtn = document.getElementById("volumeBtn");
const volumeContent = document.getElementById("volumeContent");

volumeBtn.addEventListener("click", () => {
    volumeContent.classList.toggle("active");

    if (volumeContent.classList.contains("active")) {
        volumeBtn.textContent = "Close Volume I";
    } else {
        volumeBtn.textContent = "Explore Volume I";
    }
});

document.getElementById("findSignature").addEventListener("click", generatePerfume);

function generatePerfume() {

    const input = document.getElementById("birthdate").value;
    const gender = document.getElementById("genderSelect").value;
    const resultBox = document.getElementById("resultBox");

    if (!input || !gender) {
        resultBox.innerHTML = "Please select your birthdate and preference.";
        resultBox.classList.add("show");
        return;
    }

    const perfumes = {
        "Original XX": {
            color: "#c9a227",
            desc: "Bold. Classic. The leader in the room without saying a word."
        },
        "XX Black": {
            color: "#111111",
            desc: "Dark energy. Mysterious presence. Power in silence."
        },
        "Ameer Al Oudh": {
            color: "#7b3f00",
            desc: "Royal depth. Rich aura. Traditional strength with modern dominance."
        },
        "Sabaya": {
            color: "#ff4da6",
            desc: "Soft charm. Magnetic femininity. Effortless elegance."
        },
        "Blue Lady": {
            color: "#2e6cff",
            desc: "Confident. Graceful. A calm but unforgettable presence."
        },
        "Broot Musk": {
            color: "#d9d9d9",
            desc: "Balanced. Clean. Universally attractive energy."
        },
        "Royal Prophesy": {
            color: "#6a0dad",
            desc: "Visionary. Unique. You don’t follow trends — you create them."
        },
        "Blue Wave": {
            color: "#00bcd4",
            desc: "Fresh mind. Free spirit. Energetic and uplifting vibe."
        }
    };

    const malePerfumes = ["Original XX", "XX Black", "Ameer Al Oudh"];
    const femalePerfumes = ["Sabaya", "Blue Lady"];
    const unisexPerfumes = ["Broot Musk", "Royal Prophesy", "Blue Wave"];

    function pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    let selectedPerfume = "";

    if (gender === "male") {
        selectedPerfume = pickRandom(malePerfumes);
    } else if (gender === "female") {
        selectedPerfume = pickRandom(femalePerfumes);
    } else {
        selectedPerfume = pickRandom(unisexPerfumes);
    }

    const perfume = perfumes[selectedPerfume];

    resultBox.classList.remove("show");

    setTimeout(() => {
        resultBox.innerHTML = `
            <div style="font-size:22px;">Your Signature Fragrance</div>
            
            <div class="perfume-name" style="color:${perfume.color}; margin-top:15px;">
                ${selectedPerfume}
            </div>
            
            <div style="margin-top:15px; font-size:18px; opacity:0.85;">
                ${perfume.desc}
            </div>

            <a href="https://wa.me/919322723436?text=I want to order ${encodeURIComponent(selectedPerfume)} from HARMONY."
               target="_blank"
               style="
                   display:inline-block;
                   margin-top:25px;
                   padding:12px 28px;
                   background:${perfume.color};
                   color:black;
                   text-decoration:none;
                   border-radius:30px;
                   font-weight:bold;
               ">
               Order Now
            </a>

            <div style="margin-top:15px;">
                <button onclick="generatePerfume()" 
                    style="
                        background:transparent;
                        border:1px solid ${perfume.color};
                        color:${perfume.color};
                        padding:8px 20px;
                        border-radius:25px;
                        cursor:pointer;
                    ">
                    Try Another Vibe
                </button>
            </div>
        `;

        resultBox.style.borderColor = perfume.color;
        resultBox.style.boxShadow = `0 0 40px ${perfume.color}40`;

        resultBox.classList.add("show");

    }, 300);
}