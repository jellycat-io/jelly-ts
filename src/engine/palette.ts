/**
 * @module Palette
 */

/**
 * @typedef {Float32Array | number[]} Float32List
 */

type ColorArray = [number, number, number];

const mColors = new Map<string, ColorArray>();

/**
 * @description Initializes palette with default colors
 */
export function init(): void {
  setHexColor("Black", "#000000");
  setHexColor("White", "#FFFFFF");
  setHexColor("Cream", "#FFF1E8");
  setHexColor("LightGrey", "#C2C3C7");
  setHexColor("Grey", "#5F574F");
  setHexColor("Red", "#FF004D");
  setHexColor("Blue", "#29ADFF");
  setHexColor("Green", "#00E436");
}

/**
 * @description Sets RGB color to the palette
 * @param {string} name The color label
 * @param { ColorArray } value The color RGB value
 */
export function setRGBColor(name: string, value: ColorArray): void {
  value.forEach((n) => {
    if (n < 0 || n > 255) {
      throw new Error(`Palette: Invalid RGB value [${n}]`);
    }
  });

  setGLColor(name, rgbToGl(value));
}

/**
 * @description Sets hexadecimal color to the palette
 * @param {string} name The color label
 * @param { string } value The color hexadecimal value
 */
export function setHexColor(name: string, value: string) {
  const color = hexToRgb(value);

  if (!color) {
    throw new Error(`Palette: Invalid hex value [${value}]`);
  }

  setRGBColor(name, color);
}

/**
 * @description Sets WebGL color to the palette
 * @param {string} name The color label
 * @param { ColorArray } value The color WebGL value
 */
export function setGLColor(name: string, value: ColorArray) {
  mColors.set(name, value);
}

/**
 * @description Gets color from palette with alpha in WebGL format
 * @param {string} name The color label
 * @param {number} [alpha] The color alpha
 * @returns {Float32List} The WebGL color with alpha
 */
export function getGLColor(name: string, alpha = 1.0): Float32List {
  const color = mColors.get(name);
  if (!color) {
    throw new Error(`Palette: No color named [${name}]`);
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return color.concat(alpha);
}

/**
 * @description Gets color from palette with alpha in hexadecimal format
 * @param {string} name The color label
 * @param {number} [alpha] The color alpha
 * @returns {Float32List} The hexadecimal color with alpha
 */
export function getHexColor(name: string, alpha = "FF"): string {
  const color = mColors.get(name);
  if (!color) {
    throw new Error(`Palette: No color named [${name}]`);
  }

  return `${rgbToHex(glToRgb(color))}${alpha}`;
}

/**
 * @description Gets color from palette with alpha in RGB format
 * @param {string} name The color label
 * @param {number} [alpha] The color alpha
 * @returns {Float32List} The RGB color with alpha
 */
export function getRGBColor(name: string, alpha = 255): Float32List {
  const color = mColors.get(name);
  if (!color) {
    throw new Error(`Palette: No color named [${name}]`);
  }

  return glToRgb(color).concat(alpha);
}

/**
 * @description Converts RGBA color to WebGL color
 * @param {ColorArray} color The RGBA color to convert
 * @returns {ColorArray} the WebGL color
 */
export function rgbToGl(color: ColorArray): ColorArray {
  return color.map((c) => (c > 0 ? c / 255 : 0)) as ColorArray;
}

/**
 * @description Converts WebGL color to RGB color
 * @param {ColorArray} color The WebGL color to convert
 * @returns {ColorArray} the RGB color
 */
export function glToRgb(color: ColorArray): ColorArray {
  return color.map((c) => (c > 0 ? c * 255 : 0)) as ColorArray;
}

/**
 * @description Converts hexadecimal color to RGB color
 * @param {string} hex The hexadecimal color to convert
 * @returns {ColorArray} the RGB color
 */
export function hexToRgb(hex: string): ColorArray | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

/**
 * @description Converts RGB color to hexadecimal color
 * @param {ColorArray} rgb The RGB color to convert
 * @returns {string} the hexadecimal color
 */
export function rgbToHex(rgb: ColorArray) {
  const [r, g, b] = rgb;
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// /**
//  * @description Enum listing palette's colors names
//  * @enum {number}
//  */
// export enum Color {
//   Black,
//   DarkBlue,
//   DarkPurple,
//   DarkGreen,
//   Brown,
//   DarkGrey,
//   LightGrey,
//   White,
//   Red,
//   Orange,
//   Yellow,
//   Green,
//   Blue,
//   Lavender,
//   Pink,
//   LightPeach,
//   DarkestGrey,
//   DarkerBlue,
//   DarkerPurple,
//   BlueGreen,
//   DarkBrown,
//   DarkerGrey,
//   MediumGrey,
//   LightYellow,
//   DarkRed,
//   DarkOrange,
//   LimeGreen,
//   MediumGreen,
//   TrueBlue,
//   Mauve,
//   DarkPeach,
//   Peach,
// }

/**
 * @description Table containing palette's colors rgba values
 * @type {Array<ColorArray>}
 */
// export const Palette: Array<ColorArray> = [
//   rgbaToGL([0, 0, 0]), // #000000
//   rgbaToGL([29, 43, 83]), // #1D2B53
//   rgbaToGL([126, 37, 83]), // #7E2553
//   rgbaToGL([0, 135, 81]), // #008751
//   rgbaToGL([171, 82, 54]), // #AB5236
//   rgbaToGL([95, 87, 79]), // #5F574F
//   rgbaToGL([194, 195, 199]), // #C2C3C7
//   rgbaToGL([255, 241, 232]), // #FFF1E8
//   rgbaToGL([255, 0, 77]), // #FF004D
//   rgbaToGL([255, 163, 0]), // #FFA300
//   rgbaToGL([255, 236, 39]), // #FFEC27
//   rgbaToGL([0, 228, 54]), // #00E436
//   rgbaToGL([41, 173, 255]), // #29ADFF
//   rgbaToGL([131, 118, 156]), // #83769C
//   rgbaToGL([255, 119, 168]), // #FF77A8
//   rgbaToGL([255, 204, 170]), // #FFCCAA
//   rgbaToGL([41, 24, 20]), // #291814
//   rgbaToGL([17, 29, 53]), // #111D35
//   rgbaToGL([66, 33, 54]), // #422136
//   rgbaToGL([18, 83, 89]), // #125359
//   rgbaToGL([116, 47, 41]), // #742F29
//   rgbaToGL([73, 51, 59]), // #49333B
//   rgbaToGL([162, 136, 121]), // #A28879
//   rgbaToGL([243, 239, 125]), // #F3EF7D
//   rgbaToGL([190, 18, 80]), // #BE1250
//   rgbaToGL([255, 108, 36]), // #FF6C24
//   rgbaToGL([168, 231, 46]), // #A8E72E
//   rgbaToGL([0, 181, 67]), // #00B543
//   rgbaToGL([6, 90, 181]), // #065AB5
//   rgbaToGL([117, 70, 101]), // #754665
//   rgbaToGL([255, 110, 89]), // #FF6E59
//   rgbaToGL([255, 157, 129]), // #FF9D81
// ];
