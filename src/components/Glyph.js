import React, { useEffect, useState, useRef } from "react";

var removeBlack = function (data, imageData, bufferctx) {
  for (var i = 0; i < data.length; i += 4) {
    if (data[i] + data[i + 1] + data[i + 2] < 500) {
      data[i + 3] = 0; // alpha
    }
  }
  bufferctx.putImageData(imageData, 0, 0);
};

export default function Glyph({ step, className, size = 160 }) {
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
    let raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas className={className} ref={canvasRef} />;
}
