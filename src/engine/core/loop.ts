import Scene from "../scene";
import * as input from "../input";
import * as ResourceMap from "./resource-map";

/**
 * @module GameLoop
 */

/**
 * @constant
 */
const kUPS = 60; // Updates per second
/**
 * @constant
 */
const kMPF = 1000 / kUPS; // Milliseconds per update

// Variables for timing game loop
let mPrevTime: number;
let mLagTime: number;

// The current loop state
let mLoopRunning = false;
let mCurrentScene: Scene | null;
let mFrameID = -1;

/**
 * @function
 * @description Loops every frame
 */
function loopOnce(): void {
  if (mLoopRunning) {
    // Set up for next call to loopOnce
    mFrameID = requestAnimationFrame(loopOnce);

    mCurrentScene?.draw(); // MUST be called before update() as update() may stop the loop

    // Compute time elapsed since last loopOnce was executed
    const currentTime = performance.now();
    const elapsedTime = currentTime - mPrevTime;

    mPrevTime = currentTime;
    mLagTime += elapsedTime;

    // Update the game the appropriate amount of times
    // Update only every kMPF (1/60 of a second)
    // If lag larger than update frames, update until caught up
    while (mLagTime >= kMPF && mLoopRunning) {
      input.update();
      mCurrentScene?.update();
      mLagTime -= kMPF;
    }
  }
}

/**
 * @async
 * @description Starts the game loop
 * @param {Scene} scene The starting scene of the game
 * @returns {Promise<void>}
 */
export async function start(scene: Scene): Promise<void> {
  if (mLoopRunning) {
    throw new Error("Game loop already running");
  }

  mCurrentScene = scene;
  mCurrentScene.load();

  // Wait for any async request before game loading
  await ResourceMap.waitOnPromises();

  mCurrentScene.init();

  mPrevTime = performance.now();
  mLagTime = 0.0;
  mLoopRunning = true;
  mFrameID = requestAnimationFrame(loopOnce);
}

/**
 * @description Stops the game loop
 */
export function stop(): void {
  mLoopRunning = false;
  // Make sure no more animation frames
  cancelAnimationFrame(mFrameID);
}

/**
 * @description Cleans up the loop
 */
export function cleanUp(): void {
  if (mLoopRunning) {
    stop();
    // Unload all resources
    mCurrentScene?.unload();
    mCurrentScene = null;
  }
}
