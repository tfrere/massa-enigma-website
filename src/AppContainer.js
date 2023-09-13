import * as ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";

import { StrictMode } from "react";
import "./styles/styles.scss";
import { App } from "./App";

import Preloader from "./react-components/Preloader";
import Introduction from "./routes/Introduction";

import "./components/GlyphGenerator";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import ImageStep1 from "./public/videos/STEP_1.mp4";
import ImageStep2 from "./public/videos/STEP_2.mp4";
import ImageStep3 from "./public/videos/STEP_3.mp4";
import ImageStep4 from "./public/videos/STEP_4.mp4";
import ImageStep5 from "./public/videos/STEP_5.mp4";
import ImageStep6 from "./public/videos/STEP_6.mp4";
import ImageStep7 from "./public/videos/STEP_7.mp4";

const listDataToFetch = [
  ImageStep1,
  ImageStep2,
  ImageStep3,
  ImageStep4,
  ImageStep5,
  ImageStep6,
  ImageStep7,
];

const fetchVideo = async (url) => {
  const res = await fetch(url, {
    cache: "force-cache",
  });
  return res;
};

const AppContainer = (props) => {
  const [hasFinished, setHasFinished] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const navigate = useNavigate();
  const changeRoute = () => navigate("/");
  const changeRouteIntro = () => navigate("/intro");
  useEffect(() => {
    changeRoute();
    const allPromise = Promise.all(
      listDataToFetch.map((src) => fetchVideo(src))
    );

    allPromise
      .then((values) => {
        // console.log(values); // [resolvedValue1, resolvedValue2]
        window.setTimeout(() => {
          setIsHiding(true);
          window.setTimeout(() => {
            changeRouteIntro();
            setHasFinished(true);
          }, 300);
        }, 3000);
        return values;
      })
      .catch((error) => {
        console.log(error); // rejectReason of any first rejected promise
      });
  }, []);

  return (
    <>
      {/* <link rel="preload" href={ImageStep1} as="video" type="video/mp4" /> */}

      <div className="screen no-responsive">
        <div className="no-responsive__content">
          <h3>Oops... Your screen is too small for the experience !</h3>
        </div>
      </div>
      {!hasFinished ? (
        <Preloader className={`${isHiding ? "preloader--hidden" : ""}`} />
      ) : null}
    </>
  );
};

export default AppContainer;
