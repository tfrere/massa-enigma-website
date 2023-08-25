import { Suspense, useEffect, useRef, useState } from "react";

const MousePosition = () => {
  const [text, setText] = useState("x: 0  y: 0");

  useEffect(() => {
    document.addEventListener("mousemove", runEvent);

    function runEvent(e) {
      e.preventDefault();
      setText(`x ${e.offsetX}  y ${e.offsetY}`);
    }
  }, []);

  return (
    <>
      <div className="ui-center__mouse-infos">
        <p>{text}</p>
      </div>
    </>
  );
};

export default MousePosition;
