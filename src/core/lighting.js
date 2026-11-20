import * as THREE from 'three';
import {
  THEME,
  GLB_LIGHT_OVERRIDES,
  EXTRA_LIGHTS,
} from '../config/constants.js';

const FLOOR_CENTER = { x: 0.61, z: -2.09 };
const FLOOR_SPAN = 76;

/**
 * Buat tekstur lantai ala baked lighting Jesse Zhou: dasar slate gelap yang memudar
 * ke hitam, dengan kolam cahaya lembut magenta di sisi tiang lampu & cyan di sisi kulkas/kanan,
 * tanpa menimbulkan silau/glare pada tiang lampu itu sendiri.
 */
function createBakedFloorTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, size, size);

  const toPx = (wx, wz) => ({
    x: ((wx - FLOOR_CENTER.x) / FLOOR_SPAN + 0.5) * size,
    y: ((wz - FLOOR_CENTER.z) / FLOOR_SPAN + 0.5) * size,
  });

  const drawGlow = (wx, wz, radiusMeters, stops) => {
    const p = toPx(wx, wz);
    const r = (radiusMeters / FLOOR_SPAN) * size;
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
    stops.forEach(([offset, color]) => grad.addColorStop(offset, color));
    ctx.fillStyle = grad;
    ctx.fillRect(p.x - r, p.y - r, r * 2, r * 2);
  };

  // Base piringan lantai gelap lembut (memudar halus ke hitam di luar)
  drawGlow(FLOOR_CENTER.x, FLOOR_CENTER.z, 34, [
    [0, '#1b1d2b'],
    [0.55, '#12131d'],
    [1, 'rgba(0,0,0,0)'],
  ]);

  ctx.globalCompositeOperation = 'lighter';

  // Kolam ungu-magenta di bawah tiang lampu (-8.4, 8.6) tanpa menyilaukan tiang
  drawGlow(-8.4, 8.6, 12.5, [
    [0, 'rgba(205, 45, 245, 0.36)'],
    [0.45, 'rgba(135, 25, 195, 0.16)'],
    [1, 'rgba(0,0,0,0)'],
  ]);

  // Kolam cyan di sisi kulkas (-7.2, -1.4)
  drawGlow(-7.2, -1.4, 10.5, [
    [0, 'rgba(14, 215, 245, 0.28)'],
    [0.5, 'rgba(10, 145, 195, 0.11)'],
    [1, 'rgba(0,0,0,0)'],
  ]);

  // Kolam cyan di sisi depan-kanan arcade (4.2, 4.4)
  drawGlow(4.2, 4.4, 10, [
    [0, 'rgba(16, 210, 235, 0.24)'],
    [0.5, 'rgba(10, 130, 175, 0.09)'],
    [1, 'rgba(0,0,0,0)'],
  ]);

  // Bias hangat halus di depan meja ramen (-2.0, 4.2)
  drawGlow(-2.0, 4.2, 5.2, [
    [0, 'rgba(255, 165, 70, 0.16)'],
    [1, 'rgba(0,0,0,0)'],
  ]);

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  return tex;
}

/**
 * Tekstur micro-grain 128x128 (dibuat sekali, ~0 beban VRAM) agar material warna
 * polos tampak bertekstur & matte seperti hasil bake Blender, bukan plastik licin.
 */
function createMicroGrainTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(size, size);

  for (let i = 0; i < img.data.length; i += 4) {
    const v = 118 + Math.floor(Math.random() * 20);
    img.data[i] = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 8);
  return tex;
}

const MATTE_MATERIAL_NAMES = new Set([
  'biru 1',
  'biru 2',
  'kayu base',
  'kursi',
  'terpal',
  'genteng',
  'anuan kain',
  'lembar merah',
  'ga abu banget',
  'Material.002',
  'tr',
]);

const METAL_MATERIAL_NAMES = new Set(['Besi', 'pipa', 'bolongan radio']);

const LAMP_SIGN_DIM = new Set([
  'plan pink',
  'pink tiangpers ',
  'unguing tiang`',
  'cyan',
  'putih nyala',
]);

/**
 * Terapkan sistem pencahayaan & material ala jesse-zhou.com yang enteng di GPU:
 * - Matikan spotlight/pointlight GLB yang bikin silau & berat
 * - Terapkan baked floor texture (kolam magenta/cyan tanpa glare di tiang)
 * - Tambahkan micro-grain matte & anisotropic filtering agar tekstur tajam
 */
