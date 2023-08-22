import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Loader,
  Stats,
  Float,
  Edges,
  Environment,
  OrbitControls,
  Html,
} from "@react-three/drei";
import {
  Glitch,
  EffectComposer,
  Bloom,
  Noise,
  ChromaticAberration,
} from "@react-three/postprocessing";
import useKeyPress from "./hooks/useKeyPress";
import useSound from "use-sound";
import glitchSound from "./public/sounds/noise.mp3";
import MainScene from "./scenes/MainScene";
import Glyph from "./components/Glyph";
import IncomingMessage from "./react-components/IncomingMessage";
import PopUpAbout from "./react-components/PopUpAbout";
import PopUpGlyphUpdate from "./react-components/PopUpGlyphUpdate";
import Button from "./react-components/Button";
import MuteSoundButton from "./react-components/MuteSoundButton";

import useCookie from "react-use-cookie";

import { ReactComponent as UiCenter } from "./public/ui-center.svg";
import { ReactComponent as UiScan } from "./public/ui-center-scan.svg";
import { ReactComponent as UiTopLeft } from "./public/ui-top-left.svg";
import { ReactComponent as UiTopRight } from "./public/ui-top-right.svg";
import { ReactComponent as UiBottomLeft } from "./public/ui-bottom-left.svg";
import { ReactComponent as DiscordIcon } from "./public/discord-icon.svg";
import { ReactComponent as StepArrow } from "./public/step-arrow.svg";
import {
  ClientFactory,
  Args,
  Client,
  bytesToStr,
  DefaultProviderUrls,
} from "@massalabs/massa-web3";

import { useInterval } from "./hooks/useInterval";

