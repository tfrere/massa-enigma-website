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
// console.log = console.warn = console.error = () => {};

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

function generateRandomHash() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 25; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

window.caesarEncrypt = caesarEncrypt;
window.caesarDecrypt = caesarDecrypt;
window.generateRandomHash = generateRandomHash;

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

// import * as webllm from "@mlc-ai/web-llm";

// // We use label to intentionally keep it simple
// function setLabel(id, text) {
//   const label = document.getElementById(id);
//   if (label == null) {
//     throw Error("Cannot find label " + id);
//   }
//   label.innerText = text;
// }

// async function main() {
//   // create a ChatModule,
//   const chat = new webllm.ChatModule();
//   // This callback allows us to report initialization progress
//   chat.setInitProgressCallback((report) => {
//     setLabel("init-label", report.text);
//   });
//   // You can also try out "RedPajama-INCITE-Chat-3B-v1-q4f32_0"
//   await chat.reload("Llama-2-7b-chat-hf-q4f32_1");

//   const generateProgressCallback = (_step, message) => {
//     setLabel("generate-label", message);
//   };

//   const prompt0 = "What is the capital of Canada?";
//   setLabel("prompt-label", prompt0);
//   const reply0 = await chat.generate(prompt0, generateProgressCallback);
//   console.log(reply0);

//   const prompt1 = "Can you write a poem about it?";
//   setLabel("prompt-label", prompt1);
//   const reply1 = await chat.generate(prompt1, generateProgressCallback);
//   console.log(reply1);

//   console.log(await chat.runtimeStatsText());
// }

// main();
