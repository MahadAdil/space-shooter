import Game from "./Game.js";

const canvas = document.getElementById("game-canvas");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = window.innerWidth;
const GAME_HEIGHT = window.innerHeight;

const game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0,0,GAME_WIDTH, GAME_HEIGHT);

    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}


requestAnimationFrame(gameLoop);