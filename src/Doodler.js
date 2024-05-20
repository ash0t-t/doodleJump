import { ctx, canvas } from "./Util.js";
import { game } from "./index.js";

export class Doodler {
  constructor() {
    this.width = 100;
    this.height = 100;
    this.velocityX = 0;
    this.velocityY = 0;
    this.gravity = 0.4;
    this.img = new Image();
    this.img.src = "../images/doodler-right.png";
    this.imgLoaded = false;
    this.isRocket = false;
    this.rocketTimer = 0;

    this.img.onload = () => {
      this.imgLoaded = true;
    };

    this.resetPosition();
  }

  resetPosition() {
    this.x = canvas.width / 2 - this.width / 2;
    this.y = (canvas.height * 7) / 8 - this.height;
  }

  update() {
    this.x += this.velocityX;
    if (this.x > canvas.width) {
      this.x = canvas.width;
      game.gameOver = true;
    }
    if (this.x + this.width < 0) {
      this.x = 0 - this.width;
      game.gameOver = true;
    }

    if (this.isRocket) {
      this.rocketTimer -= 1;
      if (this.rocketTimer <= 0) {
        this.isRocket = false;
        this.img.src = "../images/doodler-right.png";
      }
    }

    if (this.velocityY != 0 || this.isRocket) {
      this.velocityY += this.gravity;
      this.y += this.velocityY;
    }

    if (this.y > canvas.height) {
      window.location.reload();
    }

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  jump(spring = false) {
    this.velocityY = spring ? -16  : -8;
  }

  moveRight() {
    this.velocityX += 3;
    this.img.src = "../images/doodler-right.png";
    this.img.onload = () => {
      this.imgLoaded = true;
    };
  }

  moveLeft() {
    this.velocityX -= 3;
    this.img.src = "../images/doodler-left.png";
    this.img.onload = () => {
      this.imgLoaded = true;
    };
  }

  shoot() {
    game.fireProjectile();
  }

  activateRocket() {
    this.isRocket = true;
    this.rocketTimer = 600;
    this.img.src = "../images/doodleRocket.png";
    this.velocityY = -15;
  }
}

export let doodler = new Doodler();
