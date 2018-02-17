import _ from "lodash"
import $ from "jquery"

function drawCanvas() {
  const clock = new THREE.Clock();

  const renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const wrapper = document.querySelector('.wrapper');
  const canvas = renderer.domElement;
  wrapper.appendChild(canvas);

  // meshやlight, cameraなどシーン管理に用いる
  // createjsのstageにあたる
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);


  // cameraを作る
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(200, 300, 500);
  scene.add(camera);

  // OrbitControlsの設定
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.rotateUp(Math.PI / 4);
  controls.target.set(
    camera.position.x + 0.1,
    camera.position.y,
    camera.position.z
  );
  controls.noZoom = true;
  controls.noPan = true;

  // lightの設定
  // DirectionalLight ... 平行光源
  // AmbientLight ... 環境光。全体の明るさを決める
  const light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0xffffff, .4);
  scene.add(ambientLight);

  // 座標軸を表示
  const axes = new THREE.AxisHelper(2500);
  scene.add(axes);

  // 準備が整ったらアニメーションループ開始
  onWindowResize();
  window.addEventListener('resize', onWindowResize);
  requestAnimationFrame(tick);

  // resize処理
  // cameraとrendererの２つを更新する必要がある
  function onWindowResize() {
    const width = wrapper.offsetWidth;
    const height = wrapper.offsetHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  // animation loop
  function tick() {
    renderer.setClearColor(0xaabbcc, 1.0);
    renderer.render(scene, camera);
    controls.update();

    requestAnimationFrame(tick);
  }
}

  drawCanvas()