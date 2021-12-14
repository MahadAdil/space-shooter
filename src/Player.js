import Bullet from "./Bullet.js";

export default class Player {
    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.image = document.getElementById("player");
        this.size = 36;
        this.position = {
            x: this.gameWidth / 2 - this.size / 2,
            y: this.gameHeight - this.size - 20
        };
        this.bullet = new Bullet(this, game);
        this.maxSpeed = 7;
        this.speed = 0;
    }

    moveLeft() {
        this.speed = -this.maxSpeed;
    }

    moveRight() {
        this.speed = this.maxSpeed;
    }

    update(deltaTime){
        this.position.x += this.speed;

        if(this.position.x < 0) this.position.x = 0;

        if(this.position.x > this.gameWidth - this.size) {
            this.position.x = this.gameWidth - this.size;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    stop() {
        this.speed = 0;
    }
}