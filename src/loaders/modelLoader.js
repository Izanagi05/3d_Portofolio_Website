import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import {
  MODEL_PATH,
  DRACO_DECODER_PATH,
  TRANSPARENT_HITBOX_NAMES,
  HITBOX_NAMES,
  SCREEN_NAMES,
  SPINNERS,
} from '../config/constants.js';
import {
  SCREEN_TEXTURES,
  SCREEN_STYLE,
  SMALL_SCREENS,
  VIDEO_SCREENS,
} from '../config/portfolioData.js';
import { setScreenTexture, setVideoTexture } from './textureManager.js';
import { appState } from '../state/appState.js';

export async function loadPortfolioModel(scene, manager) {
  const draco = new DRACOLoader(manager).setDecoderPath(DRACO_DECODER_PATH);
  const loader = new GLTFLoader(manager).setDRACOLoader(draco);

  const gltf = await loader.loadAsync(MODEL_PATH);
  const root = gltf.scene;
  draco.dispose();

  // Optimasi: model statis → matikan update matrix otomatis
  root.traverse((obj) => {
    obj.matrixAutoUpdate = false;
    obj.updateMatrix();
  });

  const get = (name) => root.getObjectByName(name);

  // Objek berputar (butuh matrix update tiap frame)
  appState.spinners = SPINNERS.map(({ name, speed }) => ({ object: get(name), speed })).filter(
    (s) => s.object
  );
  appState.spinners.forEach(({ object }) => (object.matrixAutoUpdate = true));

  const dish = get('Cylinder.004');
  dish?.position.set(1.15, 1.3, 0.53);

  // Persis setMaterialProperties versi awal user:
  // ubah transparent=true, opacity=0 langsung pada material asli hitbox
  TRANSPARENT_HITBOX_NAMES.forEach((name) => {
    const mat = get(name)?.material;
    if (!mat) return;
    if (Array.isArray(mat)) {
      mat.forEach((m) => {
        if (m) {
          m.transparent = true;
          m.opacity = 0;
        }
      });
    } else {
      mat.transparent = true;
      mat.opacity = 0;
    }
  });

  // Layar utama (persis setelan awal user)
  appState.meshes.laykul = get('laykul');
  appState.meshes.layarTv1 = get('layar1');
  appState.meshes.layararcade1 = get('layararcoren');

  setScreenTexture(appState.meshes.laykul, SCREEN_TEXTURES.kulkas.cover, SCREEN_STYLE.big);
  setScreenTexture(appState.meshes.layarTv1, SCREEN_TEXTURES.tv.cover, SCREEN_STYLE.big);
  setScreenTexture(appState.meshes.layararcade1, SCREEN_TEXTURES.arcade.cover, SCREEN_STYLE.arcade);

  SMALL_SCREENS.forEach(({ name, path, emissiveIntensity }) =>
    setScreenTexture(get(name), path, {
      ...SCREEN_STYLE.small,
      ...(emissiveIntensity && { emissiveIntensity }),
    })
  );

  const videos = VIDEO_SCREENS.map(({ name, path, rotation, brightness }) =>
    setVideoTexture(get(name), path, { rotation, brightness })
  ).filter(Boolean);

  appState.interactiveObjects = [...HITBOX_NAMES, ...SCREEN_NAMES].map(get).filter(Boolean);

  scene.add(root);
  return { root, videos };
}
