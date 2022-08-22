precision mediump float;

// Color of pixel
uniform vec4 uPixelColor;

void main(void) {
  // for every pixel called sets to specified color
  gl_FragColor = uPixelColor;
}

