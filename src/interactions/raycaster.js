import * as THREE from 'three';

// Setelan raycaster persis versi awal user (threeConfig.js & eventBoxHit.js)
const raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.001;
raycaster.precision = 0.001;

const mouse = new THREE.Vector2();
const POINTER_OFFSET_Y = 2;

export function pick(clientX, clientY, camera, targets) {
  if (!targets.length) return null;

  mouse.x = (clientX / window.innerWidth) * 2 - 1;
  mouse.y = -((clientY - POINTER_OFFSET_Y) / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(targets);
  return intersects.length > 0 ? intersects[0].object : null;
}
