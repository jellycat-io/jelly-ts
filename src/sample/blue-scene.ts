import * as Engine from "../engine";
import SceneFileParser from "./util";

export default class extends Engine.Scene {
  mSceneFile: string;
  mSqSet: Array<Engine.Renderable>;
  mCamera!: Engine.Camera;

  constructor() {
    super();
    this.mSceneFile = "src/assets/blue-scene.xml";
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
    Engine.clearCanvas(Engine.Palette[Engine.Color.Black]);

    if (!this.mCamera) {
      throw new Error("Error: No viewport found");
    }

    // Start drawing by activating the camera
    this.mCamera?.setViewAndCameraMatrix();

    // Draw squares
    this.mSqSet.forEach((sq) => sq.draw(this.mCamera));
  }

  update() {
    const whiteTransform = this.mSqSet[0].getTransform();
    const deltaX = 0.05;

    // Move blue square
    if (Engine.Input.isKeyPressed(Engine.Input.KEYS.ARROW_RIGHT)) {
      if (whiteTransform.getXPos() > 30) whiteTransform.setPosition(10, 60);
      whiteTransform.translateX(deltaX);
    }

    if (Engine.Input.isKeyClicked(Engine.Input.KEYS.ARROW_UP)) {
      whiteTransform.rotateDeg(1);
    }

    // pulse red square
    const redTransform = this.mSqSet[1].getTransform();

    if (Engine.Input.isKeyPressed(Engine.Input.KEYS.ARROW_DOWN)) {
      if (redTransform.getWidth() > 5) redTransform.setScale(2, 2);
      redTransform.scale(0.05);
    }
  }
}
