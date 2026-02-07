// --- Floating hearts background ---");

    const zip = new JSZip();
    zip.file("index.html", cleanHtml);
    zip.file("style.css", cleanCss);
    zip.file("script.js", cleanJs);

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "valentine-card.zip");

    btn.textContent = "✅ Downloaded!";
    setTimeout(() => {
      btn.textContent = "⬇️ Download";
      btn.disabled = false;
    }, 2000);
  } catch (err) {
    console.error("Download failed:", err);
    btn.textContent = "❌ Error";
    setTimeout(() => {
      btn.textContent = "⬇️ Download";
      btn.disabled = false;
    }, 2000);
  }
});

// --- Floating hearts background ---
const heartsBg = document.getElementById("heartsBg");
const heartEmojis = ["💖", "💕", "💘", "💝", "💗", "💓", "💞", "♥️", "❤️", "🩷"];

function createFloatingHeart() {
  const heart = document.createElement("span");
  heart.classList.add("floating-heart");
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (Math.random() * 20 + 14) + "px";
  heart.style.animationDuration = (Math.random() * 6 + 6) + "s";
  heart.style.animationDelay = Math.random() * 2 + "s";
  heartsBg.appendChild(heart);

  setTimeout(() => heart.remove(), 14000);
}

setInterval(createFloatingHeart, 800);
// Create a few immediately
for (let i = 0; i < 8; i++) {
  setTimeout(createFloatingHeart, i * 200);
}

// --- Envelope open ---
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");

envelope.addEventListener("click", () => {
  envelope.classList.add("opened");
  setTimeout(() => {
    envelope.style.display = "none";
    letter.classList.remove("hidden");
  }, 600);
});

// --- No button runs away + Yes button grows ---
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
let noClickCount = 0;

const noMessages = [
  "Are you sure? 🥺",
  "Think again... 💭",
  "Please? 🙏",
  "Don't break my heart! 💔",
  "I'll be sad... 😢",
  "Pretty please? 🌹",
  "You can't escape love! 💘",
  "Try again! 😏"
];

noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * 250 - 125;
  const y = Math.random() * 250 - 125;
  noBtn.style.transition = "transform 0.3s ease";
  noBtn.style.transform = "translate(" + x + "px, " + y + "px)";
});

noBtn.addEventListener("click", () => {
  noClickCount++;
  const msg = document.getElementById("message");
  msg.textContent = noMessages[Math.min(noClickCount - 1, noMessages.length - 1)];
  msg.style.color = "#e6305a";

  // Make Yes button grow each time No is clicked
  const currentSize = 1 + noClickCount * 0.15;
  yesBtn.classList.add("growing");
  yesBtn.style.transform = "scale(" + currentSize + ")";
  yesBtn.style.animation = "none";

  // Move No button randomly
  const x = Math.random() * 250 - 125;
  const y = Math.random() * 250 - 125;
  noBtn.style.transition = "transform 0.3s ease";
  noBtn.style.transform = "translate(" + x + "px, " + y + "px)";

  // Shrink No button
  const noSize = Math.max(0.5, 1 - noClickCount * 0.1);
  noBtn.style.fontSize = (16 * noSize) + "px";
  noBtn.style.padding = (12 * noSize) + "px " + (30 * noSize) + "px";
});

// --- Yes button confetti + victory message ---
yesBtn.addEventListener("click", () => {
  // Fire multiple confetti bursts
  const duration = 3000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#ff4d6d", "#ff8fab", "#ffc2d1", "#e6305a", "#fb6f92"]
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#ff4d6d", "#ff8fab", "#ffc2d1", "#e6305a", "#fb6f92"]
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  // Big center burst
  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 },
    colors: ["#ff4d6d", "#ff8fab", "#ffc2d1", "#e6305a", "#fb6f92", "#ffffff"]
  });

  // Show victory message
  const card = document.getElementById("card");
  card.innerHTML =
    '<div class="victory">' +
      '<div class="victory-emoji">💖</div>' +
      '<h1>Yayyy!</h1>' +
      '<p>You are all I ever wanted and I\'m so glad you are mine.</p>' +
      '<p>Wishing the sweetest, happiest day to my forever Valentine!</p>' +
      '<p>Every moment with you is a gift I treasure.</p>' +
      '<p class="signature">Happy Valentine\'s Day, Bachwa! 💘</p>' +
    '</div>';
});
