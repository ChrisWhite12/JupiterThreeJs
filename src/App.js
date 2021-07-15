import './App.css';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { Environment, OrbitControls, useCubeTexture } from '@react-three/drei';
import { CompressedTextureLoader, CubeTextureLoader, TextureLoader } from 'three';

function Scene() {
  const [jupiterMap] = useLoader(TextureLoader, ['RSStexture/JupiterColor.jpg'])
  const [ioMap, ioNormal] = useLoader(TextureLoader, ['RSStexture/IoColor.jpg', 'RSStexture/Io_NRM.jpg'])
  const [EuropaMap, EuropaNormal] = useLoader(TextureLoader , ['RSStexture/EuropaColor.jpg', 'RSStexture/Europa_NRM.jpg'])
  const [CallistoMap, CallistoNormal] = useLoader(TextureLoader, ['RSStexture/CallistoColor.jpg', 'RSStexture/Callisto_NRM.jpg'])
  const [GanymedeMap, GanymedeNormal] = useLoader(TextureLoader, ['RSStexture/GanymedeColor.jpg', 'RSStexture/Ganymede_NRM.jpg'])

  const ioMesh = useRef()
  const ioOrbit = useRef()
  const EuropaMesh = useRef()
  const EuropaOrbit = useRef()
  const CallistoMesh = useRef()
  const CallistoOrbit = useRef()
  const GanymedeMesh = useRef()
  const GanymedeOrbit = useRef()

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    ioMesh.current.rotation.y = elapsedTime / (2 * Math.PI * 5)
    ioOrbit.current.rotation.y = elapsedTime / (2 * Math.PI * 3)
    EuropaOrbit.current.rotation.y = elapsedTime / (2 * Math.PI * 2)
    CallistoOrbit.current.rotation.y = elapsedTime / (2 * Math.PI * 6)
    GanymedeOrbit.current.rotation.y = elapsedTime / (2 * Math.PI * 4)
  })

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

        <mesh position={[0,0,0]} ref={ioOrbit}>
          <mesh position={[-25,0,-25]} ref={ioMesh} castShadow receiveShadow>
            <sphereGeometry args={[1,100,100]} />
            <meshStandardMaterial map={ioMap} normal={ioNormal} />
          </mesh>
        </mesh>

        <mesh position={[0,0,0]} ref={EuropaOrbit}>
          <mesh position={[30,0,30]} ref={EuropaMesh} castShadow receiveShadow>
            <sphereGeometry args={[1,100,100]} />
            <meshStandardMaterial map={EuropaMap} normal={EuropaNormal} />
          </mesh>
        </mesh>

        <mesh position={[0,0,0]} ref={GanymedeOrbit}>
          <mesh position={[-35,0,-35]} ref={GanymedeMesh} castShadow receiveShadow>
            <sphereGeometry args={[1,100,100]} />
            <meshStandardMaterial map={GanymedeMap} normal={GanymedeNormal} />
          </mesh>
        </mesh>

        <mesh position={[0,0,0]} ref={CallistoOrbit}>
          <mesh position={[45,0,45]} ref={CallistoMesh} castShadow receiveShadow>
            <sphereGeometry args={[1,100,100]} />
            <meshStandardMaterial map={CallistoMap} normal={CallistoNormal} />
          </mesh>
        </mesh>

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

      <Canvas className='canvas' shadows camera={{position:[10,10,-10]}} >
        <Suspense fallback={null}>
          <Skybox />
          <OrbitControls  />
          {/* autoRotate */}
          <Scene />
        </Suspense>
      </Canvas>

    </div>
  );
}

export default App;