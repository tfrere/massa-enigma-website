console.log(`
           ,▄▄██▀▀▀▀▀▀▀▀██▄▄            
        ▄█▀▀┘              └╙▀█▄        
  ▐█▀████▀▀▀▀▀▀▀▀▀▀██▀▀▀▀▀▀▀▀▀▀████▀█▌  
  ╟▌█▀¬ ╙█▄        ╟▌        ▄█▀  ▀█╟▌  
  ╟█┴     └▀█▄     ╟▌     ▄█▀└     ╙█▌  
 ╓█▌         ╙▀█▄█▀╙╙▀█▄█▀╙         ╟█▄ 
 █╟█▄▄▄▄▄▄▄▄▄▄▄█▀▀▄ ,▄▀╚█▄▄▄▄▄▄▄▄▄▄▄╫▌█ 
╟▌╟▌           ╟µ  ╟▌  ▐▌           ╟▌╟▌
█─╟▌            ▀▄╓╟▌╓▄▀            ╟▌▐█
█─╟▌              ─╟▌─              ╟▌]█
╟▌╟▌              ╓██▄              ╟▌▐▌
 █╟▌            ,█▀╟▌╙█             ╟▌█⌐
 ╙█▌           ▄█─ ╟▌  ▀▄           ╟█▀ 
  ║█         ╓█╙   ╟▌   ╙█▄        ,█▌  
  ╟▌█▄      █▀     ╟▌     ╙█      ▄█╟▌  
  ╟▌ ╙▀▄  ▄█└      ╟▌      └█▄ ,▄█╙ ╟▌  
  ╟▌    ╙██▄       ╟▌       ╓██▀¬   ╟▌  
  ╟█▄▄▄▄▄▄▄▄████▄▄▄██▄▄▄████▄▄▄▄▄▄▄▄╟▌


  Will you find the glyphs ?...
`);

// remove the logs
// console.log = function () {};

import * as ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { createRoot } from "react-dom/client";
import { Suspense, useEffect, useRef, useState } from "react";

import { StrictMode } from "react";
import "./styles/styles.scss";
import { App } from "./App";

import Preloader from "./react-components/Preloader";
import Introduction from "./routes/Introduction";
import AppContainer from "./AppContainer";

import "./components/GlyphGenerator";

document.addEventListener("mousemove", runEvent);

function runEvent(e) {
  document.mouseX = e.clientX;
  document.mouseY = e.clientY;
}

createRoot(document.getElementById("root")).render(
  <>
    <Router>
      <AppContainer />
      <Routes>
        <Route path="/intro" element={<Introduction />} />
        <Route path="/app" element={<App />} />
        <Route path="/" element={<></>} />
      </Routes>
    </Router>
  </>
);
