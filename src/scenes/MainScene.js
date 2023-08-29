import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import VideoTexturedPlane from "../components/VideoTexturedPlane";
import SkyBox from "../components/Skybox";

import ImageStep1 from "../public/videos/STEP_1.mp4";
import ImageStep2 from "../public/videos/STEP_2.mp4";
import ImageStep3 from "../public/videos/STEP_3.mp4";
import ImageStep4 from "../public/videos/STEP_4.mp4";
import ImageStep5 from "../public/videos/STEP_5.mp4";
import ImageStep6 from "../public/videos/STEP_6.mp4";
import ImageStep7 from "../public/videos/STEP_7.mp4";

import SoundStep1 from "../public/sounds/step-1.mp3";
import SoundStep2 from "../public/sounds/step-2.mp3";
import SoundStep3 from "../public/sounds/step-3.mp3";
import SoundStep4 from "../public/sounds/step-4.mp3";
import SoundStep5 from "../public/sounds/step-5.mp3";
import SoundStep6 from "../public/sounds/step-6.mp3";

import useSound from "use-sound";

// const videourl = 'https://corsproxy.io/?https://drive.google.com/file/d/145bLeIIYDT-v-Qpdb8V0Z4DwaAADWo9o'

function map(n, start1, end1, start2, end2) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

const MainScene = (props) => {
  const { camera, renderer, mouse } = useThree();
  const [x, setX] = useState(0);

  const textureRatio = 1.5;

  const [playStep1Sound, { stop: stop1 }] = useSound(SoundStep1, {
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

  const [playStep5Sound, { stop: stop5 }] = useSound(SoundStep6, {
    playbackRate: 1.2,
    volume: 0.05,
    interrupt: true,
    loop: true,
  });

  const [playStep6Sound, { stop: stop6 }] = useSound(SoundStep6, {
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
    stop6();
  };

  useFrame(({ mouse, clock }) => {
    camera.position.setX(
      -map(
        document.mouseX || window.screen.width / 2,
        0,
        window.screen.width,
        -1,
        1
      )
    );
    camera.position.setY(
      -map(
        document.mouseX || window.screen.width / 2,
        0,
        window.screen.width,
        -1,
        1
      ) / 5
    );
    camera.lookAt(0, 0, 0);
  });

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
      playStep2Sound();
      break;
    case 2:
      backgroundVideo = ImageStep3;
      stopSounds();
      playStep3Sound();
      break;
    case 3:
      backgroundVideo = ImageStep4;
      stopSounds();
      playStep4Sound();
      break;
    case 4:
      backgroundVideo = ImageStep5;
      stopSounds();
      playStep5Sound();
      break;
    case 5:
      backgroundVideo = ImageStep6;
      stopSounds();
      playStep6Sound();
      break;
    case 6:
      backgroundVideo = ImageStep7;
      stopSounds();
      playStep6Sound();
      break;
  }

  return (
    <>
      <VideoTexturedPlane
        imageUrl={backgroundVideo}
        scale={[
          (16 / 1.1) * textureRatio,
          (8 / 1.1) * textureRatio,
          (8 / 1.1) * textureRatio,
        ]}
        rotation={[0, 0, 0]}
        position={[0, 0, -1.2]}
      />
      {/* <SkyBox imageUrl={backgroundVideo} /> */}
    </>
  );
};

export default MainScene;
