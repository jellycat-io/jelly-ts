import "./style.css";
import * as simpleShader from "./shader-support";
import * as vertexBuffer from "./vertex-buffer";

export type GLContext = WebGL2RenderingContext | null;

let mGL: GLContext = null;

export function getGL(): GLContext {
  return mGL;
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

  mGL.clearColor(0.0, 0.8, 0.0, 1.0);

  vertexBuffer.init();
  simpleShader.init("VertexShader", "FragmentShader");
}

function drawSquare(): void {
  simpleShader.activate();
  mGL?.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}

function clearCanvas(): void {
  mGL?.clear(mGL.COLOR_BUFFER_BIT);
}

window.onload = () => {
  initWebGL(640, 480, "GLCanvas");
  clearCanvas();
  drawSquare();
};
