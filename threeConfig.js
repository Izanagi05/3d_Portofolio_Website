import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

// export {  };
import { gsap } from 'gsap';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const textureLoader = new THREE.TextureLoader();
const controls = new OrbitControls( camera, renderer.domElement);
const loader = new GLTFLoader();
const loaderTexture = new THREE.TextureLoader();
const listener = new THREE.AudioListener();
const sound = new THREE.Audio( listener ); 
const audioLoader = new THREE.AudioLoader();
const raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.001; // Untuk objek type Points
raycaster.precision = 0.001;
const mouse = new THREE.Vector2();
export{THREE, OrbitControls, GLTFLoader,DRACOLoader, gsap, scene ,camera,renderer, controls, loader, loaderTexture,listener, sound, audioLoader, raycaster, mouse, textureLoader}