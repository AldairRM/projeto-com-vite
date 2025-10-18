import './style.css'
import * as THREE from 'three';

//CAMERA, CENA E RENDERIZADOR

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render (scene, camera);



//ROSCA:

const geometry = new THREE.TorusGeometry (10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true} );
//misturando os dois temo o torus:
const torus = new THREE.Mesh(geometry, material );

torus.position.z = -7;
// torus.position.x = 2;

scene.add(torus);



//ILUMINAÇÃO

//point light, é como lampada no escuro.
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
//ambient light, ilumina todos os objetos igualmente, deixando tudo bem visível.
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);



// Avatar

const aldairTexture = new THREE.TextureLoader().load('aldair.png');
const aldair = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: aldairTexture }));
scene.add(aldair);



// lua

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
// const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    // normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);


aldair.position.z = -5;
aldair.position.x = 2;



//HELPERS

//light helper, ajuda a encontrar o pointlight:
// const lightHelper = new THREE.PointLightHelper(pointLight);
//outro tipo de helper:
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper,gridHelper);



//CASO QUEIRA CONTROLAR A CAMERA DESCOMENTAR A SEGUINTE LINHA, E O UPDATE NA ANIMAÇÃO:
//const controls = new OrbitControls(camera, renderer.domElement);



//BACKGROUND

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;



//ANIMAÇÃO

function animate() 
{
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // controls.update();
  renderer.render(scene,camera);
}
animate();


//ESTRELAS

function addStars()
{
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread (100));

  star.position.set(x,y,z);
  
  scene.add(star);
}
Array(200).fill().forEach(addStars);



// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  aldair.rotation.y += 0.01;
  aldair.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();
