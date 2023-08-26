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
import MousePosition from "./react-components/MousePosition";
import Time from "./react-components/Time";

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
  Args,
  Client,
  bytesToStr,
  DefaultProviderUrls,
} from "@massalabs/massa-web3";

import { useInterval } from "./hooks/useInterval";
import questsOriginalData from "./quests.js";

const IS_PROD = false;

export const App = () => {
  const debugMode = true;
  const htmlPortalRef = useRef();
  const [quests, setQuests] = useState(IS_PROD ? [] : questsOriginalData);

  const [currentStep, setCurrentStep] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [maxStep, setMaxStep] = useState(6);
  const [isPopUpAboutOpen, setIsPopUpAboutOpen] = useState(false);
  const [isIncomingMessageOpen, setIsIncomingMessageOpen] = useState(false);
  const [isPopUpGlyphUpdateOpen, setIsPopUpGlyphUpdateOpen] = useState(false);
  const [clueText, setClueText] = useState("");
  const [introText, setIntroText] = useState("");
  const [winnerText, setWinnerText] = useState("");
  const [isChangingStep, setIsChangingStep] = useState(0);
  // const [hasUserBeenOnboarded, setHasUserBeenOnboarded] = useCookie(
  //   "hasUserBeenOnboarded",
  //   true
  // );

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

  postProcessingValues = isChangingStep
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
    if (currentStep < maxStep && !isChangingStep) {
      changeStep(currentStep + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 0 && !isChangingStep) {
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
    let questsData;
    if (IS_PROD) {
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
    } else {
      questsData = questsOriginalData;
    }

    const newCurrentStep = questsData.length - 1;

    console.log("newCurrentStep", newCurrentStep);
    console.log("quests", questsData);

    // TANT QUE PERSONNE NE TROUVE ON NE FAIT PAS EVOLUER LA VUE

    if (newCurrentStep != maxStep || isFirstLoad) {
      if (newCurrentStep != maxStep && !isFirstLoad) {
        setIsPopUpGlyphUpdateOpen(true);
      }
      setQuests(questsData);
      setCurrentStep(newCurrentStep);
      setMaxStep(newCurrentStep);
      changeStep(newCurrentStep);
      // setClueText(questsData[newCurrentStep].clue);
      // setIntroText(questsData[newCurrentStep].intro);
    }
  };

  useEffect(() => {
    getData();
    window.setTimeout(() => {
      setIsFirstLoad(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (quests.length > 0) {
      setClueText(quests[currentStep].clue);
      setIntroText(quests[currentStep].intro);
      setWinnerText(quests[currentStep].winner);
    }
  }, [currentStep, quests]);

  useInterval(() => {
    getData();
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
          {!winnerText ? (
            <UiScan className="ui-container__center__searching blinking-slow" />
          ) : null}
        </div>
        <div className="ui-top-left">
          <UiTopLeft />
        </div>
        <div className="ui-top-right">
          <Time />
          {winnerText ? (
            <>
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
              <Glyph currentStep={currentStep} />
              <div className="ui-top-right__winner">found by {winnerText}</div>
            </>
          ) : (
            <>
              <UiTopRightNotFound className="ui-top-right__unknown-glyph blinking-slow" />
              {/* <div className="ui-top-right__unknown-glyph">?</div>
              <UiScan className="ui-top-right__scan blinking-slow" /> */}
            </>
          )}
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
            Founded glyphs ({maxStep}/5)
          </span>

          <UiTopRight />
        </div>
        <div className="ui-center-left">
          <IncomingMessage
            clueText={clueText}
            introText={introText}
            currentStep={currentStep}
            isFinalStep={winnerText === ""}
            isChangingStep={isChangingStep}
            isOpen={isIncomingMessageOpen}
          />
        </div>
        <div className="ui-bottom-left">
          <UiBottomLeft />
        </div>
        <div className="ui-bottom-right">
          <Button
            className="square square-diag"
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
            className="square square-diag--reverse"
            onClick={() => {
              window.open("https://discord.gg/nh8rMTda", "_blank");
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
      </div>
      <PopUpGlyphUpdate
        text="A glyph has been found by TFRERE Youpi !"
        isOpen={isPopUpGlyphUpdateOpen}
        currentStep={currentStep}
        winnerText={winnerText}
        closeFunction={() => {
          setIsPopUpGlyphUpdateOpen(false);
        }}
      />
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
