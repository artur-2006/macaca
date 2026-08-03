const floatiesContainer = document.getElementById('floaties');
const HEART_COUNT = 14;

function createFloaty() {
  const el = document.createElement('div');
  el.className = 'floaty';
  el.innerHTML = `<svg width="${14 + Math.random() * 18}" height="${14 + Math.random() * 18}" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2 5 5.4 5c1.9 0 3.3 1 4.6 2.6C11.3 6 12.7 5 14.6 5 18 5 19.6 8.4 22 11.7 19.5 16.4 12 21 12 21z"/>
  </svg>`;
  el.style.left = Math.random() * 100 + 'vw';
  el.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
  const duration = 10 + Math.random() * 10;
  el.style.animationDuration = duration + 's';
  el.style.animationDelay = (Math.random() * duration) + 's';
  floatiesContainer.appendChild(el);
}

for (let i = 0; i < HEART_COUNT; i++) createFloaty();

const sealBtn = document.getElementById('sealBtn');
const cover = document.getElementById('cover');
const bgMusic = document.getElementById('bgMusic');
const player = document.getElementById('player');
const playBtn = document.getElementById('playBtn');

let musicStarted = false;

sealBtn.addEventListener('click', () => {
  sealBtn.classList.add('breaking');
  setTimeout(() => {
    cover.classList.add('opened');
    document.body.style.overflow = 'auto';
    tryPlayMusic();
  }, 420);
}, { once: true });

document.body.style.overflow = 'hidden';

function tryPlayMusic() {
  bgMusic.volume = 0.55;
  bgMusic.play()
    .then(() => {
      musicStarted = true;
      player.classList.add('playing');
    })
    .catch(() => {
      musicStarted = false;
      player.classList.remove('playing');
    });
}

playBtn.addEventListener('click', () => {
  if (musicStarted) {
    bgMusic.pause();
    musicStarted = false;
    player.classList.remove('playing');
  } else {
    tryPlayMusic();
  }
});

const scenes = document.querySelectorAll('.scene');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.25 });

scenes.forEach(scene => observer.observe(scene));