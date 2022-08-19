import * as loop from "./core/loop";
import * as engine from ".";

const kAbstractClassError = new Error("Abstract Class");
const kAbstractMethodError = new Error("Abstract Method");

/**
 * @class
 * @classdesc The abstract Scene class
 */
class Scene {
  constructor() {
    if (this.constructor === Scene) {
      throw kAbstractClassError;
    }
  }

  /**
   * @description Starts the scene
   */
  async start(): Promise<void> {
    await loop.start(this);
  }

  /**
   * @description Loads next scene
   * @todo
   */
  next(): void {
    loop.stop();
    this.unload();
  }

  /**
   * @description Stops the scene
   */
  stop(): void {
    loop.stop();
    this.unload();
    engine.cleanUp();
  }

  /**
   * @description Initializes the level (called from loop.start())
   */
  init(): void {
    /* */
  }
  /**
   * @description Loads necessary resources
   */
  load(): void {
    /* */
  }
  /**
   * @description Unloads all ressources
   */
  unload(): void {
    /* */
  }

  /**
   * @abstract
   * @description Draws the scene (called every frame).
   * Must be overwritten by subclass
   */
  draw(): void {
    throw kAbstractMethodError;
  }

  /**
   * @abstract
   * @description Updates the scene (called every frame).
   * Must be overwritten by subclass
   */
  update(): void {
    throw kAbstractMethodError;
  }
}

export default Scene;
