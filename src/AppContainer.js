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

const AppContainer = (props) => {
  const [hasFinished, setHasFinished] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const navigate = useNavigate();
  const changeRoute = () => navigate("/");
  const changeRouteIntro = () => navigate("/intro");
  useEffect(() => {
    changeRoute();
    window.setTimeout(() => {
      setIsHiding(true);
      window.setTimeout(() => {
        changeRouteIntro();
        setHasFinished(true);
      }, 300);
    }, 3000);
  }, []);

  return (
    <>
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
