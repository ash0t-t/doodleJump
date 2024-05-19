import { ctx, canvas } from "./Util.js";
import { game } from './index.js';

// export let doodler;
export class Doodler {
  constructor() {
    this.width = 90;
    this.height = 90;
    this.velocityX = 0;
    this.velocityY = 0; // Adjusted velocityY to start at 0
    this.gravity = 0.4;
    this.img = new Image();
    this.img.src = "../images/doodler-right.png";
    this.imgLoaded = false;

    // Ensure the image is loaded before using it
    this.img.onload = () => {
      this.imgLoaded = true;
    };

    this.resetPosition();
  }

  resetPosition() {
    // Reset doodler position to appear on a platform
    this.x = canvas.width / 2 - this.width / 2;
    this.y = (canvas.height * 7) / 8 - this.height;
  }

  update() {
    this.x += this.velocityX;
    if (this.x > canvas.width) {
      this.x = canvas.width;
      game.gameOver = true; // End game if doodler reaches the right edge
    }
    if (this.x + this.width < 0) {
      this.x = 0 - this.width;
      game.gameOver = true; // End game if doodler reaches the left edge
    }

    // Updated condition to prevent the game from going up when doodler is idle on a common platform
    if (this.velocityY !== 0) {
      this.velocityY += this.gravity;
      this.y += this.velocityY;
    }

    if (this.y > canvas.height) {
      window.location.reload(); // Reload the page if doodler falls off the canvas
    }

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  jump(spring = false) {
    this.velocityY = spring ? -12 : -8; // Adjusted jump height for spring
  }

  moveRight() {
    this.velocityX += 4;
    this.img.src = '../images/doodler-right.png';
    this.img.onload = () => {
      this.imgLoaded = true;
    };
  }

  moveLeft() {
    this.velocityX -= 4;
    this.img.src = '../images/doodler-left.png';
    this.img.onload = () => {
      this.imgLoaded = true;
    };
  }
  shoot() {
    game.fireProjectile()
  }
}


export let doodler = new Doodler(); // Export the doodler object directly
