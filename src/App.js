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
import Fireflies from "./components/Fireflies";
import Glyph3d from "./components/Glyph3d";
import IncomingMessage from "./react-components/IncomingMessage";
import PopUpAbout from "./react-components/PopUpAbout";
import TopLeftInfos from "./react-components/TopLeftInfos";
import PopUpGlyphUpdate from "./react-components/PopUpGlyphUpdate";
import TypingText from "./react-components/TypingText";
import Button from "./react-components/Button";
import MuteSoundButton from "./react-components/MuteSoundButton";
import MousePosition from "./react-components/MousePosition";
import incomingMessage from "./public/sounds/incoming-message-2.mp3";

import randomRange from "./utils/randomRange.js";
import useCookie from "react-use-cookie";

import { ReactComponent as UiCenter } from "./public/ui-center.svg";
import { ReactComponent as UiScan } from "./public/ui-center-scan.svg";
import { ReactComponent as UiTopLeft } from "./public/ui-top-left.svg";
import { ReactComponent as UiTopRight } from "./public/ui-top-right.svg";
import { ReactComponent as UiTopRightNotFound } from "./public/ui-top-right-not-found.svg";
import { ReactComponent as UiBottomLeft } from "./public/ui-bottom-left.svg";
import { ReactComponent as DiscordIcon } from "./public/discord-icon.svg";
import { ReactComponent as StepArrow } from "./public/step-arrow.svg";
import { ReactComponent as InstagramIcon } from "./public/instagram-icon.svg";
import {
  ClientFactory,
  bytesToStr,
  DefaultProviderUrls,
} from "@massalabs/massa-web3";

import { useInterval } from "./hooks/useInterval";

import { config } from "./components/GlyphGenerator";
import changeGlyph from "./utils/changeGlyph.js";

let inputSequence = "";
const targetWord = "deeper";
let oldRandomGlyphIndex;
let randomGlyphIndex;

document.addEventListener("keydown", function (event) {
  inputSequence += event.key.toLowerCase();
  if (inputSequence.length > targetWord.length) {
    inputSequence = inputSequence.substr(
      inputSequence.length - targetWord.length
    );
  }
  if (inputSequence === targetWord) {
    window.isDeeperVisible = true;
  }
});

