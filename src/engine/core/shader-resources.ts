/**
 * @module ShaderResources
 */

import SimpleShader from "../simple-shader";

const kSimpleVS = "src/shaders/simple.vs.glsl";
const kSimpleFS = "src/shaders/simple.fs.glsl";
let mConstColorShader: SimpleShader | null = null;

/**
 * @description Initializes shaders
 * @returns {void} nothing
 */
export function init() {
  createShaders();
}

/**
 * @description Gets the core shader
 * @returns {SimpleShader | null} the core shader
 */
export function getConstColorShader(): SimpleShader | null {
  return mConstColorShader;
}

/**
 * @description Creates the core shader
 * @returns {void} nothing
 */
function createShaders(): void {
  mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
}
