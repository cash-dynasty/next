import React, { useRef } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'

export function Pyramid(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./models/pyramid.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh name="Plane" geometry={nodes.Plane.geometry} material={materials['Material.005']} />
        <group name="Cylinder" position={[0.009, 1.05, 0.027]}>
          <mesh name="Cylinder_1" geometry={nodes.Cylinder_1.geometry} material={materials.disc} />
          <mesh name="Cylinder_2" geometry={nodes.Cylinder_2.geometry} material={materials.cone} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./models/pyramid.glb')
