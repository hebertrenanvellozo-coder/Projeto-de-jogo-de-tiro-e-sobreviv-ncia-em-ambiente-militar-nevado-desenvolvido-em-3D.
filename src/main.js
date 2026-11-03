
import * as THREE from 'three';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x9eb8ca);
scene.fog = new THREE.Fog(0x9eb8ca, 100, 900);

const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);

camera.position.set(0, 55, 110);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

document.body.style.margin = '0';
document.body.style.overflow = 'hidden';
document.body.appendChild(renderer.domElement);

const ambient = new THREE.HemisphereLight(
  0xffffff,
  0x65717d,
  2
);
scene.add(ambient);

const sun = new THREE.DirectionalLight(0xffffff, 3);
sun.position.set(-100, 150, 80);
sun.castShadow = true;
scene.add(sun);

// Solo nevado
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(1000, 1000),
  new THREE.MeshStandardMaterial({
    color: 0xe8f0f5,
    roughness: 1
  })
);

ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Terreno montanhoso
function createMountain(x, z, height, radius) {
  const geometry = new THREE.ConeGeometry(
    radius,
    height,
    7
  );

  const material = new THREE.MeshStandardMaterial({
    color: 0xdce6ed,
    roughness: 1,
    flatShading: true
  });

  const mountain = new THREE.Mesh(geometry, material);

  mountain.position.set(x, height / 2 - 5, z);
  mountain.castShadow = true;
  mountain.receiveShadow = true;

  scene.add(mountain);
}

// Montanhas ao redor do vale
createMountain(-180, -180, 130, 100);
createMountain(0, -240, 180, 130);
createMountain(190, -180, 140, 110);
createMountain(-240, 100, 160, 120);
createMountain(240, 100, 150, 110);
createMountain(-150, 240, 120, 100);
createMountain(150, 250, 170, 120);

// Área central reservada para a base
const baseArea = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({
    color: 0xf5f7fa,
    roughness: 1
  })
);

baseArea.rotation.x = -Math.PI / 2;
baseArea.position.y = 0.15;
scene.add(baseArea);

// Animação
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// Ajuste de tela
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
