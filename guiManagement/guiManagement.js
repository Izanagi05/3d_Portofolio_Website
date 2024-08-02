import { GUI } from "dat.gui";
import { THREE, controls } from "../threeConfig";
const gui = new GUI();
const cubeFolder = gui.addFolder("Cube");
function setupMyGui(cube, camera) {
  const satt=cube?.children[0]?.children[0]?.children[72]?.children[0]?.children[0]
  cubeFolder.add(satt.position, "x", 0, 40);
  cubeFolder.add(satt.position, "y", 0, 40);
  cubeFolder.add(satt.position, "z", 0, 40);
  cubeFolder.open();

  const cameraFolder = gui.addFolder("Camera");
  cameraFolder.add(camera.position, "z", 0, 30);
  cameraFolder.add(camera.position, "y", 0, 30);
  cameraFolder.add(camera.position, "z", 0, 30);
  const targetFolder = gui.addFolder("Camera Target");
  const targetPosition = new THREE.Vector3();
  targetFolder
    .add(targetPosition, "x", -30, 30)
    .onChange((value) => (controls.target.x = value));
  targetFolder
    .add(targetPosition, "y", -30, 30)
    .onChange((value) => (controls.target.y = value));
  targetFolder
    .add(targetPosition, "z", -30, 30)
    .onChange((value) => (controls.target.z = value));

  cameraFolder.open();
}
export { setupMyGui };
