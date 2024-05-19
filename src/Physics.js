import { doodler } from './Doodler.js';
import { game } from './index.js';

export function updateScore(game) {
    if (doodler.velocityY < 0) {
        game.score += 1;
    }
}

/* export function moveDoodler(e) {
  if (e.code === "ArrowRight" || e.code === "KeyD") {
      doodler.velocityY += 40;
      doodler.velocityX += 40
      // doodler.img.src = 'images/doodler-right.png';
      console.log("A")
  } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
      doodler.velocityY += -4;
      doodler.velocityX += -4
      // doodler.img.src = 'images/doodler-left.png';
      console.log("B")
  } else if (e.code === "Space") {
      game.fireProjectile();
  }
} */

export function detectCollision(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}
