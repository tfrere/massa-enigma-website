import LoadingSvg from "../public/loading.svg";

import TypingText from "../react-components/TypingText";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClientFactory,
  Args,
  Client,
  bytesToStr,
  DefaultProviderUrls,
} from "@massalabs/massa-web3";
import Button from "../react-components/Button";
import { ReactComponent as DiscordIcon } from "../public/discord-icon.svg";
const Introduction = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [gameHasAlreadyStarted, setGameHasAlreadyStarted] = useState(false);
  const navigate = useNavigate();
  const changeRoute = () => navigate("/app");

  const getData = async () => {
    let questsData;
    const testnetClient = await ClientFactory.createDefaultClient(
      DefaultProviderUrls.BUILDNET,
      true // retry failed requests
    );

    const res = await testnetClient.smartContracts().readSmartContract({
      maxGas: BigInt(10000000),
      targetAddress: "AS1TdyVHk9b7EkqfzBo5zjr9GJT24tZbnSQnq7yMCm1gn1chK5Di",
      targetFunction: "getQuest",
      parameter: [],
    });

    questsData = JSON.parse(bytesToStr(res.returnValue));
    if (questsData.length > 1) setGameHasAlreadyStarted(true);
  };

  useEffect(() => {
    getData();
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
          To participate, seek the answers to the <span>Enigmas</span>, and post
          them on the associated{" "}
          <a target="_blank" href="https://discord.gg/massa">
            <DiscordIcon />
            Discord
          </a>{" "}
          channel <span>#counterfeit-reality</span> to earn the associated
          reward.
          <br />
          <br /> You are<span> not alone</span> on this journey. Only the first
          to find the answer to each <span>Enigma</span> will be rewarded. But
          remember, <span>shared strength</span> is our greatest asset.
          {gameHasAlreadyStarted ? (
            <>
              <br />
              <br />
              This game has already started.
              <br /> Check the discord for quest advancement.
            </>
          ) : null}
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
