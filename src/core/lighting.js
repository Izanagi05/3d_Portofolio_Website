import * as THREE from 'three';
import {
  DISABLED_GLB_LIGHTS,
  EXTRA_LIGHTS,
} from '../config/constants.js';

const FLOOR_CENTER = { x: 0.61, z: -2.09 };
const FLOOR_SPAN = 76;

/**
 * Tekstur lantai baked 256x256: kolam magenta di sisi tiang lampu & cyan di sisi
 * kulkas/kanan, memudar halus ke hitam tanpa beban cahaya real-time.
 */
function createBakedFloorTexture() {
  const size = 256;
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

  drawGlow(FLOOR_CENTER.x, FLOOR_CENTER.z, 34, [
    [0, '#1b1d2b'],
    [0.55, '#12131d'],
    [1, 'rgba(0,0,0,0)'],
  ]);

  ctx.globalCompositeOperation = 'lighter';

  drawGlow(-8.4, 8.6, 12.5, [
    [0, 'rgba(205, 45, 245, 0.36)'],
    [0.45, 'rgba(135, 25, 195, 0.16)'],
    [1, 'rgba(0,0,0,0)'],
  ]);

  drawGlow(-7.2, -1.4, 10.5, [
    [0, 'rgba(14, 215, 245, 0.28)'],
    [0.5, 'rgba(10, 145, 195, 0.11)'],
    [1, 'rgba(0,0,0,0)'],
  ]);

  drawGlow(4.2, 4.4, 10, [
    [0, 'rgba(16, 210, 235, 0.24)'],
    [0.5, 'rgba(10, 130, 175, 0.09)'],
    [1, 'rgba(0,0,0,0)'],
  ]);

  drawGlow(-2.0, 4.2, 5.2, [
    [0, 'rgba(255, 165, 70, 0.16)'],
    [1, 'rgba(0,0,0,0)'],
  ]);

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
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

/**
 * Optimasi pencahayaan & material:
 * - Matikan lampu GLB berlebih kecuali Point.001 & Point.002 (lampu jalan asli)
 * - Pertahankan plank, teks putih, & material emissive sesuai warna/intensitas legacy
 * - Pasang baked floor gradient pada Plane (alas) & kalibrasi matte dinding/kayu
 */
export function applySceneLighting(scene, modelRoot, renderer) {
  const maxAniso = Math.min(4, renderer.capabilities.getMaxAnisotropy());

  // 1. Matikan lampu bawaan GLB yang berat & silau, tapi pertahankan Point.001 & Point.002 (lampu jalan) persis nilai awal
  modelRoot.traverse((obj) => {
    if (!obj.isLight) return;
    const key = obj.parent?.name || obj.name;
    if (DISABLED_GLB_LIGHTS.has(key) || DISABLED_GLB_LIGHTS.has(obj.name)) {
      obj.intensity = 0;
      obj.visible = false;
    }
  });

  // 2. Baked floor gradient pada Plane (alas)
  const floor = modelRoot.getObjectByName('Plane');
  const floorBakeTex = createBakedFloorTexture();

  if (floor?.material) {
    floor.material.color.setHex(0xffffff);
    floor.material.roughness = 0.78;
    floor.material.metalness = 0.05;
    floor.material.onBeforeCompile = (shader) => {
      shader.uniforms.uFloorBakeMap = { value: floorBakeTex };
      shader.uniforms.uFloorCenter = { value: new THREE.Vector2(FLOOR_CENTER.x, FLOOR_CENTER.z) };
      shader.uniforms.uFloorSpan = { value: FLOOR_SPAN };

      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', `#include <common>\nvarying vec3 vFloorWorldPos;`)
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
          totalEmissiveRadiance += floorCol * 0.65;`
        );
    };
    floor.material.needsUpdate = true;
  }

  // 3. Kalibrasi material: matte bersih (tanpa bumpMap berat) & threshold bloom tepat
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

    if (mat.name === 'lampu kotak') {
      mat.emissive.setHex(0xffe8c8);
      mat.emissiveIntensity = 0.78; // lampu kotak dibuat lembut, tidak terlalu terang
    } else if (MATTE_MATERIAL_NAMES.has(mat.name)) {
      mat.roughness = 0.86;
      mat.metalness = 0.02;
      mat.needsUpdate = true;
    } else if (METAL_MATERIAL_NAMES.has(mat.name)) {
      mat.roughness = 0.62;
      mat.metalness = 0.2;
      mat.needsUpdate = true;
    }
  });

  // Terangkan strip putih pada lampu kotak (lampubalok) tanpa memengaruhi tiang
  const boxLamp = modelRoot.getObjectByName('lampubalok');
  boxLamp?.traverse((obj) => {
    if (obj.isMesh && obj.material?.name === 'putih nyala') {
      obj.material = obj.material.clone();
      obj.material.emissive.setHex(0xfff2dc);
      obj.material.emissiveIntensity = 0.72;
    }
  });

  // 4. Lampu ringan: atmosfer umum + lampu kotak, pc, kulkas (lampu jalan pakai Point.001 & Point.002 asli)
  const group = new THREE.Group();
  group.name = 'sceneAtmosphereLights';

  const {
    hemi,
    rearKey,
    frontFill,
    counterWarm,
    lampuKotak,
    pcLight,
    kulkasLight,
  } = EXTRA_LIGHTS;
  group.add(new THREE.HemisphereLight(hemi.sky, hemi.ground, hemi.intensity));

  const rearDir = new THREE.DirectionalLight(rearKey.color, rearKey.intensity);
  rearDir.position.set(...rearKey.pos);
  group.add(rearDir);

  const frontDir = new THREE.DirectionalLight(frontFill.color, frontFill.intensity);
  frontDir.position.set(...frontFill.pos);
  group.add(frontDir);

  const addPoint = ({ color, intensity, distance, pos }) => {
    const light = new THREE.PointLight(color, intensity, distance, 2);
    light.position.set(...pos);
    group.add(light);
  };

  addPoint(counterWarm);
  addPoint(lampuKotak);
  addPoint(pcLight);
  addPoint(kulkasLight);

  scene.add(group);
  return group;
}
