import { doodler } from "./Doodler.js";

export function updateScore(game) {
  if (doodler.velocityY < 0 || doodler.isRocket) {
    game.score += 1;
  }
}

export function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
