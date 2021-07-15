import './App.css';
import { Canvas, useLoader } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three';

function Scene() {
  const [jupiterMap] = useLoader(TextureLoader, ['RSStexture/JupiterColor.jpg'])
  const [ioMap, ioNormal] = useLoader(TextureLoader, ['RSStexture/IoColor.jpg', 'RSStexture/Io_NRM.jpg'])
  // const [skybox] = useLoader(CubeTextureLoader, [
  //   'skybox/PositiveX.png',
  //   'skybox/NegativeX.png',
  //   'skybox/PositiveY.png',
  //   'skybox/NegativeY.png',
  //   'skybox/PositiveZ.png',
  //   'skybox/NegativeZ.png'])

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

function App() {

  return (
    <div className='App'>

      <Canvas className='canvas'>
        <Suspense fallback={null}>
          <OrbitControls rotation='auto'/>
          <Scene />
        </Suspense>
      </Canvas>

    </div>
  );
}

export default App;