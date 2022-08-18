import { vec2 } from "gl-matrix";
import Engine from "../engine";
import * as loop from "../engine/core/loop";
import Scene from "../engine/scene";
import { Color, Palette } from "../utils/palette";

class Game implements Scene {
  mCamera!: Engine.Camera;
  mBlueSq!: Engine.Renderable;
  mRedSq!: Engine.Renderable;

  init(): void {
    this.mCamera = new Engine.Camera(
      vec2.fromValues(20, 60),
      20,
      [20, 40, 600, 300]
    );
    this.mCamera.setBackgroundColor(Palette[Color.White]);

    this.mBlueSq = new Engine.Renderable();
    this.mBlueSq.setColor(Palette[Color.Blue]);
    this.mRedSq = new Engine.Renderable();
    this.mRedSq.setColor(Palette[Color.Red]);

    // Init blue square: centered, 5x5, rotated
    this.mBlueSq.getTransform().setPosition(20, 60);
    this.mBlueSq.getTransform().setRotationRad(0.2);
    this.mBlueSq.getTransform().setScale(5, 5);

    // Init red square: centered, 2x2
    this.mRedSq.getTransform().setPosition(20, 60);
    this.mRedSq.getTransform().setScale(2, 2);
  }

  draw(): void {
    Engine.clearCanvas(Palette[Color.Black]);

    // Start drawing by activating the camera
    this.mCamera.setViewAndCameraMatrix();

    // Draw renderables
    this.mBlueSq.draw(this.mCamera);
    this.mRedSq.draw(this.mCamera);
  }

  update() {
    const blueTransform = this.mBlueSq.getTransform();
    const deltaX = 0.05;

    // Move blue square
    if (blueTransform.getXPos() > 30) blueTransform.setPosition(10, 60);
    blueTransform.translateX(deltaX);
    blueTransform.rotateDeg(1);

    // pulse red square
    const redTransform = this.mRedSq.getTransform();

    if (redTransform.getWidth() > 5) redTransform.setScale(2, 2);
    redTransform.scale(0.05);
  }
}

window.onload = () => {
  Engine.init(640, 480, "GLCanvas");
  const game = new Game();
  loop.start(game);
};
