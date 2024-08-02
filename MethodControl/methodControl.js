import {
  THREE,
  camera,
  controls,
  gsap
} from "../threeConfig.js"; 
function createVideoTexture(mesh, videoSrc, rotation=1, brightnessFactor=1, layar1Kecil=false) {
// const vertexShaderData=vertexShader
  // Membuat elemen video dan mengatur properti
  let textureVid = document.createElement("video");
  textureVid.src = videoSrc; 
  textureVid.loop = true;    
  textureVid.muted = true;   
  textureVid.play();         

  // Membuat tekstur video dari elemen video
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

function playSound(file, loop = false, volume = 2, playbackRate = 1) {
  const listener = new THREE.AudioListener();
  camera.add(listener);

  const audioLoader = new THREE.AudioLoader();

  audioLoader.load(file, function (buffer) {
    const sound = new THREE.Audio(listener);
    sound.setBuffer(buffer);
    sound.setLoop(loop);
    sound.setVolume(volume);
    sound.playbackRate = playbackRate;
    sound.play();
  });
}
const vertexShaderSource = `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShaderSource = `
  uniform sampler2D emissiveMap;
  uniform float contrast;
  uniform float exposure;
  uniform float emissiveIntensity;
  uniform float brightness;  // Uniform untuk brightness

  varying vec2 vUv;

  void main() {
    vec4 color = texture2D(emissiveMap, vUv);
    color.rgb = ((color.rgb - 0.5) * contrast + 0.5);
    
    // Menerapkan emissiveIntensity
    color.rgb *= emissiveIntensity;
    
    // Menerapkan exposure
    color.rgb *= exposure;

    // Menerapkan brightness
    color.rgb *= brightness;
    
    gl_FragColor = color;
  }
`;
 
function changeTexture(mesh,texturePath, contrastData=1,emissiveIntensityData=0.3,exposureData=1, brightnessData=1) {
  console.log(emissiveIntensityData);
  const loaderTexture = new THREE.TextureLoader();
  loaderTexture.load(texturePath, (texture) => {
    texture.flipY = false;
    const newMaterial = new THREE.ShaderMaterial({
      // emissive: new THREE.Color('#ffffff'),
      // emissiveMap: texture,
      // map:texture
      uniforms: {
        emissiveMap: { value: texture },
        contrast: { value: contrastData }, 
        emissiveIntensity: {value:emissiveIntensityData},
        exposure:{value:exposureData},
        brightness:{value:brightnessData}
        
    },
    vertexShader: vertexShaderSource,
    fragmentShader: fragmentShaderSource

    });
    mesh.material = newMaterial;
  });
}
function setMaterialProperties(materials, transparency = true, opacity = 0) {
  console.log("sssasas", materials);
  if (Array.isArray(materials)) {
    materials.forEach((material) => {
      //   console.log(material);
      if (material) {
        material.transparent = transparency;
        material.opacity = opacity;
      }
    });
    console.log("suuuu");
  } else {
    console.log("basoooooooooooooo");
    if (materials) {
      materials.transparent = transparency;
      materials.opacity = opacity;
    }
  }
}
function animateCamera(cameraEndPosition, targetEndPosition,controlEnabled=true, duration = 3, easing = 'power3.inOut') {
  // Animasi posisi kamera
  if(!controlEnabled){

    controls.enableRotate=false
    controls.enablePan=false
    console.log('in');
  }
    gsap.to(camera.position, {
    x: cameraEndPosition.x,
    y: cameraEndPosition.y,
    z: cameraEndPosition.z,
    duration: duration,
    ease: easing,
    onUpdate: () => {
      camera.lookAt(targetEndPosition.x, targetEndPosition.y, targetEndPosition.z);
      controls.update();
    },
    onComplete: () => {
      if (controlEnabled) {
        controls.enableRotate = true;
        controls.enablePan = true;
        console.log('Controls enabled');
      }
    }
  }); 
  gsap.to(controls.target, {
    x: targetEndPosition.x,
    y: targetEndPosition.y,
    z: targetEndPosition.z,
    duration: duration,
    ease: easing,
    onUpdate: () => {
      controls.update();
    },
    onComplete: () => {
      if (controlEnabled) {
        controls.enableRotate = true;
        controls.enablePan = true;
        console.log('Controls enabled');
      }
    }
  }); 
}
export {createVideoTexture, setMaterialProperties, changeTexture, playSound, animateCamera };
