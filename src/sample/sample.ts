import * as engine from "../engine/core";
import { Color } from "../utils/palette";

class Game {
  constructor(width: number, height: number, canvasID?: string) {
    engine.init(width, height, canvasID);
    engine.clearCanvas(Color.DarkPeach);
    engine.drawSquare();
  }
}

window.onload = () => new Game(640, 480, "GLCanvas");
