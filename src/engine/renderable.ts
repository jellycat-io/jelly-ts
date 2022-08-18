import { Color, GLColorTuple, Palette } from "../utils/palette";
import Camera from "./camera";
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

  setColor(color: GLColorTuple): void {
    this.mColor = color;
  }
  getColor(): GLColorTuple {
    return this.mColor;
  }
  getTransform(): Transform {
    return this.mTransform;
  }

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
