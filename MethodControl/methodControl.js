import { THREE, camera, controls, gsap } from "../threeConfig.js"; 

class MethodControl {
  constructor() {
    this.camera = camera;
    this.controls = controls;
    this.gsap = gsap;
  }

  createVideoTexture(mesh, videoSrc, rotation = 1, brightnessFactor = 1, layar1Kecil = false) {
    let textureVid = document.createElement("video");
    textureVid.src = videoSrc; 
    textureVid.loop = true;    
    textureVid.muted = true;   
    textureVid.play();         

    let videoTexture = new THREE.VideoTexture(textureVid);
    videoTexture.format = THREE.RGBFormat;
    videoTexture.minFilter = THREE.NearestFilter;
    videoTexture.magFilter = THREE.NearestFilter;
    videoTexture.generateMipmaps = false; 

    let material = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: videoTexture },
        rotation: { value: rotation },
        brightness: { value: brightnessFactor }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
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
      `
    });
    mesh.material = material; 
  }

  playSound(file, loop = false, volume = 2, playbackRate = 1) {
    const listener = new THREE.AudioListener();
    this.camera.add(listener);

    const audioLoader = new THREE.AudioLoader();

    audioLoader.load(file, (buffer) => {
      const sound = new THREE.Audio(listener);
      sound.setBuffer(buffer);
      sound.setLoop(loop);
      sound.setVolume(volume);
      sound.playbackRate = playbackRate;
      sound.play();
    });
  }

  changeTexture(mesh, texturePath, contrastData = 1, emissiveIntensityData = 0.3, exposureData = 1, brightnessData = 1) {
    const loaderTexture = new THREE.TextureLoader();
    loaderTexture.load(texturePath, (texture) => {
      texture.flipY = false;
      const newMaterial = new THREE.ShaderMaterial({
        uniforms: {
          emissiveMap: { value: texture },
          contrast: { value: contrastData }, 
          emissiveIntensity: { value: emissiveIntensityData },
          exposure: { value: exposureData },
          brightness: { value: brightnessData }
        },
        vertexShader: `
          varying vec2 vUv;

          void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D emissiveMap;
          uniform float contrast;
          uniform float exposure;
          uniform float emissiveIntensity;
          uniform float brightness;
          varying vec2 vUv;

          void main() {
            vec4 color = texture2D(emissiveMap, vUv);
            color.rgb = ((color.rgb - 0.5) * contrast + 0.5);
            color.rgb *= emissiveIntensity;
            color.rgb *= exposure;
            color.rgb *= brightness;
            gl_FragColor = color;
          }
        `
      });
      mesh.material = newMaterial;
    });
  }

  setMaterialProperties(materials, transparency = true, opacity = 0) {
    if (Array.isArray(materials)) {
      materials.forEach((material) => {
        if (material) {
          material.transparent = transparency;
          material.opacity = opacity;
        }
      });
    } else {
      if (materials) {
        materials.transparent = transparency;
        materials.opacity = opacity;
      }
    }
  }

  animateCamera(cameraEndPosition, targetEndPosition, controlEnabled = true, duration = 3, easing = 'power3.inOut') {
    if (!controlEnabled) {
      this.controls.enableRotate = false;
      this.controls.enablePan = false;
    }
    this.gsap.to(this.camera.position, {
      x: cameraEndPosition.x,
      y: cameraEndPosition.y,
      z: cameraEndPosition.z,
      duration: duration,
      ease: easing,
      onUpdate: () => {
        this.camera.lookAt(targetEndPosition.x, targetEndPosition.y, targetEndPosition.z);
        this.controls.update();
      },
      onComplete: () => {
        if (controlEnabled) {
          this.controls.enableRotate = true;
          this.controls.enablePan = true;
        }
      }
    });
    this.gsap.to(this.controls.target, {
      x: targetEndPosition.x,
      y: targetEndPosition.y,
      z: targetEndPosition.z,
      duration: duration,
      ease: easing,
      onUpdate: () => {
        this.controls.update();
      },
      onComplete: () => {
        if (controlEnabled) {
          this.controls.enableRotate = true;
          this.controls.enablePan = true;
        }
      }
    });
  }
}

export default MethodControl;
