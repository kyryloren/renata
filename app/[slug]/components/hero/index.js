'use client'

import { Canvas, useThree } from '@react-three/fiber'
import Plane from 'app/home/three/Plane'
import PostProcessing from 'app/home/three/PostProcessing'
import { Suspense } from 'react'
import { HeroWrapper } from './styles'
import Image from 'next/image'
// import { CustomImage } from 'components'

// const Imagey = () => {
//   const { viewport } = useThree()

//   return (
//     <group>
//       <Plane
//         width={viewport.width}
//         height={viewport.height}
//         texture={'/img/6.jpg'}
//         noAnim={true}
//       />
//     </group>
//   )
// }

// const Hero = () => {
//   return (
//     <Canvas style={{ height: '100vh' }}>
//       <Suspense fallback={null}>
//         <Imagey />
//         <PostProcessing />
//       </Suspense>
//     </Canvas>
//   )
// }

const Hero = () => {
  return (
    <HeroWrapper>
      {/* <CustomImage src={'/img/6.jpg'} alt="six" /> */}
      <Image src={'/img/6.jpg'} fill priority={true} />
    </HeroWrapper>
  )
}

export default Hero
