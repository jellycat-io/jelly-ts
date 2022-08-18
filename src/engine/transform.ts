import { mat4, vec2, vec3 } from "gl-matrix";
import { DEGREE } from "../utils/common";

class Transform {
  mPosition: vec2;
  mScale: vec2;
  mRotationRad: number;

  constructor() {
    this.mPosition = vec2.fromValues(0, 0);
    this.mScale = vec2.fromValues(1, 1);
    this.mRotationRad = 0.0;
  }

  setXPos(x: number) {
    this.mPosition[0] = x;
  }
  getXPos() {
    return this.mPosition[0];
  }
  setYPos(y: number) {
    this.mPosition[1] = y;
  }
  getYPos() {
    return this.mPosition[1];
  }
  setPosition(x: number, y: number) {
    this.setXPos(x);
    this.setYPos(y);
  }
  getPosition() {
    return this.mPosition;
  }

  setWidth(w: number) {
    this.mScale[0] = w;
  }
  getWidth() {
    return this.mScale[0];
  }
  setHeight(h: number) {
    this.mScale[1] = h;
  }
  getHeight() {
    return this.mScale[1];
  }
  setScale(w: number, h: number) {
    this.setWidth(w);
    this.setHeight(h);
  }
  getScale() {
    this.mScale;
  }
  setRotationRad(r: number) {
    this.mRotationRad = r;

    while (this.mRotationRad > 2 * Math.PI) {
      this.mRotationRad -= 2 * Math.PI;
    }
  }
  getRotationRad() {
    return this.mRotationRad;
  }
  setRotationDeg(r: number) {
    this.setRotationRad(r * DEGREE);
  }
  getRotationDeg() {
    return this.mRotationRad * DEGREE;
  }

  getTRSMatrix() {
    // Create identity matrix
    const matrix = mat4.create();

    // Compute translation (no z axis)
    mat4.translate(
      matrix,
      matrix,
      vec3.fromValues(this.getXPos(), this.getYPos(), 0.0)
    );
    mat4.rotateZ(matrix, matrix, this.getRotationRad());
    mat4.scale(
      matrix,
      matrix,
      vec3.fromValues(this.getWidth(), this.getHeight(), 1.0)
    );

    return matrix;
  }
}

export default Transform;
