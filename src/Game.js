import { ctx, canvas } from "./Util.js";
import { Decoration } from "./Decoration.js";
import { Doodler } from "./Doodler.js";
import { PlatformManager } from "./Platform.js";
import { Enemy } from "./Enemy.js";
import { Projectile } from "./Projectile.js";
import { updateScore, detectCollision } from "./Physics.js";

export class Game {
  constructor() {
    this.objects = [
      new Decoration(
        0,
        0,
        canvas.width,
        canvas.height,
        "../images/background.png"
      ),
    ];
    this.doodler = new Doodler();
    this.platformManager = new PlatformManager();
    this.enemies = [];
    this.projectiles = [];
    this.score = 0;
    this.gameOver = false;
    this.jumpSound = new Audio("../audio/jump.mp3");
    this.init();
  }

  init() {
    window.addEventListener("keydown", e => this.handleKeyDown(e));
    window.addEventListener("keyup", e => this.handleKeyUp(e));
    this.spawnEnemies();
    this.id = requestAnimationFrame(() => this.run());
  }

  handleKeyDown(e) {
    if (e.code == "ArrowRight" || e.code == "KeyD") {
      this.doodler.movingRight = true;
    } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
      this.doodler.movingLeft = true;
    } else if (e.code == "ArrowUp") {
      this.doodler.shoot();
    }
  }

  handleKeyUp(e) {
    if (e.code == "ArrowRight" || e.code == "KeyD") {
      this.doodler.movingRight = false;
    } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
      this.doodler.movingLeft = false;
    }
  }

  goRight() {
    this.doodler.moveRight();
  }

  goLeft() {
    this.doodler.moveLeft();
  }

  shoot() {
    this.doodler.shoot();
  }

  run() {
    if (this.gameOver) {
      this.displayScore();
      return;
    }

    this.id = requestAnimationFrame(() => this.run());
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.objects.forEach((obj) => obj.draw());
    this.platformManager.update();
    this.doodler.update();
    this.updateEnemies();
    this.updateProjectiles();
    this.checkCollisions();
    updateScore(this);
    this.displayScore();
  }

  spawnEnemies() {
    setInterval(() => {
      const x = Math.random() * (canvas.width - 40);
      const y = -40;
      this.enemies.push(new Enemy(x, y));
    }, 3000);
  }

  updateEnemies() {
    this.enemies.forEach((enemy) => enemy.update());
  }

  updateProjectiles() {
    this.projectiles.forEach((projectile, index) => {
      projectile.update();
      if (projectile.isOffScreen()) {
        this.projectiles.splice(index, 1);
      }
    });
  }

  checkCollisions() {
    this.platformManager.platforms.forEach((platform, index) => {
      if (detectCollision(this.doodler, platform)) {
        if (platform.type == "broken") {
          this.platformManager.platforms.splice(index, 1);
        } else if (platform.type == "spring") {
          this.doodler.jump(true);
        } else {
          this.doodler.jump();
          this.jumpSound.play();
        }
        if (this.doodler.velocityY < 0) {
          this.score += 10;
        }
      }
    });

    this.enemies.forEach((enemy, eIndex) => {
      if (detectCollision(this.doodler, enemy)) {
        this.gameOver = true;
      }

      this.projectiles.forEach((projectile, pIndex) => {
        if (detectCollision(projectile, enemy)) {
          this.enemies.splice(eIndex, 1);
          this.projectiles.splice(pIndex, 1);
        }
      });
    });

    this.platformManager.platforms.forEach((platform) => {
      if (
        platform.type == "normal" &&
        detectCollision(this.doodler, platform)
      ) {
        if (Math.random() < 0.05) {
          platform.spawnJetpack();
        }
      }
    });

    this.platformManager.jetpacks.forEach((jetpack, index) => {
      if (detectCollision(this.doodler, jetpack)) {
        this.platformManager.jetpacks.splice(index, 1);
        this.doodler.activateRocket();
      }
    });
  }

  fireProjectile() {
    const projectile = new Projectile(
      this.doodler.x + this.doodler.width / 2,
      this.doodler.y
    );
    this.projectiles.push(projectile);
  }

  displayScore() {
    ctx.fillStyle = "black";
    ctx.font = "25px 'Montserrat', sans-serif";
    ctx.fillText("Score: " + this.score, 10, 20);
    if (this.gameOver) {
      ctx.fillStyle = "red";
      ctx.shadowColor = "rgba(255, 0, 0, 0.7)";
      ctx.shadowBlur = 20;
      ctx.fillText(
        "Game Over: Press 'Space' to Restart",
        canvas.width / 7,
        (canvas.height * 7) / 8
      );
      document.addEventListener("keydown", restartGame);
    }
  }
}

function restartGame(e) {
  if (e.code == "Space") {
    document.removeEventListener("keydown", restartGame);
    window.location.reload();
  }
}
