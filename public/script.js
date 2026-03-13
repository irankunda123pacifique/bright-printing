// JavaScript for Multi-Page Portfolio

// ─── SPLASH SCREEN ─────────────────────────────────────────────────
(function initSplash() {
    // Build splash HTML
    const splash = document.createElement('div');
    splash.id = 'splash-screen';
    splash.innerHTML = `
        <div class="splash-particles" id="splashParticles"></div>
        <div class="splash-glow"></div>

        <!-- Spinning rings behind the logo -->
        <div style="position:relative; z-index:2;">
            <div class="splash-ring"></div>
            <div class="splash-ring splash-ring-2"></div>

            <!-- Logo -->
            <div class="splash-logo-wrap">
                <img src="assets/logo.png" alt="PI Logo" />
            </div>
        </div>

        <!-- Tagline -->
        <p class="splash-tagline">Full Stack Developer</p>

        <!-- Progress bar -->
        <div class="splash-progress-wrap">
            <div class="splash-progress-bar" id="splashBar"></div>
        </div>

        <!-- Counter -->
        <div class="splash-counter" id="splashCounter">0%</div>
    `;

    // Insert as first child of body
    document.body.insertBefore(splash, document.body.firstChild);
    document.body.classList.add('splash-active');

    // Generate floating particles
    const particleContainer = splash.querySelector('#splashParticles');
    const colors = ['#6c63ff', '#00d4ff', '#ff6b9d', '#a78bfa', '#34d399'];
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'splash-particle';
        p.style.left     = Math.random() * 100 + 'vw';
        p.style.width    = (Math.random() * 4 + 2) + 'px';
        p.style.height   = p.style.width;
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.animationDelay    = (Math.random() * 2) + 's';
        p.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
        particleContainer.appendChild(p);
    }

    // Animate counter from 0 → 100 over 2000ms
    const counter = splash.querySelector('#splashCounter');
    const totalDuration = 2000;
    const startTime = performance.now();

    function animateCounter(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);
        const eased = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;
        const pct = Math.round(eased * 100);
        counter.textContent = pct + '%';
        if (progress < 1) {
            requestAnimationFrame(animateCounter);
        }
    }
    requestAnimationFrame(animateCounter);

    // Hide splash after 2.5s
    setTimeout(() => {
        splash.classList.add('splash-hide');
        document.body.classList.remove('splash-active');
        // Remove from DOM after transition ends
        splash.addEventListener('transitionend', () => {
            splash.remove();
        }, { once: true });
    }, 2500);
})();

// ─── DOMContentLoaded ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    // Mobile Navbar Toggle
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("open");
        });
    }

    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // --- Typing Effect ---
    const typeName = document.getElementById("typeName");
    if (typeName) {
        initTypingEffect(typeName, "IRANKUNDA Pacifique");
    }

    // --- Certificates Logic ---
    const certificatesGrid = document.getElementById("certificatesGrid");
    if (certificatesGrid) {
        initCertificates();
    }
});

// Typing Effect Implementation
function initTypingEffect(element, text) {
    let i = 0;
    element.innerHTML = "";

    // Total duration is 2000ms. Interval = 2000 / number of characters.
    const interval = Math.floor(2000 / text.length);

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, interval);
        } else {
            // Stop blinking after typing
            element.style.borderRight = "none";
        }
    }

    // Initial style for cursor
    element.style.borderRight = "3px solid var(--accent-1)";
    element.style.paddingRight = "4px";

    setTimeout(type, 500);
}

