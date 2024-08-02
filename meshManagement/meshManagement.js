// meshLoader.js
import { GLTFLoader, THREE, DRACOLoader } from "../threeConfig.js";
import { setupMyGui } from "../guiManagement/guiManagement.js"; 

export function loadMesh(scene, camera, onMeshLoaded) { 

const dracoLoader = new DRACOLoader();
const loader = new GLTFLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
  loader.setDRACOLoader(dracoLoader);
  loader.load(
    "final7.gltf",
    function (gltf) {
      const meshes = gltf?.scene;
      console.log(meshes?.children[0]?.children[0]?.children[11].material);
      scene.add(meshes);
      // meshes.forEach(mesh => scene.add(mesh))
      console.log("satet", meshes?.children[0]?.children[0]?.children);
      meshes?.children[0]?.children[0]?.children[72]?.children[0]?.children[0].position.set(1.15, 1.3,0.53)
      
      // setupMyGui(meshes, camera);
      if (onMeshLoaded) {
        onMeshLoaded(meshes); // Memanggil callback dengan parameter cube
      }
      // composer.render();
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}
