import { ctx, canvas } from './util.js'

export class Game {
    constructor() {
        this.id = requestAnimationFrame(() => this.run())
    }

    run() {
        this.id = requestAnimationFrame(() => this.run())
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
}