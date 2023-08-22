import React, { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  Float,
  Edges,
  Plane,
  MeshDistortMaterial,
  Html,
} from "@react-three/drei";
import { MeshBasicMaterial } from "three";

import fract, { config } from "./GlyphGenerator.js";
import useInterval from "../utils/useInterval.js";

var removeBlack = function (data, imageData, bufferctx) {
  for (var i = 0; i < data.length; i += 4) {
    if (data[i] + data[i + 1] + data[i + 2] < 500) {
      data[i + 3] = 0; // alpha
    }
  }
  bufferctx.putImageData(imageData, 0, 0);
};

const changeGlyph = (config, step) => {
  switch (step) {
    case 0:
      // M
      config.angle = 24;
      config.skewAngle = 6;
      config.poly = 3;
      break;
    case 1:
      // A
      config.angle = 24;
      config.skewAngle = 4.5;
      config.poly = 2;
      break;
    case 2:
      // S
      config.angle = 142;
      config.skewAngle = 12;
      config.poly = 1;
      break;
    case 3:
      // S
      config.angle = 142;
      config.skewAngle = 12;
      config.poly = 1;
      break;
    case 4:
      // A
      config.angle = 24;
      config.skewAngle = 4.5;
      config.poly = 2;
      break;
    case 5:
      // S
      config.angle = 142;
      config.skewAngle = 12;
      config.poly = 1;
      break;
  }
  fract.set(config);
};

export default function Glyph(props) {
  const canvasRef = useRef();
  const [hasStarted, setHasStarted] = useState(false);

  const initFract = () => {
    console.log("initFract");
    fract.init(config);
    changeGlyph(config, props.currentStep);
    fract.animate.toggle();
    fract.trails.toggle();
    updateGlyph();
  };

  useEffect(() => {
    window.setTimeout(() => {
      initFract();
      setHasStarted(true);
    }, 1000);
  }, []);

  const updateGlyph = () => {
    var canvas = canvasRef.current;
    var buffer = document.createElement("canvas");
    buffer.width = canvas.width;
    buffer.height = canvas.height;
    var bufferctx = canvasRef.current.getContext("2d");

    bufferctx.drawImage(new Image(canvas.width, canvas.height), 0, 0);

    var imageData = bufferctx.getImageData(0, 0, buffer.width, buffer.height);
    var data = imageData.data;

    removeBlack(data, imageData, bufferctx);
    canvas.getContext("2d").drawImage(buffer, 0, 0);
  };

  if (canvasRef.current) changeGlyph(config, props.currentStep);

  useFrame(({ clock }) => {
    if (hasStarted && canvasRef.current) updateGlyph();
  });

  return (
    <Html fullscreen portal={props.htmlPortalRef}>
      <canvas
        className="ui-top-right__glyph"
        id="canvas-glyph"
        ref={canvasRef}
      />
    </Html>
  );
}
