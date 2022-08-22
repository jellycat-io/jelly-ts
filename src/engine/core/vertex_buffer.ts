/**
 * @module VertexBuffer
 */

import * as glSys from "./gl";

// prettier-ignore
const mVerticesOfSquare = [
  0.5, 0.5, 0.0,
  -0.5, 0.5, 0.0,
  0.5, -0.5, 0.0,
  -0.5, -0.5, 0.0,
];

// prettier-ignore
const mTexturesCoordinates = [
  1.0, 1.0,
  0.0, 1.0,
  1.0, 0.0,
  0.0, 0.0
];

let mGLVertexBuffer: WebGLBuffer | null = null;
let mGLTextureCoordBuffer: WebGLBuffer | null = null;

/**
 * @description Gets the vertex buffer
 * @returns {WebGLBuffer | null} the vertex buffer
 */
export function get(): WebGLBuffer | null {
  return mGLVertexBuffer;
}

/**
 * @description Gets the texture coordinates buffer
 * @returns {WebGLBuffer | null} the texture coordinates buffer
 */
export function getTexCoord(): WebGLBuffer | null {
  return mGLTextureCoordBuffer;
}

/**
 * @description Initializes the vertex buffer
 * @returns {void} nothing
 */
export function init(): void {
  const gl = glSys.get();

  if (!gl) return;

  // Create buffer for vertex positions
  mGLVertexBuffer = gl.createBuffer();

  // Activate vertex buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer);

  // Load vertices into the buffer
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(mVerticesOfSquare),
    gl.STATIC_DRAW
  );

  // Create buffer for texture coordinates
  mGLTextureCoordBuffer = gl.createBuffer();

  // Activate texture coordinates buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, mGLTextureCoordBuffer);

  // Load texture coordinates into the buffer
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(mTexturesCoordinates),
    gl.STATIC_DRAW
  );
}

/**
 * @description Cleans up vertex buffer from GPU
 */
export function cleanUp(): void {
  if (mGLVertexBuffer) {
    glSys.get()?.deleteBuffer(mGLVertexBuffer);
    mGLVertexBuffer = null;
  }

  if (mGLTextureCoordBuffer) {
    glSys.get()?.deleteBuffer(mGLTextureCoordBuffer);
    mGLTextureCoordBuffer = null;
  }
}
