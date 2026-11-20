import * as THREE from 'three';

// Audio dimainkan langsung lewat Web Audio API dari buffer yang sudah
// di-decode saat loading → tidak ada delay saat klik.
let listener = null;
let muted = false;
let ambientSource = null;
let ambientGain = null;
const buffers = new Map();

export function initAudio(camera) {
  listener = new THREE.AudioListener();
  camera.add(listener);
}

export function preloadSounds(sounds, manager) {
  const loader = new THREE.AudioLoader(manager);
  return Promise.all(
    sounds.map(({ path }) =>
      loader
        .loadAsync(path)
        .then((buffer) => buffers.set(path, buffer))
        .catch((err) => console.warn('Audio gagal dimuat:', path, err))
    )
  );
}

// Harus dipanggil di dalam event user (klik) karena kebijakan autoplay browser
export async function unlockAudio() {
  const ctx = listener?.context;
  if (ctx && ctx.state !== 'running') await ctx.resume();
}

function createSource({ path, volume = 1, playbackRate = 1 }, loop = false) {
  const buffer = buffers.get(path);
  if (!listener || !buffer) return null;

  const ctx = listener.context;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = loop;
  source.playbackRate.value = playbackRate;

  const gain = ctx.createGain();
  gain.gain.value = volume;
  source.connect(gain).connect(listener.getInput());
  return { source, gain };
}

export function playSound(sound) {
  if (muted) return;
  const node = createSource(sound);
  node?.source.start(0);
}

export function playAmbient(sound) {
  if (ambientSource) return;
  const node = createSource(sound, true);
  if (!node) return;
  ambientSource = node.source;
  ambientGain = node.gain;
  ambientGain.gain.value = muted ? 0 : sound.volume;
  ambientGain.userData = { volume: sound.volume };
  ambientSource.start(0);
}

export function toggleMute() {
  muted = !muted;
  if (ambientGain) {
    const ctx = listener.context;
    const target = muted ? 0 : ambientGain.userData.volume;
    ambientGain.gain.setTargetAtTime(target, ctx.currentTime, 0.15);
  }
  return muted;
}
