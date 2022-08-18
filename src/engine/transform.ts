import { mat4, vec2, vec3 } from "gl-matrix";
import { DEGREE } from "../utils/common";

class Transform {
  mPosition: vec2; // Translation
  mScale: vec2; // Size
  mRotationRad: number; // Rotation in radians

  constructor() {
    this.mPosition = vec2.fromValues(0, 0);
    this.mScale = vec2.fromValues(1, 1);
    this.mRotationRad = 0.0;
  }

  setXPos(x: number): void {
    this.mPosition[0] = x;
  }
  getXPos(): number {
    return this.mPosition[0];
  }
  translateX(delta: number): void {
    this.mPosition[0] += delta;
  }

  setYPos(y: number): void {
    this.mPosition[1] = y;
  }
  getYPos(): number {
    return this.mPosition[1];
  }
  translateY(delta: number): void {
    this.mPosition[1] += delta;
  }

  setPosition(x: number, y: number): void {
    this.setXPos(x);
    this.setYPos(y);
  }
  getPosition(): vec2 {
    return this.mPosition;
  }
  translate(deltaX: number, deltaY: number): void {
    this.translateX(deltaX);
    this.translateY(deltaY);
  }

  setWidth(w: number): void {
    this.mScale[0] = w;
  }
  getWidth(): number {
    return this.mScale[0];
  }
  scaleX(delta: number): void {
    this.mScale[0] += delta;
  }

  setHeight(h: number): void {
    this.mScale[1] = h;
  }
  getHeight(): number {
    return this.mScale[1];
  }
  scaleY(delta: number): void {
    this.mScale[1] += delta;
  }

  setScale(w: number, h: number): void {
    this.setWidth(w);
    this.setHeight(h);
  }
  getScale(): vec2 {
    return this.mScale;
  }
  scale(delta: number): void {
    this.scaleX(delta);
    this.scaleY(delta);
  }

  setRotationRad(r: number): void {
    this.mRotationRad = r;

    while (this.mRotationRad > 2 * Math.PI) {
      this.mRotationRad -= 2 * Math.PI;
    }
  }
  getRotationRad(): number {
    return this.mRotationRad;
  }
  rotateRad(delta: number) {
    this.setRotationRad(this.mRotationRad + delta);
  }

  setRotationDeg(r: number): void {
    this.setRotationRad(r * DEGREE);
  }
  getRotationDeg(): number {
    return this.mRotationRad * DEGREE;
  }
  rotateDeg(delta: number) {
    this.rotateRad(delta * DEGREE);
  }

  getTRSMatrix(): mat4 {
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
