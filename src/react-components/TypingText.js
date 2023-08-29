import React, { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import popDownSound from "../public/sounds/switch-off.mp3";
import popUpSound from "../public/sounds/switch-on.mp3";

import keyboardSound0 from "../public/sounds/switch-on.mp3"; // keyboard-0
import keyboardSound1 from "../public/sounds/switch-on.mp3"; // keyboard-1
import keyboardSound2 from "../public/sounds/switch-on.mp3"; // keyboard-2
import keyboardSound3 from "../public/sounds/keyboard-0.mp3"; // keyboard-3
import keyboardSound4 from "../public/sounds/pop-down.mp3"; // keyboard-4
import keyboardSound5 from "../public/sounds/pop-down.mp3"; // keyboard-5
import keyboardSound6 from "../public/sounds/pop-down.mp3"; // keyboard-6

let splitString = (inputString) => {
  const regex = /(<.*?>.*?<\/.*?>)/;
  let array = [];
  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] == "<") {
      let tag = regex.exec(inputString.substring(i, inputString.length))[0];
      array.push(tag);
      i += tag.length;
      array.push(" ");
    } else {
      array.push(inputString[i]);
    }
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i] == "*") {
      array[i] = "<br/>";
    }
    if (array[i] == "€") {
      array[i] = "";
    }
  }
  return array;
};
// Utility helper for random number generation
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const useRandomInterval = (callback, minDelay, maxDelay) => {
  const timeoutId = React.useRef(null);
  const savedCallback = React.useRef(callback);
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  React.useEffect(() => {
    let isEnabled =
      typeof minDelay === "number" && typeof maxDelay === "number";
    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay);
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current();
          handleTick();
        }, nextTickAt);
      };
      handleTick();
    }
    return () => window.clearTimeout(timeoutId.current);
  }, [minDelay, maxDelay]);
  const cancel = React.useCallback(function () {
    window.clearTimeout(timeoutId.current);
  }, []);
  return cancel;
};

export const TypingText = ({ words, speed = 50, callback, className }) => {
  let array = splitString(words);

  const [charIndex, setCharIndex] = useState(0);
  const [hasStoped, setHasStoped] = useState(false);
  const [currentWords, setCurrentWords] = useState("");

  const [playKeyboardSound0] = useSound(keyboardSound0, {
    playbackRate: 1,
    volume: 0.05,
    interrupt: true,
  });
  const [playKeyboardSound2] = useSound(keyboardSound2, {
    playbackRate: 1.2,
    volume: 0.05,
    interrupt: true,
  });

  useRandomInterval(
    () => {
      if (charIndex <= array.length) {
        setCharIndex(charIndex + 1);
      } else {
        setHasStoped(true);
      }
    },
    speed,
    speed + 50
  );

  useEffect(() => {
    if (array[charIndex]) {
      const newWords = array.slice(0, charIndex + 1).join("");
      setCurrentWords(newWords);
      // si c'est un tag
      if (array[charIndex][0] == "<") {
        playKeyboardSound0();
      } else {
        if (!array[charIndex] == " ") {
          playKeyboardSound2();
        }
      }
    }
  }, [charIndex]);

  useEffect(() => {
    if (hasStoped) {
      callback();
    }
  }, [hasStoped]);

  useEffect(() => {
    function handleClick(event) {
      const newWords = array.slice(0, array.length).join("");
      setHasStoped(true);
      setCharIndex(array.length);
      setCurrentWords(newWords);
      playKeyboardSound2();
      event.stopPropagation();
      event.preventDefault();
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <p
      className={`typing-text ${className}`}
      dangerouslySetInnerHTML={{
        __html:
          currentWords + (!hasStoped ? "<span class='rectangle'>▮</span>" : ""),
      }}
    ></p>
  );
};

export default TypingText;
