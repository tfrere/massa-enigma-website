import LoadingSvg from "../public/loading-logo.svg";
import React, { useEffect, useState, useRef } from "react";
import useInterval from "../utils/useInterval.js";

const Preloader = (props) => {
  const [currentDots, setCurrentDots] = useState("...");

  useInterval(() => {
    if (currentDots.length === 3) {
      setCurrentDots(".");
    } else {
      setCurrentDots(currentDots + ".");
    }
  }, 400);

  return (
    <div className={`screen center preloader ${props.className}`}>
      <div>
        <img src={LoadingSvg} />
        <p className="preloader__text">Loading{currentDots}</p>
      </div>
    </div>
  );
};

export default Preloader;
