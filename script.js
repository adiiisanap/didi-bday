
const DIDI_NAME = "Didi";
const PHOTO_PATH = "assets/didi-photo.jpg";

const intro = document.getElementById("intro");
const birthday = document.getElementById("birthday");
const openButton = document.getElementById("open-surprise");
const heroName = document.getElementById("hero-name");
const photo = document.getElementById("sister-photo");
const photoPlaceholder = document.getElementById("photo-placeholder");
const toast = document.getElementById("toast");

if (heroName) heroName.textContent = `${DIDI_NAME}!`;
document.title = `Happy Birthday, ${DIDI_NAME}! ♡`;

// Didi's photo
if (photo) {
  photo.src = PHOTO_PATH;
  photo.addEventListener("error", () => {
    photo.style.display = "none";
    if (photoPlaceholder) photoPlaceholder.style.display = "flex";
  });
  photo.addEventListener("load", () => {
    photo.style.display = "block";
    if (photoPlaceholder) photoPlaceholder.style.display = "none";
  });
}

// Scroll animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Open birthday surprise
if (openButton) {
  openButton.addEventListener("click", () => {
    intro.classList.add("hidden");
    birthday.classList.remove("hidden");
    window.scrollTo(0, 0);
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    burstConfetti(28);
  });
}

// Final surprise
const confettiButton = document.getElementById("confetti-button");

if (confettiButton) {
  confettiButton.addEventListener("click", () => {
    burstConfetti(90);
    if (toast) {
      toast.textContent = `Sending you lots of love, ${DIDI_NAME}! 💗`;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3000);
    }
  });
}

function burstConfetti(count) {
  const field = document.querySelector(".petal-field");
  if (!field) return;

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
