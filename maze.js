const tileType = { floor: "#212121", wall: "#FFFFFF", translator: "#F3F322", spawner: "#73F411" };
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

// Maze is a size x size square of tiles
function Maze(rows) {

    this.rows = rows;

    // number of tiles in the maze
    this.num_tiles = this.rows * this.rows;

    this.tileSet = new Array(this.num_tiles);


    for (i = 0; i < this.num_tiles; i++) {
        let type = tileType.floor;

        var xPos = i % this.rows;
        var yPos = Math.floor(i / this.rows);

        if (xPos == 0 || xPos == this.rows - 1 || yPos == 0 || yPos == this.rows - 1) type = tileType.wall;

        else if (xPos == (rows - 2) / 2 && yPos == (rows - 2) / 2) type = tileType.translator;

        else if ((xPos == (rows - 2) / 4 || xPos == 3 * (rows - 2) / 4) && (yPos == (rows - 2) / 4 || yPos == 3 * (rows - 2) / 4)) type = tileType.spawner;

        this.tileSet[i] = new tileComponent(type, xPos * tileSize, yPos * tileSize);
    }

    this.startTile = this.tileSet[1 + rows];

    this.draw = function(camera) {
        for (i = 0; i < this.num_tiles; i++) {
            this.tileSet[i].draw(camera);
        }
    }

}