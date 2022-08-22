import * as glSys from "./core/gl";
import * as vertexBuffer from "./core/vertex_buffer";
import * as shaderResources from "./core/shader_resources";
import * as loop from "./core/loop";
import * as Input from "./input";
import * as TextureResource from "./resources/texture";
import * as TextResource from "./resources/text";
import * as XMLResource from "./resources/xml";
import * as Audio from "./resources/audio";
import * as Palette from "./palette";
import * as Utils from "./utils/utils";
import Renderable from "./renderables/renderable";
import TextureRenderable from "./renderables/texture.renderable";
import Transform from "./transform";
import Camera from "./camera";
import Scene from "./scene";

/**
 * @module Engine
 */

/**
 * @typedef {Float32Array | number[]} Float32List
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
  Palette.init();
  Input.init();
  Audio.init();
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
  Audio.cleanUp();
  shaderResources.cleanUp();
  vertexBuffer.cleanUp();
  glSys.cleanUp();
}

export {
  Renderable,
  TextureRenderable,
  Transform,
  Camera,
  Scene,
  Utils,
  Input,
  TextResource,
  XMLResource,
  TextureResource,
  Palette,
  Audio,
};
