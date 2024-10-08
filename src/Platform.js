import { ctx, canvas } from "./Util.js";
import { Decoration } from "./Decoration.js";

export class Platform {
  constructor(x, y, type = "normal") {
    this.width = type === "normal" ? 80 : 90;
    this.height = type === "normal" ? 50 : 60;
    this.x = x;
    this.y = y;
    this.type = type;
    this.img = new Image();
    this.img.src = this.getPlatformImage(type);
    this.hasJetpack = false;
    this.jetpack = null;
  }

  getPlatformImage(type) {
    switch (type) {
      case "normal":
        return "../images/platform.png";
      case "broken":
        return "../images/platform-broken.png";
      case "spring":
        return "../images/platform-spring.png";
      default:
        return "../images/platform.png";
    }
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    if (this.hasJetpack && this.jetpack) {
      this.jetpack.draw();
    }
  }

  spawnJetpack() {
    this.hasJetpack = true;
    this.jetpack = new Decoration(
      this.x + this.width / 2 - 20,
      this.y - 20,
      40,
      40,
      "../images/jetpack.png"
    );
  }
}

export class PlatformManager {
  constructor() {
    this.platforms = [];
    this.jetpacks = [];
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
    const weights = {
      normal: 0.85,
      broken: 0.05,
      spring: 0.1,
    };
    let random = Math.random();
    if (random < weights.normal) {
      return "normal";
    } else if (random < weights.normal + weights.broken) {
      return "broken";
    } else {
      return "spring";
    }
  }

  update() {
    this.platforms.forEach((platform) => {
      platform.y += 2;
      if (platform.y > canvas.height) {
        platform.y = -24;
        platform.x = Math.random() * (canvas.width - 80);
        platform.type = this.getRandomPlatformType();
        platform.img.src = platform.getPlatformImage(platform.type);
        platform.hasJetpack = false;
        platform.jetpack = null;
      }
      platform.draw();
    });

    this.jetpacks = this.platforms
      .filter((platform) => platform.hasJetpack)
      .map((platform) => platform.jetpack);
  }
}