// Contact Form Handler
function handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const subject = document.getElementById("contactSubject").value;
    const message = document.getElementById("contactMessage").value;

    // Open mail client
    const mailtoLink = `mailto:pacifique@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.open(mailtoLink, "_blank");

    // Show success state
    document.getElementById("contactFormEl").style.display = "none";
    const success = document.getElementById("formSuccess");
    success.classList.add("show");

    // Reset after 4s
    setTimeout(() => {
        success.classList.remove("show");
        document.getElementById("contactFormEl").style.display = "block";
        document.getElementById("contactFormEl").reset();
    }, 4000);

    return false;
}

// ─── DATA FOR CERTIFICATES ─────────────────────────────────────────
const CERTIFICATES = [
    { id: "cert-1", title: "Full Stack Web Development", issuer: "Tech Academy", date: "August 2025" },
    { id: "cert-2", title: "Advanced React Patterns", issuer: "Frontend Masters", date: "January 2026" },
    { id: "cert-3", title: "Node.js Architecture", issuer: "Backend Institute", date: "April 2026" }
];

function initCertificates() {
    const grid = document.getElementById("certificatesGrid");
    grid.innerHTML = "";

    CERTIFICATES.forEach(cert => {
        const card = document.createElement("div");
        card.className = "project-card cert-card";

        card.innerHTML = `
            <div class="cert-canvas-container" id="container-${cert.id}">
                <canvas id="canvas-${cert.id}" width="800" height="565"></canvas>
            </div>
            <div class="project-info" style="width: 100%; text-align: center; padding: 16px;">
                <h3 style="font-size: 1.1rem; margin-bottom: 4px;">${cert.title}</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 24px;">${cert.issuer} • ${cert.date}</p>
                <div class="cert-actions" style="margin-top: auto;">
                    <button class="btn-outline" onclick="downloadCertificate('${cert.id}', '${cert.title}')" style="width: 100%; justify-content: center;">
                        <i data-lucide="download" style="width:16px;height:16px;"></i> Download PNG
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
        drawCertificate(cert.id, cert.title, cert.issuer, cert.date);

        // Click to zoom
        const container = card.querySelector(".cert-canvas-container");
        container.addEventListener("click", () => {
            openCertificateModal(cert.id);
        });
    });

    // Modal Logic
    const modal = document.getElementById("certModal");
    const modalClose = document.getElementById("certModalClose");

    if (modal && modalClose) {
        modalClose.addEventListener("click", () => modal.classList.remove("open"));
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("open");
        });
    }

    if (window.lucide) lucide.createIcons();
}

// ─── HTML CANVAS CERTIFICATE GENERATOR ─────────────────────────────
function drawCertificate(canvasId, title, issuer, date) {
    const canvas = document.getElementById("canvas-" + canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = "#00d4ff";
    ctx.lineWidth = 15;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Inner Border
    ctx.strokeStyle = "#6c63ff";
    ctx.lineWidth = 4;
    ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);

    // Header Title
    ctx.fillStyle = "#0a0a1a";
    ctx.font = "bold 44px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("CERTIFICATE OF COMPLETION", canvas.width / 2, 120);

    // Subtitle
    ctx.fillStyle = "#5a5a7a";
    ctx.font = "20px sans-serif";
    ctx.fillText("This is proudly presented to", canvas.width / 2, 180);

    // Name
    ctx.fillStyle = "#ff6b9d";
    ctx.font = "italic bold 56px serif";
    ctx.fillText("IRANKUNDA Pacifique", canvas.width / 2, 260);

    // Course Text
    ctx.fillStyle = "#0a0a1a";
    ctx.font = "24px sans-serif";
    ctx.fillText("For successful completion of", canvas.width / 2, 330);

    ctx.fillStyle = "#6c63ff";
    ctx.font = "bold 34px sans-serif";
    ctx.fillText(title, canvas.width / 2, 380);

    // Issuer & Date
    ctx.fillStyle = "#0a0a1a";
    ctx.font = "18px sans-serif";
    ctx.fillText("Issued by " + issuer, canvas.width / 2, 450);
    ctx.fillText("Date: " + date, canvas.width / 2, 480);

    // Signature lines
    ctx.beginPath();
    ctx.moveTo(150, 500);
    ctx.lineTo(300, 500);
    ctx.strokeStyle = "#0a0a1a";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.font = "14px sans-serif";
    ctx.fillText("Instructor Signature", 225, 520);

    ctx.beginPath();
    ctx.moveTo(canvas.width - 300, 500);
    ctx.lineTo(canvas.width - 150, 500);
    ctx.stroke();
    ctx.fillText("Director Signature", canvas.width - 225, 520);
}

// ─── CLICK TO ZOOM (FULLSCREEN MODAL) ──────────────────────────────
function openCertificateModal(canvasId) {
    const canvas = document.getElementById("canvas-" + canvasId);
    if (!canvas) return;
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("certModalImg");

    // Convert canvas to data URL for the image
    const dataURL = canvas.toDataURL("image/png");
    modalImg.src = dataURL;
    modal.classList.add("open");
}

// ─── DOWNLOAD AS PNG ───────────────────────────────────────────────
function downloadCertificate(canvasId, title) {
    const canvas = document.getElementById("canvas-" + canvasId);
    if (!canvas) return;

    const dataURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = `Certificate_${title.replace(/ /g, "_")}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
