import { ctx, canvas } from './Util.js';

export let doodler
export class Doodler {
    constructor() {
        this.width = 46;
        this.height = 46;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height * 7 / 8 - this.height;
        this.velocityX = 0;
        this.velocityY = -8;
        this.gravity = 0.4;
        this.img = new Image();
        this.img.src = '../images/doodler-right.png';
    }

    update() {
        this.x += this.velocityX;
        if (this.x > canvas.width) this.x = 0;
        if (this.x + this.width < 0) this.x = canvas.width;

        this.velocityY += this.gravity;
        this.y += this.velocityY;
        if (this.y > canvas.height) {
            // Handle game over
        }

        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    jump() {
        this.velocityY = -8;
    }
}
