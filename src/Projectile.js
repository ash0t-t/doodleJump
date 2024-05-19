import { ctx } from "./Util.js";

export class Projectile {
  constructor(x, y) {
    this.width = 10;
    this.height = 20;
    this.x = x;
    this.y = y;
    this.speed = -5;
    this.img = new Image();
    this.img.src = "../images/ball.png";
  }

  update() {
    this.y += this.speed;
    this.draw();
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  isOffScreen() {
    return this.y < 0;
  }
}
