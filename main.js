import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const loader = new THREE.TextureLoader()
scene.background = loader.load('./centrale.jpeg')
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls( camera, renderer.domElement );

// core
createNucleon(0, -10, 0, 0x00ff00)
createNucleon(0, 10, 0, 0x00ff00)
createNucleon(-10, 0, 0, 0x0000ff)
createNucleon(10, 0, 0, 0x0000ff)
createNucleon(0, 0, -10, 0xff0000)
createNucleon(0, 0, 10, 0xff0000)


var electrons = []

// electron
function generateElectrons() {
  for(var i = 0; i < 4; i++) {
    var electronGeometry = new THREE.SphereGeometry(2, 16, 8)
    var electronMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff })
    var electron = new THREE.Mesh(electronGeometry, electronMaterial)
    electron.position.x = 0
    scene.add(electron)
    electrons.push(electron)
  }
}

generateElectrons()

console.log(electrons)

function startPoint() {
  var startPoint = [-30, 30]
  var min = 0
  var max = 1
  var startRandom = Math.floor(Math.random() * (max - min + 1) + min)
  return startPoint[startRandom]
}

function operator() {
  var operator = ["sin", "cos"]
  var min = 0
  var max = 1
  var operatorRandom = Math.floor(Math.random() * (max - min + 1) + min)
  return operator[operatorRandom]
}

electrons = electrons.map(function(electron) {
  return {
    electron: electron,
    x: {
      start: startPoint(),
      operator: operator()
    },
    y: {
      start: startPoint(),
      operator: operator()
    },
    z: {
      start: startPoint(),
      operator: operator()
    }
  }
})

console.log(electrons)

// var startPoint = [-30, 30]
// var operator = ["sin", "cos"]
// var min = 0
// var max = 1

// var startRandom = Math.floor(Math.random() * (max - min + 1) + min)
// var operatorRandom = Math.floor(Math.random() * (max - min + 1) + min)

// e.position.x = startPoint[startRandom] * Math[operator[operatorRandom]](t) + 0
// e.position.y = startPoint[startRandom] * Math[operator[operatorRandom]](t) + 0
// e.position.z = startPoint[startRandom] * Math[operator[operatorRandom]](t) + 0



// earth.position.z = 20*Math.sin(t) + 0

camera.position.z = 200

controls.update()

var t = 0

function animate() {
  console.log("hello")
	requestAnimationFrame(animate)
  controls.update()
  t += 0.1
  
  electrons.forEach(function(e) {
    e.electron.position.x = e.x.start * Math[e.x.operator](t)
    e.electron.position.y = e.y.start * Math[e.y.operator](t)
    e.electron.position.z = e.z.start * Math[e.z.operator](t)
  })

	renderer.render(scene, camera)
}

animate()

function createNucleon(x, y, z, color) {
  const coreGeometry = new THREE.SphereGeometry(10, 32, 16)
  const coreMaterial = new THREE.MeshBasicMaterial({ color: color })
  const core = new THREE.Mesh(coreGeometry, coreMaterial)
  core.position.x = x
  core.position.y = y
  core.position.z = z
  scene.add(core)
}

function trajectory(e, t) {
  var startPoint = [-30, 30]
  var operator = ["sin", "cos"]
  var min = 0
  var max = 1

  var startRandom = Math.floor(Math.random() * (max - min + 1) + min)
  var operatorRandom = Math.floor(Math.random() * (max - min + 1) + min)

  e.position.x = startPoint[startRandom] * Math[operator[operatorRandom]](t) + 0
  e.position.y = startPoint[startRandom] * Math[operator[operatorRandom]](t) + 0
  e.position.z = startPoint[startRandom] * Math[operator[operatorRandom]](t) + 0
}