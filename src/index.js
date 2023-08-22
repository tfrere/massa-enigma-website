/*

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
  
*/
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Suspense, useEffect, useRef, useState } from "react";

import { StrictMode } from "react";
import "./styles/styles.scss";
import { App } from "./App";

import Preloader from "./react-components/Preloader";
import SmartSuspense from "./react-components/SmartSuspense";
import Introduction from "./routes/Introduction";
import Start from "./routes/Start";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/intro",
    element: <Introduction />,
  },
  {
    path: "/app",
    element: <App />,
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    {/* <SmartSuspense
      fallback={<Preloader />}
      fallbackDelayMs={4000}
      fallbackMinDurationMs={4000}
    > */}
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
    {/* </SmartSuspense> */}
  </>
);
