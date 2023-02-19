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


const tType = { "f": "#212121", "w": "#FFFFFF", "t": "#F3F322", "e": "#73F411", "s": "#FF00FF", "k": "#FFC0CB", "x": "#000000" };
function Maze(mazeData, rows, enemies, keys) {
    this.data = mazeData;
    this.rows = rows;
    this.enemiesNum = enemies;
    this.keys = keys;
    this.first = true;
    this.startPosX = 0;
    this.startPosY = 0;

    this.tileNum = rows * rows;
    this.tileSet = new Array();
    this.enemySet = new Array();
    this.enemiesI = 0;

    for (i = 0; i < this.tileNum; i++) {
        let type = tType[this.data[i]];
        
        var xPos = i % this.rows;
        var yPos = Math.floor(i / this.rows);

        this.tileSet[i] = new tileComponent(type, xPos * tileSize, yPos * tileSize);

        if (tType[this.data[i]] == "#FF00FF") {
            
            this.startPosX = xPos * tileSize + 5;
            this.startPosY = yPos * tileSize + 5;
        }

        if (tType[this.data[i]] == "#73F411") {
            
            this.enemySet[this.enemiesI] = new enemyComponent(xPos * tileSize, yPos * tileSize);
            this.enemiesI++;
        }
    }

    this.update = function(target) {
        for (let i = 0; i < this.enemiesNum; i++) {
            this.enemySet[i].update(target);
        }
    }

    this.draw = function(camera) {
        for (i = 0; i < this.tileNum; i++) {
            this.tileSet[i].draw(camera);
        }
        
        for (let i = 0; i < this.enemiesNum; i++) {
            this.enemySet[i].draw(camera);
        }
    }
}