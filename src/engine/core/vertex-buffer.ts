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

let mGLVertexBuffer: WebGLBuffer | null = null;

/**
 * @description Gets the vertex buffer
 * @returns {WebGLBuffer | null} the vertex buffer
 */
export function get(): WebGLBuffer | null {
  return mGLVertexBuffer;
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
}
