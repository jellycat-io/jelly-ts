import Scene from "../scene";

const kUPS = 60; // Updates per second
const kMPF = 1000 / kUPS; // Milliseconds per update

// Variables for timing game loop
let mPrevTime: number;
let mLagTime: number;

// The current loop state
let mLoopRunning = false;
let mCurrentScene: Scene;
let mFrameID = -1;

function loopOnce(): void {
  if (mLoopRunning) {
    // Set up for next call to loopOnce
    mFrameID = requestAnimationFrame(loopOnce);

    mCurrentScene.draw(); // MUST be called before update() as update() may stop the loop

    // Compute time elapsed since last loopOnce was executed
    const currentTime = performance.now();
    const elapsedTime = currentTime - mPrevTime;

    mPrevTime = currentTime;
    mLagTime += elapsedTime;

    // Update the game the appropriate amount of times
    // Update only every kMPF (1/60 of a second)
    // If lag larger than update frames, update until caught up
    while (mLagTime >= kMPF && mLoopRunning) {
      mCurrentScene.update();
      mLagTime -= kMPF;
    }
  }
}

function start(scene: Scene): void {
  if (mLoopRunning) {
    throw new Error("Game loop already running");
  }

  mCurrentScene = scene;
  mCurrentScene.init();

  mPrevTime = performance.now();
  mLagTime = 0.0;
  mLoopRunning = true;
  mFrameID = requestAnimationFrame(loopOnce);
}

function stop(): void {
  mLoopRunning = false;
  // Make sure no more animation frames
  cancelAnimationFrame(mFrameID);
}

export { start, stop };
