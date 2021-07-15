import { useFrame, useLoader } from '@react-three/fiber';
import React, { useRef } from 'react'
import { TextureLoader } from 'three';

const Moon = (props) => {
    const planetMesh = useRef()
    const orbitMesh = useRef()
    const [textureMap, textureNormal] = useLoader(TextureLoader, [props.colorPath, props.normalPath])

    useFrame((state) => {
        const elapsedTime = state.clock.getElapsedTime()
        planetMesh.current.rotation.y = (elapsedTime / (2 * Math.PI)) * props.daySpeed
        orbitMesh.current.rotation.y = (elapsedTime / (2 * Math.PI)) * props.orbitSpeed
    })

    return (
        <mesh position={[0,0,0]} ref={orbitMesh}>
          <mesh position={[props.px, props.py, props.pz]} ref={planetMesh} castShadow receiveShadow>

            <sphereGeometry args={[props.sphereSize,props.sphereRes,props.sphereRes]} />
            <meshStandardMaterial map={textureMap} normal={textureNormal} />

          </mesh>
        </mesh>
    );
};
export default Moon