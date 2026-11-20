import * as THREE from 'three';
import { gsap } from 'gsap';
import { CONTROLS_CONFIG, TRANSITION } from '../config/constants.js';
import { appState } from '../state/appState.js';

let activeTween = null;
const fromPos = new THREE.Vector3();
const fromTarget = new THREE.Vector3();
const toPos = new THREE.Vector3();
const toTarget = new THREE.Vector3();

function relaxLimits(controls) {
  controls.minDistance = 0;
  controls.maxDistance = Infinity;
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI;
}

function applyLimits(controls) {
  controls.minDistance = CONTROLS_CONFIG.minDistance;
  controls.maxDistance = CONTROLS_CONFIG.maxDistance;
  controls.minPolarAngle = CONTROLS_CONFIG.minPolarAngle;
  controls.maxPolarAngle = CONTROLS_CONFIG.maxPolarAngle;
}

/**
 * Terbangkan kamera ke sebuah view. Posisi & target di-interpolasi dalam
 * SATU tween sehingga gerakan selalu sinkron dan halus. Klik beruntun
 * otomatis membatalkan transisi sebelumnya.
 *
 * @param {boolean} free - true: user bisa orbit setelah sampai (mode jelajah)
 */
export function flyTo(camera, controls, view, { free = false, duration = TRANSITION.duration, onComplete } = {}) {
  activeTween?.kill();

  controls.enabled = false;
  relaxLimits(controls);
  appState.busy = true;

  fromPos.copy(camera.position);
  fromTarget.copy(controls.target);
  toPos.set(view.position.x, view.position.y, view.position.z);
  toTarget.set(view.target.x, view.target.y, view.target.z);

  const progress = { t: 0 };
  activeTween = gsap.to(progress, {
    t: 1,
    duration,
    ease: TRANSITION.ease,
    onUpdate: () => {
      camera.position.lerpVectors(fromPos, toPos, progress.t);
      controls.target.lerpVectors(fromTarget, toTarget, progress.t);
    },
    onComplete: () => {
      appState.busy = false;
      activeTween = null;
      if (free) {
        applyLimits(controls);
        controls.enabled = true;
      }
      onComplete?.();
    },
  });
}
