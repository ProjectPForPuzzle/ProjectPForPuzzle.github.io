document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var player;
var monster;

let rightDown = false;
let leftDown = false;
let upDown = false;
let downDown = false;

function startGame() {
    tile = new tileComponent(25, "pink", 300, 100);
    player = new playerComponent(300, 300);
    monster = new enemyComponent();
    world.camera = new camera(300, 300, window.innerWidth, window.innerHeight, 3000, 3000);
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
    player.update();
    monster.update(player);
    world.camera.update();
  
    counter++;
    testText.text = "Time: " + parseInt(counter / 50) + "s";
    
    // Draw
    world.clear();
    player.draw(world.camera);
    monster.draw(world.camera);
    testText.draw();
    tile.draw();
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

function colliding(entity1, entity2) {
    if (entity1.x + entity1.width > entity2.x && entity1.x < entity2.x + entity2.width && entity1.y + entity1.height > entity2.y && entity1.y < entity2.y + entity2.height) return true;
    else return false;
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
