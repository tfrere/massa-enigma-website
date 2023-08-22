import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  SpotLight,
  Shake,
  Text,
  Stars,
  Segments,
  Segment,
  Html,
  Stats,
  Float,
  Edges,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useSpring, animated, easings } from "@react-spring/three";

import VideoTexturedPlane from "../components/VideoTexturedPlane";

import ImageStep1 from "../public/videos/STEP_1.mp4";
import ImageStep2 from "../public/videos/STEP_2.mp4";
import ImageStep3 from "../public/videos/STEP_3.mp4";
import ImageStep4 from "../public/videos/STEP_4.mp4";
import ImageStep5 from "../public/videos/STEP_5.mp4";
import ImageStep6 from "../public/videos/STEP_6.mp4";

import SoundStep1 from "../public/sounds/step-1.mp3";
import SoundStep2 from "../public/sounds/step-2.mp3";
import SoundStep3 from "../public/sounds/step-3.mp3";
import SoundStep4 from "../public/sounds/step-4.mp3";
import SoundStep5 from "../public/sounds/step-5.mp3";

import FireSound from "../public/sounds/fire.mp3";

import useSound from "use-sound";

import SkyBox from "../components/Skybox";
import TypingText from "../react-components/TypingText";

// const videourl = 'https://corsproxy.io/?https://drive.google.com/file/d/145bLeIIYDT-v-Qpdb8V0Z4DwaAADWo9o'

const MainScene = (props) => {
  const { camera, renderer, mouse } = useThree();
  const [x, setX] = useState(0);

  const textureRatio = 1.5;

  const [playStep1Sound, { sound, stop: stop1 }] = useSound(SoundStep1, {
    playbackRate: 1.2,
    volume: 0.05,
    interrupt: true,
    loop: true,
  });

  const [playStep2Sound, { stop: stop2 }] = useSound(SoundStep2, {
    playbackRate: 1.2,
    volume: 0.05,
    interrupt: true,
    loop: true,
  });

  const [playStep3Sound, { stop: stop3 }] = useSound(SoundStep3, {
    playbackRate: 1.2,
    volume: 0.05,
    interrupt: true,
    loop: true,
  });

  const [playStep4Sound, { stop: stop4 }] = useSound(SoundStep4, {
    playbackRate: 1.2,
    volume: 0.05,
    interrupt: true,
    loop: true,
  });

  const [playStep5Sound, { stop: stop5 }] = useSound(SoundStep5, {
    playbackRate: 1.2,
    volume: 0.05,
    interrupt: true,
    loop: true,
  });

  const stopSounds = () => {
    stop1();
    stop2();
    stop3();
    stop4();
    stop5();
  };

  useFrame(({ mouse, clock }) => {
    //setX( camera.position.x )

    //camera.position.setX(x)

    camera.position.setX(-mouse.x);
    camera.position.setY(-mouse.y / 5);
    camera.lookAt(0, 0, 0);
  });

  // useEffect(() => {

  // }, [props.currentStep]);

  let backgroundVideo = null;

  switch (props.currentStep) {
    case 0:
      backgroundVideo = ImageStep1;
      stopSounds();
      playStep1Sound();
      break;
    case 1:
      backgroundVideo = ImageStep2;
      stopSounds();
      playStep1Sound();
      break;
    case 2:
      backgroundVideo = ImageStep3;
      stopSounds();
      playStep2Sound();
      break;
    case 3:
      backgroundVideo = ImageStep4;
      stopSounds();
      playStep3Sound();
      break;
    case 4:
      backgroundVideo = ImageStep5;
      stopSounds();
      playStep4Sound();
      break;
    case 5:
      backgroundVideo = ImageStep6;
      stopSounds();
      playStep5Sound();
      break;
  }

  return (
    <>
      <VideoTexturedPlane
        imageUrl={backgroundVideo}
        scale={[
          (16 / 1.4) * textureRatio,
          (10 / 1.4) * textureRatio,
          (10 / 1.4) * textureRatio,
        ]}
        rotation={[0, 0, 0]}
        position={[0, 0, -1.2]}
      />
      {/* <SkyBox imageUrl={backgroundVideo} /> */}
      {/* <Html occlude distanceFactor={0} position={[0, 0, 0.51]} transform>
        <TypingText
          speed={50}
          words='You are about to enter a game designed by <a href="">Obvious</a> and <a href="">Massa</a>. To participate, seek the answers to the <span>enigmas</span>, and share them on <a href="">Discord</a> to earn the associated reward'
        />
      </Html> */}
    </>
  );
};

export default MainScene;
