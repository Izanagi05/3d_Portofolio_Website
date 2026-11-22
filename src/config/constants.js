// ─── Asset ────────────────────────────────────────────────────────────────
export const MODEL_PATH = 'final7.glb';
export const DRACO_DECODER_PATH = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/';

// ─── Tema & Renderer (1-pass selective bloom, super enteng di GPU) ────────
export const CAMERA_FOV = 75;

export const RENDER_CONFIG = {
  maxPixelRatio: 1.15, // hemat hingga 40%+ pixel dibanding 1.5x namun tetap tajam
};

export const THEME = {
  background: 0x000000,
  fog: { color: 0x000000, near: 30, far: 76 },
};

// Selective bloom 1-pass lembut (strength 0.36, threshold 0.28):
// dinding & lantai gelap (< 0.28) tetap bersih, sedangkan plank, teks putih,
// neon, dan hologram berpendar halus mirip versi legacy tanpa silau.
export const BLOOM_CONFIG = {
  strength: 0.36,
  radius: 0.55,
  threshold: 0.28,
  resolutionScale: 0.5,
};

// Matikan spotlight/pointlight GLB lain yg berat & silau,
// KECUALI Point.001 & Point.002 (lampu jalan) yang dipertahankan persis setelan awal (intensity 100)
export const DISABLED_GLB_LIGHTS = new Set([
  'Light',
  'Point.003',
  'Point.004',
  'Point.005',
  'Point.006',
  'lampu arcade.001',
  'lampu arcade.002',
  'lampu arcade.003',
  'lampu arcade.005',
  'Area.001',
  'Area.002',
  'Area.003',
  'Area.004',
  'nyala kotak',
]);

// Lampu ringan: atmosfer umum + lampu kotak, pc, kulkas (lampu jalan pakai Point.001 & Point.002 asli)
export const EXTRA_LIGHTS = {
  hemi: { sky: 0x7684ff, ground: 0x161228, intensity: 0.85 },
  rearKey: { color: 0xd0dcff, intensity: 0.7, pos: [-8, 14, -14] },
  frontFill: { color: 0xc2d0ff, intensity: 0.42, pos: [-10, 12, 16] },
  counterWarm: { color: 0xffb469, intensity: 16, distance: 10, pos: [-2.0, 3.6, 1.2] },
  lampuKotak: { color: 0xffe4bc, intensity: 4.5, distance: 6.0, pos: [1.45, 3.9, 5.45] },
  pcLight: { color: 0x9ed8ff, intensity: 11, distance: 7.5, pos: [-5.3, 10.1, 3.2] },
  kulkasLight: { color: 0x8be8ff, intensity: 12, distance: 8.0, pos: [-7.9, 3.8, -0.7] },
};

// ─── Kontrol kamera ──────────────────────────────────────────────────────
export const CONTROLS_CONFIG = {
  dampingFactor: 0.04,
  rotateSpeed: 0.5,
  zoomSpeed: 0.7,
  minDistance: 10,
  maxDistance: 30,
  minPolarAngle: 0.25,
  maxPolarAngle: 1.45,
};

export const TRANSITION = {
  duration: 1.8,
  ease: 'power2.inOut',
};

// ─── Sudut pandang kamera ────────────────────────────────────────────────
export const CAMERA_VIEWS = {
  START: { position: { x: -1.7, y: 14.16, z: -20.3 }, target: { x: 0, y: 4, z: 0 } },
  HOME: { position: { x: -8.76, y: 6.02, z: 14.93 }, target: { x: 0, y: 0, z: 0 } },
  KULKAS: { position: { x: -8.61, y: 3.8, z: -0.34 }, target: { x: 0.62, y: 3.32, z: -0.36 } },
  TV: { position: { x: -6.4, y: 10.09, z: 3.51 }, target: { x: 30.02, y: 9.79, z: 3.07 } },
  ARCADE: { position: { x: 4.47, y: 4.06, z: 0.76 }, target: { x: -1.46, y: 3.07, z: 0.63 } },
};

// ─── Audio ───────────────────────────────────────────────────────────────
export const AUDIO = {
  START: { path: 'audio/startsound.mp3', volume: 1 },
  CLICK: { path: 'audio/kliksound.mp3', volume: 1.2 },
  CREDIT: { path: 'audio/creditsound.mp3', volume: 0.5, playbackRate: 3 },
  AMBIENT: { path: 'audio/walk.mp3', volume: 0.45 },
};

// ─── Nama mesh interaktif di model GLB ───────────────────────────────────
export const TRANSPARENT_HITBOX_NAMES = [
  'plan1', 'planhome', 'plan3', 'planarct', 'plancredit',
  'pil1kul', 'pil2kul', 'pil3kul', 'pil4kul', 'pil5kul', 'pil6kul',
  'hitbackkulk', 'nextresultbox',
];

export const HITBOX_NAMES = [
  ...TRANSPARENT_HITBOX_NAMES,
  'abouthit', 'interesthit', 'stackhit', 'backtvhit',
  'ighit', 'linkedinhit', 'githubhit', 'gmailhit',
];

export const SCREEN_NAMES = ['laykul', 'layar1', 'layararcoren'];

// Objek yang berputar terus
export const SPINNERS = [
  { name: 'Cylinder.004', speed: 1.8 }, // piringan satelit
  { name: 'kipas', speed: 3 }, // baling-baling AC
];
