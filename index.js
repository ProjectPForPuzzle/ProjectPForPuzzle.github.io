document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//const tileType = { floor: "#212121", wall: "#FFFFFF", translator: "#F3F322" };

var player;
var monster;

let rightDown = false;
let leftDown = false;
let upDown = false;
let downDown = false;

function startGame() {
    maze1 = new Maze(22);

    player = new playerComponent(maze1.startTile.x + 5, maze1.startTile.y + 5);
    monster = new enemyComponent(1200, 1200);
    world.camera = new camera(1000, 1000);
    world.camera.follow(player);

    world.start();
}

var world = {
    canvas: document.createElement("canvas"),

    start: function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.frame = 0;
        this.interval = setInterval(updateWorld, 20);
    },

    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    stop: function() {
        clearInterval(this.interval);
    }
}

let testText = new textComponent("30px", "Consolas", "red", 100, 100);
testText.text = "Time: 0";

let counter = 0;

function updateWorld() {
    // Update
    player.update(maze1);
    monster.update(maze1, player);
    world.camera.update();
  
    counter++;
    testText.text = "Time: " + parseInt(counter / 50) + "s";
    
    // Draw
    world.clear();
    maze1.draw(world.camera);

    player.draw(world.camera);
    monster.draw(world.camera);
    testText.draw();

}

function textComponent(fontSize, fontName, color, x, y) {
    this.fontSize = fontSize;
    this.fontName = fontName;
    this.color = color;
    this.x = x;
    this.y = y;

    this.draw = function() {
        ctx = world.context;
        ctx.font = this.fontSize + " " + this.fontName;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    }
}

function colliding(entity1x, entity1y, entity1w, entity1h, entity2) {
    if (entity1x + entity1w > entity2.x && entity1x < entity2.x + entity2.width && entity1y + entity1h > entity2.y && entity1y < entity2.y + entity2.height) return true;
    else return false;
}

function intoWall(oldX, oldY, newX, newY, width, height, wall) {
    let ret = new Array();
    ret[0] = newX;
    ret[1] = newY;

    let newLeft = newX;
    let newRight = newX + width;
    let newTop = newY;
    let newBottom = newY + height;

    let oldLeft = oldX;
    let oldRight = oldX + width;
    let oldTop = oldY;
    let oldBottom = oldY + height;

    
    if (newBottom > wall.y && newTop < wall.y + wall.height && newLeft != oldLeft) {
        //push left
        console.log(oldX + width, newX + width, wall.x);
        if (oldRight < wall.x && newRight > wall.x) {
            console.log("push left");

            ret[0] = wall.x - wall.width;
        }

        //push right
        else if (oldLeft > wall.x + wall.width && newLeft < wall.x + wall.width) {
            ret[0] = wall.x + wall.width;
        }
    }

    if (newRight > wall.x && newLeft < wall.x + wall.width) {
        //push up
        if (oldBottom < wall.y && newBottom > wall.y) {
            ret[1] = wall.y - wall.height;
        }

        //push down
        else if (oldTop > wall.Y + wall.height && newTop < wall.y + wall.height) {
            ret[1] = wall.y + wall.height;
        }
    }

    return ret;
}

function keyDownHandler(event) {
    if (event.keyCode === inputKey.right) {
        rightDown = true;
    }
    if (event.keyCode === inputKey.left) {
        leftDown = true;
    }
    if (event.keyCode === inputKey.down) {
        downDown = true;
    } 
    if (event.keyCode === inputKey.up) {
        upDown = true;
    }
}

function keyUpHandler(event) {
    if (event.keyCode === inputKey.right) {
        rightDown = false;
    }
    if (event.keyCode === inputKey.left) {
        leftDown = false;
    }
    if (event.keyCode === inputKey.down) {
        downDown = false;
    } 
    if (event.keyCode === inputKey.up) {
        upDown = false;
    }
}
