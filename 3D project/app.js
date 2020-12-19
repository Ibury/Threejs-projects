
//Variables for setup
let container;
let camera;
let renderer;
let scene;
let dragon;
let plane;
let controls;
let mixer,action;
let mirrorCube, mirrorCubeCamera;
let mirrorSphere, mirrorSphereCamera; // for mirror material
//let forward=false, backward=false;
let left=false, right=false;


//relation models with their animations
const mixers = [];
//control the timing of animations
const clock = new THREE.Clock();


function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();
  const loader2 = new THREE.CubeTextureLoader();
  const texturescene = loader2.load([
    './resources/winter-skyboxes/Backyard/posx.jpg',
    './resources/winter-skyboxes/Backyard/negx.jpg',
    './resources/winter-skyboxes/Backyard/posy.jpg',
    './resources/winter-skyboxes/Backyard/negy.jpg',
    './resources/winter-skyboxes/Backyard/posz.jpg',
    './resources/winter-skyboxes/Backyard/negz.jpg',
  ]);
  scene.background = texturescene;
  //scene.background = new THREE.Color(0x19d7f8);
  const fov = 50;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 2000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(7, 3, 11);


  //Ambient light
  const ambient = new THREE.AmbientLight(0x000000, 2);
  scene.add(ambient);

  //Light
  const light = new THREE.DirectionalLight(0xb5d0d4, 2);
  //const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  scene.add(light);
  //Renderer


  renderer = new THREE.WebGLRenderer();
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  //allow change view with mouse
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.update();

  renderer.setAnimationLoop(() => {

    update();
    render();

  });
  //add plane scene
  let geometry = new THREE.PlaneBufferGeometry(15,15);
  geometry.rotateX(4.7);
  let texture = new THREE.TextureLoader().load('./resources/winter-skyboxes/Backyard/negy.jpg');
  let material = new THREE.MeshBasicMaterial({map:texture, flatShading:true});
  plane = new THREE.Mesh(geometry,material);
  scene.add(plane);
  //Mouse event
  //document.addEventListener('mousedown', onDocumentMouseDown, false);
  //keyboard event
  document.addEventListener('keydown', (e) => onKeyDown(e), false);

  //Mirror cube
  let cubeGeom = new THREE.CubeGeometry(3, 3, 0.5, 1, 1, 1);
  mirrorCubeCamera = new THREE.CubeCamera( 0.1, 2000, 720 );
  // mirrorCubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
  scene.add( mirrorCubeCamera );
  let mirrorCubeMaterial = new THREE.MeshBasicMaterial( { envMap: mirrorCubeCamera.renderTarget } );
  mirrorCube = new THREE.Mesh( cubeGeom, mirrorCubeMaterial );
  mirrorCube.position.set(5,1.5,-5);
  mirrorCubeCamera.position.set(5,1.5,0.1);
  scene.add(mirrorCube);

  //reflect sphere
  let sphereGeom =  new THREE.SphereGeometry( 0.5, 32, 16 ); // radius, segmentsWidth, segmentsHeight
  mirrorSphereCamera = new THREE.CubeCamera( 0.1, 2000, 512 );
  // mirrorCubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
  scene.add( mirrorSphereCamera );
  let mirrorSphereMaterial = new THREE.MeshBasicMaterial( { envMap: mirrorSphereCamera.renderTarget } );
  mirrorSphere = new THREE.Mesh( sphereGeom, mirrorSphereMaterial );
  mirrorSphere.position.set(-5,0.5,5);
  mirrorSphereCamera.position.set(-5,0.5,-3.5);
  scene.add(mirrorSphere);
  //Load dragon Model with it animations
  loadmodel1();
  loadmodel2();
  loadmodel3();

}
  function loadmodel1(){
    let loader = new THREE.GLTFLoader();
    loader.load("./dragon-scale.glb", function(gltf) {
      scene.add(gltf.scene);
      dragon = gltf.scene.children[0];
      //Load and play animations of model
      let animation = gltf.animations[ 1 ];
      mixer = new THREE.AnimationMixer( dragon );
      mixers.push( mixer );

      action = mixer.clipAction( animation );
      action.play();

      scene.add( dragon );

    });
  }
function loadmodel2() {
  let loader = new THREE.GLTFLoader();
  loader.load("./dragon-scale.glb", function (gltf) {
    scene.add(gltf.scene);
    dragon = gltf.scene.children[0];
    dragon.position.set(5,0,5);
    //Load and play animations of model
    let animation = gltf.animations[ 0 ];
    mixer = new THREE.AnimationMixer(dragon);
    mixers.push(mixer);

    action = mixer.clipAction(animation);
    action.play();

    scene.add(dragon);

  });

}
function loadmodel3() {
  let loader = new THREE.GLTFLoader();
  loader.load("./dragon-scale.glb", function (gltf) {
    scene.add(gltf.scene);
    dragon = gltf.scene.children[0];
    dragon.position.set(-5,-1,-5);
    //Load and play animations of model
    let animation = gltf.animations[ 2 ];
    mixer = new THREE.AnimationMixer(dragon);
    mixers.push(mixer);

    action = mixer.clipAction(animation);
    action.play();

    scene.add(dragon);

  });

}
function onKeyDown(event) {
switch (event.keyCode) {
  //case 87: // w
    //forward = true;
    //break;
  case 65: // a
    left = true;
    break;
  //case 83: // s
    //backward = true;
    //break;
  case 68: // d
    right = true;
    break;
  case 38: // up
  case 37: // left
  case 40: // down
  case 39: // right
    break;
}
  /*if (forward) {
  plane.rotation.y+=500;
  }
  if (backward) {
  plane.rotation.y+=500;
  }*/
  if (left) {
  mirrorCube.rotation.y+=500;
  }
  if (right) {
   mirrorCube.rotation.z+=500;
  }
}





/*function onDocumentMouseDown(){
  animate();
}
function animate(){
     mirrorCube.rotation.y+=500;
      mixer = new THREE.AnimationMixer(dragon);
      mixers.push(mixer);
      action = mixer.clipAction(animation1);
      action.play();
      render();

}
*/
function update() {

  const delta = clock.getDelta();

  for ( const mixer of mixers ) {

    mixer.update( delta );

  }

}

function render() {
  mirrorCube.visible = false;
  mirrorCubeCamera.updateCubeMap( renderer, scene );
  mirrorCube.visible = true;
  mirrorSphere.visible = false;
  mirrorSphereCamera.updateCubeMap( renderer, scene );
  mirrorSphere.visible = true;
  renderer.render( scene, camera );
}

init();

//adapt window size
function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
