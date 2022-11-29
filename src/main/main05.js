import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 用Clock对象跟踪时间

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
});
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 缩放
// cube.scale.set(3, 2, 1);

// 旋转
// cube.rotation.set(Math.PI / 4, 0, 0);
// cube.rotation.set(0, Math.PI / 4, 0);
// cube.rotation.set(0, 0, Math.PI / 4);

// 将几何体添加到场景当中
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 将webgl渲染的canvas添加到body
document.body.appendChild(renderer.domElement);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置时钟
const clock = new THREE.Clock();

function render() {
  // 获取时钟运行的总时长
  const time = clock.getElapsedTime();
  // 获取间隔时间
  const deltaTime = clock.getDelta();

  // console.log("时钟运行的总时长", time);
  // console.log("两次获取时间的间隔时间", deltaTime);

  // 使用渲染器，通过相机将场景渲染进来
  const t = time % 5;
  cube.position.x = t * 1;
  cube.rotation.x = t * 1;

  renderer.render(scene, camera);

  window.requestAnimationFrame(render);
}

render();
