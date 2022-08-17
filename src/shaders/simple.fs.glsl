#version 300 es
precision mediump float;

// Color of pixel
uniform vec4 uPixelColor;

out vec4 FragColor;

void main(void) {
  // for every pixel called sets to specified color
  FragColor = uPixelColor;
}

