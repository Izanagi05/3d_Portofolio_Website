import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { BLOOM_CONFIG, BLOOM_MATERIAL_NAMES } from '../config/constants.js';

const darkMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

const mixShader = {
  uniforms: {
    baseTexture: { value: null },
    bloomTexture: { value: null },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D baseTexture;
    uniform sampler2D bloomTexture;
    varying vec2 vUv;
    void main() {
      gl_FragColor = texture2D(baseTexture, vUv) + texture2D(bloomTexture, vUv) * 0.75;
    }
  `,
};

/**
 * Selective Bloom 2-pass ala jesse-zhou.com:
 * Pass 1 (setengah resolusi): hanya merender objek neon & hologram untuk bloom.
 * Pass 2 (resolusi penuh): merender scene tajam (teks, layar, dinding tidak buram)
 * lalu menggabungkan hasil bloom.
 */
export function createPostProcessing(renderer, scene, camera) {
  const size = renderer.getSize(new THREE.Vector2());
  const dpr = renderer.getPixelRatio();

  const bloomComposer = new EffectComposer(renderer);
  bloomComposer.renderToScreen = false;
  bloomComposer.setPixelRatio(Math.max(1, dpr * BLOOM_CONFIG.resolutionScale));
  bloomComposer.setSize(size.x, size.y);
  bloomComposer.addPass(new RenderPass(scene, camera));

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(
      Math.max(1, Math.floor(size.x * BLOOM_CONFIG.resolutionScale)),
      Math.max(1, Math.floor(size.y * BLOOM_CONFIG.resolutionScale))
    ),
    BLOOM_CONFIG.strength,
    BLOOM_CONFIG.radius,
    BLOOM_CONFIG.threshold
  );
  bloomComposer.addPass(bloomPass);

  const finalComposer = new EffectComposer(renderer);
  finalComposer.setPixelRatio(dpr);
  finalComposer.setSize(size.x, size.y);
  finalComposer.addPass(new RenderPass(scene, camera));

  const mixPass = new ShaderPass(new THREE.ShaderMaterial(mixShader), 'baseTexture');
  mixPass.uniforms.bloomTexture.value = bloomComposer.renderTarget2.texture;
  mixPass.needsSwap = true;
  finalComposer.addPass(mixPass);

  const savedMaterials = new Map();
  const hiddenHitboxes = [];

  const isBloomed = (obj) =>
    obj.userData?.bloom === true || BLOOM_MATERIAL_NAMES.has(obj.material?.name);

  function darkenNonBloomed(obj) {
    if (!obj.isMesh && !obj.isPoints) return;
    if (obj.material?.transparent && obj.material?.opacity === 0) {
      hiddenHitboxes.push(obj);
      obj.visible = false;
      return;
    }
    if (!isBloomed(obj)) {
      savedMaterials.set(obj.uuid, obj.material);
      obj.material = darkMaterial;
    }
  }

  function restoreMaterials(obj) {
    const mat = savedMaterials.get(obj.uuid);
    if (mat) {
      obj.material = mat;
      savedMaterials.delete(obj.uuid);
    }
  }

  return {
    setPixelRatio(ratio) {
      bloomComposer.setPixelRatio(Math.max(1, ratio * BLOOM_CONFIG.resolutionScale));
      finalComposer.setPixelRatio(ratio);
    },
    setSize(w, h) {
      bloomComposer.setSize(w, h);
      finalComposer.setSize(w, h);
    },
    render() {
      scene.traverse(darkenNonBloomed);
      bloomComposer.render();
      scene.traverse(restoreMaterials);
      while (hiddenHitboxes.length) hiddenHitboxes.pop().visible = true;

      finalComposer.render();
    },
  };
}
