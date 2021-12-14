export default class Enemy {
    constructor(game, position) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.bullet = game.bullet;
        this.image = document.getElementById("enemy");
        this.size = 64;
        this.position = position;
        this.markedForDeletion = false;
    }

    update(deltaTime) {
        // Collision Detection with Bullet
        let bulletTop = this.bullet.position.y;
        let enemyBottom = this.position.y + this.size;
        let enemyLeft = this.position.x;
        let enemyRight = this.position.x + this.size;

        if
        (
            bulletTop <= enemyBottom &&
            this.bullet.position.x + this.bullet.width >= enemyLeft &&
            this.bullet.position.x + this.bullet.width <= enemyRight
        ) 
        {
            this.markedForDeletion = true;
            this.bullet.hasCollided = true;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
}