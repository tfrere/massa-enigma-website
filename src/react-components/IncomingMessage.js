import React, { useState, useEffect, useRef } from "react";
import useSound from "use-sound";

import { ReactComponent as UiIncomingMessage } from "../public/ui-incoming-message.svg";
import { ReactComponent as ReadMoreButton } from "../public/read-more-button.svg";

import incomingMessage from "../public/sounds/incoming-message-2.mp3";
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
  isChangingStep,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playIncomingMessage] = useSound(incomingMessage, {
    playbackRate: 1,
    volume: 0.05,
    interrupt: true,
  });
  const [playHoverSound] = useSound(clickSound, {
    playbackRate: 1,
    volume: 0.02,
    interrupt: true,
  });

  const classNames = `incoming-message ${
    isModalOpen || isChangingStep ? "incoming-message--hidden" : ""
  }`;

  // if (isFinalStep) {
  //   playIncomingMessage();
  // }

  return (
    <div className={classNames}>
      <UiIncomingMessage />
      <PopUpMessage
        text={introText}
        isOpen={isModalOpen}
        closeFunction={() => {
          setIsModalOpen(false);
        }}
      />
      <div className="incoming-message__words">{clueText}</div>
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
        }}
      />
    </div>
  );
};

export default IncomingMessage;
