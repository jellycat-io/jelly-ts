import { mat4 } from "gl-matrix";
import { GLColorTuple } from "../utils/palette";
import * as glSys from "./core/gl";
import * as vertexBuffer from "./core/vertex-buffer";
import * as TextResource from "./resources/text";

/**
 * @module SimpleShader
 */

/**
 * @class
 * @classdesc The core shader class
 */
export class SimpleShader {
  mCompiledShader: WebGLProgram | null;
  mVertexPositionRef: number | null;
  mPixelColorRef: WebGLUniformLocation | null;
  mModelMatrixRef: WebGLUniformLocation | null;
  mCameraMatrixRed: WebGLUniformLocation | null;

  /**
   * @param {string} vertexSourceFile The vertex shader file path
   * @param {string} fragmentSourceFile The fragment shader file path
   */
  constructor(vertexSourceFile: string, fragmentSourceFile: string) {
    this.mCompiledShader = null;
    this.mVertexPositionRef = null;
    this.mPixelColorRef = null;
    this.mModelMatrixRef = null;
    this.mCameraMatrixRed = null;

    const gl = glSys.get();

    if (!gl) return;

    // Load and compile both shaders
    const vertexShader = compileShader(vertexSourceFile, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(
      fragmentSourceFile,
      gl.FRAGMENT_SHADER
    );

    if (!vertexShader || !fragmentShader) {
      throw new Error("Error loading shader source");
    }

    // Link shaders into a new program
    this.mCompiledShader = gl.createProgram();

    if (!this.mCompiledShader) {
      throw new Error("Error creating shader program");
    }

    gl.attachShader(this.mCompiledShader, vertexShader);
    gl.attachShader(this.mCompiledShader, fragmentShader);
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
    this.mCameraMatrixRed = gl.getUniformLocation(
      this.mCompiledShader,
      "uCameraTransformMatrix"
    );
  }

  /**
   * @description Activates the shader
   * @param {GLColorTuple} pixelColor The color to apply to the shader
   * @param {mat4} trsMatrix The transform matrix
   * @param {mat4} cameraMatrix The camera matrix
   */
  activate(
    pixelColor: GLColorTuple,
    trsMatrix: mat4,
    cameraMatrix: mat4
  ): void {
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
    gl.uniformMatrix4fv(this.mCameraMatrixRed, false, cameraMatrix);
  }
}

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

export default SimpleShader;
