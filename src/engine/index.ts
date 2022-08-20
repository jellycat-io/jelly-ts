import * as glSys from "./core/gl";
import * as vertexBuffer from "./core/vertex-buffer";
import * as shaderResources from "./core/shader-resources";
import * as loop from "./core/loop";
import * as Input from "./input";
import * as TextResource from "./resources/text";
import * as XMLResource from "./resources/xml";
import Renderable from "./renderable";
import Transform from "./transform";
import Camera from "./camera";
import Scene from "./scene";
import { Palette, Color } from "./utils/palette";

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
 * @param {Float32List} color The canvas background color
 */
export function clearCanvas(color: Float32List): void {
  const gl = glSys.get();
  const [r, g, b, a] = color;
  gl?.clearColor(r, g, b, a);
  gl?.clear(gl.COLOR_BUFFER_BIT);
}

/**
 * @description Gets the WebGL context
 * @returns {WebGL2RenderingContext | null} the WebGL context
 */
export function getGL(): WebGL2RenderingContext | null {
  return glSys.get();
}

/**
 * @description Cleans up the core engine
 */
export function cleanUp(): void {
  loop.cleanUp();
  Input.cleanUp();
  shaderResources.cleanUp();
  vertexBuffer.cleanUp();
  glSys.cleanUp();
}

export {
  Renderable,
  Transform,
  Camera,
  Scene,
  Input,
  TextResource,
  XMLResource,
  Palette,
  Color,
};
