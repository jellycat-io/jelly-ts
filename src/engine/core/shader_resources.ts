import * as TextResource from "../resources/text";
import * as ResourceMap from "./resource_map";
import Shader from "../shaders/shader";
import TextureShader from "../shaders/texture.shader";
import SpriteShader from "../shaders/sprite.shader";

/**
 * @module ShaderResources
 */

const kSimpleVS = "src/shaders/simple.vs.glsl";
const kSimpleFS = "src/shaders/simple.fs.glsl";
const kTextureVS = "src/shaders/texture.vs.glsl";
const kTextureFS = "src/shaders/texture.fs.glsl";

let mConstColorShader: Shader | null = null;
let mTextureShader: TextureShader | null = null;
let mSpriteShader: SpriteShader | null = null;

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
      TextResource.load(kTextureVS),
      TextResource.load(kTextureFS),
    ]);
    resolve();
  }).then(() => createShaders());

  ResourceMap.pushPromise(loadPromise);
}

/**
 * @description Gets the core shader
 * @returns {Shader | null} the core shader
 */
export function getConstColorShader(): Shader | null {
  return mConstColorShader;
}

/**
 * @description Gets the texture shader
 * @returns {TextureShader | null} the texture shader
 */
export function getTextureShader(): TextureShader | null {
  return mTextureShader;
}

/**
 * @description Gets the sprite shader
 * @returns {SpriteShader | null} the sprite shader
 */
export function getSpriteShader(): SpriteShader | null {
  return mSpriteShader;
}

/**
 * @description Creates the core shader
 * @returns {void} nothing
 */
function createShaders(): void {
  mConstColorShader = new Shader(kSimpleVS, kSimpleFS);
  mTextureShader = new TextureShader(kTextureVS, kTextureFS);
  mSpriteShader = new SpriteShader(kTextureVS, kTextureFS);
}

/**
 * @description Cleans up shaders
 */
export function cleanUp(): void {
  mConstColorShader?.cleanUp();
  mTextureShader?.cleanUp();
  mSpriteShader?.cleanUp();
  TextResource.unload(kSimpleVS);
  TextResource.unload(kSimpleFS);
  TextResource.unload(kTextureVS);
  TextResource.unload(kTextureFS);
}
