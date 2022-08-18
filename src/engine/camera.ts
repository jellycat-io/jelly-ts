import { mat4, vec2, vec3 } from "gl-matrix";
import * as glSys from "./core/gl";
import { Color, GLColorTuple, Palette } from "../utils/palette";

enum VIEWPORT {
  X,
  Y,
  WIDTH,
  HEIGHT,
}

class Camera {
  mWCCenter: vec2;
  mWCWidth: number;
  mViewport: Float32List;
  mCameraMatrix: mat4;
  mBGColor: GLColorTuple;

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

  setWCCenter(x: number, y: number): void {
    this.mWCCenter[0] = x;
    this.mWCCenter[1] = y;
  }
  getWCCenter(): vec2 {
    return this.mWCCenter;
  }

  setWCWidth(w: number): void {
    this.mWCWidth = w;
  }
  getWCWidth(): number {
    return this.mWCWidth;
  }

  getWCHeight(): number {
    const ratio =
      this.mViewport[VIEWPORT.HEIGHT] / this.mViewport[VIEWPORT.WIDTH];

    return this.getWCWidth() * ratio;
  }

  setViewport(viewportArray: Float32List): void {
    this.mViewport = viewportArray;
  }
  getViewport(): Float32List {
    return this.mViewport;
  }

  setBackgroundColor(c: GLColorTuple): void {
    this.mBGColor = c;
  }
  getBackgroundColor(): GLColorTuple {
    return this.mBGColor;
  }

  getCameraMatrix(): mat4 {
    return this.mCameraMatrix;
  }

  // Initializes the camera to begin drawing
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
      this.getCameraMatrix(),
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
