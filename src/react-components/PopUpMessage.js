import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useSound from "use-sound";

import { ReactComponent as UiIncomingMessage } from "../public/ui-big-incoming-message.svg";

import incomingMessage from "../public/sounds/incoming-message.mp3";
import TypingText from "../react-components/TypingText";

import useKeyPress from "../hooks/useKeyPress";
import Button from "./Button";

export const PopUpMessage = ({
  words,
  speed = 50,
  closeFunction,
  isOpen,
  text,
}) => {
  const [hasFinished, setHasFinished] = useState(false);

  useKeyPress("Escape", () => {
    closeFunction();
  });

  useEffect(() => {
    if (isOpen == false) {
      setHasFinished(false);
    }
  }, [isOpen]);

  return (
    <>
      {createPortal(
        <div
          className={`pop-up-message ${isOpen ? "pop-up-message__open" : ""}`}
        >
          <div className="pop-up-message__logo"></div>
          <div className="introduction__content ">
            <UiIncomingMessage />
            {isOpen ? (
              <TypingText
                speed={10}
                callback={() => {
                  setHasFinished(true);
                }}
                words={text}
                // words={`Year 3124. Welcome to the land of <span>Counterfeit Reality</span>.Privacy is non-existent. Every human being gets an eye-plugged augmented reality device when they are born. What you see here is what they want you to see. However, a group of crypto activists called the <span>See-Through</span> refuses to bow to this oppression. They seek to resist by developing <span>Glyphs</span> which bring down the layers of augmented reality. The </span>Glyphs</span> are hidden, and will be seen only by those who are truly willing. Will you join the resistance? Crypto-related bounties are reserved to welcome new recruits. Julius cesar said: “Men in general are quick to believe that which they wish to be true.”`}
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
};

export default PopUpMessage;

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