export const App = () => {
  const debugMode = false;
  const htmlPortalRef = useRef();
  const [quests, setQuests] = useState([]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [maxStep, setMaxStep] = useState(6);
  const [isPopUpAboutOpen, setIsPopUpAboutOpen] = useState(false);
  const [isPopUpEndOpen, setIsPopUpEndOpen] = useState(false);
  const [isIncomingMessageOpen, setIsIncomingMessageOpen] = useState(false);

  const [isIncomingMessageVisible, setIsIncomingMessageVisible] =
    useState(false);
  const [isPopUpGlyphUpdateOpen, setIsPopUpGlyphUpdateOpen] = useState(false);
  const [clueText, setClueText] = useState("");
  const [introText, setIntroText] = useState("");
  const [winnerText, setWinnerText] = useState("");
  const [isChangingStep, setIsChangingStep] = useState(0);
  const [isDeeperVisible, setIsDeeperVisible] = useState(false);

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

  postProcessingValues = isChangingStep
    ? postProcessingValues[0]
    : postProcessingValues[1];

  // PUT AMBIANT SOUND HERE
  const [soundPlay] = useSound(glitchSound, {
    playbackRate: 0.9,
    volume: 0.05,
    interrupt: true,
  });

  const [playIncomingMessage] = useSound(incomingMessage, {
    playbackRate: 1,
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
    if (
      currentStep < maxStep &&
      !isChangingStep &&
      !isIncomingMessageOpen &&
      !isPopUpAboutOpen &&
      !isPopUpGlyphUpdateOpen
    ) {
      closeAllPopUps();
      changeStep(currentStep + 1);
    }
  };
  const prevStep = () => {
    if (
      currentStep > 0 &&
      !isChangingStep &&
      !isIncomingMessageOpen &&
      !isPopUpAboutOpen &&
      !isPopUpGlyphUpdateOpen
    ) {
      closeAllPopUps();
      changeStep(currentStep - 1);
    }
  };

  useKeyPress("ArrowRight", () => {
    nextStep();
  });
  useKeyPress("ArrowLeft", () => {
    prevStep();
  });

  const closeAllPopUps = () => {
    setIsIncomingMessageOpen(false);
    setIsPopUpAboutOpen(false);
    setIsPopUpEndOpen(false);
    setIsPopUpGlyphUpdateOpen(false);
  };

  const getData = async () => {
    let questsData;
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

    questsData = JSON.parse(bytesToStr(res.returnValue));

    const newCurrentStep = questsData.length - 1;

    // console.log("newCurrentStep", newCurrentStep);
    // console.log("quests", questsData);

    if (newCurrentStep != maxStep || isFirstLoad) {
      closeAllPopUps();
      if (newCurrentStep != maxStep && !isFirstLoad) {
        setIsPopUpGlyphUpdateOpen(true);
      } else if (isFirstLoad) {
        playIncomingMessage();
        window.setTimeout(() => {
          setIsIncomingMessageOpen(true);
          window.setTimeout(() => {
            setIsIncomingMessageVisible(true);
          }, 1000);
        }, 2000);
      }

      setQuests(questsData);
      setCurrentStep(newCurrentStep);
      setMaxStep(newCurrentStep);
      changeStep(newCurrentStep);
    }
  };

  // Fetch data

  useInterval(() => {
    getData();
  }, 1000);

  useEffect(() => {
    getData();
    window.setTimeout(() => {
      setIsFirstLoad(false);
    }, 1000);
  }, []);

  // Update glyph effect
  useEffect(() => {
    changeGlyph(config, maxStep - 1);
  }, [maxStep]);

  useInterval(() => {
    if (isThisTheEnd) {
      while (oldRandomGlyphIndex === randomGlyphIndex)
        randomGlyphIndex = Math.floor(randomRange(0, maxStep));
      changeGlyph(config, randomGlyphIndex);
      oldRandomGlyphIndex = randomGlyphIndex;
    }
  }, 7000);

  useEffect(() => {
    if (quests.length > 0) {
      setClueText(quests[currentStep].clue);
      setIntroText(quests[currentStep].intro);
      setWinnerText(quests[currentStep].winner);
    }
    if (isThisTheEnd && isFirstLoad) {
      window.setTimeout(() => {
        setIsPopUpEndOpen(true);
      }, 1500);
    }
  }, [currentStep, quests]);

  useInterval(() => {
    if (window.isDeeperVisible && !isDeeperVisible) {
      setIsDeeperVisible(true);
    }
  }, 1000);

  const isThisTheEnd = currentStep === 6;

  return quests ? (
    <div
      className={`screen ${isThisTheEnd ? "" : "scanlines"} ${
        isFirstLoad ? "black" : ""
      }`}
    >
      <div ref={htmlPortalRef} id="html-portal"></div>
      <div
        className={`ui-container ${isThisTheEnd ? "ui-container--hidden" : ""}`}
      >
        <div className="ui-container__center">
          <MousePosition />
          <UiCenter />
          {currentStep === maxStep ? (
            <UiScan className="ui-container__center__searching blinking-slow" />
          ) : null}
        </div>
        <div className="ui-top-left">
          <TopLeftInfos isDeeperVisible={isDeeperVisible} />
          <UiTopLeft />
        </div>
        <div className="ui-top-right">
          {currentStep == 3 ? (
            <div
              className="clickable-glyph"
              onClick={() => {
                window.open(quests[currentStep].file_url, "_blank");
              }}
            ></div>
          ) : (
            ""
          )}
          <>
            {currentStep == 0 && !quests[currentStep]?.winner ? (
              <>
                <UiTopRightNotFound className="ui-top-right__unknown-glyph blinking-slow" />
                <div className="ui-top-right__winner">unknown</div>
              </>
            ) : (
              <>
                <Glyph className="ui-top-right__glyph" step={maxStep - 1} />
                <div className="ui-top-right__winner">
                  found by <span>{quests[maxStep - 1]?.winner}</span>
                </div>
              </>
            )}
          </>
          <span className="ui-top-right__current-step">0{currentStep}</span>
          <span
            className={`ui-top-right__current-step-next ${
              currentStep < maxStep && !isChangingStep
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
              currentStep > 0 && !isChangingStep
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
            {maxStep}/6 glyphs
          </span>
          <UiTopRight />
        </div>
      </div>
      <div className="ui-bottom-left">
        <UiBottomLeft />
      </div>
      <div className="ui-bottom-right">
        <Button
          className="square-diag"
          onClick={() => {
            // changeRoute();
            setIsPopUpAboutOpen(true);
          }}
        >
          About this game
        </Button>
        <PopUpAbout
          text="<span>Counterfeit Reality</span> is an experience proposed by  €€<a href='https://massa.net/' target='_blank'>Massa</a>€€ and €€<a href='https://obvious-art.com/' target='_blank'>Obvious</a>€€** The user is invited to solve riddles to uncover mysteries in a dystopian future. All solutions to riddles should be posted on the <a target='_blank' href='https://discord.gg/massa'>Discord</a>.**Rewards will be discovered upon resolution of the riddles, and include <span>Massa tokens</span> as well as <span>Obvious  NFT artwork</span>."
          isOpen={isPopUpAboutOpen}
          closeFunction={() => {
            setIsPopUpAboutOpen(false);
          }}
        />
        <Button
          className="square square-diag"
          onClick={() => {
            window.open("https://discord.gg/massa", "_blank");
          }}
        >
          <DiscordIcon />
        </Button>

        {currentStep == 2 ? (
          <Button
            className="square square-diag--reverse"
            onClick={() => {
              window.open("https://www.instagram.com/obvious_art/", "_blank");
            }}
          >
            <InstagramIcon />
          </Button>
        ) : null}

        <MuteSoundButton
          onClick={
            currentStep == 1
              ? () => {
                  window.open(quests[currentStep].file_url, "_blank");
                }
              : null
          }
        />
      </div>
      <div className="ui-center-left">
        <IncomingMessage
          clueText={clueText}
          introText={introText + " **" + clueText}
          currentStep={currentStep}
          isFinalStep={winnerText === ""}
          isHidden={!isIncomingMessageVisible}
          isOpen={isIncomingMessageOpen}
          openFunction={() => {
            setIsIncomingMessageOpen(true);
          }}
          closeFunction={() => {
            setIsIncomingMessageOpen(false);
          }}
        />
      </div>
      {isThisTheEnd ? (
        <>
          <Button
            className="join-massa square square-diag"
            onClick={() => {
              window.open("https://massa.net/", "_blank");
            }}
          >
            Join Massa
          </Button>
        </>
      ) : null}
      {currentStep >= 1 ? (
        <PopUpGlyphUpdate
          isOpen={isPopUpGlyphUpdateOpen}
          currentStep={currentStep}
          winnerText={quests[currentStep - 1]?.winner}
          closeFunction={() => {
            setIsPopUpGlyphUpdateOpen(false);
            window.setTimeout(() => {
              setIsIncomingMessageOpen(true);
            }, 1000);
          }}
        />
      ) : null}
      <div id="r3f-canvas" className="screen">
        <Canvas
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
          {isThisTheEnd ? (
            <>
              <Fireflies
                color="#FF0000"
                count={50}
                scale={[0.03, 0.03, 0.03]}
                position={[0.1, -0.5, -1]}
              />

              <Float
                floatIntensity={1}
                speed={5}
                floatingRange={[0, 0.25]}
                rotationIntensity={0}
              >
                <Glyph3d
                  position={[0.1, -0.5, -1]}
                  className="final-center-glyph"
                />
              </Float>
            </>
          ) : null}
          <MainScene
            debugMode={debugMode}
            htmlPortalRef={htmlPortalRef}
            currentStep={currentStep}
          />
        </Canvas>
      </div>
    </div>
  ) : null;
};
