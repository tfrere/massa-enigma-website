import React, { useState, useEffect, useRef } from "react";
import useSound from "use-sound";

import { ReactComponent as UiIncomingMessage } from "../public/ui-incoming-message.svg";
import { ReactComponent as ReadMoreButton } from "../public/read-more-button.svg";
import { ReactComponent as UiCross } from "../public/ui-cross.svg";

import clickSound from "../public/sounds/switch-on.mp3";

import Button from "./Button";
import PopUpMessage from "./PopUpMessage";

export const IncomingMessage = ({
  words,
  isOpen,
  clueText,
  introText,
  currentStep,
  isFinalStep,
  isHidden,
  closeFunction,
  openFunction,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const [playHoverSound] = useSound(clickSound, {
    playbackRate: 1,
    volume: 0.02,
    interrupt: true,
  });

  const classNames = `incoming-message ${
    isModalOpen || isHidden ? "incoming-message--hidden" : ""
  }`;

  useEffect(() => {
    window.setTimeout(() => {
      setIsModalOpen(isOpen);
    }, 500);
  }, [isOpen]);

  return (
    <div className={classNames}>
      <UiCross className="incoming-message__ui-cross" />
      <UiCross className="incoming-message__ui-cross-bot" />
      <PopUpMessage
        text={introText}
        isOpen={isModalOpen}
        closeFunction={() => {
          setIsModalOpen(false);
          closeFunction();
        }}
      />
      <div className="incoming-message__words">
        <UiIncomingMessage />

        <div
          dangerouslySetInnerHTML={{
            __html: "..." + clueText,
          }}
        ></div>
      </div>
      <ReadMoreButton
        className="incoming-message__button"
        onMouseOver={() => {
          playHoverSound();
        }}
        onMouseOut={() => {
          playHoverSound();
        }}
        onClick={() => {
          setIsModalOpen(true);
          openFunction();
        }}
      />
    </div>
  );
};

export default IncomingMessage;
