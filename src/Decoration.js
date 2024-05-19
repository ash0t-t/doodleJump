import { ctx } from './Util.js';

export class Decoration {
    constructor(x, y, w, h, photo) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = new Image();
        this.img.src = photo;
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}
