import Enemy from "./Enemy.js";

export function buildLevel(game, level) {
    let enemies = [];
    
    level.forEach((row, rowIndex) => {
        row.forEach((enemy, enemyIndex) => {
            if(enemy === 1) {
                let position = {
                    x: 64 * enemyIndex,
                    y: 20 + 64 * rowIndex
                };

                enemies.push(new Enemy(game, position));
            }
        });
    });

    return enemies;
};

export const level1 = [
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
];