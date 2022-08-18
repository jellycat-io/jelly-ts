import * as glSys from "./core/gl";
import * as vertexBuffer from "./core/vertex-buffer";
import * as shaderResources from "./core/shader-resources";
import Renderable from "./renderable";
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

export { Renderable, init, clearCanvas };
