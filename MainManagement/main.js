
import { THREE,scene, camera, renderer, controls , listener, gsap, targetPosition} from '../threeConfig.js'
import MethodControl  from '../MethodControl/methodControl.js'; 
import EventBoxHit from '../eventController/eventBoxHit.js'
import MeshManagement from '../meshManagement/meshManagement.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
// import Stats from 'https://cdnjs.cloudflare.com/ajax/libs/stats.js/r17/Stats.min.js'; 
class ThreeScene{
constructor(){
  this.scene =scene
  this.camera = camera
  this.renderer = renderer
  this.listener = listener
  this.targetPosition = targetPosition
  this.controls = controls;
  this.meshes = null;
  this.eventBoxHit = new EventBoxHit()
  this.meshManagement = new MeshManagement()
  this.methodControl = new MethodControl()
  // this.cameraInfoElement= null;
  // this.cameraInfoElement2= null;
  this.satelit = this.meshes?.children[0]?.children[0]?.children[72]?.children[0]?.children[0];
  this.fanBlade = this.meshes?.children[0]?.children[0]?.children[1]?.children[1];
  this.composer = null; 
  this.z=null
  this.bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,  // Strength
    0.4,  // Radius
    0.85  // Threshold
  );
  window.addEventListener('mousedown', ()=>{
    this.z=this.camera.position.z;
})
  this.initRenderer(); 
  this.initComposerBloom();
  this.initCamControls();
  this.loadMeshes()
}
initShowPanel(){
  
  this.stats.showPanel(0); 
  document.body.appendChild(this.stats.dom);
} 
initRenderer(){
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(this.renderer.domElement); 
  window.addEventListener('resize', ()=>{
    this.camera.aspect= window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  })
}
initComposerBloom(){

  this.composer = new EffectComposer(this.renderer);
  this.composer.addPass(new RenderPass(this.scene, this.camera));
  this.composer.addPass(this.bloomPass);
  this.bloomPass.strength = 0.6; 
  this.bloomPass.radius = 0.8;  
  this.bloomPass.threshold = 0; 
}   
initCamControls(){

  this.camera.position.set(-1.70, 14.16, -20.30);
  // console.log('posisi',this.camera);
  
  this.controls.enableDamping = true;
  // controls.enablePan = false;
  this.controls.dampingFactor = 0.04;
  this.controls.minDistance = 10;  
  this.controls.maxDistance = 30;
  this.controls.screenSpacePanning = false;
  // const cameraInfoElement = document.getElementById('camera-info');
  // const cameraInfoElement2 = document.getElementById('camera-info2');
  // controls.addEventListener('change', ()=>{
  // cameraInfoElement.textContent = `Camera Position: (x: ${this.camera.position.x.toFixed(2)},y: ${this.camera.position.y.toFixed(2)}, z: ${camera.position.z.toFixed(2)})`;
  // cameraInfoElement2.textContent = `Camera Target: (x: ${this.controls.target.x.toFixed(2)}, y: ${this.controls.target.y.toFixed(2)}, z: ${this.controls.target.z.toFixed(2)})`;
  // });

} 
loadMeshes(){
this.meshManagement?.loadMesh(this.scene, this.camera, (loadedMeshes) => {
  console.log('ini meshes', loadedMeshes);
  this.meshes = loadedMeshes;
    this.camera.add(this.listener)
 
    this.eventBoxHit?.loadMeshesDataBeforeClick(this.meshes);
        this.eventBoxHit?.onMouseClick(this.meshes, this.controls); 
    this.render();
    this.controls.enableRotate=false
    this.controls.enablePan=false
    this.methodControl?.playSound('audio/startsound.mp3')
    gsap.to(this.camera.position,
        // {x: -1.70, y:  14.16, z:  -20.30 }, 
       
        {
          x: -13.72,y: 6.83, z: 20.12,
          duration: 3,
          onUpdate: () => { 
            this.camera.lookAt(0, 4, 0);
          },
        onComplete:()=>{
          this.controls.enableRotate=true
          this.controls.enablePan=true
        },
        
      })
    gsap.to(this.controls.target,
        // {x: -1.70, y:  14.16, z:  -20.30 }, 
       
        {
          x: -0.08, y: 7.80, z: -1.22,
          duration: 3,
          onUpdate: () => { 
            this.camera.lookAt(0, 4, 0);
          },
        onComplete:()=>{
          this.controls.enableRotate=true
          this.controls.enablePan=true
        },
        
      })
      this.methodControl?.playSound('audio/walk.mp3',true)
// camera.lookAt(90,9,2)
});
}
  
render() {
  // this.stats.begin();  
  // this.stats.update();
  requestAnimationFrame(() => this.render());  

  if (this.satelit) { 
    this.satelit.rotation.y += 0.03;  
  }
  if (this.fanBlade) { 
    this.fanBlade.rotation.y += 0.05;  
  }
  this.controls.update();
  this.composer.render(); 
}
}
export default ThreeScene
