import LoadingSvg from "../public/loading-logo.svg";
import React, { useEffect, useState, useRef } from "react";
import useInterval from "../utils/useInterval.js";

const Preloader = (props) => {
  const sentences = ["Initialize", "Start virtual machine", "Launch server"];
  const [currentSentence, setCurrentSentence] = useState(0);

  useInterval(() => {
    if (currentSentence === sentences.length - 1) {
      setCurrentSentence(0);
    } else {
      setCurrentSentence(currentSentence + 1);
    }
  }, 1250);

  return (
    <div className={`screen center preloader ${props.className}`}>
      <div className="center">
        <img src={LoadingSvg} />
        <p className="preloader__text">{sentences[currentSentence]}</p>
      </div>
    </div>
  );
};

export default Preloader;
