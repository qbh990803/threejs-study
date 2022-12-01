import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

// 根据尺寸变化实现自适应动画

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
// 设置控制器阻尼，让控制器更有真实效果
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置动画
const animate1 = gsap.to(cube.position, {
  x: 5,
  duration: 5,
  ease: "power1.inOut",
  // 重复次数， 无限循环-1
  repeat: -1,
  // 往返运动
  yoyo: true,
  // 延迟时间
  delay: 2,
  onStart: () => {
    console.log("动画开始");
  },
  onComplete: () => {
    console.log("动画完成");
  },
});
gsap.to(cube.rotation, {
  x: 2 * Math.PI,
  duration: 5,
  ease: "power1.inOut",
  // 重复次数， 无限循环-1
  repeat: -1,
  // 往返运动
  yoyo: true,
});

window.addEventListener("dblclick", () => {
  // console.log("animation", animate1);
  if (animate1.isActive()) {
    // 暂停
    animate1.pause();
  } else {
    // 恢复
    animate1.resume();
  }
});

function render() {
  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(render);
}

render();

// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  // console.log("画面变化了");

  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机投影矩阵
  camera.updateProjectionMatrix();

  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
