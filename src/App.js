import './App.css';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment, OrbitControls, useCubeTexture } from '@react-three/drei';
import { CubeTextureLoader, TextureLoader } from 'three';

function Scene() {
  const [jupiterMap] = useLoader(TextureLoader, ['RSStexture/JupiterColor.jpg'])
  const [ioMap, ioNormal] = useLoader(TextureLoader, ['RSStexture/IoColor.jpg', 'RSStexture/Io_NRM.jpg'])

  return (
    <>
      <ambientLight intensity={0.01} />
      <pointLight position={[100,0,0]}/>
      <mesh>
        <sphereGeometry args={[5,20,20]}  />
        <meshStandardMaterial map={jupiterMap} />
      </mesh>
      <mesh position={[15,0,15]}>
        <sphereGeometry args={[1,100,100]} />
        <meshStandardMaterial map={ioMap} normal={ioNormal} />
      </mesh>
    </>
  )
}

function Skybox() {
  const { scene } = useThree()
  const loader = new CubeTextureLoader()
  const texture = loader.load([
    'skybox/PX.png',
    'skybox/NX.png',
    'skybox/PY.png',
    'skybox/NY.png',
    'skybox/PZ.png',
    'skybox/NZ.png'
  ])

  scene.background = texture
  return null
}

function App() {

  return (
    <div className='App'>

      <Canvas className='canvas'>
        <Suspense fallback={null}>
          <Skybox />
          <OrbitControls autoRotate />
          <Scene />
        </Suspense>
      </Canvas>

    </div>
  );
}

export default App;