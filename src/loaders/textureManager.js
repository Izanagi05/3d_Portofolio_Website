import * as THREE from 'three';

let textureLoader = new THREE.TextureLoader();
let maxAnisotropy = 4;
const cache = new Map(); // path → Promise<Texture>

export function initTextureLoader(manager, renderer) {
  textureLoader = new THREE.TextureLoader(manager);
  if (renderer) {
    maxAnisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  }
}

export function loadTexture(path) {
  if (!cache.has(path)) {
    cache.set(
      path,
      textureLoader.loadAsync(path).then((tex) => {
        tex.flipY = false;
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.anisotropy = maxAnisotropy;
        return tex;
      })
    );
  }
  return cache.get(path);
}

export const preloadTextures = (paths) => Promise.all([...new Set(paths)].map(loadTexture));

// Shader layar: rumus asli user (tanpa pow 2.2 agar layar tidak gelap)
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const screenFragment = /* glsl */ `
  uniform sampler2D map;
  uniform float contrast;
  uniform float exposure;
  uniform float emissiveIntensity;
  uniform float brightness;
  varying vec2 vUv;
  void main() {
    vec4 color = texture2D(map, vUv);
    color.rgb = ((color.rgb - 0.5) * contrast + 0.5);
    color.rgb *= emissiveIntensity;
    color.rgb *= exposure;
    color.rgb *= brightness;
    gl_FragColor = color;
  }
`;

const videoFragment = /* glsl */ `
  uniform sampler2D map;
  uniform float rotation;
  uniform float brightness;
  varying vec2 vUv;
  void main() {
    vec2 centeredUv = vUv - vec2(0.5, 0.5);
    float cosRot = cos(rotation);
    float sinRot = sin(rotation);
    vec2 rotatedUv = vec2(
      centeredUv.x * cosRot - centeredUv.y * sinRot,
      centeredUv.x * sinRot + centeredUv.y * cosRot
    );
    vec4 color = texture2D(map, rotatedUv + vec2(0.5, 0.5));
    gl_FragColor = vec4(color.rgb * brightness, color.a);
  }
`;

/**
 * Pasang/ganti gambar di layar. Material dibuat SEKALI per mesh, setelahnya
 * hanya uniform & texture yang diganti → tidak ada stutter kompilasi shader.
 */
export function setScreenTexture(mesh, path, style = {}) {
  if (!mesh) return;

  let mat = mesh.userData.screenMaterial;
  if (!mat) {
    mat = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: null },
        contrast: { value: 1 },
        emissiveIntensity: { value: 0.3 },
        exposure: { value: 1 },
        brightness: { value: 1 },
      },
      vertexShader,
      fragmentShader: screenFragment,
    });
    mesh.userData.screenMaterial = mat;
    mesh.material = mat;
  }

  const brightness = style.brightness ?? 1;
  mat.uniforms.contrast.value = style.contrast ?? 1;
  mat.uniforms.emissiveIntensity.value = style.emissiveIntensity ?? 0.3;
  mat.uniforms.exposure.value = style.exposure ?? 1;
  mat.uniforms.brightness.value = brightness;
  mesh.userData.baseBrightness = brightness;
  mesh.userData.currentPath = path;

  loadTexture(path).then((tex) => {
    if (mesh.userData.currentPath === path) mat.uniforms.map.value = tex;
  });
}

export function setVideoTexture(mesh, src, { rotation = 0, brightness = 1 } = {}) {
  if (!mesh) return null;

  const video = Object.assign(document.createElement('video'), {
    src,
    loop: true,
    muted: true,
    playsInline: true,
    preload: 'metadata',
  });

  const texture = new THREE.VideoTexture(video);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;

  mesh.material = new THREE.ShaderMaterial({
    uniforms: {
      map: { value: texture },
      rotation: { value: rotation },
      brightness: { value: brightness },
    },
    vertexShader,
    fragmentShader: videoFragment,
  });

  return video;
}
