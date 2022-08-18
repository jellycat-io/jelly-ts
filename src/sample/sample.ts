import { mat4, vec3 } from "gl-matrix";
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

    // Compute white square transform
    this.mWhiteSq.getTransform().setPosition(-0.25, 0.25);
    this.mWhiteSq.getTransform().setRotationRad(0.2);
    this.mWhiteSq.getTransform().setScale(1.2, 1.2);

    // Draw white square with computed transform
    this.mWhiteSq.draw();

    // Compute red square transform
    this.mRedSq.getTransform().setXPos(0.25);
    this.mRedSq.getTransform().setYPos(-0.25);
    this.mRedSq.getTransform().setRotationDeg(45);
    this.mRedSq.getTransform().setWidth(0.4);
    this.mRedSq.getTransform().setHeight(0.2);

    // Draw red square with computed transform
    this.mRedSq.draw();
  }
}

window.onload = () => new Game(640, 480, "GLCanvas");
