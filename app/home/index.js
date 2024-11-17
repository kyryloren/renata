'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Carousel from './three/Carousel'

const HomePage = () => {
  return (
    <Canvas style={{ height: '100vh' }}>
      <Suspense fallback={null}>
        <Carousel />
      </Suspense>
    </Canvas>
  )
}

export default HomePage
