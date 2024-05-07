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

//de_castelijau
function de_castelijau(t, controls){
	const beta = controls;
	const n = 3;
	for (let i = 1; i < n; i++){
		for (let j = 0; j < (n - i); j++){
			//vectorの成分ごとに計算する
			// console.log(i,j);
			beta[j][0] = beta[j][0] * (1 -t) + (beta[j + 1][0]) * t;
			beta[j][1] = beta[j][1] * (1 -t) + (beta[j + 1][1]) * t;
			// console.log(beta);
		}
	}
	return beta[0]
}

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

	//de Casteljau
	const points = []
	for (let t = 0; t <=1; t+=0.1){
		const p = de_castelijau(t, [[p1x,p1y],[p2x,p2y],[p3x,p3y]]);
		const p_vector = new THREE.Vector2(p[0],p[1]);
		points.push(p_vector);
	}
    	
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


