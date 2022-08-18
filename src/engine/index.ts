import * as glSys from "./core/gl";
import * as vertexBuffer from "./core/vertex-buffer";
import * as shaderResources from "./core/shader-resources";
import Renderable from "./renderable";
import Transform from "./transform";
import { GLColorTuple } from "../utils/palette";

// General engine utils
function init(width: number, height: number, canvasID?: string) {
  glSys.init(width, height, canvasID);
  vertexBuffer.init();
  shaderResources.init();
}

function clearCanvas(color: GLColorTuple): void {
  const gl = glSys.get();
  gl?.clearColor(...color);
  gl?.clear(gl.COLOR_BUFFER_BIT);
}

function getGL(): WebGL2RenderingContext | null {
  return glSys.get();
}

export { Renderable, Transform, init, clearCanvas, getGL };
