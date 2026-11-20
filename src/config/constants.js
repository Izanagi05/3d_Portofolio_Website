// ─── Asset ────────────────────────────────────────────────────────────────
export const MODEL_PATH = 'final7.glb';
export const DRACO_DECODER_PATH = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/';

// ─── Tema & Renderer (mirip jesse-zhou.com: hitam pekat + pool baked) ─────
export const CAMERA_FOV = 75;

export const RENDER_CONFIG = {
  maxPixelRatio: 1.5,
};

export const THEME = {
  background: 0x000000,
  fog: { color: 0x000000, near: 30, far: 76 },
  streetLampColor: 0xd955ff,
};

// Rays / bloom dibuat lebih halus & selektif (hanya objek neon + hologram)
export const BLOOM_CONFIG = {
  strength: 0.32,
  radius: 0.45,
  threshold: 0.22,
  resolutionScale: 0.5,
};

export const BLOOM_MATERIAL_NAMES = new Set([
  'bola gede',
  'cyan nyala',
  'sumpit ungu',
  'mie',
  'outlinezaafood.001',
  'lampu biru',
  'lampu merah',
  'lampu ijo',
  'lampion',
  'oren tv',
  'orenes',
  'biru nyala',
  'merah nyala',
  'ijo tombol',
  'pacman',
  'lampu kotak',
  'cyan',
  'plan pink',
  'pink tiangpers ',
  'unguing tiang`',
]);

// ─── Penyesuaian cahaya bawaan GLB (matikan/kecilkan spotlight yang silau) ─
export const GLB_LIGHT_OVERRIDES = {
  Light: { intensity: 180, color: 0xdce6ff },
  'Point.001': { intensity: 0 }, // matikan glare tiang lampu
  'Point.002': { intensity: 0 }, // matikan glare tiang lampu
  'Point.003': { intensity: 14, color: 0x9b5cff },
  'Point.004': { intensity: 16, color: 0xff9b54 },
  'Point.005': { intensity: 16, color: 0x22e0ff },
  'Point.006': { intensity: 8, color: 0xff9b54 },
  'lampu arcade.001': { intensity: 15, color: 0x38d9ff },
  'lampu arcade.002': { intensity: 8, color: 0xff6e3a },
  'lampu arcade.003': { intensity: 12, color: 0x6b7cff },
  'lampu arcade.005': { intensity: 0 },
  'Area.001': { intensity: 0 }, // digantikan 1 counterWarm light agar shader jauh lebih ringan
  'Area.002': { intensity: 0 },
  'Area.003': { intensity: 0 },
  'Area.004': { intensity: 0 },
  'nyala kotak': { intensity: 6 },
};

export const EXTRA_LIGHTS = {
  hemi: { sky: 0x6c7bff, ground: 0x161228, intensity: 0.65 },
  rearKey: { color: 0xc2d0ff, intensity: 0.55, pos: [-8, 14, -14] },
  frontFill: { color: 0xb8c8ff, intensity: 0.32, pos: [-10, 12, 16] },
  counterWarm: { color: 0xffb469, intensity: 18, distance: 10, pos: [-2.0, 3.6, 1.2] },
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
