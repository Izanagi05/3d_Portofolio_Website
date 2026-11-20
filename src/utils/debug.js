import { GUI } from 'dat.gui';

export function setupDebugGui(camera, controls) {
  const gui = new GUI();
  const cameraFolder = gui.addFolder('Camera Position');
  cameraFolder.add(camera.position, 'x', -50, 50, 0.01);
  cameraFolder.add(camera.position, 'y', -50, 50, 0.01);
  cameraFolder.add(camera.position, 'z', -50, 50, 0.01);

  const targetFolder = gui.addFolder('Camera Target');
  targetFolder.add(controls.target, 'x', -50, 50, 0.01);
  targetFolder.add(controls.target, 'y', -50, 50, 0.01);
  targetFolder.add(controls.target, 'z', -50, 50, 0.01);

  return gui;
}
