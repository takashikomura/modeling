import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(750, 500);
document.body.appendChild(renderer.domElement);

//軸を追加する
const axes = new THREE.AxesHelper(20);
scene.add(axes);

//buttonにイベントを追加する
const bt = document.querySelector("button")
bt.addEventListener("click",() => {

		
	const p1x = parseInt(document.querySelector("#p1-x").value)
	const p1y = parseInt(document.querySelector("#p1-y").value)
	let p1 = new THREE.Vector2(p1x, p1y);

	const p2x = parseInt(document.querySelector("#p2-x").value)
	const p2y = parseInt(document.querySelector("#p2-y").value)
	let p2 = new THREE.Vector2(p2x, p2y);

	const p3x = parseInt(document.querySelector("#p3-x").value)
	const p3y = parseInt(document.querySelector("#p3-y").value)
	let p3 = new THREE.Vector2(p3x, p3y);

	//パラメータを等間隔でサンプリングする
	const points = []
	points.push(p1);
	for (let t = 0; t <=1; t+=0.1){
		const p_x = ((1 - t) ** 2) * p1x + 2 * t * (1 - t) * p2x + (t ** 2) * p3x;
		const p_y = ((1 - t) ** 2) * p1y + 2 * t * (1 - t) * p2y + (t ** 2) * p3y;
		const p = new THREE.Vector2(p_x, p_y);
		points.push(p);
	}
	points.push(p3);

	const geometry = new THREE.BufferGeometry().setFromPoints(points);
	const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
	const curveObject = new THREE.Line(geometry, material);
	scene.add(curveObject);

	function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	}

	animate();

	const canvas = document.querySelector("canvas");
	console.log(canvas)
})


