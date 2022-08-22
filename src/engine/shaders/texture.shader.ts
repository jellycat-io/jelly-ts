/**
 * @module TextureShader
 * @typedef {Float32Array | number[]} Float32List
 */

import { mat4 } from "gl-matrix";
import * as glSys from "../core/gl";
import * as vertexBuffer from "../core/vertex_buffer";
import Shader from "./shader";

/**
 * @class
 * @classdesc The textured shader class
 * @augments {Shader}
 */
class TextureShader extends Shader {
  mTextureCoordRef: number;
  mSamplerRef: WebGLUniformLocation | null;

  /**
   *
   * @param {string} vertexShaderPath The vertex shader path
   * @param {string} fragmentShaderPath The fragment shader path
   */
  constructor(vertexShaderPath: string, fragmentShaderPath: string) {
    super(vertexShaderPath, fragmentShaderPath);

    const gl = glSys.get();
    if (!gl) throw new Error("WebGL system not initialized");

    if (!this.mCompiledShader) {
      throw new Error("Error creating shader program");
    }

    this.mTextureCoordRef = gl.getAttribLocation(
      this.mCompiledShader,
      "aTextureCoordinate"
    );

    this.mSamplerRef = gl.getUniformLocation(this.mCompiledShader, "uSampler");
  }

  /**
   * @override
   * @description Activates the shader
   * @param {Float32List} pixelColor The color to apply to the shader
   * @param {mat4} trsMatrix The transform matrix
   * @param {mat4} cameraMatrix The camera matrix
   */
  activate(pixelColor: Float32List, trsMatrix: mat4, cameraMatrix: mat4) {
    super.activate(pixelColor, trsMatrix, cameraMatrix);

    // Enable texture coordinate array
    const gl = glSys.get();
    gl?.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.getTexCoord());
    gl?.vertexAttribPointer(this.mTextureCoordRef, 2, gl.FLOAT, false, 0, 0);
    gl?.enableVertexAttribArray(this.mTextureCoordRef);

    // Bind uSampler to texture 0
    gl?.uniform1i(this.mSamplerRef, 0);
    // texture.activateTexture() binds to Texture0
  }
}

export default TextureShader;
