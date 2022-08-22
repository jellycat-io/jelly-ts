import * as map from "../core/resource-map";
import * as glSys from "../core/gl";
import { TextureFilter } from "../utils/utils";

/**
 * @module TextureResource
 */

// Resource map functions refs
export const has = map.has;
export const get = map.get;

/**
 * @class
 * @classdesc Defines a texture descriptive information
 */
export class TextureInfo {
  mWidth: number;
  mHeight: number;
  mGLTexID: WebGLTexture | null;

  /**
   *
   * @param {number} w The width of the texture
   * @param {number} h The height of the texture
   * @param {WebGLTexture} id The WebGL context texture ID
   */
  constructor(w: number, h: number, id: WebGLTexture | null) {
    this.mWidth = w;
    this.mHeight = h;
    this.mGLTexID = id;
  }
}

/**
 * @description Stores asynchronous texyure loading promise to be executed
 * @param {string} textureName The texture file path
 * @returns {Promise<void>}
 */
export function load(textureName: string): Promise<void> | null {
  let texturePromise = null;
  if (map.has(textureName)) {
    map.incRef(textureName);
  } else {
    map.loadRequested(textureName);
    const image = new Image();
    texturePromise = new Promise((resolve) => {
      image.onload = resolve;
      image.src = textureName;
    })
      .then(() => {
        return processLoadedImage(textureName, image);
      })
      .catch((e) => {
        throw new Error(`Failed to load image ${textureName}`);
      });

    map.pushPromise(texturePromise);
  }

  return texturePromise;
}

/**
 * @description Unloads texture from GPU memory
 * @param {string} textureName The texture file path
 */
export function unload(textureName: string): void {
  const texInfo = get(textureName);

  if (map.unload(textureName)) {
    const gl = glSys.get();
    gl?.deleteTexture(texInfo.mGLTexID);
  }
}

/**
 * @description Activates the texture in WebGL context
 * @param filtering
 * @param {string} textureName The texture file path
 */
export function activate(textureName: string, filtering: TextureFilter): void {
  const gl = glSys.get();
  const texInfo = get(textureName);

  // Bind texture reference to the current WebGL texture functionality
  gl?.activeTexture(gl.TEXTURE0);
  gl?.bindTexture(gl.TEXTURE_2D, texInfo.mGLTexID);

  // To prevent texture wrapping
  gl?.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl?.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  // Handle how magnification and minimization filters will work
  switch (filtering) {
    case TextureFilter.LINEAR:
      gl?.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl?.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR_MIPMAP_LINEAR
      );
      break;
    case TextureFilter.NEAREST:
      gl?.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl?.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      break;
  }
}

/**
 * @description Clears texture from GPU memory
 */
export function deactivate(): void {
  const gl = glSys.get();
  gl?.bindTexture(gl.TEXTURE_2D, null);
}

/**
 * @description Creates loaded texturein GPU memory
 * @param {string} path The texture file path
 * @param {HTMLImageElement} image The texture data
 */
function processLoadedImage(path: string, image: HTMLImageElement): void {
  const gl = glSys.get();

  if (!gl) {
    throw new Error("WebGL system not initialized");
  }

  // Generate a texture reference to the WebGL context
  const textureID = gl.createTexture();

  // Bind texture reference with current texture in WebGL context
  gl?.bindTexture(gl.TEXTURE_2D, textureID);

  // Load texture to texture data structure with descriptive info
  //prettier-ignore
  gl.texImage2D(
    gl.TEXTURE_2D,      // Binding point or target the texture is being loaded to
    0,                  // Level of detail, used for mipmapping. 0 is base texture level
    gl.RGBA,            // Internal format. The composition of each pixel
    gl.RGBA,            // Texel data format. Must match internal format
    gl.UNSIGNED_BYTE,   // Text data type
    image               // Texture data
  )

  // Create a mipmap for the texture
  gl.generateMipmap(gl.TEXTURE_2D);

  // Tell WebGL to stop manipulating data at the mGL.TEXTURE_2D target
  gl.bindTexture(gl.TEXTURE_2D, null);

  const texInfo = new TextureInfo(
    image.naturalWidth,
    image.naturalHeight,
    textureID
  );

  map.set(path, texInfo);
}
