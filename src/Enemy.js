import { ctx, canvas } from "./Util.js";

export class Enemy {
  constructor(x, y) {
    this.width = 100;
    this.height = 100;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = this.getRandomEnemyImage();
  }

  getRandomEnemyImage() {
    const enemyImages = [
      "../images/enemy.png",
      "../images/enemy2.png",
      "../images/enemy3.png",
      "../images/enemy4.png",
      "../images/enemy5.png",
    ];
    return enemyImages[Math.floor(Math.random() * enemyImages.length)];
  }

  update() {
    this.y += 2;
    if (this.y > canvas.height) {
      this.reset();
    }
    this.draw();
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  reset() {
    this.x = Math.random() * (canvas.width - this.width);
    this.y = -this.height;
  }
}
