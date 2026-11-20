import * as THREE from 'three';
import { createScene, onResize } from './core/scene.js';
import { applySceneLighting } from './core/lighting.js';
import { createPostProcessing } from './core/postprocessing.js';
import { initAudio, preloadSounds, unlockAudio, playSound, playAmbient } from './audio/audioManager.js';
import { initTextureLoader, preloadTextures } from './loaders/textureManager.js';
import { loadPortfolioModel } from './loaders/modelLoader.js';
import { createRamenHologram } from './effects/ramenHologram.js';
import { setupInteractions, updateHover } from './interactions/interactionManager.js';
import { flyTo } from './animations/cameraAnimation.js';
import { setProgress, waitForEnter, hideLoader, showError, setupSoundToggle } from './ui/overlay.js';
import { appState } from './state/appState.js';
import { CAMERA_VIEWS, AUDIO } from './config/constants.js';
import { ALL_SCREEN_IMAGES } from './config/portfolioData.js';

async function bootstrap() {
  // 1. Core
  const { scene, camera, renderer, controls } = createScene();
  const composer = createPostProcessing(renderer, scene, camera);
  onResize(camera, renderer, composer);
  initAudio(camera);

  // 2. Loading (model + semua gambar layar + semua audio) dengan progress bar
  const manager = new THREE.LoadingManager();
  manager.onProgress = (_url, loaded, total) => setProgress(loaded / total);
  initTextureLoader(manager, renderer);

  let model;
  try {
    [model] = await Promise.all([
      loadPortfolioModel(scene, manager),
      preloadTextures(ALL_SCREEN_IMAGES),
      preloadSounds(Object.values(AUDIO), manager),
    ]);
  } catch (err) {
    console.error(err);
    showError('Gagal memuat model 😢');
    return;
  }

  applySceneLighting(scene, model.root, renderer);
  const hologram = createRamenHologram(scene, model.root, renderer.getPixelRatio());

  setupInteractions(camera, controls);
  setupSoundToggle();

  // Render 1 frame pemanasan
  controls.update();
  composer.render();

  // 3. Tunggu user klik "Masuk" → unlock audio + mulai render loop & intro
  await waitForEnter();
  await unlockAudio();
  model.videos.forEach((v) => v.play().catch(() => {}));

  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    if (document.hidden) return;

    const dt = Math.min(clock.getDelta(), 0.1);
    const elapsed = clock.elapsedTime;
    for (const { object, speed } of appState.spinners) object.rotation.y += speed * dt;
    hologram?.update(dt, elapsed);

    controls.update();
    updateHover();
    composer.render();
  });

  hideLoader();
  playSound(AUDIO.START);
  playAmbient(AUDIO.AMBIENT);
  appState.ready = true;
  flyTo(camera, controls, CAMERA_VIEWS.HOME, { free: true, duration: 3 });
}

bootstrap();
