import { appState } from '../state/appState.js';
import { pick } from './raycaster.js';
import { flyTo } from '../animations/cameraAnimation.js';
import { playSound } from '../audio/audioManager.js';
import { setScreenTexture } from '../loaders/textureManager.js';
import { CAMERA_VIEWS, AUDIO } from '../config/constants.js';
import {
  KULKAS_PROJECTS,
  SOCIAL_LINKS,
  TV_TABS,
  ARTICLE_URL,
  SCREEN_TEXTURES,
  SCREEN_STYLE,
} from '../config/portfolioData.js';

const DRAG_THRESHOLD = 6; // px – geser lebih dari ini dianggap drag, bukan klik

let camera, controls;
const pointer = { x: 0, y: 0, moved: false, downX: 0, downY: 0 };
let hovered = null;

// ─── Setup ───────────────────────────────────────────────────────────────
export function setupInteractions(cam, ctrl) {
  camera = cam;
  controls = ctrl;
  const canvas = ctrl.domElement;

  canvas.addEventListener('pointermove', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.moved = true;
  });

  canvas.addEventListener('pointerdown', (e) => {
    pointer.downX = e.clientX;
    pointer.downY = e.clientY;
  });

  canvas.addEventListener('pointerup', (e) => {
    const dist = Math.hypot(e.clientX - pointer.downX, e.clientY - pointer.downY);
    if (dist > DRAG_THRESHOLD || !appState.ready) return;

    const target = pick(e.clientX, e.clientY, camera, appState.interactiveObjects);
    if (!target) return;
    handleClick(target.name);
  });

  canvas.addEventListener('pointerleave', () => {
    hovered = null;
    document.body.style.cursor = '';
  });
}

/** Hanya ubah bentuk kursor jadi pointer (tanpa mengubah warna/material mesh sama sekali). */
export function updateHover() {
  if (!pointer.moved || !appState.ready) return;
  pointer.moved = false;
  const hit = pick(pointer.x, pointer.y, camera, appState.interactiveObjects);
  if (hit !== hovered) {
    hovered = hit;
    document.body.style.cursor = hovered ? 'pointer' : '';
  }
}

// ─── Helper aksi ─────────────────────────────────────────────────────────
const click = () => playSound(AUDIO.CLICK);
const openUrl = (url) => window.open(url, '_blank', 'noopener');

const kulkasScreen = (path) => setScreenTexture(appState.meshes.laykul, path, SCREEN_STYLE.big);
const tvScreen = (path) => setScreenTexture(appState.meshes.layarTv1, path, SCREEN_STYLE.big);
const arcadeScreen = (path) => setScreenTexture(appState.meshes.layararcade1, path, SCREEN_STYLE.arcade);

function resetStations() {
  const { kulkas, tv, arcade } = appState;
  if (kulkas.open) kulkasScreen(SCREEN_TEXTURES.kulkas.cover);
  if (tv.open) tvScreen(SCREEN_TEXTURES.tv.cover);
  if (arcade.open) arcadeScreen(SCREEN_TEXTURES.arcade.cover);
  kulkas.open = false;
  kulkas.activeProject = null;
  tv.open = false;
  arcade.open = false;
}

function goHome() {
  resetStations();
  flyTo(camera, controls, CAMERA_VIEWS.HOME, { free: true });
}

function focusKulkas() {
  if (appState.kulkas.open) return;
  resetStations();
  appState.kulkas.open = true;
  kulkasScreen(SCREEN_TEXTURES.kulkas.menu);
  flyTo(camera, controls, CAMERA_VIEWS.KULKAS);
}

function focusTv() {
  if (appState.tv.open) return;
  resetStations();
  appState.tv.open = true;
  tvScreen(SCREEN_TEXTURES.tv.about);
  flyTo(camera, controls, CAMERA_VIEWS.TV);
}

function focusArcade() {
  resetStations();
  appState.arcade.open = true;
  arcadeScreen(SCREEN_TEXTURES.arcade.credit);
  flyTo(camera, controls, CAMERA_VIEWS.ARCADE);
}

// ─── Router klik ─────────────────────────────────────────────────────────
function handleClick(name) {
  const { kulkas, tv, arcade } = appState;

  // Kulkas: proyek
  if (KULKAS_PROJECTS[name]) {
    click();
    if (!kulkas.open) return focusKulkas();
    kulkas.activeProject = name;
    return kulkasScreen(KULKAS_PROJECTS[name].image);
  }

  // TV: tab
  if (TV_TABS[name]) {
    click();
    if (!tv.open) return focusTv();
    return tvScreen(TV_TABS[name]);
  }

  // TV: sosial media
  if (SOCIAL_LINKS[name]) {
    click();
    if (!tv.open) return focusTv();
    return openUrl(SOCIAL_LINKS[name]);
  }

  switch (name) {
    case 'laykul':
    case 'plan1':
      click();
      return focusKulkas();

    case 'hitbackkulk':
      click();
      if (!kulkas.open) return focusKulkas();
      if (kulkas.activeProject) {
        kulkas.activeProject = null;
        return kulkasScreen(SCREEN_TEXTURES.kulkas.menu);
      }
      return goHome();

    case 'nextresultbox': {
      click();
      if (!kulkas.open) return focusKulkas();
      const project = KULKAS_PROJECTS[kulkas.activeProject];
      if (!project) return;
      return project.url ? openUrl(project.url) : alert(project.message);
    }

    case 'layar1':
    case 'plan3':
      click();
      return focusTv();

    case 'backtvhit':
      click();
      return goHome();

    case 'layararcoren':
      playSound(AUDIO.CREDIT);
      return arcade.open ? goHome() : focusArcade();

    case 'plancredit':
      click();
      return focusArcade();

    case 'planhome':
      click();
      return goHome();

    case 'planarct':
      click();
      return openUrl(ARTICLE_URL);
  }
}

// Tombol Escape → kembali ke home
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && appState.ready && camera) goHome();
});
