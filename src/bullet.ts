import Canvas from "./canvas.js";
import Turret from "./turret.js";
import FlightController from "./flight-controller.js";
import Score from "./score.js";

export default class Bullet {

  static readonly BULLET_WIDTH_HEIGHT = 10;
  static readonly BULLET_SPEED = 10;

  barrelPosition: number;
  bulletX: number;
  bulletY: number;
  isGone: boolean;

  constructor(readonly canvas: Canvas, readonly turret: Turret, readonly flightController: FlightController, readonly score: Score) {
    this.barrelPosition = 0;
    this.bulletX = this.canvas.width / 2 - Bullet.BULLET_WIDTH_HEIGHT / 2;
    this.bulletY = this.canvas.height - Turret.BASE_WIDTH_HEIGHT - this.turret.twh - (Bullet.BULLET_WIDTH_HEIGHT / 2) - Turret.SCORE_HEIGHT;
    this.isGone = false;
    // Every time we shoot, the score is subtracted by one.
    this.score.subtract(1);
  }

  set aim(position: number) {
    this.barrelPosition = position;
  }

  draw = (): void => {
    this.canvas.ctx.fillStyle = Canvas.WHITE;
    this.canvas.ctx.beginPath();
    this.canvas.ctx.rect(this.bulletX, this.bulletY, Bullet.BULLET_WIDTH_HEIGHT, Bullet.BULLET_WIDTH_HEIGHT);
    this.canvas.ctx.fill();

    // Yay for maths!
    this.bulletX = this.bulletX + Bullet.BULLET_SPEED * Math.sin(this.barrelPosition * Math.PI);
    this.bulletY = this.bulletY - Bullet.BULLET_SPEED * Math.cos(this.barrelPosition * Math.PI);

    if (this.wentOffCanvas()) {
      this.isGone = true;
      return;
    }

    // We should check if we hit anything when the bullet is at these heights.
    if (this.bulletY >= FlightController.HELI_HEIGHT_HIGH && this.bulletY <= FlightController.HELI_HEIGHT_LOW) {
      this.checkHeliHit();
    }

  }

  checkHeliHit = (): void => {
    this.flightController.helis.forEach((heli) => {
      if (!heli.isExploding && this.bulletY > (heli.startY - 25) && this.bulletY < (heli.startY + 25)) {
        let heliCollisionRange = [heli.startX, heli.startX + (2 * heli.collisionWidth)];
        heliCollisionRange.sort((a, b) => a - b);
        if (this.bulletX >= heliCollisionRange[0] && this.bulletX <= heliCollisionRange[1]) {
          heli.isExploding = true;
          this.isGone = true;
          // A heli is 10 points!
          this.score.add(10);
        }
      }
    });
  }

  // Check if the bullet went off canvas.
  wentOffCanvas = (): boolean => {
    return ((this.bulletY < 0) || (this.bulletY > this.canvas.height) || (this.bulletX < 0) || (this.bulletX > this.canvas.width));
  }

}