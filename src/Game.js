import Bullet from "./Bullet.js";
import Enemy from "./Enemy.js";
import InputHandler from "./Input.js";
import { buildLevel, level1 } from "./Level.js";
import Player from "./Player.js";

const GAMESTATE = {
    RUNNING: 0,
    PAUSED: 1,
    MENU: 2,
    LEVELPASS: 3,
    NEWLEVEL: 4,
    GAMEOVER: 5
}

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.player = new Player(this);
        this.bullet = new Bullet(this.player, this);
        this.gameObjects = [];
        this.enemies = [];
        this.enemiesSpawned = false;
        this.gamestate = GAMESTATE.MENU;
        this.timeLimit = 8888;
        this.timeLeft = this.timeLimit;

        new InputHandler(this.player, this, this.bullet);
    }

    start() {
        if
        (
            this.gamestate !== GAMESTATE.MENU &&
            this.gamestate !== GAMESTATE.RUNNING
        )
        {
            return;
        }

        this.enemies = buildLevel(this, level1);
        this.enemiesSpawned = true;
        this.gameObjects = [this.player, this.bullet];
        this.timeLimit = (this.enemies.length * 65000) / 1000;
        this.timeLeft = this.timeLimit;
        this.startTime();
        this.gamestate = GAMESTATE.RUNNING;
    }

    startTime() {
        setTimeout(() => {
            this.timeLeft -= 1;
        }, this.timeLimit);

        return true;
    }

    stopTime() {
        this.timeLeft += this.timeLimit;
    }

    update(deltaTime) {
        if(this.startTime() === true) {
            [...this.gameObjects, ...this.enemies].forEach((object) => {
                object.update(deltaTime);
            });
    
            this.enemies = this.enemies.filter((object) => !object.markedForDeletion);
            if(this.enemiesSpawned && this.enemies.length === 0 && this.timeLeft > 0) {
                this.gamestate = GAMESTATE.LEVELPASS;
                this.stopTime();  

                setTimeout(() => {
                    window.location.reload();
                }, 5000)
            }
        }
    
        if(this.timeLeft <= 0) {
            this.gamestate = GAMESTATE.GAMEOVER;
            this.stopTime();  

            setTimeout(() => {
                window.location.reload();
            }, 5000)
        }
    }

    draw(ctx) {
        [...this.gameObjects, ...this.enemies].forEach((object) => {
            object.draw(ctx);
        });

        if (this.gamestate === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight + 200);
            ctx.fillStyle = "rgba(0,0,0,0.7)";
            ctx.fill();
      
            ctx.font = "64px Bangers";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("SPACE WARRIORS!", this.gameWidth / 2, this.gameHeight / 2);

            ctx.font = "18px Bangers";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACE to Play!", this.gameWidth / 2, this.gameHeight / 2 + 30);
          }

        if (this.gamestate === GAMESTATE.RUNNING) {
            ctx.font = "30px Bangers";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(this.timeLeft + "s", this.gameWidth - 50, this.gameHeight - 50);
        }

        if (this.gamestate === GAMESTATE.RUNNING) {
            ctx.font = "30px Bangers";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(this.timeLeft + "s", this.gameWidth - 50, this.gameHeight - 50);
        }

        if (this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "#ff0000";
            ctx.fill();
      
            ctx.font = "30px Bangers";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER!", this.gameWidth / 2, this.gameHeight / 2);
          }

          if (this.gamestate === GAMESTATE.LEVELPASS) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "#00ff00";
            ctx.fill();
      
            ctx.font = "30px Bangers";
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText("Congrats! You Won!", this.gameWidth / 2, this.gameHeight / 2);
          }
    }
}