import * as Palette from "../palette";
import * as shaderResources from "../core/shader-resources";
import * as TextureResource from "../resources/texture";
import Renderable from "./renderable";
import Camera from "../camera";
import { TextureFilter } from "../utils/utils";

/**
 * @class
 * @classdesc A textured renderable
 */
class TextureRenderable extends Renderable {
  /**
   * @private
   * @type {string}
   */
  mTexture: string;
  /**
   * @private
   * @type {TextureFilter}
   */
  mFiltering: TextureFilter;

  /**
   *
   * @param {string} texture The texture to apply
   * @param {TextureFilter} [filtering=TextureFilter.NEAREST] The filter to apply
   */
  constructor(texture: string | undefined, filtering = TextureFilter.NEAREST) {
    if (!texture) {
      throw new Error(`Texture ${texture} not found`);
    }
    super();
    super.setColor(Palette.getGLColor("White", 0)); // No texture tinting
    super._setShader(shaderResources.getTextureShader());
    this.mTexture = texture;
    this.mFiltering = filtering;
  }

  /**
   * @description Draws the renderable
   * @param {Camera} camera The camera to draw to
   */
  draw(camera: Camera): void {
    // Activate the texture
    TextureResource.activate(this.mTexture, this.mFiltering);
    super.draw(camera);
  }

  /**
   * @description Sets a new texture to the Renderable
   * @param {string} newTexture The texture path
   */
  setTexture(newTexture: string) {
    this.mTexture = newTexture;
  }

  /**
   * @description Gets the Renderable's texture path
   * @returns {string} the texture path
   */
  getTexture(): string {
    return this.mTexture;
  }
}

export default TextureRenderable;
