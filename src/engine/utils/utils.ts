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
 * @description Texture filtering definitions
 */
export enum TextureFilter {
  LINEAR,
  NEAREST,
}
