// Gaya shader layar: agak terang sedikit saja, tetap terbaca jelas tanpa silau
export const SCREEN_STYLE = {
  big: { contrast: 1.28, emissiveIntensity: 1, exposure: 0.62, brightness: 1.04 },
  arcade: { contrast: 1.1, emissiveIntensity: 0.95, exposure: 1, brightness: 1 },
  small: { contrast: 1.1, emissiveIntensity: 0.85, exposure: 1, brightness: 1 },
};

export const SCREEN_TEXTURES = {
  kulkas: { cover: '/kulkas/kpcov.png', menu: '/kulkas/kppil.png' },
  tv: { cover: '/layar1/cover.png', about: '/layar1/image1.png' },
  arcade: { cover: '/credit/1.png', credit: '/credit/2.png' },
};

// Layar kecil dekoratif (gambar statis)
export const SMALL_SCREENS = [
  { name: 'lamin1', path: '/layar1/tvkecil/2.png' },
  { name: 'lamin2', path: '/layar1/tvkecil/3.png' },
  { name: 'lamin3', path: '/layar1/tvkecil/4.png', emissiveIntensity: 0.7 },
  { name: 'lamin4', path: '/layar1/tvkecil/1.png' },
  { name: 'lamin5', path: '/layar1/tvkecil/5.png' },
  { name: 'laminjong', path: '/layar1/tvkecil/6.png' },
];

// Layar video
export const VIDEO_SCREENS = [
  { name: 'layar1kecil', path: '/layar1/tvkecil/vid2.mp4', rotation: 9, brightness: 0.75 },
  { name: 'layarlonjong1', path: '/layar1/tvkecil/vid1.mp4', rotation: 3, brightness: 0.75 },
];

// Proyek di layar kulkas
export const KULKAS_PROJECTS = {
  pil1kul: { image: '/kulkas/kp1.png', url: 'https://rplu18.vercel.app/' },
  pil2kul: { image: '/kulkas/kp2.png', url: 'https://tictactoeku.vercel.app/' },
  pil3kul: { image: '/kulkas/kp3.png', url: 'https://myfirstsplinezaa005.framer.website/' },
  pil4kul: { image: '/kulkas/kp4.png', url: 'https://gunting-kertas-batu.vercel.app/' },
  pil5kul: { image: '/kulkas/kp5.png', url: null, message: 'You are already on this page' },
  pil6kul: { image: '/kulkas/kp6.png', url: 'https://myintgameku1.vercel.app/' },
};

// Tab di layar TV
export const TV_TABS = {
  abouthit: '/layar1/image1.png',
  interesthit: '/layar1/image2.png',
  stackhit: '/layar1/image3.png',
};

export const SOCIAL_LINKS = {
  ighit: 'https://www.instagram.com/z.frs_slm05',
  linkedinhit: 'https://www.linkedin.com/in/izanagi-faris-aslam-2b81842a2/',
  githubhit: 'https://github.com/Izanagi05',
  gmailhit: 'mailto:izanagifarisaslam@gmail.com',
};

export const ARTICLE_URL = 'https://www.youtube.com/watch?v=q-Y0bnx6Ndw';

// Semua gambar layar → di-preload saat loading agar ganti layar instan
export const ALL_SCREEN_IMAGES = [
  ...Object.values(SCREEN_TEXTURES).flatMap((g) => Object.values(g)),
  ...Object.values(KULKAS_PROJECTS).map((p) => p.image),
  ...Object.values(TV_TABS),
  ...SMALL_SCREENS.map((s) => s.path),
];
