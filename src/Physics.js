import { doodler } from './Doodler.js';
import { game } from './index.js';

export function updateScore(game) {
    if (doodler.velocityY < 0) {
        game.score += 1;
    }
}

export function moveDoodler(e) {
    if (e.code === "ArrowRight" || e.code === "KeyD") {
        doodler.velocityX = 4;
    } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
        doodler.velocityX = -4;
    } else if (e.code === "Space" && game.gameOver) {
        // Reset game logic
    } else if (e.code === "Space") {
        game.fireProjectile();
    }
}
export function detectCollision(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}