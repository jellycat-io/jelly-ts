/**
 * @module Palette
 * @typedef {[number, number, number, number]} RGBATuple
 */

/**
 * @typedef {[number, number, number, number]} GLColorTuple
 */
export type RGBATuple = [number, number, number, number];

/**
 * @typedef {[number, number, number, number]} GLColorTuple
 */
export type GLColorTuple = [number, number, number, number];

/**
 * @description Enum listing palette's colors names
 * @enum {number}
 */
export enum Color {
  Black,
  DarkBlue,
  DarkPurple,
  DarkGreen,
  Brown,
  DarkGrey,
  LightGrey,
  White,
  Red,
  Orange,
  Yellow,
  Green,
  Blue,
  Lavender,
  Pink,
  LightPeach,
  DarkestGrey,
  DarkerBlue,
  DarkerPurple,
  BlueGreen,
  DarkBrown,
  DarkerGrey,
  MediumGrey,
  LightYellow,
  DarkRed,
  DarkOrange,
  LimeGreen,
  MediumGreen,
  TrueBlue,
  Mauve,
  DarkPeach,
  Peach,
}

/**
 * @description Table containing palette's colors rgba values
 * @type {Array<RGBATuple>}
 */
export const Palette: Array<RGBATuple> = [
  rgbaToGL([0, 0, 0, 255]), // #000000
  rgbaToGL([29, 43, 83, 255]), // #1D2B53
  rgbaToGL([126, 37, 83, 255]), // #7E2553
  rgbaToGL([0, 135, 81, 255]), // #008751
  rgbaToGL([171, 82, 54, 255]), // #AB5236
  rgbaToGL([95, 87, 79, 255]), // #5F574F
  rgbaToGL([194, 195, 199, 255]), // #C2C3C7
  rgbaToGL([255, 241, 232, 255]), // #FFF1E8
  rgbaToGL([255, 0, 77, 255]), // #FF004D
  rgbaToGL([255, 163, 0, 255]), // #FFA300
  rgbaToGL([255, 236, 39, 255]), // #FFEC27
  rgbaToGL([0, 228, 54, 255]), // #00E436
  rgbaToGL([41, 173, 255, 255]), // #29ADFF
  rgbaToGL([131, 118, 156, 255]), // #83769C
  rgbaToGL([255, 119, 168, 255]), // #FF77A8
  rgbaToGL([255, 204, 170, 255]), // #FFCCAA
  rgbaToGL([41, 24, 20, 255]), // #291814
  rgbaToGL([17, 29, 53, 255]), // #111D35
  rgbaToGL([66, 33, 54, 255]), // #422136
  rgbaToGL([18, 83, 89, 255]), // #125359
  rgbaToGL([116, 47, 41, 255]), // #742F29
  rgbaToGL([73, 51, 59, 255]), // #49333B
  rgbaToGL([162, 136, 121, 255]), // #A28879
  rgbaToGL([243, 239, 125, 255]), // #F3EF7D
  rgbaToGL([190, 18, 80, 255]), // #BE1250
  rgbaToGL([255, 108, 36, 255]), // #FF6C24
  rgbaToGL([168, 231, 46, 255]), // #A8E72E
  rgbaToGL([0, 181, 67, 255]), // #00B543
  rgbaToGL([6, 90, 181, 255]), // #065AB5
  rgbaToGL([117, 70, 101, 255]), // #754665
  rgbaToGL([255, 110, 89, 255]), // #FF6E59
  rgbaToGL([255, 157, 129, 255]), // #FF9D81
];

/**
 * @description Converts RGBA values to WebGL values
 * @param {RGBATuple} color The RGBA values to convert
 * @returns {GLColorTuple} the converted color
 */
export function rgbaToGL(color: [number, number, number, number]): RGBATuple {
  return color.map((c) => (c > 0 ? c / 255 : 0)) as RGBATuple;
}
