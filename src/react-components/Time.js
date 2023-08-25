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

const Time = () => {
  const [text, setText] = useState("");

  useInterval(() => {
    setText(changeTimeFormat());
  }, 1000);

  return (
    <>
      <div className="ui-top-right__time">
        <p>{text}</p>
      </div>
    </>
  );
};

export default Time;
