import * as Palette from "../palette";
import Camera from "../camera";
import * as glSys from "../core/gl";
import * as shaderResources from "../core/shader-resources";
import Shader from "../shaders/simple-shader";
import Transform from "../transform";

/**
 * @class
 * @classdesc A drawable entity
 * @typedef {Float32Array | number[]} Float32List
 */
class Renderable {
  /**
   * @private
   * @type {Shader | null}
   */
  mShader: Shader | null;
  /**
   * @private
   * @type {Float32List}
   */
  mColor: Float32List;
  /**
   * @private
   * @type {Transform}
   */
  mTransform: Transform;

  constructor() {
    this.mShader = shaderResources.getConstColorShader();
    this.mColor = Palette.getGLColor("Cream");
    this.mTransform = new Transform();
  }

  /**
   * @protected
   * @description Sets the Renderable shader
   * @param {Shader} s The shader to set
   */
  protected _setShader(s: Shader | null) {
    this.mShader = s;
  }

  /**
   * @description Changes Renderable's color
   * @param {Float32List} color The new renderable color
   */
  setColor(color: Float32List): void {
    this.mColor = color;
  }

  /**
   * @description Gets Renderable color
   * @returns {Float32List} the Renderable color
   */
  getColor(): Float32List {
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
      camera.getVPMatrix()
    );
    gl?.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

export default Renderable;
