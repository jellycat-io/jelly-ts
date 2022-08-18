import SimpleShader from "../simple-shader";

const kSimpleVS = "src/shaders/simple.vs.glsl";
const kSimpleFS = "src/shaders/simple.fs.glsl";
let mConstColorShader: SimpleShader | null = null;

export function init() {
  createShaders();
}

export function getConstColorShader(): SimpleShader | null {
  return mConstColorShader;
}

function createShaders(): void {
  mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
}
