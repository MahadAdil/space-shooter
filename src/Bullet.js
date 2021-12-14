export default class Bullet {
    constructor(player, game) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.image = document.getElementById('bullet');
        this.player = player;
        this.position = {
            x: player.position.x + 13,
            y: player.position.y - 24
        };

        this.maxSpeed = 15;
        this.speed = 0;
        
        this.width = 8;
        this.height = 24;

        this.hasCollided = false;
    }

    fire() {
        this.speed = -this.maxSpeed;
    }

    respawn() {
        this.speed = 0;
        this.position.y = this.player.position.y - 24;
        this.width = 0;
        this.height = 0;
        this.hasCollided = false;
    }

    update(deltaTime) {
        this.position.y += this.speed;

        if(this.speed === 0) {
            this.position.x = this.player.position.x + 13;
            this.position.y = this.player.position.y;
            this.width = 0;
            this.height = 0;
        } else {
            this.width = 8;
            this.height = 24;
        }

        if(this.position.y < 0 || this.hasCollided === true) {
            this.respawn();
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}