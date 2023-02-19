const tileType = { floor: 0, wall: 1 };
const tileSize = 80;

function tileComponent(type, x, y) {
    this.width = tileSize;
    this.height = tileSize;
    this.type = type;
    this.x = x;
    this.y = y;

    this.color = "#212121";
    if (this.type == tileType.wall) this.color = "#FFFFFF";

    this.draw = function(camera) {
        let cameraPositionX = camera.width / 2 + (this.x - camera.x);
        let cameraPositionY = camera.height / 2 + (this.y - camera.y);

        ctx = world.context;

        ctx.fillStyle = this.color;
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

        var xPos = i % rows;
        var yPos = Math.floor(i / rows);

        if (xPos % 2 == 0) type = tileType.wall;

        this.tileSet[i] = new tileComponent(type, xPos * tileSize, yPos * tileSize);
    }

    this.draw = function(camera) {
        for (i = 0; i < this.num_tiles; i++) {
            this.tileSet[i].draw(camera);
        }
    }

}