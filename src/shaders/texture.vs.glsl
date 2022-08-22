precision mediump float;

// To transform the vertex position
uniform mat4 uModelTransformMatrix;
uniform mat4 uViewProjTransformMatrix;

attribute vec3 aVertexPosition; // Expects one vertex position
attribute vec2 aTextureCoordinate; // Texture coordinate attribute

varying vec2 vTexCoord;

void main(void) {
  /* 
   * Convert the vec3 in to vec4 for scan conversion and
   * transform by uModelTransformMatrix and uViexProjTransformMatrix before
   * assigning to gl_Position to pass the vertex to the fragment
   */
  gl_Position = uViewProjTransformMatrix * uModelTransformMatrix * vec4(aVertexPosition, 1.0);

  vTexCoord = aTextureCoordinate;
}