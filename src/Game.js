import { ctx, canvas } from './util.js'
import { Decoration } from './Decoration.js'

export class Game {
    objects = [
        new Decoration(600, 600, 600, 800, 'images/background.png')
    ]
    constructor() {
        this.id = requestAnimationFrame(() => this.run())
    }

    run() {
        this.id = requestAnimationFrame(() => this.run())
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.objects.forEach(p => p.draw())
    }
}