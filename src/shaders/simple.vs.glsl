#version 300 es
precision mediump float;

uniform mat4 uModelTransformMatrix;
uniform mat4 uViewProjTransformMatrix;

in vec3 aVertexPosition;

void main(void) {
  gl_Position = uViewProjTransformMatrix * uModelTransformMatrix * vec4(aVertexPosition, 1.0);
}