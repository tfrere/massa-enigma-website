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


  Maybe caesar could help you to start

  caesarEncrypt("hello world");
  caesarDecrypt("khoor#zruog");
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

const runEvent = (e) => {
  document.mouseX = e.clientX;
  document.mouseY = e.clientY;
};

document.addEventListener("mousemove", runEvent);

const caesarEncrypt = (text, shift = 3) => {
  let encryptedText = "";
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    let encryptedChar = (charCode + shift) % 128;
    if (encryptedChar < 0) encryptedChar += 128;
    encryptedText += String.fromCharCode(encryptedChar);
  }
  return encryptedText;
};

const caesarDecrypt = (text, shift = 3) => {
  return caesarEncrypt(text, -shift);
};

window.caesarEncrypt = caesarEncrypt;
window.caesarDecrypt = caesarDecrypt;

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
