import Camera from "../camera";
import * as shaderResources from "../core/shader_resources";
import * as TextureResource from "../resources/texture";
import SpriteShader from "../shaders/sprite.shader";
import { TextureFilter } from "../utils/utils";
import TextureRenderable from "./texture.renderable";

/**
 * @class
 * @classdesc A TextureRenderable, but from a spritesheet
 * @augments TextureRenderable
 */
class SpriteRenderable extends TextureRenderable {
  mElmLeft: number;
  mElmRight: number;
  mElmTop: number;
  mElmBottom: number;
  mShader: SpriteShader | null;

  /**
   * @param {string} texturePath The texture file path
   * @param {TextureFilter} [filter=TextureFilter.NEAREST] The texture filter
   */
  constructor(texturePath: string, filter = TextureFilter.NEAREST) {
    super(texturePath, filter);
    this.mShader = shaderResources.getSpriteShader();

    // Sprite coordinate.
    // Texture coordinate bounds [0-left, 1-right, 1-top, 0-bottom] of image
    this.mElmLeft = 0.0;
    this.mElmRight = 1.0;
    this.mElmTop = 1.0;
    this.mElmBottom = 0.0;
  }

  /**
   * @description Specifies element region by texture coordinate [between 0 to 1]
   * @param {number} left The left coordinate
   * @param {number} right The right coordinate
   * @param {number} bottom The bottom coordinate
   * @param {number} top The top coordinate
   */
  setElementUXCoordinate(
    left: number,
    right: number,
    bottom: number,
    top: number
  ): void {
    this.mElmLeft = left;
    this.mElmRight = right;
    this.mElmBottom = bottom;
    this.mElmTop = top;
  }

  /**
   * @description Defines element region defined pixel positions (0 to mimage resolution)
   * @param {number} left  Left bound
   * @param {number} right Right bound
   * @param {number} bottom Bottom bound
   * @param {number} top  Top bound
   */
  setElementPixelPositions(
    left: number,
    right: number,
    bottom: number,
    top: number
  ): void {
    const texInfo = TextureResource.get(this.mTexture);
    const imageW = texInfo.getWidth();
    const imageH = texInfo.getHeight();

    this.setElementUXCoordinate(
      left / imageW,
      right / imageW,
      bottom / imageH,
      top / imageH
    );
  }

  /**
   * @description Gets the texture coordinate specification array
   * @returns {Array<number>} the texture coordinate specification array
   */
  getElementUVCoordinateArray(): Array<number> {
    // prettier-ignore
    return [
      this.mElmRight, this.mElmTop,     // x,y of top-right
      this.mElmLeft, this.mElmTop,      // x,y of top-left
      this.mElmRight, this.mElmBottom,  // x,y of bottom-right,
      this.mElmLeft, this.mElmBottom    // x,y of bottom-left
    ]
  }

  /**
   * @override
   * @param {Camera} camera The viewport camera
   */
  draw(camera: Camera) {
    // Set the current texture coordinate
    // activate the texture
    this.mShader?.setTextureCoordinate(this.getElementUVCoordinateArray());
    super.draw(camera);
  }
}

export default SpriteRenderable;
