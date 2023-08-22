import React, { useState, useEffect, useRef } from "react";
import useSound from "use-sound";

import { ReactComponent as UiIncomingMessage } from "../public/ui-incoming-message.svg";

import incomingMessage from "../public/sounds/incoming-message.mp3";

import Button from "./Button";
import PopUpMessage from "./PopUpMessage";

export const IncomingMessage = ({
  words,
  isOpen,
  clueText,
  introText,
  currentStep,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [playIncomingMessage] = useSound(incomingMessage, {
    playbackRate: 1,
    volume: 0.05,
    interrupt: true,
  });

  const classNames = isModalOpen
    ? "incoming-message incoming-message--hidden"
    : "incoming-message";

  useEffect(() => {
    playIncomingMessage();
    setIsFirstLoad(false);
  }, []);

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
      <div className="incoming-message__massa-logo"></div>
      <Button
        className="incoming-message__read-more-button"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        read more
      </Button>
    </div>
  );
};

export default IncomingMessage;
