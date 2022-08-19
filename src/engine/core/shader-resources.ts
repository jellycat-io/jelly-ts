import * as TextResource from "../resources/text";
import * as ResourceMap from "./resource-map";
import SimpleShader from "../simple-shader";

/**
 * @module ShaderResources
 */

const kSimpleVS = "src/shaders/simple.vs.glsl";
const kSimpleFS = "src/shaders/simple.fs.glsl";
let mConstColorShader: SimpleShader | null = null;

/**
 * @description Initializes shaders
 * @returns {void} nothing
 */
export function init() {
  // eslint-disable-next-line no-async-promise-executor
  const loadPromise = new Promise<void>(async (resolve) => {
    await Promise.all([
      TextResource.load(kSimpleVS),
      TextResource.load(kSimpleFS),
    ]);
    resolve();
  }).then(() => createShaders());

  ResourceMap.pushPromise(loadPromise);
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