export function applySceneLighting(scene, modelRoot, renderer) {
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  // 1. Rapikan & matikan cahaya GLB yang berlebihan agar GPU ringan & tidak silau
  modelRoot.traverse((obj) => {
    if (!obj.isLight) return;
    const key = obj.parent?.name || obj.name;
    const override = GLB_LIGHT_OVERRIDES[key] || GLB_LIGHT_OVERRIDES[obj.name];
    if (override) {
      if (override.intensity !== undefined) {
        obj.intensity = override.intensity;
        if (override.intensity === 0) obj.visible = false;
      }
      if (override.color !== undefined) obj.color.setHex(override.color);
    } else {
      obj.intensity *= 0.45;
    }
  });

  // 2. Pasang baked floor gradient pada Plane (alas) menggunakan koordinat world XZ
  const floor = modelRoot.getObjectByName('Plane');
  const floorBakeTex = createBakedFloorTexture();
  floorBakeTex.anisotropy = maxAniso;

  if (floor?.material) {
    floor.material.color.setHex(0xffffff);
    floor.material.roughness = 0.72;
    floor.material.metalness = 0.08;
    floor.material.onBeforeCompile = (shader) => {
      shader.uniforms.uFloorBakeMap = { value: floorBakeTex };
      shader.uniforms.uFloorCenter = { value: new THREE.Vector2(FLOOR_CENTER.x, FLOOR_CENTER.z) };
      shader.uniforms.uFloorSpan = { value: FLOOR_SPAN };

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>\nvarying vec3 vFloorWorldPos;`
        )
        .replace(
          '#include <worldpos_vertex>',
          `#include <worldpos_vertex>\nvFloorWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`
        );

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
          uniform sampler2D uFloorBakeMap;
          uniform vec2 uFloorCenter;
          uniform float uFloorSpan;
          varying vec3 vFloorWorldPos;`
        )
        .replace(
          '#include <color_fragment>',
          `#include <color_fragment>
          vec2 fUv = clamp((vFloorWorldPos.xz - uFloorCenter) / uFloorSpan + 0.5, 0.0, 1.0);
          vec3 floorCol = texture2D(uFloorBakeMap, fUv).rgb;
          diffuseColor.rgb *= floorCol;`
        )
        .replace(
          '#include <emissivemap_fragment>',
          `#include <emissivemap_fragment>
          totalEmissiveRadiance += floorCol * 0.72;`
        );
    };
    floor.material.needsUpdate = true;
  }

  // 3. Poles material model: matte grain + redam neon tiang lampu + anisotropy tekstur
  const grainTex = createMicroGrainTexture();
  const seenMats = new Set();

  modelRoot.traverse((obj) => {
    if (!obj.isMesh || !obj.material) return;
    const mat = obj.material;
    if (seenMats.has(mat)) return;
    seenMats.add(mat);

    if (mat.map) {
      mat.map.anisotropy = maxAniso;
      mat.map.needsUpdate = true;
    }

    if (mat.name === 'bola gede') {
      mat.emissive.setHex(THEME.streetLampColor);
      mat.emissiveIntensity = 0.85;
    } else if (LAMP_SIGN_DIM.has(mat.name)) {
      mat.emissiveIntensity = 0.65;
      if (mat.name === 'putih nyala') mat.emissive.setHex(0xe8dcff);
    } else if (MATTE_MATERIAL_NAMES.has(mat.name)) {
      mat.roughness = Math.max(mat.roughness ?? 0.5, 0.82);
      mat.metalness = 0.02;
      mat.bumpMap = grainTex;
      mat.bumpScale = 0.006;
      mat.needsUpdate = true;
    } else if (METAL_MATERIAL_NAMES.has(mat.name)) {
      mat.roughness = 0.58;
      mat.metalness = 0.25;
      mat.bumpMap = grainTex;
      mat.bumpScale = 0.004;
      mat.needsUpdate = true;
    }
  });

  // 4. Hanya 4 sumber cahaya ringan (hemat fragment shader, zero glare pada tiang)
  const group = new THREE.Group();
  group.name = 'sceneAtmosphereLights';

  const { hemi, rearKey, frontFill, counterWarm } = EXTRA_LIGHTS;
  group.add(new THREE.HemisphereLight(hemi.sky, hemi.ground, hemi.intensity));

  const rearDir = new THREE.DirectionalLight(rearKey.color, rearKey.intensity);
  rearDir.position.set(...rearKey.pos);
  group.add(rearDir);

  const frontDir = new THREE.DirectionalLight(frontFill.color, frontFill.intensity);
  frontDir.position.set(...frontFill.pos);
  group.add(frontDir);

  const counterLight = new THREE.PointLight(
    counterWarm.color,
    counterWarm.intensity,
    counterWarm.distance,
    2
  );
  counterLight.position.set(...counterWarm.pos);
  group.add(counterLight);

  scene.add(group);
  return group;
}
