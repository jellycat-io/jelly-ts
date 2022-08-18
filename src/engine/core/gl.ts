let mCanvas: HTMLCanvasElement | null = null;
let mGL: WebGL2RenderingContext | null = null;

export function get() {
  return mGL;
}

export function init(width: number, height: number, canvasID?: string): void {
  if (canvasID) {
    mCanvas = document.getElementById(canvasID) as HTMLCanvasElement;

    if (!mCanvas) {
      throw new Error(`Cannot find a canvas element named ${canvasID}`);
    }
  } else {
    mCanvas = document.createElement("canvas") as HTMLCanvasElement;
    document.body.appendChild(mCanvas);
  }

  mCanvas.width = width;
  mCanvas.height = height;

  mGL = mCanvas.getContext("webgl2");

  if (!mGL) {
    throw new Error("Unable to initialize WebGL2");
  }
}
