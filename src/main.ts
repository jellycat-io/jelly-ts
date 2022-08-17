"use strict";

import "./style.css";

type GLContext = WebGL2RenderingContext | WebGLRenderingContext | null;

let gl: GLContext = null;

const getGL = (): GLContext => gl;

const initWebGL = (canvasID: string): void => {
  const canvas = document.getElementById(canvasID) as HTMLCanvasElement;

  gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

  if (!gl) return;

  gl.clearColor(0.0, 0.8, 0.0, 1.0);
};

const clearCanvas = (): void => {
  if (!gl) return;

  gl.clear(gl.COLOR_BUFFER_BIT);
};
