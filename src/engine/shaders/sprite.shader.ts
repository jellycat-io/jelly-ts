import * as glSys from "../core/gl";
import * as vertexBuffer from "../core/vertex_buffer";
import { kWebGLNotFound } from "../utils/utils";
import TextureShader from "./texture.shader";

/**
 * @class
 * @augments {TextureShader}
 * @classdesc A TextureRenderable coming from a spritesheet
 */
class SpriteShader extends TextureShader {
  mTexCoordBuffer: WebGLBuffer | null;
  /**
   *
   * @param {string} vertexShaderPath The vertex shader file path
   * @param {string} fragmentShaderPath The fragment shader file path
   */
  constructor(vertexShaderPath: string, fragmentShaderPath: string) {
    super(vertexShaderPath, fragmentShaderPath);

    const initTexCoord = [1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0];

    const gl = glSys.get();
    if (!gl) throw kWebGLNotFound;

    this.mTexCoordBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, this._getTexCoordBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(initTexCoord),
      gl.DYNAMIC_DRAW // Indicates buffer data can change
    );
  }

  setTextureCoordinate(texCoord: Array<number>): void {
    const gl = glSys.get();

    gl?.bindBuffer(gl.ARRAY_BUFFER, this._getTexCoordBuffer());
    gl?.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(texCoord));
  }

  cleanUp() {
    const gl = glSys.get();
    gl?.deleteBuffer(this.mTexCoordBuffer);
    super.cleanUp();
  }

  /**
   * @override
   * @description Gets the local texture coordinate buffer
   * @returns {WebGLBuffer | null} the local texture coordinate buffer
   */
  _getTexCoordBuffer(): WebGLBuffer | null {
    return this.mTexCoordBuffer;
  }
}

export default SpriteShader;
