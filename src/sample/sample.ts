import * as Engine from "../engine";
import * as loop from "../engine/core/loop";
import Scene from "../engine/scene";
import { Color, Palette } from "../utils/palette";
import SceneFileParser from "./util";

class Game extends Scene {
  mSceneFile: string;
  mSqSet: Array<Engine.Renderable>;
  mCamera!: Engine.Camera;

  constructor() {
    super();
    this.mSceneFile = "src/assets/scene.xml";
    this.mSqSet = [];
  }

  load(): void {
    Engine.XMLResource.load(this.mSceneFile);
  }

  unload(): void {
    Engine.XMLResource.unload(this.mSceneFile);
  }

  init(): void {
    const sceneFile = Engine.XMLResource.get(this.mSceneFile);
    const sceneParser = new SceneFileParser(sceneFile);

    this.mCamera = sceneParser.parseCamera();
    sceneParser.parseSquares(this.mSqSet);
  }

  draw(): void {
    Engine.clearCanvas(Palette[Color.Black]);

    if (!this.mCamera) {
      throw new Error("Error: No viewport found");
    }

    // Start drawing by activating the camera
    this.mCamera?.setViewAndCameraMatrix();

    // Draw squares
    this.mSqSet.forEach((sq) => sq.draw(this.mCamera));
  }

  update() {
    const blueTransform = this.mSqSet[0].getTransform();
    const deltaX = 0.05;

    // Move blue square
    if (Engine.Input.isKeyPressed(Engine.Input.KEYS.ARROW_RIGHT)) {
      if (blueTransform.getXPos() > 30) blueTransform.setPosition(10, 60);
      blueTransform.translateX(deltaX);
    }

    if (Engine.Input.isKeyClicked(Engine.Input.KEYS.ARROW_UP)) {
      blueTransform.rotateDeg(1);
    }

    // pulse red square
    const redTransform = this.mSqSet[1].getTransform();

    if (Engine.Input.isKeyPressed(Engine.Input.KEYS.ARROW_DOWN)) {
      if (redTransform.getWidth() > 5) redTransform.setScale(2, 2);
      redTransform.scale(0.05);
    }
  }
}

window.onload = () => {
  Engine.init(640, 480, "GLCanvas");
  const game = new Game();
  loop.start(game);
};
