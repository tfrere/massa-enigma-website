import LoadingSvg from "../public/loading.svg";

import TypingText from "../react-components/TypingText";
import { useState } from "react";
import useKeyPress from "../hooks/useKeyPress";
import { useNavigate } from "react-router-dom";

const Introduction = (props) => {
  const [hasFinished, setHasFinished] = useState(false);
  const navigate = useNavigate();
  const changeRoute = () => navigate("/app");
  useKeyPress("Enter", () => {
    changeRoute();
  });

  return (
    <div className="screen center introduction" to="/app">
      <div className="introduction__content">
        <TypingText
          speed={10}
          callback={() => {
            window.setTimeout(() => {
              setHasFinished(true);
            }, 500);
          }}
          words="You are about to enter a game designed by <a href='https://obvious-art.com/' target='_blank'>Obvious</a>and <a href='https://massa.net/' target='_blank'>Massa</a>. To participate, seek the answers to the <span>enigmas</span>, and share them on <a target='_blank' href='https://discord.gg/nh8rMTda'>Discord</a> to earn the associated reward."
        />
        <p
          className={`introduction__content__link ${
            hasFinished ? "blinking-slow" : ""
          }`}
        >
          CLICK OR PRESS <span className="space-key">ENTER</span> TO START
        </p>
      </div>
    </div>
  );
};

export default Introduction;
