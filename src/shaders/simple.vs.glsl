#version 300 es
precision mediump float;

uniform mat4 uModelXformMatrix;

in vec3 aVertexPosition;

void main(void) {
  gl_Position = uModelXformMatrix * vec4(aVertexPosition, 1.0);
}