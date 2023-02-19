const tileType = { floor: "#212121", wall: "#FFFFFF", translator: "#F3F322", spawner: "#73F411", start: "#FF00FF", key: "#FFC0CB" };
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

const mazeSet1 = "ffffwffffffwwwwffwfwfffwfffwwwwwfffffwfffwwwfwfwwffffffwfffffwwwfwwwwfffwfffwfffwwwfwwwwwffffffwffff";
const mazeSet2 = "ffwfffffffwfwfwfwwfwffffwffwffwwwffffwwfffwwwfwwffwffffffwfwwwfwwwfwfwfwffwffwfffwfwwfwwwffffwffffff";
const mazeSet3 = "fffffwfffffwfwwwwfwffwffffffwwwwwfwwwfwffwfffwfffffffwfwfwfwfwwwwwfwffffwfwffwwwwfwfwfwwwfffffffffff";
const mazeSet4 = "wwffffwwwfwffwffffwfffwwfwwfwfwffwfwffffwfwwwwfwwfwfwfwfffwwffffffwffffwwwfwwfwffwfwfwffwwfffwfwwfff";

// Maze is a size x size square of tiles
function Maze(rows) {

    this.rows = rows;

    // number of tiles in the maze
    this.num_tiles = this.rows * this.rows;

    this.tileSet = new Array(this.num_tiles);

    this.oneIter = 0;
    this.twoIter = 0;
    this.threeIter = 0;
    this.fourIter = 0;


    for (i = 0; i < this.num_tiles; i++) {
        let type = tileType.floor;

        var xPos = i % this.rows;
        var yPos = Math.floor(i / this.rows);

        if (xPos > 0 && xPos < 11 && yPos > 0 && yPos < 11) {
            if (mazeSet1[this.oneIter] == "f") {
                type = tileType.floor;
            } else {
                type = tileType.wall;
            }
            this.oneIter++;
        }
        if (xPos >= 11 && xPos < 21 && yPos > 0 && yPos < 11) {
            if (mazeSet2[this.twoIter] == "f") {
                type = tileType.floor;
            } else {
                type = tileType.wall;
            }
            this.twoIter++;
        }

        if (xPos > 0 && xPos < 11 && yPos >= 11 && yPos < 21) {
            if (mazeSet3[this.threeIter] == "f") {
                type = tileType.floor;
            } else {
                type = tileType.wall;
            }
            this.threeIter++;
        }
        if (xPos >= 11 && xPos < 21 && yPos >= 11 && yPos < 21) {
            if (mazeSet4[this.fourIter] == "f") {
                type = tileType.floor;
            } else {
                type = tileType.wall;
            }
            this.fourIter++;
        }

        if (xPos == 1 && yPos == 1) type = tileType.start;

        if (xPos == 0 || xPos == this.rows - 1 || yPos == 0 || yPos == this.rows - 1) type = tileType.wall;

        else if (xPos == (rows - 2) / 2 && yPos == (rows - 2) / 2) type = tileType.translator;

        else if ((xPos == (rows - 2) / 4 || xPos == 3 * (rows - 2) / 4) && (yPos == (rows - 2) / 4 || yPos == 3 * (rows - 2) / 4)) type = tileType.spawner;

        else if (((xPos - 3) % 5 == 0) && ((yPos - 3) % 5 == 0) && !((xPos == 8 && yPos == 8) || (xPos == 8 && yPos == 13) || (xPos == 13 && yPos == 8) || (xPos == 13 && yPos == 13))) type = tileType.key;

        this.tileSet[i] = new tileComponent(type, xPos * tileSize, yPos * tileSize);
    }

    this.startTile = this.tileSet[1 + rows];

    this.draw = function(camera) {
        for (i = 0; i < this.num_tiles; i++) {
            this.tileSet[i].draw(camera);
        }
    }

}

