const tileSize = 80;

function tileComponent(type, x, y) {
    this.width = tileSize;
    this.height = tileSize;
    this.type = type;
    this.x = x;
    this.y = y;

    this.draw = function(camera) {
        let cameraPositionX = camera.width / 2 + (this.x - camera.x);
        let cameraPositionY = camera.height / 2 + (this.y - camera.y);

        ctx = world.context;

        ctx.fillStyle = this.type;
        ctx.fillRect(cameraPositionX, cameraPositionY, this.width, this.height);
    }
}
//

const type = { "f": "#212121", "w": "#FFFFFF", "t": "#F3F322", "e": "#73F411", "s": "#FF00FF", "k": "#FFC0CB"};
function Maze(mazeData, rows, enemies, keys) {
    this.data = mazeData;
    this.rows = rows;
    this.enemies = enemies;
    this.keys = keys;

    this.tileNum = rows * rows;
    this.tileSet = new Array();

    for (i = 0; i < this.tileNum; i++) {
        let type = this.data[i];
        
        var xPos = i % this.rows;
        var yPos = Math.floor(i / this.rows);

        this.tileSet[i] = new tileComponent(type, xPos * tileSize, yPos * tileSize)
    }

    this.draw = function(camera) {
        for (i = 0; i < this.num_tiles; i++) {
            this.tileSet[i].draw(camera);
        }
    }
}