import { ctx } from './Util.js';

export class Projectile {
    constructor(x, y) {
        this.width = 5;
        this.height = 10;
        this.x = x;
        this.y = y;
        this.speed = -5;  // Speed at which projectile moves up
        this.img = new Image();
        this.img.src = 'images/ball.png';
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
