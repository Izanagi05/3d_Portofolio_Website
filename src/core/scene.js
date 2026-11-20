import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  CAMERA_FOV,
  CAMERA_VIEWS,
  CONTROLS_CONFIG,
  RENDER_CONFIG,
  THEME,
} from '../config/constants.js';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(THEME.background);
  scene.fog = new THREE.Fog(THEME.fog.color, THEME.fog.near, THEME.fog.far);

  const camera = new THREE.PerspectiveCamera(
    CAMERA_FOV,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const { x, y, z } = CAMERA_VIEWS.START.position;
  camera.position.set(x, y, z);

  const renderer = new THREE.WebGLRenderer({
    antialias: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, RENDER_CONFIG.maxPixelRatio));
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('app').appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  const t = CAMERA_VIEWS.START.target;
  controls.target.set(t.x, t.y, t.z);
  controls.enableDamping = true;
  controls.dampingFactor = CONTROLS_CONFIG.dampingFactor;
  controls.rotateSpeed = CONTROLS_CONFIG.rotateSpeed;
  controls.zoomSpeed = CONTROLS_CONFIG.zoomSpeed;
  controls.screenSpacePanning = false;
  controls.enablePan = false;
  controls.enabled = false;

  return { scene, camera, renderer, controls };
}

export function onResize(camera, renderer, composer) {
  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, RENDER_CONFIG.maxPixelRatio));
    renderer.setSize(w, h);
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(w, h);
  });
}
