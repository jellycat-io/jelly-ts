import * as core from "./core";
import * as vertexBuffer from "./vertex-buffer";

export class SimpleShader {
  mCompiledShader: WebGLProgram | null;
  mVertexPositionRef: number | null;

  constructor(vertexSourceID: string, fragmentSourceID: string) {
    this.mCompiledShader = null;
    this.mVertexPositionRef = null;

    const gl = core.getGL();

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
  }

  activate() {
    const gl = core.getGL();

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
  }
}

function loadAndCompileShader(
  id: string,
  shaderType: number
): WebGLShader | null {
  const gl = core.getGL();

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

export default SimpleShader;
