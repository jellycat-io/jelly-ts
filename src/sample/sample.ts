import { mat4, vec2, vec3 } from "gl-matrix";
import * as Engine from "../engine";
import { Color, Palette } from "../utils/palette";

class Game {
  mCamera: Engine.Camera;
  mBlueSq: Engine.Renderable;
  mRedSq: Engine.Renderable;
  mTLSq: Engine.Renderable;
  mTRSq: Engine.Renderable;
  mBLSq: Engine.Renderable;
  mBRSq: Engine.Renderable;

  constructor(width: number, height: number, canvasID?: string) {
    Engine.init(width, height, canvasID);

    this.mCamera = new Engine.Camera(
      vec2.fromValues(20, 60),
      20,
      [20, 40, 600, 300]
    );

    this.mBlueSq = new Engine.Renderable();
    this.mBlueSq.setColor(Palette[Color.Blue]);
    this.mRedSq = new Engine.Renderable();
    this.mRedSq.setColor(Palette[Color.Red]);
    this.mTLSq = new Engine.Renderable();
    this.mTLSq.setColor(Palette[Color.Red]);
    this.mTRSq = new Engine.Renderable();
    this.mTRSq.setColor(Palette[Color.Green]);
    this.mBLSq = new Engine.Renderable();
    this.mBLSq.setColor(Palette[Color.DarkGrey]);
    this.mBRSq = new Engine.Renderable();
    this.mBRSq.setColor(Palette[Color.Blue]);

    Engine.clearCanvas(Palette[Color.Black]);

    // Start drawing by activating the camera
    this.mCamera.setViewAndCameraMatrix();

    // Draw blue square
    this.mBlueSq.getTransform().setPosition(20, 60);
    this.mBlueSq.getTransform().setRotationRad(0.2);
    this.mBlueSq.getTransform().setScale(5, 5);
    this.mBlueSq.draw(this.mCamera);

    // Draw red square
    this.mRedSq.getTransform().setPosition(20, 60);
    this.mRedSq.getTransform().setScale(2, 2);
    this.mRedSq.draw(this.mCamera);

    // Draw corner squares
    this.mTLSq.getTransform().setPosition(10, 65);
    this.mTLSq.draw(this.mCamera);
    this.mTRSq.getTransform().setPosition(30, 65);
    this.mTRSq.draw(this.mCamera);
    this.mBLSq.getTransform().setPosition(10, 55);
    this.mBLSq.draw(this.mCamera);
    this.mBRSq.getTransform().setPosition(30, 55);
    this.mBRSq.draw(this.mCamera);
  }
}

window.onload = () => new Game(640, 480, "GLCanvas");
