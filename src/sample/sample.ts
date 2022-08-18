import { mat4, vec2, vec3 } from "gl-matrix";
import * as Engine from "../engine";
import { Color, Palette } from "../utils/palette";

class Game {
  mBlueSq: Engine.Renderable;
  mRedSq: Engine.Renderable;
  mTLSq: Engine.Renderable;
  mTRSq: Engine.Renderable;
  mBLSq: Engine.Renderable;
  mBRSq: Engine.Renderable;

  constructor(width: number, height: number, canvasID?: string) {
    Engine.init(width, height, canvasID);

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

    Engine.clearCanvas(Palette[Color.LightGrey]);

    const gl = Engine.getGL();
    // Set up viewport
    gl?.viewport(
      20, // x position of bottom-left corner
      40, // y position of bottom-left corner
      600, // viewport width
      300 // viewport height
    );

    // Set up scissor area to limit clear area
    gl?.scissor(
      20, // x position of bottom-left corner
      40, // y position of bottom-left corner
      600, // viewport width
      300 // viewport height
    );

    gl?.enable(gl.SCISSOR_TEST);
    Engine.clearCanvas(Palette[Color.White]);
    gl?.disable(gl.SCISSOR_TEST);

    // Set up camera transform operator
    const cameraCenter = vec2.fromValues(20, 60);
    const wcSize = vec2.fromValues(20, 10);
    const cameraMatrix = mat4.create();

    // After translation, scale to: -1 to 1: a 2x2 square at origin
    mat4.scale(
      cameraMatrix,
      cameraMatrix,
      vec3.fromValues(2.0 / wcSize[0], 2.0 / wcSize[1], 1.0)
    );
    mat4.translate(
      cameraMatrix,
      cameraMatrix,
      vec3.fromValues(-cameraCenter[0], -cameraCenter[1], 0)
    );

    // Draw blue square
    this.mBlueSq.getTransform().setPosition(20, 60);
    this.mBlueSq.getTransform().setRotationRad(0.2);
    this.mBlueSq.getTransform().setScale(5, 5);
    this.mBlueSq.draw(cameraMatrix);

    // Draw red square
    this.mRedSq.getTransform().setPosition(20, 60);
    this.mRedSq.getTransform().setScale(2, 2);
    this.mRedSq.draw(cameraMatrix);

    // Draw corner squares
    this.mTLSq.getTransform().setPosition(10, 65);
    this.mTLSq.draw(cameraMatrix);
    this.mTRSq.getTransform().setPosition(30, 65);
    this.mTRSq.draw(cameraMatrix);
    this.mBLSq.getTransform().setPosition(10, 55);
    this.mBLSq.draw(cameraMatrix);
    this.mBRSq.getTransform().setPosition(30, 55);
    this.mBRSq.draw(cameraMatrix);
  }
}

window.onload = () => new Game(640, 480, "GLCanvas");
