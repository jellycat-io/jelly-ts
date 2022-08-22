import { mat4 } from "gl-matrix";
import * as glSys from "../core/gl";
import * as vertexBuffer from "../core/vertex_buffer";
import * as TextResource from "../resources/text";
import { kWebGLNotFound } from "../utils/utils";

/**
 * @class
 * @classdesc The core shader class
 */
class Shader {
  /**
   * @private
   * @type {WebGLProgram | null}
   */
  mCompiledShader: WebGLProgram | null;
  /**
   * @private
   * @type {WebGLShader | null}
   */
  mVertexShader: WebGLShader | null;
  /**
   * @private
   * @type {WebGLShader | null}
   */
  mFragmentShader: WebGLShader | null;
  /**
   * @private
   * @type {number | null}
   */
  mVertexPositionRef: number | null;
  /**
   * @private
   * @type {WebGLUniformLocation | null}
   */
  mPixelColorRef: WebGLUniformLocation | null;
  /**
   * @private
   * @type {WebGLUniformLocation | null}
   */
  mModelMatrixRef: WebGLUniformLocation | null;
  /**
   * @private
   * @type {WebGLUniformLocation | null}
   */
  mViewProjMatrixRef: WebGLUniformLocation | null;

  /**
   * @param {string} vertexSourceFile The vertex shader file path
   * @param {string} fragmentSourceFile The fragment shader file path
   */
  constructor(vertexSourceFile: string, fragmentSourceFile: string) {
    this.mCompiledShader = null;
    this.mVertexShader = null;
    this.mFragmentShader = null;
    this.mVertexPositionRef = null;
    this.mPixelColorRef = null;
    this.mModelMatrixRef = null;
    this.mViewProjMatrixRef = null;

    const gl = glSys.get();

    if (!gl) throw kWebGLNotFound;

    // Load and compile both shaders
    this.mVertexShader = compileShader(vertexSourceFile, gl.VERTEX_SHADER);
    this.mFragmentShader = compileShader(
      fragmentSourceFile,
      gl.FRAGMENT_SHADER
    );

    if (!this.mVertexShader || !this.mFragmentShader) {
      throw new Error("Error loading shader source");
    }

    // Link shaders into a new program
    this.mCompiledShader = gl.createProgram();

    if (!this.mCompiledShader) {
      throw new Error("Error creating shader program");
    }

    gl.attachShader(this.mCompiledShader, this.mVertexShader);
    gl.attachShader(this.mCompiledShader, this.mFragmentShader);
    gl.linkProgram(this.mCompiledShader);

    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
      throw new Error(
        `Error linking shader: ${gl.getProgramInfoLog(this.mCompiledShader)}`
      );
    }

    // Get reference to aPosition in the shader
    this.mVertexPositionRef = gl.getAttribLocation(
      this.mCompiledShader,
      "aVertexPosition"
    );

    // Gets uniform variable uPixelColor in fragment shader
    this.mPixelColorRef = gl.getUniformLocation(
      this.mCompiledShader,
      "uPixelColor"
    );

    // Gets uniform variables in vertex shader
    this.mModelMatrixRef = gl.getUniformLocation(
      this.mCompiledShader,
      "uModelTransformMatrix"
    );
    this.mViewProjMatrixRef = gl.getUniformLocation(
      this.mCompiledShader,
      "uViewProjTransformMatrix"
    );
  }

  /**
   * @description Activates the shader
   * @param {Float32List} pixelColor The color to apply to the shader
   * @param {mat4} trsMatrix The transform matrix
   * @param {mat4} cameraMatrix The camera matrix
   */
  activate(pixelColor: Float32List, trsMatrix: mat4, cameraMatrix: mat4): void {
    const gl = glSys.get();

    if (!gl || this.mVertexPositionRef === null) return;

    // Identify the compiled shader to use
    gl.useProgram(this.mCompiledShader);

    // Bind vertex buffer to attribute defined in vertex shader
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
    gl.vertexAttribPointer(
      this.mVertexPositionRef,
      3, // each element is a 3-float (x,y,z)
      gl.FLOAT, // data type is FLOAT
      false, // is content normalized vectors?
      0, // number of bytes to skip in between elements
      0 // offsets to the first element
    );
    gl.enableVertexAttribArray(this.mVertexPositionRef);

    // Load uniforms
    gl.uniform4fv(this.mPixelColorRef, pixelColor);
    gl.uniformMatrix4fv(this.mModelMatrixRef, false, trsMatrix);
    gl.uniformMatrix4fv(this.mViewProjMatrixRef, false, cameraMatrix);
  }

  /**
   * @description Cleans up shader from GPU
   */
  cleanUp(): void {
    const gl = glSys.get();

    if (!this.mCompiledShader || !this.mVertexShader || !this.mFragmentShader)
      return;

    gl?.detachShader(this.mCompiledShader, this.mVertexShader);
    gl?.detachShader(this.mCompiledShader, this.mFragmentShader);
    gl?.deleteShader(this.mVertexShader);
    gl?.deleteShader(this.mFragmentShader);
    gl?.deleteProgram(this.mCompiledShader);
  }
}

/**
 * @module SimpleShader
 * @typedef {Float32Array | number[]} Float32List
 */

/**
 * @description Compiles the shader
 * @param {string} filePath The shader file path
 * @param {number} shaderType The shader type
 * @returns {WebGLShader | null} the compiled shader
 */
function compileShader(
  filePath: string,
  shaderType: number
): WebGLShader | null {
  let shaderSource: string | null = null;
  let compiledShader = null;

  const gl = glSys.get();

  // Access shader text file
  shaderSource = TextResource.get(filePath);

  if (!shaderSource) {
    throw new Error(`WARNING: Loading of ${filePath} failed.`);
  }

  // Create the shader with correct type
  compiledShader = gl?.createShader(shaderType);

  if (!compiledShader) return null;

  // Compile the shader with correct data
  gl?.shaderSource(compiledShader, shaderSource);
  gl?.compileShader(compiledShader);

  if (!gl?.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
    throw new Error(
      `A shader compiling error occured: ${gl?.getShaderInfoLog(
        compiledShader
      )}`
    );
  }

  return compiledShader;
}

export default Shader;
