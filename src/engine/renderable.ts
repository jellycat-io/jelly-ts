import { Color, GLColorTuple, Palette } from "../utils/palette";
import * as glSys from "./core/gl";
import * as shaderResources from "./core/shader-resources";
import SimpleShader from "./simple-shader";

class Renderable {
  mShader: SimpleShader | null;
  mColor: GLColorTuple;

  constructor() {
    this.mShader = shaderResources.getConstColorShader();
    this.mColor = Palette[Color.LightPeach];
  }

  setColor(color: GLColorTuple) {
    this.mColor = color;
  }
  getColor() {
    return this.mColor;
  }

  draw() {
    const gl = glSys.get();
    this.mShader?.activate(this.mColor);
    gl?.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

export default Renderable;
