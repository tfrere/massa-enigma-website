import LoadingSvg from "../public/loading.svg";

import TypingText from "../react-components/TypingText";
import { div } from "react-router-dom";
import { useState } from "react";
import useKeyPress from "../hooks/useKeyPress";
import { useNavigate } from "react-router-dom";

const Start = (props) => {
  const [hasFinished, setHasFinished] = useState(false);
  const navigate = useNavigate();
  const changeRoute = () => navigate("/intro");
  useKeyPress("Enter", () => {
    changeRoute();
  });

  return (
    <div
      className="screen center introduction"
      onClick={() => {
        changeRoute();
      }}
    >
      <div className="introduction__content">
        <p className="introduction__content__link text-center blinking-slow">
          CLICK OR PRESS <span className="space-key">ENTER</span> TO START GAME
        </p>
      </div>
    </div>
  );
};

export default Start;
