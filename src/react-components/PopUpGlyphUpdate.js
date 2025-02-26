import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useSound from "use-sound";

import { ReactComponent as UiIncomingMessage } from "../public/ui-incoming-message.svg";

import incomingMessage from "../public/sounds/incoming-message.mp3";
import TypingText from "../react-components/TypingText";

import useKeyPress from "../hooks/useKeyPress";
import Button from "./Button";

import Glyph from "../components/Glyph";

export function PopUpGlyphUpdate({
  words,
  speed = 50,
  closeFunction,
  isOpen,
  text,
  winnerText,
  currentStep,
}) {
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    if (isOpen == false) {
      setHasFinished(false);
    }
  }, [isOpen]);

  return (
    <>
      {createPortal(
        <div
          className={`pop-up-message introduction--center ${
            isOpen ? "pop-up-message__open" : ""
          }`}
        >
          <div className="introduction__content ">
            <Glyph
              className="popup-glyph"
              size={150}
              currentStep={currentStep}
            />
            {isOpen ? (
              <TypingText
                speed={10}
                className="typing-text--center"
                callback={() => {
                  window.setTimeout(() => {
                    setHasFinished(true);
                  }, 500);
                }}
                words={`The <span>${currentStep}th glyph</span> has been found. ** Another layer of lies disappears. *Congrats to <span>${winnerText}</span> on finding the glyph !`}
              />
            ) : (
              <></>
            )}
            <Button
              className={`${
                hasFinished ? "" : "hidden"
              } introduction__content__link button--no-margin`}
              onClick={() => {
                closeFunction();
              }}
            >
              CLOSE MESSAGE
            </Button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default PopUpGlyphUpdate;

// import LoadingSvg from "../public/loading.svg";

// import TypingText from "../react-components/TypingText";
// import { useState } from "react";
// import useKeyPress from "../hooks/useKeyPress";
// import { useNavigate } from "react-router-dom";

// const Introduction = (props) => {
//   const [hasFinished, setHasFinished] = useState(false);
//   const navigate = useNavigate();
//   const changeRoute = () => navigate("/app");
//   useKeyPress("Enter", () => {
//     changeRoute();
//   });

//   return (
//     <div className="screen center introduction" to="/app">
//       <div className="introduction__content">
//         <TypingText
//           speed={10}
//           callback={() => {
//             window.setTimeout(() => {
//               setHasFinished(true);
//             }, 500);
//           }}
//           words="You are about to enter a game designed by <a href='https://obvious-art.com/' target='_blank'>Obvious</a>and <a href='https://massa.net/' target='_blank'>Massa</a>. To participate, seek the answers to the <span>enigmas</span>, and share them on <a target='_blank' href='https://discord.gg/massa'>Discord</a> to earn the associated reward."
//         />
//         <p
//           className={`introduction__content__link ${
//             hasFinished ? "blinking-slow" : ""
//           }`}
//         >
//           CLICK OR PRESS <span className="space-key">ENTER</span> TO START
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Introduction;
