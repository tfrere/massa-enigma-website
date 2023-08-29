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

const TopLeftInfos = () => {
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
          <span>Hash </span>
          {`kwwsv=22wiuhuh1jlwkxe1lr2pdvvd0hqljpd0zhevlwh0dqvzhuv25d4gd89f94g7d75783<i:5;d<g:<8h532jo|sk041sqj`}
          <span
            id="deeper"
            className="hidden"
          >{`kwwsv=22wiuhuh1jlwkxe1lr2pdvvd0hqljpd0zhevlwh0dqvzhuv2e9g:9:g5i;hg8g54d77e3h8;;99;3fe<2jo|sk041jli`}</span>
        </p>
      </div>
    </>
  );
};

export default TopLeftInfos;
