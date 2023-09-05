import { Suspense, useEffect, useRef, useState } from "react";
import { useInterval } from "../hooks/useInterval";

function changeTimeFormat() {
  let date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Check whether AM or PM
  let newformat = hours >= 12 ? "PM" : "AM";

  // Find current hour in AM-PM Format
  hours = hours % 12;

  // To display "0" as "12"
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + newformat;
}
var before, now, fps;
before = Date.now();
fps = 0;

function addYear(date) {
  date.setFullYear(date.getFullYear() + 1101);
  return date;
}

const TopLeftInfos = ({ isDeeperVisible }) => {
  const [fps, setFps] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [date, setDate] = useState(addYear(new Date()));

  const [time, setTime] = useState("");

  useInterval(() => {
    setTime(changeTimeFormat());
  }, 1000);

  useEffect(() => {
    let be = Date.now(),
      fps = 0,
      info = "";
    let loop = () => {
      let now = Date.now();
      fps = Math.round(1000 / (now - be));
      be = now;
      if (fps > 120) fps = 120;
      setFps(fps);
      requestAnimationFrame(loop);
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setDate(addYear(new Date()));
    };
    requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(loop);
    };
  }, []);

  return (
    <>
      <div className="ui-top-left__infos">
        <div className="ui-top-left__infos__cam blinking-slow"></div>
        <p className="ui-top-left__infos__time">{time}</p>
        <p className="ui-top-left__infos__fps">{fps}</p>
        <p className="ui-top-left__infos__size">
          {width}x{height}
        </p>
        <p className="ui-top-left__infos__date">{date.toDateString()}</p>
        <p className="ui-top-left__infos__hash">
          <span>Checksum </span>
          {isDeeperVisible
            ? `kwwsv=22fud1pdvvd1qhw2;Hnf75[87tFOqWKp7<n4K<oXp2jo|sk041jli`
            : `kwwsv=22fud1pdvvd1qhw2;t|k6KkddPnI]hezMKeQ]:;gy2jo|sk041sqj`}
        </p>
      </div>
    </>
  );
};

export default TopLeftInfos;
