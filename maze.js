const tileSize = 80;

const cobbleImage = new Image();
cobbleImage.src = "walls2.png";

const floorImage = new Image();
floorImage.src = "Floor.png";

const A = new Image();
A.src = "A.png";

const B = new Image();
B.src = "B.png";

const C = new Image();
C.src = "C.png";

const D = new Image();
D.src = "D.png";

const translatoeer = new Image();
translatoeer.src = "Translator.png";


function tileComponent(type, x, y) {
    this.width = tileSize;
    this.height = tileSize;
    this.type = type;
    this.image = new Image();
    this.x = x;
    this.y = y;
    this.rand = 0;

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
        } else if (this.type == "symbols") {
            if (this.rand == 0) {
                let r = Math.floor(Math.random() * 4) + 1;
                this.rand = r;
                
            }
            if (this.rand == 1) {
                ctx.drawImage(floorImage, cameraPositionX, cameraPositionY, this.width, this.height);

                ctx.drawImage(A, cameraPositionX, cameraPositionY, this.width, this.height);
            }
            if (this.rand == 2) {
                ctx.drawImage(floorImage, cameraPositionX, cameraPositionY, this.width, this.height);

                ctx.drawImage(B, cameraPositionX, cameraPositionY, this.width, this.height);
            }
            if (this.rand == 3) {
                ctx.drawImage(floorImage, cameraPositionX, cameraPositionY, this.width, this.height);

                ctx.drawImage(C, cameraPositionX, cameraPositionY, this.width, this.height);
            }
            if (this.rand == 4) {
                ctx.drawImage(floorImage, cameraPositionX, cameraPositionY, this.width, this.height);

                ctx.drawImage(D, cameraPositionX, cameraPositionY, this.width, this.height);
            }
        } else if (this.type == "Translator.png") {
            ctx.drawImage(floorImage, cameraPositionX, cameraPositionY, this.width, this.height);
            ctx.drawImage(translatoeer, cameraPositionX, cameraPositionY, this.width, this.height);
        }
        else {
            ctx.fillStyle = this.type;


            ctx.fillRect(cameraPositionX, cameraPositionY, this.width, this.height);
        }

        
    }
}


const tType = { "f": "Floor.png", "w": "walls2.png", "t": "Translator.png", "e": "Enemy.png", "s": "#FF00FF", "k": "symbols", "x": "#000000" };
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

        else if (this.data[i] == "e") {
            
            this.enemySet[this.enemiesI] = new enemyComponent(xPos * tileSize, yPos * tileSize, 100, 100);
            this.enemiesI++;
            console.log(this.enemiesI)  
        }

        else if (tType[this.data[i]] == "Translator.png") {
            this.translator = new translator(xPos * tileSize, yPos * tileSize, this.keys);
        }

        else if (tType[this.data[i]] == "symbols") {
            this.keyList[this.keyIter] = new key(xPos * tileSize, yPos * tileSize);
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