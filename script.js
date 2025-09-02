// Elements
const countDownEl = document.getElementById('countDown');
const rotateOverlay = document.getElementById('rotateOverlay');
const rotateCard = document.getElementById('rotateCard');
const finalScreen = document.getElementById('finalScreen');
const finalImage = document.getElementById('finalImage');
const laughSound = document.getElementById('laughSound');

// Countdown Start
let timeLeft = 10;
countDownEl.textContent = timeLeft;

const timer = setInterval(() => {
  timeLeft--;
  countDownEl.textContent = (timeLeft >= 0) ? timeLeft : '';
  if (timeLeft < 0) {
    clearInterval(timer);
    onCountdownEnd();
  }
}, 1000);

function onCountdownEnd() {
  rotateOverlay.classList.remove('hidden');
  rotateOverlay.setAttribute('aria-hidden', 'false');

  if (isLandscape()) {
    startFinalScreen();
  } else {
    const checkFn = () => {
      if (isLandscape()) {
        window.removeEventListener('orientationchange', checkFn);
        window.removeEventListener('resize', checkFn);
        startFinalScreen();
      }
    };
    window.addEventListener('orientationchange', checkFn);
    window.addEventListener('resize', checkFn);
  }
}

function isLandscape() {
  return window.innerWidth > window.innerHeight;
}

// Final Screen with Sound
function startFinalScreen() {
  rotateOverlay.classList.add('hidden');
  rotateOverlay.setAttribute('aria-hidden', 'true');

  finalScreen.classList.remove('hidden');
  finalScreen.setAttribute('aria-hidden', 'false');

  const playPromise = laughSound.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      finalImage.style.cursor = 'pointer';
      finalImage.addEventListener('click', userPlaySound, { once: true });
      finalScreen.addEventListener('click', userPlaySound, { once: true });
    });
  }
}

function userPlaySound() {
  laughSound.play().catch(() => {});
}

// Skip rotation on tap
rotateOverlay.addEventListener('click', () => {
  startFinalScreen();
});

// Accessibility
rotateCard.tabIndex = 0;
rotateCard.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    startFinalScreen();
  }
});
