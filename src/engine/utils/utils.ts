/**
 * @module Utils
 */

/**
 * Formula to convert to degrees
 *
 * @type {number}
 */
export const DEGREE = Math.PI / 180.0;

/**
 * @enum {number}
 * @description Viewport indexes definitions
 */
export enum Viewport {
  X,
  Y,
  WIDTH,
  HEIGHT,
}

/**
 * @enum {number}
 * @description Texture filter definitions
 */
export enum TextureFilter {
  LINEAR,
  NEAREST,
}

/**
 * Texture coordinate array is an array of 8 floats where elements:
 *
 * [0] [1]: is u/v coordinate of Top-Right
 *
 * [2] [3]: is u/v coordinate of Top-Left
 *
 * [4] [5]: is u/v coordinate of Bottom-Right
 *
 * [6] [7]: is u/v coordinate of Bottom-Left
 *
 * @enum {number}
 */
export const eTexCoordArrayIndex = Object.freeze({
  eLeft: 2,
  eRight: 0,
  eTop: 1,
  eBottom: 5,
});

/**
 * WebGL not found error
 *
 * @type {Error}
 */
export const kWebGLNotFound = new Error("Error: WebGL system not initialized");
