'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import gsap from 'gsap'
import * as THREE from 'three'

const Plane = ({ texture, width, height, active, noAnim, ...props }) => {
  const $mesh = useRef()
  const { viewport, gl } = useThree()
  const tex = useTexture(texture)

  // Set texture encoding to sRGB to handle brightness correctly
  tex.encoding = THREE.sRGBEncoding // Ensure the texture is in sRGB color space for proper brightness

  // Set the renderer to use output encoding for proper gamma correction
  useEffect(() => {
    gl.outputEncoding = THREE.sRGBEncoding
  }, [gl])

  useEffect(() => {
    if ($mesh.current.material) {
      //  Setting the 'uZoomScale' uniform in the 'Plane' component to resize the texture proportionally to the dimensions of the viewport.
      $mesh.current.material.uniforms.uZoomScale.value.x =
        viewport.width / width
      $mesh.current.material.uniforms.uZoomScale.value.y =
        viewport.height / height

      if (!noAnim) {
        gsap.to($mesh.current.material.uniforms.uProgress, {
          value: active ? 1 : 0,
        })

        gsap.to($mesh.current.material.uniforms.uRes.value, {
          x: active ? viewport.width : width,
          y: active ? viewport.height : height,
        })
      }
    }
  }, [viewport, active])

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uProgress: { value: 0 },
        uZoomScale: { value: { x: 1, y: 1 } },
        uTex: { value: tex },
        uRes: { value: { x: width, y: height } },
        uImageRes: {
          value: { x: tex.source.data.width, y: tex.source.data.height },
        },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        uniform float uProgress;
        uniform vec2 uZoomScale;

        void main() {
          vUv = uv;
          vec3 pos = position;
          float angle = uProgress * 3.14159265 / 2.;
          float wave = cos(angle);
          float c = sin(length(uv - .5) * 15. + uProgress * 12.) * .5 + .5;
          pos.x *= mix(1., uZoomScale.x + wave * c, uProgress);
          pos.y *= mix(1., uZoomScale.y + wave * c, uProgress);

          gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uTex;
        uniform vec2 uRes;
        uniform vec2 uZoomScale;
        uniform vec2 uImageRes;

        /*------------------------------
        Background Cover UV
        --------------------------------
        u = basic UV
        s = screensize
        i = image size
        ------------------------------*/
        vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
          float rs = s.x / s.y; // Aspect screen size
          float ri = i.x / i.y; // Aspect image size
          vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); // New st
          vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset
          return u * s / st + o;
        }

        varying vec2 vUv;
        void main() {
          vec2 uv = CoverUV(vUv, uRes, uImageRes);
          vec3 tex = texture2D(uTex, uv).rgb;

          // Apply gamma correction by converting from sRGB to linear space
          tex = pow(tex, vec3(1.6)); // Corrects the perceived brightness of the texture

          gl_FragColor = vec4(tex, 1.0);
        }
      `,
    }),
    [tex],
  )

  return (
    <mesh ref={$mesh} {...props}>
      <planeGeometry args={[width, height, 30, 30]} />
      <shaderMaterial args={[shaderArgs]} />
    </mesh>
  )
}

export default Plane
