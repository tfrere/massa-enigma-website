import { useEffect, useState, useRef } from "react";
import Button from "./Button";

import SoundIconSvg from "../public/sound-icon.svg";
import SoundIconMutedSvg from "../public/sound-icon-muted.svg";
import { createNoise2D, createNoise3D } from "simplex-noise";

console.log();
let time = 0;

const MuteSoundButton = (props) => {
  const barNumber = 12;
  const barChannelGap = 2;
  const width = 150;
  const barChannelWidth = width / barNumber - barChannelGap;
  const height = 150;
  const myCanvas = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const noise2D = createNoise2D();

  const loop = () => {
    if (myCanvas.current == null) return;
    time = time + 1;
    let ctx = myCanvas.current.getContext("2d");

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < barNumber; i++) {
      ctx.fillStyle = "rgba(255,255,255,1)";
      let barSize = Math.abs(noise2D(i, time / 200)) * 90 + 20;
      if (window.Howler) {
        if (window.Howler._muted) barSize = 10;
      }
      ctx.fillRect(
        i * (barChannelWidth + barChannelGap),
        0,
        barChannelWidth,
        barSize
      );
    }
    // ctx.rotate(getRadianAngle(180));
    window.requestAnimationFrame(loop);
  };

  useEffect(() => {
    let raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Button
      className="square square-diag--reverse"
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        } else {
          setIsMuted(!isMuted);
          if (isMuted) {
            if (window.Howler) window.Howler.mute(false);
          } else {
            if (window.Howler) window.Howler.mute(true);
          }
        }
      }}
    >
      <canvas
        style={{ transform: "rotate(180deg)" }}
        ref={myCanvas}
        width={width + "px"}
        height={height + "px"}
      />
      {/* {isMuted ? <img src={SoundIconMutedSvg} /> : <img src={SoundIconSvg} />} */}
    </Button>
  );
};

export default MuteSoundButton;
