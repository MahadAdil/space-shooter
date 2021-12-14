export default class InputHandler {
    constructor(player, game, bullet) {
        document.addEventListener("keydown", (e) => {
            let keyCode = e.keyCode;

            switch (keyCode) {
                case 37:
                    player.moveLeft();
                    break;
                
                case 39:
                    player.moveRight();
                    break;

                case 38:
                    bullet.fire();
                    break;

                case 32:
                    game.start();
                    break;
            
                default:
                    break;
            }
        });

        document.addEventListener("keyup", (e) => {
            let keyCode = e.keyCode;

            switch (keyCode) {
                case 37:
                    if(player.speed < 0) {
                        player.stop();
                    }
                    break;
                
                case 39:
                    if(player.speed > 0) {
                        player.stop();
                    }
                    break;
            
                default:
                    break;
            }
        });
    }
}