/**
 * @module GL
 */

let mCanvas: HTMLCanvasElement | null = null;
let mGL: WebGL2RenderingContext | null = null;

/**
 * @description Gets the WebGL context
 * @returns {WebGL2RenderingContext | null} the WebGL context if it exists
 */
export function get(): WebGL2RenderingContext | null {
  return mGL;
}

/**
 *
 * @param {number} width The canvas width
 * @param {number} height The canvas height
 * @param {string} [canvasID] The canvas tag id
 */
export function init(width: number, height: number, canvasID?: string): void {
  if (canvasID) {
    mCanvas = document.getElementById(canvasID) as HTMLCanvasElement;

    if (!mCanvas) {
      throw new Error(`Cannot find a canvas element named ${canvasID}`);
    }
  } else {
    mCanvas = document.createElement("canvas") as HTMLCanvasElement;
    document.body.appendChild(mCanvas);
  }

  mCanvas.width = width;
  mCanvas.height = height;

  mGL = mCanvas.getContext("webgl2");

  if (!mGL) {
    throw new Error("Unable to initialize WebGL2");
  }
}

/**
 * @description Cleans up WebGL context
 */
export function cleanUp(): void {
  if (!mGL || !mCanvas)
    throw new Error("Engine cleanup: system not initialized");

  mGL = null;
  mCanvas = null;
}
