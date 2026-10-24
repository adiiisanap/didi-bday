// Personalize these values before publishing.
const DIDI_NAME = "Didi"; // Example: "Priya Didi"
const PHOTO_PATH = "assets/didi-photo.jpg";
const AUDIO_PATH = "assets/birthday-song.mp3";

const intro = document.getElementById("intro");
const birthday = document.getElementById("birthday");
const openButton = document.getElementById("open-surprise");
const heroName = document.getElementById("hero-name");
const photo = document.getElementById("sister-photo");
const photoPlaceholder = document.getElementById("photo-placeholder");
const audio = document.getElementById("birthday-audio");
const musicToggle = document.getElementById("music-toggle");
const musicLabel = document.getElementById("music-label");
const toast = document.getElementById("toast");

heroName.textContent = `${DIDI_NAME}!`;
document.title = `Happy Birthday, ${DIDI_NAME}! ♡`;

photo.src = PHOTO_PATH;
photo.addEventListener("error", () => {
  photo.style.display = "none";
  photoPlaceholder.style.display = "flex";
});
photo.addEventListener("load", () => {
  photo.style.display = "block";
  photoPlaceholder.style.display = "none";
});

openButton.addEventListener("click", () => {
  intro.classList.add("hidden");
  birthday.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "instant" });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  burstConfetti(28);
});

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

musicToggle.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      audio.src = AUDIO_PATH;
      await audio.play();
      musicToggle.classList.add("playing");
      musicToggle.setAttribute("aria-pressed", "true");
      musicLabel.textContent = "Pause our song";
    } catch (error) {
      showToast("Add your MP3 as assets/birthday-song.mp3 to play music 🎵");
    }
  } else {
    audio.pause();
    musicToggle.classList.remove("playing");
    musicToggle.setAttribute("aria-pressed", "false");
    musicLabel.textContent = "Play our song";
  }
});

audio.addEventListener("error", () => {
  musicToggle.classList.remove("playing");
  musicToggle.setAttribute("aria-pressed", "false");
  musicLabel.textContent = "Play our song";
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("confetti-button").addEventListener("click", () => {
  burstConfetti(90);
  showToast(`Sending you a million little wishes, ${DIDI_NAME}! 💗`);
});

function burstConfetti(count) {
  const field = document.querySelector(".petal-field");
  const symbols = ["♡", "✦", "✿", "♥", "✨"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "petal";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.fontSize = `${12 + Math.random() * 20}px`;
    piece.style.color = ["#d95791", "#f1a0c3", "#b980c5", "#e5b45c"][Math.floor(Math.random() * 4)];
    piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
    piece.style.animationDuration = `${2.4 + Math.random() * 2.4}s`;
    field.appendChild(piece);
    setTimeout(() => piece.remove(), 5000);
  }
}
