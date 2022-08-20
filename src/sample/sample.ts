import { vec2 } from "gl-matrix";
import * as Engine from "../engine";
import BlueLevel from "./blue-scene";

class Game extends Engine.Scene {
  mPlayer: Engine.Renderable | null;
  mSupport: Engine.Renderable | null;
  mCamera: Engine.Camera | null;

  constructor() {
    super();

    this.mCamera = null;
    this.mPlayer = null;
    this.mSupport = null;
  }

  init(): void {
    this.mCamera = new Engine.Camera(
      vec2.fromValues(20, 60),
      20,
      [0, 0, 640, 480]
    );

    this.mSupport = new Engine.Renderable();
    this.mSupport.setColor(Engine.Palette[Engine.Color.Red]);
    this.mSupport.getTransform().setPosition(20, 60);
    this.mSupport.getTransform().setScale(5, 5); // Step C: Create the hero object in blue
    this.mPlayer = new Engine.Renderable();
    this.mPlayer.setColor(Engine.Palette[Engine.Color.Blue]);
    this.mPlayer.getTransform().setPosition(20, 60);
    this.mPlayer.getTransform().setScale(2, 3);
  }

  draw(): void {
    Engine.clearCanvas(Engine.Palette[Engine.Color.Black]);

    if (!this.mCamera) {
      throw new Error("Error: No viewport found");
    }

    // Start drawing by activating the camera
    this.mCamera?.setViewAndCameraMatrix();

    // Draw entities
    this.mSupport?.draw(this.mCamera);
    this.mPlayer?.draw(this.mCamera);
  }

  update(): void {
    const deltaX = 0.05;
    const player = this.mPlayer?.getTransform();

    // Move player
    if (player) {
      if (Engine.Input.isKeyPressed(Engine.Input.KEYS.ARROW_RIGHT)) {
        player.translateX(deltaX);
        if (player.getXPos() > 30) player.setPosition(12, 60);
      }
      if (Engine.Input.isKeyPressed(Engine.Input.KEYS.ARROW_LEFT)) {
        player.translateX(-deltaX);
        if (player.getXPos() < 11) this.next();
      }
    }

    if (Engine.Input.isKeyPressed(Engine.Input.KEYS.KEY_Q)) {
      this.stop();
    }
  }

  next(): void {
    super.next();

    const nextLevel = new BlueLevel();
    nextLevel.start();
  }
}

window.onload = () => {
  Engine.init(640, 480, "GLCanvas");
  const game = new Game();
  game.start();
};
