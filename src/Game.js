import { ctx, canvas } from './Util.js';
import { Decoration } from './Decoration.js';
import { Doodler } from './Doodler.js';
import { PlatformManager } from './Platform.js';
import { Enemy } from './Enemy.js';
import { Projectile } from './Projectile.js';
import { updateScore, detectCollision } from './Physics.js';

export class Game {
    constructor() {
        this.objects = [
            new Decoration(0, 0, canvas.width, canvas.height, '../images/background.png')
        ];
        this.doodler = new Doodler();
        this.platformManager = new PlatformManager();
        this.enemies = [];
        this.projectiles = [];
        this.score = 0;
        this.gameOver = false;
        this.jumpSound = new Audio('../audio/jump.mp3'); // Ensure you have a jump.mp3 file
        this.init();
    }

    init() {
        window.onkeydown = e => {
            if (e.key === "ArrowRight" || e.key === "KeyD") {
                this.goRight();
            } else if (e.key === "ArrowLeft" || e.key === "KeyA") {
                this.goLeft();
            } else if (e.key === "Space") {
                this.shoot();
            }
        };
        this.spawnEnemies();
        this.id = requestAnimationFrame(() => this.run());
    }

    goRight() {
        this.doodler.moveRight();
    }

    goLeft() {
        this.doodler.moveLeft();
    }

    shoot() {
        this.fireProjectile();
    }

    run() {
        if (this.gameOver) {
            this.displayScore();
            return;
        }

        this.id = requestAnimationFrame(() => this.run());
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.objects.forEach(obj => obj.draw());
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
        }, 3000); // Adjust this value for enemy appearance rate
    }

    updateEnemies() {
        this.enemies.forEach(enemy => enemy.update());
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
                if (platform.type === 'broken') {
                    this.platformManager.platforms.splice(index, 1); // Remove broken platform
                } else if (platform.type === 'spring') {
                    this.doodler.jump(true); // True indicates spring jump
                } else {
                    this.doodler.jump();
                    this.jumpSound.play();
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
    }

    fireProjectile() {
        const projectile = new Projectile(this.doodler.x + this.doodler.width / 2, this.doodler.y);
        this.projectiles.push(projectile);
    }

    displayScore() {
        ctx.fillStyle = "black";
        ctx.font = "16px sans-serif";
        ctx.fillText(this.score, 5, 20);
        if (this.gameOver) {
            ctx.fillText("Game Over: Press 'Space' to Restart", canvas.width / 7, canvas.height * 7 / 8);
            document.addEventListener("keydown", restartGame);
        }
    }
}

function restartGame(e) {
    if (e.code === "Space") {
        document.removeEventListener("keydown", restartGame);
        window.location.reload();
    }
}
