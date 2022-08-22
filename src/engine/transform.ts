import { mat4, vec2, vec3 } from "gl-matrix";
import { DEGREE } from "./utils/utils";

/**
 * @class
 * @classdesc An entity transform which allow to modify it
 */
class Transform {
  /**
   * @private
   * @type {vec2}
   */
  mPosition: vec2; // Translation
  /**
   * @private
   * @type {vec2}
   */
  mScale: vec2; // Size
  /**
   * @private
   * @type {number}
   */
  mRotationRad: number; // Rotation in radians

  constructor() {
    this.mPosition = vec2.fromValues(0, 0);
    this.mScale = vec2.fromValues(1, 1);
    this.mRotationRad = 0.0;
  }

  /**
   * @description Sets transform x position
   * @param {number} x The new x position
   */
  setXPos(x: number): void {
    this.mPosition[0] = x;
  }
  /**
   * @description Gets the transform x position
   * @returns {number} the transform x position
   */
  getXPos(): number {
    return this.mPosition[0];
  }
  /**
   * @description Translates transform on the X axis
   * @param {number} delta The amount to add to x position
   */
  translateX(delta: number): void {
    this.mPosition[0] += delta;
  }
  /**
   * @description Sets transform y position
   * @param {number} y The new y position
   */
  setYPos(y: number): void {
    this.mPosition[1] = y;
  }
  /**
   * @description Gets the transform y position
   * @returns {number} the transform y position
   */
  getYPos(): number {
    return this.mPosition[1];
  }
  /**
   * @description Translates transform on the Y axis
   * @param {number} delta The amount to add to y position
   */
  translateY(delta: number): void {
    this.mPosition[1] += delta;
  }

  /**
   * @description Sets transform on both axis
   * @param {number} x The new x position
   * @param {number} y The new y position
   */
  setPosition(x: number, y: number): void {
    this.setXPos(x);
    this.setYPos(y);
  }
  /**
   * @description Gets the transform position
   * @returns {vec2} the transform position
   */
  getPosition(): vec2 {
    return this.mPosition;
  }
  /**
   * @description Translates transform on both axis
   * @param {number} deltaX The amount to add on X axis
   * @param {number} deltaY The amount to add on Y axis
   */
  translate(deltaX: number, deltaY: number): void {
    this.translateX(deltaX);
    this.translateY(deltaY);
  }
  /**
   * @description Sets transform width
   * @param {number} w The new width
   */
  setWidth(w: number): void {
    this.mScale[0] = w;
  }
  /**
   * @description Gets the transform width
   * @returns {number} the transform width
   */
  getWidth(): number {
    return this.mScale[0];
  }
  /**
   * @description Changes transform width
   * @param {number} delta The amount to add to the width
   */
  scaleX(delta: number): void {
    this.mScale[0] += delta;
  }

  /**
   * @description Sets transform height
   * @param {number} h The new height
   */
  setHeight(h: number): void {
    this.mScale[1] = h;
  }
  /**
   * @description Gets the transform height
   * @returns {number} the transform height
   */
  getHeight(): number {
    return this.mScale[1];
  }
  /**
   * @description Changes transform height
   * @param {number} delta The amount to add to the height
   */
  scaleY(delta: number): void {
    this.mScale[1] += delta;
  }

  /**
   * @description Sets transform size
   * @param {number} w The new width
   * @param {number} h The new height
   */
  setScale(w: number, h: number): void {
    this.setWidth(w);
    this.setHeight(h);
  }
  /**
   * @description Gets the transform size
   * @returns {vec2} the transform size
   */
  getScale(): vec2 {
    return this.mScale;
  }
  /**
   * @description Changes transform size
   * @param {number} delta The amount to add to both width and height
   */
  scale(delta: number): void {
    this.scaleX(delta);
    this.scaleY(delta);
  }

  /**
   * @description Sets transform angle in radians
   * @param {number} r The new angle in radians
   */
  setRotationRad(r: number): void {
    this.mRotationRad = r;

    while (this.mRotationRad > 2 * Math.PI) {
      this.mRotationRad -= 2 * Math.PI;
    }
  }
  /**
   * @description Gets transform rotation angle in radians
   * @returns {number} the rotation angle in radians
   */
  getRotationRad(): number {
    return this.mRotationRad;
  }
  /**
   * @description Changes transform rotation angle in radians
   * @param {number} delta The amount to add in radians to transform rotation angle
   */
  rotateRad(delta: number) {
    this.setRotationRad(this.mRotationRad + delta);
  }

  /**
   * @description Sets transform angle in degrees
   * @param {number} r The new angle in degrees
   */
  setRotationDeg(r: number): void {
    this.setRotationRad(r * DEGREE);
  }
  /**
   * @description Gets transform rotation angle in degrees
   * @returns {number} the rotation angle in degrees
   */
  getRotationDeg(): number {
    return this.mRotationRad * DEGREE;
  }
  /**
   * @description Changes transform rotation angle in degrees
   * @param {number} delta The amount to add in degrees to transform rotation angle
   */
  rotateDeg(delta: number) {
    this.rotateRad(delta * DEGREE);
  }

  /**
   * @description Gets the transform matrix
   * @returns {mat4} the transform matrix
   */
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
