import { mat4, vec2 } from "gl-matrix";
import * as glSys from "./core/gl";
import * as Palette from "./palette";
import { Viewport } from "./utils/utils";

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
   * @type {number}
   */
  mNearPlane: number;
  /**
   * @private
   * @type {number}
   */
  mFarPlane: number;

  /**
   * @private
   * @type {mat4}
   */
  mViewMatrix: mat4;
  /**
   * @private
   * @type {mat4}
   */
  mProjMatrix: mat4;
  /**
   * @private
   * @type {mat4}
   */
  mVPMatrix: mat4;

  /**
   * @private
   * @type {Float32List}
   */
  mBGColor: Float32List;

  /**
   * @param {vec2} wcCenter The camera center position
   * @param {number} wcWidth The camera width
   * @param {Float32List} viewportArray The viewport size and position on the canvas
   * @param {Float32List} bgColor The camera background color
   */
  constructor(
    wcCenter: vec2,
    wcWidth: number,
    viewportArray: Float32List,
    bgColor?: Float32List
  ) {
    this.mWCCenter = wcCenter;
    this.mWCWidth = wcWidth;
    this.mViewport = viewportArray; // [x,y,w,h]
    this.mNearPlane = 0;
    this.mFarPlane = 1000;

    // Camera transform matrices
    this.mViewMatrix = mat4.create();
    this.mProjMatrix = mat4.create();
    this.mVPMatrix = mat4.create();

    // Set background color
    this.mBGColor = bgColor ?? Palette.getGLColor("White");
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
      this.mViewport[Viewport.HEIGHT] / this.mViewport[Viewport.WIDTH];

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
   * @param {Float32List} c The new camera background color
   */
  setBackgroundColor(c: Float32List): void {
    this.mBGColor = c;
  }
  /**
   * @description Gets the camera background color
   * @returns {Float32List} the camera background color
   */
  getBackgroundColor(): Float32List {
    return this.mBGColor;
  }

  /**
   * @description Gets the camera matrix
   * @returns {mat4} the camera matrix
   */
  getVPMatrix(): mat4 {
    return this.mVPMatrix;
  }

  /**
   * @description Initializes the camera to begin drawing
   */
  setupViewProjection(): void {
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
    const [r, g, b, a] = this.getBackgroundColor();
    gl?.clearColor(r, g, b, a);

    // Enable scissor area, clear and disable scissor area to save performance
    gl?.enable(gl.SCISSOR_TEST);
    gl?.clear(gl.COLOR_BUFFER_BIT);
    gl?.disable(gl.SCISSOR_TEST);

    // Compute camera matrix
    const center = this.getWCCenter();

    mat4.lookAt(
      this.mViewMatrix,
      [center[0], center[1], 10],
      [center[0], center[1], 0],
      [0, 1, 0]
    );

    const ratio = vh / vw;
    const halfWCWidth = 0.5 * this.mWCWidth;
    const halfWCHeight = halfWCWidth * ratio;

    mat4.ortho(
      this.mProjMatrix,
      -halfWCWidth, // distance to left of WC
      halfWCWidth, // distance to right of WC
      -halfWCHeight, // distance to bottom of WC
      halfWCHeight, // distance to top of WC
      this.mNearPlane, // z-distance to near plane
      this.mFarPlane // z-distanceto far plane
    );

    mat4.multiply(this.mVPMatrix, this.mProjMatrix, this.mViewMatrix);
  }
}

export default Camera;
