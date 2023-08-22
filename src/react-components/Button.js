import React, { useState, useEffect, useRef } from "react";
import useSound from "use-sound";

import clickSound from "../public/sounds/switch-on.mp3";

export const Button = (props) => {
  const [playClickSound] = useSound(clickSound, {
    playbackRate: 1,
    volume: 0.1,
    interrupt: true,
  });

  const [playHoverSound] = useSound(clickSound, {
    playbackRate: 1,
    volume: 0.02,
    interrupt: true,
  });

  const onClick = () => {
    playClickSound();
    if (props.onClick) props.onClick();
  };

  return (
    <button
      {...props}
      className={props.className + " button"}
      onClick={() => {
        onClick();
      }}
      onMouseOver={() => {
        playHoverSound();
      }}
      onMouseOut={() => {
        playHoverSound();
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;
