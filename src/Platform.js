import { ctx, canvas } from './Util.js';

export class Platform {
    constructor(x, y, type = 'normal') {
        this.width = 70;
        this.height = 40;
        this.x = x;
        this.y = y;
        this.type = type;
        this.img = new Image();
        this.img.src = this.getPlatformImage(type);
    }

    getPlatformImage(type) {
        switch(type) {
            case 'normal':
                return '../images/platform.png';
            case 'broken':
                return '../images/platform-broken.png';
            case 'spring':
                return '../images/platform-spring.png';
            default:
                return '../images/platform.png';
        }
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

export class PlatformManager {
    constructor() {
        this.platforms = [];
        this.initPlatforms();
    }

    initPlatforms() {
        for (let i = 0; i < 15; i++) { 
            let x = Math.random() * (canvas.width - 80);
            let y = canvas.height - 60 * i;
            let type = this.getRandomPlatformType();
            this.platforms.push(new Platform(x, y, type));
        }
    }

    getRandomPlatformType() {
        const types = ['normal', 'broken', 'spring'];
        return types[Math.floor(Math.random() * types.length)];
    }

    update() {
        this.platforms.forEach(platform => {
            platform.y += 2;
            if (platform.y > canvas.height) {
                platform.y = -24;
                platform.x = Math.random() * (canvas.width - 80);
                platform.type = this.getRandomPlatformType();
                platform.img.src = platform.getPlatformImage(platform.type);
            }
            platform.draw();
        });
    }
}
