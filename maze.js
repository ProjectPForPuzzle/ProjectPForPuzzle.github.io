const tileSize = 80;

const cobbleImage = new Image();
cobbleImage.src = "walls2.png";

const floorImage = new Image();
floorImage.src = "Floor.png";



function tileComponent(type, x, y) {
    this.width = tileSize;
    this.height = tileSize;
    this.type = type;
    this.image = new Image();
    this.x = x;
    this.y = y;

    this.draw = function(camera) {
        let cameraPositionX = camera.width / 2 + (this.x - camera.x);
        let cameraPositionY = camera.height / 2 + (this.y - camera.y);

        ctx = world.context;

        if (this.type == "Floor.png") {
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(floorImage, cameraPositionX, cameraPositionY, this.width, this.height);
        } else if (this.type == "walls2.png") {
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(cobbleImage, cameraPositionX, cameraPositionY, this.width, this.height);
        } else {
            ctx.fillStyle = this.type;


            ctx.fillRect(cameraPositionX, cameraPositionY, this.width, this.height);
        }

        
    }
}


const tType = { "f": "Floor.png", "w": "walls2.png", "t": "#F3F322", "e": "#73F411", "s": "#FF00FF", "k": "#FFC0CB", "x": "#000000" };
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
    this.translator = null;
    this.keyList = new Array();
    this.keyIter = 0;
    this.exit = null;

    for (i = 0; i < this.tileNum; i++) {
        let type = tType[this.data[i]];
        
        var xPos = i % this.rows;
        var yPos = Math.floor(i / this.rows);

        this.tileSet[i] = new tileComponent(type, xPos * (tileSize - 1), yPos * tileSize);

        if (tType[this.data[i]] == "#FF00FF") {
            
            this.startPosX = xPos * tileSize + 5;
            this.startPosY = yPos * tileSize + 5;
        }

        else if (tType[this.data[i]] == "#73F411") {
            
            this.enemySet[this.enemiesI] = new enemyComponent(xPos * tileSize, yPos * tileSize);
            this.enemiesI++;
        }

        else if (tType[this.data[i]] == "#F3F322") {
            this.translator = new translator(xPos * tileSize, yPos * tileSize, this.keys);
        }

        else if (tType[this.data[i]] == "#FFC0CB") {
            this.keyList[this.  keyIter] = new key(xPos * tileSize, yPos * tileSize);
            this.keyIter++;
        }

        else if (tType[this.data[i]] == "#000000") {
            this.exit = new Exit(xPos * tileSize, yPos * tileSize);
        }
    }

    this.update = function(target) {
        for (let i = 0; i < this.enemiesNum; i++) {
            this.enemySet[i].update(target, this);
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