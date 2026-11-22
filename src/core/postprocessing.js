import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { BLOOM_CONFIG } from '../config/constants.js';

/**
 * Single-pass EffectComposer dengan HalfFloat + threshold 0.72:
 * Scene hanya dirender 1x per frame (tanpa traverse & tanpa pass kedua),
 * dan UnrealBloomPass dihitung di setengah resolusi untuk FPS tinggi.
 */
export function createPostProcessing(renderer, scene, camera) {
  const size = renderer.getSize(new THREE.Vector2());

  const composer = new EffectComposer(renderer);
  composer.setPixelRatio(renderer.getPixelRatio());
  composer.setSize(size.x, size.y);

  composer.addPass(new RenderPass(scene, camera));

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(
      Math.max(1, Math.floor(size.x * BLOOM_CONFIG.resolutionScale)),
      Math.max(1, Math.floor(size.y * BLOOM_CONFIG.resolutionScale))
    ),
    BLOOM_CONFIG.strength,
    BLOOM_CONFIG.radius,
    BLOOM_CONFIG.threshold
  );
  composer.addPass(bloomPass);

  return composer;
}
