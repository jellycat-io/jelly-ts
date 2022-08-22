precision mediump float;

/*
 * The object that fetches data from texture.
 * Must be set outside the shader.
 */
uniform sampler2D uSampler;

// Color of pixel
uniform vec4 uPixelColor;

varying vec2 vTexCoord;

void main(void) {
  // Texel color lookup based on interpolated UV value in vTexCoord
  vec4 c = texture2D(uSampler, vec2(vTexCoord.s, vTexCoord.t));

  // Tint the textured, transparent area defined by the texture
  vec3 r = vec3(c) * (1.0 - uPixelColor.a) + vec3(uPixelColor) * uPixelColor.a;
  vec4 result = vec4(r, c.a);

  gl_FragColor = result; 
}