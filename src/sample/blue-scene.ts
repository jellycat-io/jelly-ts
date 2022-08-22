import * as Engine from "../engine";
import { Game } from "./sample";
import SceneFileParser from "./scene-file-parser";

export default class extends Engine.Scene {
  kSceneFile: string;
  kPortal: string;
  kCollector: string;
  mSqSet: Array<Engine.Renderable>;
  mCamera!: Engine.Camera;
  mBackgroundAudio: string;
  mCue: string;

  constructor() {
    super();
    this.kSceneFile = "src/assets/blue_level.xml";
    this.kPortal = "src/assets/minion_portal.jpg";
    this.kCollector = "src/assets/minion_collector.jpg";
    this.mSqSet = [];
    this.mBackgroundAudio = "src/assets/sounds/bg_clip.mp3";
    this.mCue = "src/assets/sounds/blue_level_cue.wav";
  }

  load(): void {
    Engine.XMLResource.load(this.kSceneFile);
    Engine.TextureResource.load(this.kPortal);
    Engine.TextureResource.load(this.kCollector);
    Engine.Audio.load(this.mBackgroundAudio);
    Engine.Audio.load(this.mCue);
  }

  unload(): void {
    Engine.Audio.stopBackground();
    Engine.XMLResource.unload(this.kSceneFile);
    Engine.TextureResource.unload(this.kPortal);
    Engine.TextureResource.unload(this.kCollector);
    Engine.Audio.unload(this.mBackgroundAudio);
    Engine.Audio.unload(this.mCue);
  }

  init(): void {
    const sceneFile = Engine.XMLResource.get(this.kSceneFile);
    const sceneParser = new SceneFileParser(sceneFile);

    this.mCamera = sceneParser.parseCamera();
    sceneParser.parseSquares(this.mSqSet);
    sceneParser.parseTextureSquares(this.mSqSet);

    Engine.Audio.playBackground(this.mBackgroundAudio, 1.0);
  }

  draw(): void {
    Engine.clearCanvas(Engine.Palette.getGLColor("Black"));

    if (!this.mCamera) {
      throw new Error("Error: No viewport found");
    }

    // Start drawing by activating the camera
    this.mCamera?.setupViewProjection();

    // Draw squares
    this.mSqSet.forEach((sq) => sq.draw(this.mCamera));
  }

  update() {
    const redSquare = this.mSqSet[0].getTransform();
    const deltaX = 0.05;

    if (redSquare) {
      if (Engine.Input.isKeyPressed(Engine.Input.KEYS.ARROW_RIGHT)) {
        // Engine.Audio.playCue(this.mCue, 0.5);
        Engine.Audio.incBackgroundVolume(0.05);
        redSquare.translateX(deltaX);
        if (redSquare.getXPos() > 30) this.next();
      }
      if (Engine.Input.isKeyPressed(Engine.Input.KEYS.ARROW_LEFT)) {
        // Engine.Audio.playCue(this.mCue, 1.5);
        Engine.Audio.incBackgroundVolume(-0.05);
        redSquare.translateX(-deltaX);
        if (redSquare.getXPos() < 11) redSquare.setPosition(30, 60);
      }
    }

    // pulse red square
    const minion = this.mSqSet[1].getTransform();

    if (Engine.Input.isKeyPressed(Engine.Input.KEYS.ARROW_DOWN)) {
      if (minion.getWidth() > 5) minion.setScale(2, 2);
      minion.scale(0.05);
    }

    const c = this.mSqSet[1].getColor();
    let ca = c[3] + deltaX;
    if (ca > 1) {
      ca = 0;
    }
    c[3] = ca;

    if (Engine.Input.isKeyPressed(Engine.Input.KEYS.KEY_Q)) {
      this.stop();
    }
  }

  next() {
    super.next();
    const nextLevel = new Game();
    nextLevel.start();
  }
}
