'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { usePrevious } from 'react-use'
import gsap from 'gsap'
import PostProcessing from './PostProcessing'
import CarouselItem from './CarouselItem'
import { lerp, getPiramidalIndex } from '../utils'
import images from '../data/images'
import { Html } from '@react-three/drei'
import TextElem from './TextElem'
import * as THREE from 'three'
import { easing } from 'maath'
import { useRouter } from 'next/navigation'

const material = new THREE.LineBasicMaterial({ color: 'white' })
const geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, -0.5, 0),
  new THREE.Vector3(0, 0.5, 0),
])

/*------------------------------
Plane Settings
------------------------------*/
const planeSettings = {
  width: 6,
  height: 3.5,
  gap: 2,
}

/*------------------------------
Gsap Defaults
------------------------------*/
gsap.defaults({
  duration: 2.5,
  ease: 'power3.out',
})

/*------------------------------
Carousel
------------------------------*/
const Carousel = () => {
  const [$root, setRoot] = useState()
  const $post = useRef()
  const $textGroup = useRef() // Reference for the text group
  const $mapGroup = useRef()
  const router = useRouter()

  const [activePlane, setActivePlane] = useState(null)
  const [hideText, setHideText] = useState(false)
  const prevActivePlane = usePrevious(activePlane)
  const { viewport } = useThree()

  /*--------------------
  Vars
  --------------------*/
  const progress = useRef(0)
  const startX = useRef(0)
  const isDown = useRef(false)
  const speedWheel = 0.02
  const speedDrag = -0.2
  const oldProgress = useRef(0)
  const speed = useRef(0)
  const $items = useMemo(() => {
    if ($root) return $root.children
  }, [$root])

  /*--------------------
  Display Items
  --------------------*/
  const displayItems = (item, index, active) => {
    const piramidalIndex = getPiramidalIndex($items, active)[index]
    gsap.to(item.position, {
      x: (index - active) * (planeSettings.width + planeSettings.gap),
      y: $items.length * -0.1 + piramidalIndex * 0.1,
    })
  }

  useEffect(() => {
    if (activePlane != null) {
      setTimeout(() => {
        router.push('/six')
      }, 2000)
    }
  }, [activePlane])

  /*--------------------
  RAF
  --------------------*/
  useFrame((state, delta) => {
    progress.current = Math.max(0, Math.min(progress.current, 100))

    const active = Math.floor((progress.current / 100) * ($items.length - 1))
    $items.forEach((item, index) => displayItems(item, index, active))
    speed.current = lerp(
      speed.current,
      Math.abs(oldProgress.current - progress.current),
      0.1,
    )

    oldProgress.current = lerp(oldProgress.current, progress.current, 0.1)

    if ($post.current) {
      $post.current.thickness = speed.current
    }

    if ($mapGroup.current) {
      $mapGroup.current.children.forEach((child, index) => {
        // Calculate the relative distance of each item from the current progress
        const currentIndex = (progress.current / 100) * ($items.length - 1)
        const distanceToCurrent = Math.abs(index - currentIndex)

        // Normalize the distance so that it's between 0 and 1, where 0 is the closest
        const maxDistance = $items.length / 2 // Adjust as necessary
        const normalizedDistance = Math.min(distanceToCurrent / maxDistance, 1)

        // Invert the distance to get a value that is closest to 1 in the middle and 0 further away
        const y = 1 - normalizedDistance

        // Ease the y value with dampening
        easing.damp(child.scale, 'y', 0.15 + y / 6, 0.15, delta)
      })
    }

    // Update the text position based on the progress

    if (progress.current > 10) {
      setHideText(true)
    } else if (activePlane !== null) {
      setHideText(true)
    } else {
      setHideText(false)
    }
  })

  /*--------------------
  Handle Wheel
  --------------------*/
  const handleWheel = (e) => {
    if (activePlane !== null) return
    const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX)
    const wheelProgress = isVerticalScroll ? e.deltaY : e.deltaX
    progress.current = progress.current + wheelProgress * speedWheel
  }

  /*--------------------
  Handle Down
  --------------------*/
  const handleDown = (e) => {
    if (activePlane !== null) return
    isDown.current = true
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0
  }

  /*--------------------
  Handle Up
  --------------------*/
  const handleUp = () => {
    isDown.current = false
  }

  /*--------------------
  Handle Move
  --------------------*/
  const handleMove = (e) => {
    if (activePlane !== null || !isDown.current) return
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const mouseProgress = (x - startX.current) * speedDrag
    progress.current = progress.current + mouseProgress
    startX.current = x
  }

  /*--------------------
  Click
  --------------------*/
  useEffect(() => {
    if (!$items) return
    if (activePlane !== null && prevActivePlane === null) {
      progress.current = (activePlane / ($items.length - 1)) * 100 // Calculate the progress.current based on activePlane
    }
  }, [activePlane, $items])

  /*--------------------
  Render Plane Events
  --------------------*/
  const renderPlaneEvents = () => {
    return (
      <mesh
        position={[0, 0, -0.01]}
        onWheel={handleWheel}
        onPointerDown={handleDown}
        onPointerUp={handleUp}
        onPointerMove={handleMove}
        onPointerLeave={handleUp}
        onPointerCancel={handleUp}
      >
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial transparent={true} opacity={0} />
      </mesh>
    )
  }

  /*--------------------
  Render Slider
  --------------------*/
  const renderSlider = () => {
    return (
      <group ref={setRoot}>
        {images.map((item, i) => (
          <CarouselItem
            width={planeSettings.width}
            height={planeSettings.height}
            setActivePlane={setActivePlane}
            activePlane={activePlane}
            key={item.image}
            item={item}
            index={i}
          />
        ))}
      </group>
    )
  }

  /*--------------------
  Render Text
  --------------------*/
  const renderText = () => {
    return (
      <group
        ref={$textGroup} // Set the reference for the text group
        position={[-viewport.width / 1.05, viewport.height / 20, -5]}
        rotation={[0, 0, 0]}
      >
        <mesh />
        <Html
          style={{ top: '50%', left: 0, transform: 'translateY(-50%)' }}
          position={[0, 0, 0]}
        >
          <TextElem hideText={hideText} />
        </Html>
      </group>
    )
  }

  const renderMap = () => {
    return (
      <group ref={$mapGroup}>
        {images.map((_, i) => (
          <line
            key={i}
            geometry={geometry}
            material={material}
            position={[
              i * 0.06 - images.length * 0.03,
              -viewport.height / 2 + 0.6,
              0,
            ]}
          />
        ))}
      </group>
    )
  }

  return (
    <group>
      {renderPlaneEvents()}
      {renderSlider()}
      {renderMap()}
      {renderText()}
      <PostProcessing ref={$post} />
    </group>
  )
}

export default Carousel
