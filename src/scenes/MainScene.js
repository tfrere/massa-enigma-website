import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { SpotLight, Shake, Text, Stars, Segments, Segment, Html, Stats, Float, Edges, Environment, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useSpring, animated, easings } from '@react-spring/three'

import Fireflies from '../components/Fireflies'
import Glyph from '../components/Glyph'
import TexturedPlane from '../components/TexturedPlane'
import VideoTexturedPlane from '../components/VideoTexturedPlane'
import Sparks from '../components/Sparks'
import City from '../components/City'
import MovingLines from '../components/MovingLines'
import { ContinuousCircle, DashedCircle } from '../components/Lines'
import TextScramble from '../components/TextScramble'
import Altar from '../components/Altar'
import Graph from '../components/Graph'
import useInterval from '../utils/useInterval'

import wiresUrl from '../public/less-wires.png'
import obviousLogoUrl from '../public/obvious-logo-shape-only.png'
import ImageUrl from '../public/futuristic-video.mp4'
import Image2Url from '../public/3.png'

const videourl = 'https://corsproxy.io/?https://drive.google.com/file/d/145bLeIIYDT-v-Qpdb8V0Z4DwaAADWo9o'

const MainScene = (props) => {
  const { camera, renderer, mouse } = useThree()
  const [x, setX] = useState(0)

  const textureRatio = 1.5

  useFrame(({ mouse, clock }) => {
    //setX( camera.position.x )

    //camera.position.setX(x)

    camera.position.setX(-mouse.x)
    camera.position.setY(-mouse.y / 3)
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      {props.debugMode ? (
        <>
          <SpotLight
            castShadow
            distance={20}
            intensity={0.1}
            angle={THREE.MathUtils.degToRad(45)}
            color={'#fadcb9'}
            position={[0, 5, 0]}
            volumetric={true}
            debug={true}
          />
          <City number={5} gap={0.5} maxSize={1} position={[-1, -1, -1]} />
        </>
      ) : (
        <>
          <VideoTexturedPlane
            imageUrl={videourl}
            scale={[16 * textureRatio, 10 * textureRatio, 10 * textureRatio]}
            rotation={[0, 0, 0]}
            position={[0, 0, -1.2]}
          />
          <group position={[0, -2.5, 0]}>
            <Fireflies color="#FF0000" count={20} scale={[0.03, 0.03, 0.03]} position={[0, 2, 0]} />
            <Float floatIntensity={1} speed={5} floatingRange={[0.25, 0.85]} rotationIntensity={0}>
              <Glyph scale={[1, 1, 1]} position={[0, 2, 0]} canvasPortalRef={props.canvasPortalRef} />
            </Float>

            <MovingLines number={6} gap={0.05} maxSize={0.5} position={[-0.8, 0.45, 1]} />
            <Graph number={6} gap={0.05} maxSize={0.6} position={[-0.4, 0.45, 1]} />
            <TextScramble></TextScramble>
          </group>
        </>
      )}
    </>
  )
}

export default MainScene
