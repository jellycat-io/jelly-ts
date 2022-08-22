import { vec2 } from "gl-matrix";
import * as Engine from "../engine";
import BlueLevel from "./blue-scene";

export class Game extends Engine.Scene {
  mPlayer: Engine.Renderable | null;
  mSupport: Engine.Renderable | null;
  mPortal: Engine.TextureRenderable | null;
  mCollector: Engine.TextureRenderable | null;
  mCamera: Engine.Camera | null;
  kPortal: string;
  kCollector: string;
  mBackgroundAudio: string;
  mCue: string;

  constructor() {
    super();

    this.kPortal = "src/assets/minion_portal.png";
    this.kCollector = "src/assets/minion_collector.png";

    this.mCamera = null;
    this.mPlayer = null;
    this.mSupport = null;
    this.mPortal = null;
    this.mCollector = null;
    this.mBackgroundAudio = "src/assets/sounds/bg_clip.mp3";
    this.mCue = "src/assets/sounds/my_game_cue.wav";
  }

  load() {
    Engine.TextureResource.load(this.kPortal);
    Engine.TextureResource.load(this.kCollector);
    Engine.Audio.load(this.mBackgroundAudio);
    Engine.Audio.load(this.mCue);
  }

  unload() {
    Engine.Audio.stopBackground();
    Engine.TextureResource.unload(this.kPortal);
    Engine.TextureResource.unload(this.kCollector);
    Engine.Audio.unload(this.mBackgroundAudio);
    Engine.Audio.unload(this.mCue);
  }

  init(): void {
    this.mCamera = new Engine.Camera(
      vec2.fromValues(20, 60),
      20,
      [0, 0, 640, 480],
      Engine.Palette.getGLColor("Cream", 1)
    );

    this.mPortal = new Engine.TextureRenderable(
      this.kPortal,
      Engine.Utils.TextureFilter.LINEAR
    );
    this.mPortal.setColor(Engine.Palette.getGLColor("Red", 0.2)); // Tints red
    this.mPortal.getTransform().setPosition(25, 60);
    this.mPortal.getTransform().setScale(3, 3);

    this.mCollector = new Engine.TextureRenderable(this.kCollector);
    this.mCollector.setColor(Engine.Palette.getGLColor("Black", 0)); // No tinting
    this.mCollector.getTransform().setPosition(15, 60);
    this.mCollector.getTransform().setScale(3, 3);

    this.mSupport = new Engine.Renderable();
    this.mSupport.setColor(Engine.Palette.getGLColor("Red"));
    this.mSupport.getTransform().setPosition(20, 60);
    this.mSupport.getTransform().setScale(5, 5);

    this.mPlayer = new Engine.Renderable();
    this.mPlayer.setColor(Engine.Palette.getGLColor("Blue"));
    this.mPlayer.getTransform().setPosition(20, 60);
    this.mPlayer.getTransform().setScale(2, 3);

    // Engine.Audio.playBackground(this.mBackgroundAudio, 1.0);
  }

  draw(): void {
    Engine.clearCanvas(Engine.Palette.getGLColor("Black"));

    if (!this.mCamera) {
      throw new Error("Error: No viewport found");
    }

    // Start drawing by activating the camera
    this.mCamera?.setupViewProjection();

    // Draw entities
    this.mSupport?.draw(this.mCamera);
    this.mPlayer?.draw(this.mCamera);
    this.mPortal?.draw(this.mCamera);
    this.mCollector?.draw(this.mCamera);
  }

  update(): void {
    const deltaX = 0.05;
    const player = this.mPlayer?.getTransform();

    // Move player
    if (player) {
      if (Engine.Input.isKeyPressed(Engine.Input.KEYS.ARROW_RIGHT)) {
        // Engine.Audio.playCue(this.mCue, 0.5);
        Engine.Audio.incBackgroundVolume(0.05);
        player.translateX(deltaX);
        if (player.getXPos() > 30) player.setPosition(12, 60);
      }
      if (Engine.Input.isKeyPressed(Engine.Input.KEYS.ARROW_LEFT)) {
        // Engine.Audio.playCue(this.mCue, 1.5);
        Engine.Audio.incBackgroundVolume(-0.05);
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
