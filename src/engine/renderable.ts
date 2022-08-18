import { mat4 } from "gl-matrix";
import { Color, GLColorTuple, Palette } from "../utils/palette";
import * as glSys from "./core/gl";
import * as shaderResources from "./core/shader-resources";
import SimpleShader from "./simple-shader";
import Transform from "./transform";

class Renderable {
  mShader: SimpleShader | null;
  mColor: GLColorTuple;
  mTransform: Transform;

  constructor() {
    this.mShader = shaderResources.getConstColorShader();
    this.mColor = Palette[Color.LightPeach];
    this.mTransform = new Transform();
  }

  setColor(color: GLColorTuple) {
    this.mColor = color;
  }
  getColor() {
    return this.mColor;
  }
  getTransform() {
    return this.mTransform;
  }

  draw(cameraMatrix: mat4) {
    const gl = glSys.get();
    this.mShader?.activate(
      this.mColor,
      this.mTransform.getTRSMatrix(),
      cameraMatrix
    );
    gl?.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

export default Renderable;
