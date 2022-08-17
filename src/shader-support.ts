"use strict";

import { getGL } from "./core";
import * as vertexBuffer from "./vertex-buffer";

let mCompiledShader: WebGLProgram | null = null;
let mVertexPositionRef: number | null = null;

export function init(vertexSourceID: string, fragmentSourceID: string): void {
  const gl = getGL();

  if (!gl) return;

  // Load and compile both shaders
  const vertexShader = loadAndCompileShader(vertexSourceID, gl.VERTEX_SHADER);
  const fragmentShader = loadAndCompileShader(
    fragmentSourceID,
    gl.FRAGMENT_SHADER
  );

  if (!vertexShader || !fragmentShader) {
    throw new Error("Error loading shader source");
  }

  // Link shaders into a program
  mCompiledShader = gl.createProgram();

  if (!mCompiledShader) {
    throw new Error("Error creating shader program");
  }

  gl.attachShader(mCompiledShader, vertexShader);
  gl.attachShader(mCompiledShader, fragmentShader);
  gl.linkProgram(mCompiledShader);

  if (!gl.getProgramParameter(mCompiledShader, gl.LINK_STATUS)) {
    throw new Error(
      `Error linking shader: ${gl.getProgramInfoLog(mCompiledShader)}`
    );
  }

  // Get reference to aPosition in the shader
  mVertexPositionRef = gl.getAttribLocation(mCompiledShader, "aVertexPosition");
}

export function activate(): void {
  const gl = getGL();

  if (!gl || mVertexPositionRef === null) return;

  // Identify the compiled shader to use
  gl.useProgram(mCompiledShader);

  // Bind vertex buffer to attribute defined in vertex shader
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
  gl.vertexAttribPointer(
    mVertexPositionRef,
    3, // each element is a 3-float (x,y,z)
    gl.FLOAT, // data type is FLOAT
    false, // is content normalized vectors?
    0, // number of bytes to skip in between elements
    0 // offsets to the first element
  );
  gl.enableVertexAttribArray(mVertexPositionRef);
}

function loadAndCompileShader(
  id: string,
  shaderType: number
): WebGLShader | null {
  const gl = getGL();

  if (!gl) return null;
  const shaderText = document.getElementById(id) as HTMLScriptElement;
  const shaderSource = shaderText.firstChild?.textContent?.trimStart();

  if (!shaderSource) return null;

  // Create the shader with correct type
  const compiledShader = gl.createShader(shaderType);

  if (!compiledShader) return null;

  // Compile the shader with correct data
  gl.shaderSource(compiledShader, shaderSource);
  gl.compileShader(compiledShader);

  if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
    throw new Error(
      `A shader compiling error occured: ${gl.getShaderInfoLog(compiledShader)}`
    );
  }

  return compiledShader;
}
