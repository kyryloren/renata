'use client'

import { forwardRef } from 'react'
import { useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { Color } from 'three'

const PostProcessing = forwardRef((_, ref) => {
  const { viewport } = useThree()

  const active = true
  const ior = 1.2

  return active ? (
    <mesh position={[0, 0, 1]}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <MeshTransmissionMaterial
        ref={ref}
        background={new Color('black')}
        transmission={1}
        roughness={0}
        thickness={0}
        chromaticAberration={0.06}
        anisotropy={0}
        ior={ior}
      />
    </mesh>
  ) : null
})

export default PostProcessing
