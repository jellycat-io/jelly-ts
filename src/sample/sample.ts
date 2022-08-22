import { vec2 } from "gl-matrix";
import * as Engine from "../engine";
import BlueLevel from "./blue-scene";

class Game extends Engine.Scene {
  mPlayer: Engine.Renderable | null;
  mSupport: Engine.Renderable | null;
  mCamera: Engine.Camera | null;
  mBackgroundAudio: string;
  mCue: string;

  constructor() {
    super();

    this.mCamera = null;
    this.mPlayer = null;
    this.mSupport = null;
    this.mBackgroundAudio = "src/assets/sounds/bg_clip.mp3";
    this.mCue = "src/assets/sounds/my_game_cue.wav";
  }

  load() {
    Engine.Audio.load(this.mBackgroundAudio);
    Engine.Audio.load(this.mCue);
  }

  unload() {
    Engine.Audio.stopBackground();
    Engine.Audio.unload(this.mBackgroundAudio);
    Engine.Audio.unload(this.mCue);
  }

  init(): void {
    this.mCamera = new Engine.Camera(
      vec2.fromValues(50, 50),
      20,
      [0, 0, 1024, 1024],
      Engine.Palette.getGLColor("Cream", 1)
    );

    this.mSupport = new Engine.Renderable();
    this.mSupport.setColor(Engine.Palette.getGLColor("Red"));
    this.mSupport.getTransform().setPosition(42.5, 42.5);
    this.mSupport.getTransform().setScale(5, 5); // Step C: Create the hero object in blue
    this.mPlayer = new Engine.Renderable();
    this.mPlayer.setColor(Engine.Palette.getGLColor("Blue"));
    this.mPlayer.getTransform().setPosition(50, 50);
    this.mPlayer.getTransform().setScale(2, 3);

    Engine.Audio.playBackground(this.mBackgroundAudio, 1.0);
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
  }

  update(): void {
    const deltaX = 0.05;
    const player = this.mPlayer?.getTransform();

    // Move player
    if (player) {
      if (Engine.Input.isKeyPressed(Engine.Input.KEYS.ARROW_RIGHT)) {
        Engine.Audio.playCue(this.mCue, 0.5);
        Engine.Audio.incBackgroundVolume(0.05);
        player.translateX(deltaX);
        if (player.getXPos() > 30) player.setPosition(12, 60);
      }
      if (Engine.Input.isKeyPressed(Engine.Input.KEYS.ARROW_LEFT)) {
        Engine.Audio.playCue(this.mCue, 1.5);
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
  Engine.init(1024, 1024, "GLCanvas");
  const game = new Game();
  game.start();
};
