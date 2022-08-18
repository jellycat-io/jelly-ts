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

    // Create a new identity transform operator
    const trsMatrix = mat4.create();

    // Compute white square transform
    mat4.translate(trsMatrix, trsMatrix, vec3.fromValues(-0.25, 0.25, 0.0));
    mat4.rotateZ(trsMatrix, trsMatrix, 0.2);
    mat4.scale(trsMatrix, trsMatrix, vec3.fromValues(1.2, 1.2, 1.0));

    // Draw white square with computed transform
    this.mWhiteSq.draw(trsMatrix);

    // Reset transform operator
    mat4.identity(trsMatrix);

    // Compute red square transform
    mat4.translate(trsMatrix, trsMatrix, vec3.fromValues(0.25, -0.25, 0.0));
    mat4.rotateZ(trsMatrix, trsMatrix, -0.785);
    mat4.scale(trsMatrix, trsMatrix, vec3.fromValues(0.4, 0.4, 1.0));

    // Draw red square with computed transform
    this.mRedSq.draw(trsMatrix);
  }
}

window.onload = () => new Game(640, 480, "GLCanvas");
