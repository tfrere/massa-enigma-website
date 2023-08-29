import React, { useEffect, useState, useRef } from "react";
import { config } from "./GlyphGenerator";

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
      // S
      config.angle = 142;
      config.skewAngle = 12;
      config.poly = 1;
      break;
    case 1:
      // A
      config.angle = 24;
      config.skewAngle = 4.5;
      config.poly = 2;
      break;
    case 2:
      // M
      config.angle = 24;
      config.skewAngle = 6;
      config.poly = 3;
      break;
    case 3:
      // S
      config.angle = 37;
      config.skewAngle = 86;
      config.poly = 4;
      break;
    case 4:
      // A
      config.angle = 37;
      config.skewAngle = 86;
      config.poly = 5;
      break;
    case 5:
      // S
      config.angle = 142;
      config.skewAngle = 12;
      config.poly = 5;
      break;
  }
  document.fract.set(config);
};

export default function Glyph({ step, className, size = 150 }) {
  const canvasRef = useRef();

  const loop = () => {
    if (canvasRef.current) {
      var canvas = canvasRef.current;
      var buffer = document.createElement("canvas");
      const width = size;
      const height = size;
      canvas.width = width;
      canvas.height = height;
      var bufferctx = document.getElementById("canvas-glyph").getContext("2d");

      var imageData = bufferctx.getImageData(0, 0, width, height);
      var data = imageData.data;

      removeBlack(data, imageData, bufferctx);
      canvas.getContext("2d").putImageData(imageData, 0, 0);
    }
    window.requestAnimationFrame(loop);
  };

  useEffect(() => {
    changeGlyph(config, step);
  }, [step]);

  useEffect(() => {
    let raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas className={className} ref={canvasRef} />;
}
