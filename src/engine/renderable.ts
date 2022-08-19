import { Color, GLColorTuple, Palette } from "../utils/palette";
import Camera from "./camera";
import * as glSys from "./core/gl";
import * as shaderResources from "./core/shader-resources";
import SimpleShader from "./simple-shader";
import Transform from "./transform";

/**
 * @class
 * @classdesc A drawable entity
 */
class Renderable {
  /**
   * @private
   * @type {SimpleShader | null}
   */
  mShader: SimpleShader | null;
  /**
   * @private
   * @type {GLColorTuple}
   */
  mColor: GLColorTuple;
  /**
   * @private
   * @type {Transform}
   */
  mTransform: Transform;

  constructor() {
    this.mShader = shaderResources.getConstColorShader();
    this.mColor = Palette[Color.LightPeach];
    this.mTransform = new Transform();
  }

  /**
   * @description Changes Renderable's color
   * @param {GLColorTuple} color The new renderable color
   */
  setColor(color: GLColorTuple): void {
    this.mColor = color;
  }

  /**
   * @description Gets Renderable color
   * @returns {GLColorTuple} the Renderable color
   */
  getColor(): GLColorTuple {
    return this.mColor;
  }

  /**
   * @description Gets Renderable transform
   * @returns {Transform} the Renderable Transform
   */
  getTransform(): Transform {
    return this.mTransform;
  }

  /**
   * @description Draws the Renderable
   * @param {Camera} camera The game camera to display to
   */
  draw(camera: Camera): void {
    const gl = glSys.get();
    this.mShader?.activate(
      this.mColor,
      this.mTransform.getTRSMatrix(),
      camera.getCameraMatrix()
    );
    gl?.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

export default Renderable;
