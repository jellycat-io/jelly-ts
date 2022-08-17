import * as engine from "../engine/core";
import { Color, Palette } from "../utils/palette";

class Game {
  constructor(width: number, height: number, canvasID?: string) {
    engine.init(width, height, canvasID);
    engine.clearCanvas(Palette[Color.DarkPeach]);
    engine.drawSquare(Palette[Color.LightPeach]);
  }
}

window.onload = () => new Game(640, 480, "GLCanvas");
