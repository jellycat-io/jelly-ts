import * as Engine from "../engine";
import { Color, Palette } from "../utils/palette";

class Game {
  mWhiteSq: Engine.Renderable;
  mRedSq: Engine.Renderable;

  constructor(width: number, height: number, canvasID?: string) {
    Engine.init(width, height, canvasID);

    this.mWhiteSq = new Engine.Renderable();
    this.mWhiteSq.setColor(Palette[Color.White]);
    this.mRedSq = new Engine.Renderable();
    this.mRedSq.setColor(Palette[Color.Red]);

    Engine.clearCanvas(Palette[Color.DarkGreen]);

    this.mWhiteSq.draw();
    this.mRedSq.draw();
  }
}

window.onload = () => new Game(640, 480, "GLCanvas");
