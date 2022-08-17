import SimpleShader from "../simple-shader";

const kSimpleVS = "src/shaders/simple.vs.glsl";
const kSimpleFS = "src/shaders/simple.fs.glsl";
let mConstColorShader: SimpleShader | null = null;

export function init() {
  createShaders();
}

export function getConstColorShader() {
  return mConstColorShader;
}

function createShaders() {
  mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
}
