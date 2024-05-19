import { ctx, canvas } from './Util.js';

export class Platform {
    constructor(x, y, type = 'normal') {
        this.width = 60;
        this.height = 18;
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
        // Create initial platforms
        for (let i = 0; i < 10; i++) {  // Increased number of initial platforms
            let x = Math.random() * (canvas.width - 60);
            let y = canvas.height - 75 * i;
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
            platform.y += 2; // Adjust this value as needed for platform movement speed
            if (platform.y > canvas.height) {
                platform.y = -18;
                platform.x = Math.random() * (canvas.width - 60);
                platform.type = this.getRandomPlatformType();
                platform.img.src = platform.getPlatformImage(platform.type);
            }
            platform.draw();
        });
    }
}
