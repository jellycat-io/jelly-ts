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

  mGL = mCanvas.getContext("webgl2", { alpha: false });

  if (!mGL) {
    throw new Error("Unable to initialize WebGL2");
  }

  // Allows transparency with textures
  mGL.blendFunc(mGL.SRC_ALPHA, mGL.ONE_MINUS_SRC_ALPHA);
  mGL.enable(mGL.BLEND);

  // Set images to flip y axis to match the texture coordinate space
  mGL.pixelStorei(mGL.UNPACK_FLIP_Y_WEBGL, true);
}

/**
 * @description Cleans up WebGL context
 */
export function cleanUp(): void {
  if (!mGL || !mCanvas)
    throw new Error("Engine cleanup: system not initialized");
  mCanvas.style.position = "fixed";
  mCanvas.style.backgroundColor = "rgba(200, 200, 200, 0.5)";
  mGL = null;
  mCanvas = null;
  document.body.innerHTML += "<h1>End of game</h1><h2>GL System shut down</h2>";
}
