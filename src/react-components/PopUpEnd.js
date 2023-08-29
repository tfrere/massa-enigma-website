import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useSound from "use-sound";

import { ReactComponent as UiIncomingMessage } from "../public/ui-incoming-message.svg";

import incomingMessage from "../public/sounds/incoming-message.mp3";
import TypingText from "../react-components/TypingText";

import useKeyPress from "../hooks/useKeyPress";
import Button from "./Button";

export const PopUpEnd = ({
  words,
  speed = 50,
  closeFunction,
  isOpen,
  text,
}) => {
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
          <div className="introduction__content">
            {isOpen ? (
              <TypingText
                className={"typing-text--center"}
                speed={10}
                callback={() => {
                  setHasFinished(true);
                }}
                words={words}
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

export default PopUpEnd;