export const App = () => {
  const debugMode = false;
  const htmlPortalRef = useRef();
  const [quests, setQuests] = useState([]);

  const [currentStep, setCurrentStep] = useState(0);
  const [maxStep, setMaxStep] = useState(5);
  const [isPopUpAboutOpen, setIsPopUpAboutOpen] = useState(false);
  const [isPopUpGlyphUpdateOpen, setIsPopUpGlyphUpdateOpen] = useState(false);
  const [clueText, setClueText] = useState("");
  const [introText, setIntroText] = useState("");
  const [winnerText, setWinnerText] = useState("");
  const [isChanginStep, setIsChangingStep] = useState(0);
  const [hasUserBeenOnboarded, setHasUserBeenOnboarded] = useCookie(
    "hasUserBeenOnboarded",
    true
  );

  console.log("app");

  let postProcessingValues = [
    {
      delay: [0, 0],
      duration: [0.2, 0.5],
      strength: [2, 2],
      noiseOpacity: [2],
    },
    {
      delay: [0, 20],
      duration: [0, 0.3],
      strength: [0.001, 0.01],
      noiseOpacity: [0.2],
    },
    {
      delay: [0, 0],
      duration: [0, 0],
      strength: [0, 0],
      noiseOpacity: [0],
    },
  ];

  postProcessingValues = isChanginStep
    ? postProcessingValues[0]
    : postProcessingValues[1];

  // PUT AMBIANT SOUND HERE
  const [soundPlay] = useSound(glitchSound, {
    playbackRate: 0.9,
    volume: 0.05,
    interrupt: true,
  });

  const changeStep = (step) => {
    setIsChangingStep(true);
    soundPlay();
    window.setTimeout(() => {
      setCurrentStep(step);
      window.setTimeout(() => {
        setIsChangingStep(false);
      }, 200);
    }, 200);
  };

  const nextStep = () => {
    if (currentStep < maxStep && !isChanginStep) {
      changeStep(currentStep + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 0 && !isChanginStep) {
      changeStep(currentStep - 1);
    }
  };

  useKeyPress("ArrowRight", () => {
    nextStep();
  });
  useKeyPress("ArrowLeft", () => {
    prevStep();
  });

  const getData = async () => {
    const testnetClient = await ClientFactory.createDefaultClient(
      DefaultProviderUrls.BUILDNET,
      true // retry failed requests
    );

    const res = await testnetClient.smartContracts().readSmartContract({
      maxGas: BigInt(10000000),
      targetAddress: "AS1TdyVHk9b7EkqfzBo5zjr9GJT24tZbnSQnq7yMCm1gn1chK5Di",
      targetFunction: "getQuest",
      parameter: [],
    });

    const questsData = JSON.parse(bytesToStr(res.returnValue));
    const newCurrentStep = questsData.length - 1;

    console.log("quests", questsData);

    // TANT QUE PERSONNE NE TROUVE ON NE FAIT PAS EVOLUER LA VUE
    if (newCurrentStep != maxStep) {
      setQuests(questsData);
      changeStep(newCurrentStep);
      setCurrentStep(newCurrentStep);
      setMaxStep(newCurrentStep);
      // setClueText(questsData[newCurrentStep].clue);
      // setIntroText(questsData[newCurrentStep].intro);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(quests.length);
    if (quests.length > 0) {
      setClueText(quests[currentStep].clue);
      setIntroText(quests[currentStep].intro);
      setWinnerText(quests[currentStep].winner);
    }
  }, [currentStep, quests]);

  useInterval(() => {
    getData();
  }, 1000);

  const isThisTheEnd = currentStep === 5;
  console.log(123);

  return quests ? (
    <div className={`screen ${isThisTheEnd ? "" : "scanlines"}`}>
      <div className="screen no-responsive">
        <div>
          <h3>Your screen is too small for the experience !</h3>
        </div>
      </div>

      <div ref={htmlPortalRef} id="html-portal"></div>

      <div
        className={`ui-container ${isThisTheEnd ? "ui-container--hidden" : ""}`}
      >
        <div className="ui-container__center">
          <UiCenter />
          {winnerText ? winnerText : <UiScan className="blinking-slow" />}
        </div>
        <div className="ui-top-left">
          <UiTopLeft />
        </div>
        <div className="ui-top-right">
          <span className="ui-top-right__current-step">0{currentStep}</span>
          <span
            className={`ui-top-right__current-step-next ${
              currentStep < maxStep && !isChanginStep
                ? "ui-top-right__current-step-next--active"
                : ""
            }`}
            onClick={() => {
              nextStep();
            }}
          >
            <StepArrow />
          </span>
          <span
            className={`ui-top-right__current-step-prev ${
              currentStep > 0 && !isChanginStep
                ? "ui-top-right__current-step-next--active"
                : ""
            }`}
            onClick={() => {
              prevStep();
            }}
          >
            <StepArrow />
          </span>
          <span className="ui-top-right__quest-current-step">
            Founded glyphs ({maxStep}/5)
          </span>

          <UiTopRight />
        </div>
        <div className="ui-center-left">
          <IncomingMessage
            clueText={clueText}
            introText={introText}
            currentStep={currentStep}
          />
        </div>
        <div className="ui-bottom-left">
          <UiBottomLeft />
        </div>
        <div className="ui-bottom-right">
          <Button
            onClick={() => {
              // changeRoute();
              setIsPopUpAboutOpen(true);
            }}
          >
            About this game
          </Button>
          <PopUpAbout
            text="<span>Counterfeit Reality</span> is an experience proposed by  €€<a href='https://massa.net/' target='_blank'>Massa</a>€€ and <a href='https://obvious-art.com/' target='_blank'>Obvious</a>. The user is invited to solve riddles to uncover mysteries in a dystopian future. All solutions to riddles should be posted on the <a target='_blank' href='https://discord.gg/nh8rMTda'>Discord</a>.Rewards will be discovered upon resolution of the riddles, and include discounts for <span>Massa ICO</span> as well as <span>Obvious  NFT artwork</span>."
            isOpen={isPopUpAboutOpen}
            closeFunction={() => {
              setIsPopUpAboutOpen(false);
            }}
          />
          <Button
            className="square"
            onClick={() => {
              window.open("https://discord.gg/nh8rMTda", "_blank");
            }}
          >
            <DiscordIcon />
          </Button>
          <MuteSoundButton />
        </div>
      </div>
      <PopUpGlyphUpdate
        text="<span>Counterfeit Reality</span> is an experience proposed by  <a href='https://massa.net/' target='_blank'>Massa</a> and <a href='https://obvious-art.com/' target='_blank'>Obvious</a>. The user is invited to solve riddles to uncover mysteries in a dystopian future. All solutions to riddles should be posted on the <a target='_blank' href='https://discord.gg/nh8rMTda'>Discord</a>.Rewards will be discovered upon resolution of the riddles, and include discounts for <span>Massa ICO</span> as well as <span>Obvious  NFT artwork</span>."
        isOpen={isPopUpGlyphUpdateOpen}
        closeFunction={() => {
          setIsPopUpGlyphUpdateOpen(false);
        }}
      />
      <div id="r3f-canvas" className="screen">
        <Canvas
          shadows
          dpr={[1, 1]}
          camera={{ position: [0, 2, 9.5], fov: 50 }}
          resize={{ scroll: true, debounce: { scroll: 50, resize: 50 } }}
        >
          {debugMode ? (
            <>
              <Stats
                showPanel={0} // Start-up panel (default=0)
                className="stats" // Optional className to add to the stats container dom element
              />
            </>
          ) : null}
          <EffectComposer>
            {!isThisTheEnd ? (
              <>
                {/* <ChromaticAberration offset={3} /> */}
                <Glitch
                  delay={postProcessingValues.delay}
                  duration={postProcessingValues.duration}
                  strength={postProcessingValues.strength}
                  perturbationMap={null}
                />
                <Noise opacity={postProcessingValues.noiseOpacity} />
              </>
            ) : null}
          </EffectComposer>
          <MainScene
            debugMode={debugMode}
            htmlPortalRef={htmlPortalRef}
            currentStep={currentStep}
          />
          {/* <Glyph htmlPortalRef={htmlPortalRef} currentStep={currentStep} /> */}
        </Canvas>
      </div>
      <div id="controls" className="controls">
        <div id="helpbutton" className="pushbutton">
          <div className="pushback">
            <a className="pushfore"> ? </a>{" "}
          </div>
        </div>

        <div className="sliderlinecontainer">
          <div className="slider" id="angle">
            <div className="sliderlabeldiv">
              <p className="sltitle">ANGLE</p>
              <a id="langle"></a>
              <a>&deg;</a>
            </div>
          </div>
          <div className="sliderline"></div>
        </div>
        <div className="sliderlinecontainer">
          <div className="slider" id="skewangle">
            <div className="sliderlabeldiv">
              <p className="sltitle">SKEW</p>
              <a id="lskewangle"></a>
              <a>&deg;</a>
            </div>
          </div>
          <div className="sliderline"></div>
        </div>

        <div id="thumbtable">
          <div id="thumbarea"></div>
        </div>

        <div>
          <div>
            <div>
              <a className="button" id="randombutton">
                RESET
              </a>
            </div>
            <div>
              <a className="button" id="randombutton">
                RANDOM
              </a>
            </div>
            <div>
              <div id="animatecell">
                <a className="button" id="animatebutton">
                  ANIMATE
                </a>
                <div className="menu">
                  <a className="button" id="autobutton">
                    AUTO
                  </a>
                  <a className="button" id="anglelock">
                    ANGLE
                  </a>
                  <a className="button" id="skewanglelock">
                    SKEW
                  </a>
                </div>
              </div>
            </div>
            <div>
              <a className="button" id="colorbutton">
                COLOR
              </a>
            </div>
            <div>
              <a className="button" id="trailsbutton">
                TRAILS
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
