import { mat4, vec2, vec3 } from "gl-matrix";
import * as glSys from "./core/gl";
import { Color, GLColorTuple, Palette } from "../utils/palette";
import { VIEWPORT } from "../utils/common";

/**
 * @class
 * @classdesc The game camera
 * @typedef {Float32Array | number[]} Float32List
 */
class Camera {
  /**
   * @private
   * @type {vec2}
   */
  mWCCenter: vec2;
  /**
   * @private
   * @type {number}
   */
  mWCWidth: number;
  /**
   * @private
   * @type {Float32List}
   */
  mViewport: Float32List;
  /**
   * @private
   * @type {mat4}
   */
  mCameraMatrix: mat4;
  /**
   * @private
   * @type {GLColorTuple}
   */
  mBGColor: GLColorTuple;

  /**
   * @param {vec2} wcCenter The camera center position
   * @param {number} wcWidth The camera width
   * @param {Float32List} viewportArray The viewport size and position on the canvas
   * @param {GLColorTuple} bgColor The camera background color
   */
  constructor(
    wcCenter: vec2,
    wcWidth: number,
    viewportArray: Float32List,
    bgColor?: GLColorTuple
  ) {
    this.mWCCenter = wcCenter;
    this.mWCWidth = wcWidth;
    this.mViewport = viewportArray; // [x,y,w,h]

    // Camera transform operator
    this.mCameraMatrix = mat4.create();

    // Set background color
    this.mBGColor = bgColor ?? Palette[Color.White];
  }

  /**
   * @description Sets the camera center position
   * @param {number} x The new x position of the camera center
   * @param {number} y The new y position of the camera center
   */
  setWCCenter(x: number, y: number): void {
    this.mWCCenter[0] = x;
    this.mWCCenter[1] = y;
  }
  /**
   * @description Gets the camera center position
   * @returns {vec2} the camera center position
   */
  getWCCenter(): vec2 {
    return this.mWCCenter;
  }
  /**
   * @description Sets the camera width
   * @param {number} w The new camera width
   */
  setWCWidth(w: number): void {
    this.mWCWidth = w;
  }
  /**
   * @description Gets the camera width
   * @returns {number} the camera width
   */
  getWCWidth(): number {
    return this.mWCWidth;
  }

  /**
   * @description Computes and gets camera height based on h/w ratio
   * @returns {number} the camera height
   */
  getWCHeight(): number {
    const ratio =
      this.mViewport[VIEWPORT.HEIGHT] / this.mViewport[VIEWPORT.WIDTH];

    return this.getWCWidth() * ratio;
  }

  /**
   * @description Sets the viewport size and position
   * @param {Float32List} viewportArray The new viewport size and position
   */
  setViewport(viewportArray: Float32List): void {
    this.mViewport = viewportArray;
  }
  /**
   * @description Gets viewport size and position
   * @returns {Float32Array | number} the viewport size and position
   */
  getViewport(): Float32List {
    return this.mViewport;
  }

  /**
   * @description Sets the camera background color
   * @param {GLColorTuple} c The new camera background color
   */
  setBackgroundColor(c: GLColorTuple): void {
    this.mBGColor = c;
  }
  /**
   * @description Gets the camera background color
   * @returns {GLColorTuple} the camera background color
   */
  getBackgroundColor(): GLColorTuple {
    return this.mBGColor;
  }

  /**
   * @description Gets the camera matrix
   * @returns {mat4} the camera matrix
   */
  getCameraMatrix(): mat4 {
    return this.mCameraMatrix;
  }

  /**
   * @description Initializes the camera to begin drawing
   */
  setViewAndCameraMatrix(): void {
    const gl = glSys.get();
    const [vx, vy, vw, vh] = this.getViewport();

    // Configure the viewport
    gl?.viewport(
      vx, // x of bottom-left corner of area to be drawn
      vy, // y of bottom-left corner of area to be drawn
      vw, // width of area to be drawn
      vh // height of area to be drawn
    );

    // Set up corresponding scissor to limit the clear area
    gl?.scissor(vx, vy, vw, vh);

    // Set the color to be cleared
    gl?.clearColor(...this.getBackgroundColor());

    // Enable scissor area, clear and disable scissor area to save performance
    gl?.enable(gl.SCISSOR_TEST);
    gl?.clear(gl.COLOR_BUFFER_BIT);
    gl?.disable(gl.SCISSOR_TEST);

    // Compute camera matrix
    const center = this.getWCCenter();

    // After translation, scale to -1 to 1: 2x2 square at origin
    mat4.scale(
      this.getCameraMatrix(),
      mat4.create(),
      vec3.fromValues(2.0 / this.getWCWidth(), 2.0 / this.getWCHeight(), 1.0)
    );
    mat4.translate(
      this.getCameraMatrix(),
      this.getCameraMatrix(),
      vec3.fromValues(-center[0], -center[1], 0)
    );
  }
}

export default Camera;
