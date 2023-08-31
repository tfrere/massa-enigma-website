import LoadingSvg from "../public/loading.svg";

import TypingText from "../react-components/TypingText";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../react-components/Button";
import { ReactComponent as DiscordIcon } from "../public/discord-icon.svg";
const Introduction = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const changeRoute = () => navigate("/app");

  useEffect(() => {
    window.setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);

  return (
    <div
      className={`screen center introduction introduction--center ${
        !isLoaded ? "introduction--hidden" : ""
      }`}
    >
      <div className="introduction__content">
        <p className="typing-text typing-text--center">
          You are about to enter a game designed by{" "}
          <a href="https://obvious-art.com/" target="_blank">
            Obvious
          </a>{" "}
          and{" "}
          <a href="https://massa.net/" target="_blank">
            Massa
          </a>
          . <br />
          <br />
          To participate, seek the answers to the <span>enigmas</span>, and post
          them on the associated{" "}
          <a target="_blank" href="https://discord.gg/nh8rMTda">
            <DiscordIcon />
            Discord
          </a>{" "}
          channel to earn the associated reward.
          <br />
          <br /> You are<span> not alone</span> on this journey. Only the first
          to find the answer to each <span>enigma</span> will be rewarded.
          <br />
          <br /> Good luck.
        </p>
        <Button
          className={`introduction__content__link`}
          onClick={() => {
            setIsLoaded(false);
            window.setTimeout(() => {
              changeRoute();
            }, 300);
          }}
        >
          START GAME
        </Button>
      </div>
    </div>
  );
};

export default Introduction;
