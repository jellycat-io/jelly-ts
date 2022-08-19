import * as glSys from "./core/gl";
import * as vertexBuffer from "./core/vertex-buffer";
import * as shaderResources from "./core/shader-resources";
import * as Input from "./input";
import Renderable from "./renderable";
import Transform from "./transform";
import Camera from "./camera";
import { GLColorTuple } from "../utils/palette";

/**
 * @module Engine
 */

/**
 * @description Initializes the engine
 * @param {number} width The canvas width
 * @param {number} height The canvas height
 * @param {string} [canvasID] The canvas tag ID
 */
export function init(width: number, height: number, canvasID?: string) {
  glSys.init(width, height, canvasID);
  vertexBuffer.init();
  shaderResources.init();
  Input.init();
}

/**
 * @description Clears the canvas before next render
 * @param {GLColorTuple} color The canvas background color
 */
export function clearCanvas(color: GLColorTuple): void {
  const gl = glSys.get();
  gl?.clearColor(...color);
  gl?.clear(gl.COLOR_BUFFER_BIT);
}

/**
 * @description Gets the WebGL context
 * @returns {WebGL2RenderingContext | null} the WebGL context
 */
export function getGL(): WebGL2RenderingContext | null {
  return glSys.get();
}

export { Renderable, Transform, Camera, Input };
