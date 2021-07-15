import './App.css';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { CubeTextureLoader, TextureLoader } from 'three';
import Moon from './components/moon';

function Scene() {
  const [jupiterMap] = useLoader(TextureLoader, ['RSStexture/JupiterColor.jpg'])

  return (
    <>
      <ambientLight intensity={0.01} />
      <pointLight position={[300,0,0]} castShadow  shadow-mapSize-height={1024} shadow-mapSize-width={1024}/>
      <mesh position={[300,0,0]}>
        <sphereGeometry args={[5,20,20]} />
          <meshBasicMaterial color='yellow'/>
      </mesh>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[15,100,100]}  />
        <meshStandardMaterial map={jupiterMap} />

        <Moon
          px={-25}
          py={0}
          pz={-25}
          colorPath='RSStexture/IoColor.jpg'
          normalPath='RSStexture/Io_NRM.jpg'
          daySpeed={.1}
          orbitSpeed={.6}
          sphereSize={1}
          sphereRes={200}
        />

        <Moon
          px={30}
          py={0}
          pz={30}
          colorPath='RSStexture/EuropaColor.jpg'
          normalPath='RSStexture/Europa_NRM.jpg'
          daySpeed={.1}
          orbitSpeed={.4}
          sphereSize={1}
          sphereRes={200}
        />

        <Moon
          px={-35}
          py={0}
          pz={-35}
          colorPath='RSStexture/GanymedeColor.jpg'
          normalPath='RSStexture/Ganymede_NRM.jpg'
          daySpeed={.1}
          orbitSpeed={.05}
          sphereSize={1}
          sphereRes={200}
        />

        <Moon
          px={45}
          py={0}
          pz={45}
          colorPath='RSStexture/CallistoColor.jpg'
          normalPath='RSStexture/Callisto_NRM.jpg'
          daySpeed={.1}
          orbitSpeed={0.001}
          sphereSize={1}
          sphereRes={200}
        />

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

      <Canvas className='canvas' shadows camera={{position:[30,30,-30]}} >
        <Suspense fallback={null}>
          <Skybox />
          <OrbitControls />
          <Scene />
        </Suspense>
      </Canvas>

    </div>
  );
}

export default App;