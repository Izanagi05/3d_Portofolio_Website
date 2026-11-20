import { toggleMute } from '../audio/audioManager.js';

const $ = (id) => document.getElementById(id);

export function setProgress(ratio) {
  const pct = Math.round(ratio * 100);
  $('loader-bar').style.width = `${pct}%`;
  $('loader-text').textContent = `${pct}%`;
}

/** Tampilkan tombol "Masuk" dan resolve saat diklik (dibutuhkan untuk unlock audio). */
export function waitForEnter() {
  $('loader-text').textContent = 'Siap!';
  const btn = $('enter-btn');
  btn.hidden = false;
  return new Promise((resolve) => btn.addEventListener('click', resolve, { once: true }));
}

export function hideLoader() {
  const el = $('loader');
  el.classList.add('hidden');
  el.addEventListener('transitionend', () => el.remove(), { once: true });
  $('hud').hidden = false;
}

export function showError(message) {
  $('loader-text').textContent = message;
}

export function setupSoundToggle() {
  const btn = $('sound-btn');
  btn.addEventListener('click', () => {
    const muted = toggleMute();
    btn.classList.toggle('muted', muted);
    btn.setAttribute('aria-label', muted ? 'Nyalakan suara' : 'Matikan suara');
  });
}
