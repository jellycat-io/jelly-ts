import { getGL } from "./core";

// prettier-ignore
const mVerticesOfSquare = [
  0.5, 0.5, 0.0,
  -0.5, 0.5, 0.0,
  0.5, -0.5, 0.0,
  -0.5, -0.5, 0.0,
];

let mGLVertexBuffer: WebGLBuffer | null = null;

export function get(): WebGLBuffer | null {
  return mGLVertexBuffer;
}

export function init(): void {
  const gl = getGL();

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
