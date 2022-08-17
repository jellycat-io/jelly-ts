import * as vertexBuffer from "./vertex-buffer";
import SimpleShader from "./simple-shader";
import { Color, Palette } from "../utils/palette";

export type GLContext = WebGL2RenderingContext | null;

let mGL: GLContext = null;
let mShader: SimpleShader | null = null;

export function getGL(): GLContext {
  return mGL;
}

export function init(width: number, height: number, canvasID?: string): void {
  initWebGL(width, height, canvasID);
  vertexBuffer.init();
  createShader();
}

export function drawSquare(): void {
  mShader?.activate();
  mGL?.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}

export function clearCanvas(color: Color): void {
  mGL?.clearColor(...Palette[color]);
  mGL?.clear(mGL.COLOR_BUFFER_BIT);
}

function createShader(): void {
  mShader = new SimpleShader(
    "/src/shaders/simple.vs.glsl",
    "/src/shaders/white.fs.glsl"
  );
}

function initWebGL(width: number, height: number, canvasID?: string): void {
  let canvas: HTMLCanvasElement;

  if (canvasID) {
    canvas = document.getElementById(canvasID) as HTMLCanvasElement;

    if (!canvas) {
      throw new Error(`Cannot find a canvas element named ${canvasID}`);
    }
  } else {
    canvas = document.createElement("canvas") as HTMLCanvasElement;
    document.body.appendChild(canvas);
  }

  canvas.width = width;
  canvas.height = height;

  mGL = canvas.getContext("webgl2");

  if (!mGL) {
    throw new Error("Unable to initialize WebGL2");
  }
}

window.onload = () => {
  initWebGL(640, 480, "GLCanvas");
  clearCanvas(Color.TrueBlue);
  drawSquare();
};
