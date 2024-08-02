
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { GLTFLoader } from 'https://unpkg.com/three@0.128.0/examples/js/loaders/GLTFLoader.js';
import { THREE,scene, camera, renderer, controls , listener, gsap} from '../threeConfig.js'
import { playSound } from '../MethodControl/methodControl.js';
// import {setupMyGui} from '../guiManagement/guiManagement.js'
import {onMouseClick, loadMeshesDataBeforeClick} from '../eventController/eventBoxHit.js'
import { loadMesh } from '../meshManagement/meshManagement.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import Stats from 'https://cdnjs.cloudflare.com/ajax/libs/stats.js/r17/Stats.min.js';




// const loader = new GLTFLoader();

const stats = new Stats();
stats.showPanel(0); // 0: FPS, 1: MS, 2: Memory
document.body.appendChild(stats.dom);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); 
window.addEventListener('resize', function(){
  camera.aspect= window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
})
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,  // Strength
  0.4,  // Radius
  0.85  // Threshold
);
composer.addPass(bloomPass);
bloomPass.strength = 0.6; 
bloomPass.radius = 0.8;  
bloomPass.threshold = 0;

// const axesHelper = new THREE.AxesHelper(50); // 5 adalah panjang sumbu
// scene.add(axesHelper); 
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xFF7E2F, 1);
// directionalLight.position.set(5, 10, 7.5);

let z 
window.addEventListener('mousedown', function(){
    z=camera.position.z;
})
function animate(){
   
}
camera.position.set(-1.70, 14.16, -20.30);
// controls.update();
// controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.04;
controls.minDistance = 10;  // Jarak minimum dari kamera ke target
controls.maxDistance = 30;
controls.screenSpacePanning = false;
// controls.minDistance = 1;
// controls.maxDistance = 30;

var meshes=null 
// Setup EffectComposer
loadMesh(scene, camera, async function(loadedMeshes) {
    meshes = loadedMeshes; 
    camera.add(listener)
 
    loadMeshesDataBeforeClick(meshes);
   
        onMouseClick(meshes, controls); 
    render();
    controls.enableRotate=false
    controls.enablePan=false
    playSound('audio/startsound.mp3')

    gsap.to(camera.position,
        // {x: -1.70, y:  14.16, z:  -20.30 }, 
       
        {
          x: -8.76,  
          y:6.02,  
          z:  14.93, 
          duration: 3,
          onUpdate: () => { 
            camera.lookAt(0, 4, 0);
          },
        onComplete:()=>{
          controls.enableRotate=true
          controls.enablePan=true
        },
        
      })
      playSound('audio/walk.mp3',true)
// camera.lookAt(90,9,2)
});
 

// Render loop
let cameraLookAtPosition = new THREE.Vector3();
// camera.getWorldDirection(cameraLookAtPosition);
function updateCameraInfo() {
    const cameraInfoElement = document.getElementById('camera-info');
    const cameraInfoElement2 = document.getElementById('camera-info2');
    cameraInfoElement.textContent = `Camera Position: (x: ${camera.position.x.toFixed(2)},y: ${camera.position.y.toFixed(2)}, z: ${camera.position.z.toFixed(2)})`;
    cameraInfoElement2.textContent = `Camera Target: (x: ${controls.target.x.toFixed(2)}, y: ${controls.target.y.toFixed(2)}, z: ${controls.target.z.toFixed(2)})`;

 
  }
  let angle = 0; // Sudut rotasi
const amplitude = Math.PI * 90; // Amplitudo rotasi (360 derajat dalam radian)
const frequency = 0.02;
async function render() {
  stats.begin(); // Mulai pengukuran

  // Pantau performa
  stats.update();
    requestAnimationFrame(render);
    // z+=0.1
    // if(z<zFinal){
        //         camera.position.z=z
    // }
    angle =  Math.sin(1 * 0.5 * 0.001) *.4 - Math.PI *.2
    const satelit = meshes?.children[0]?.children[0]?.children[72]?.children[0]?.children[0];
    const fanBlade = meshes?.children[0]?.children[0]?.children[1]?.children[1];
    if (satelit) {
      // Rotasi kipas di sekitar sumbu Y
      satelit.rotation.y += 0.03; // Sesuaikan kecepatan rotasi sesuai kebutuhan
    }
    if (fanBlade) {
      // Rotasi kipas di sekitar sumbu Y
      fanBlade.rotation.y += 0.05; // Sesuaikan kecepatan rotasi sesuai kebutuhan
    }
  
    controls.update()
    // renderer.render(scene, camera);
    composer.render();
    
   
    // updateCameraInfo()
}
// camera.position.z = 8;

render();
