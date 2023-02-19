document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var player;
var tutorial;
var currentLevel;

let rightDown = false;
let leftDown = false;
let upDown = false;
let downDown = false;
let levelNum = 1;
let shake  = false;

let tutorialMazeData = "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwewwwwwwwwwfffffffffffffffffffwwwwwwwwwwwfwwwwwwwwwfffffffffffffffffffwwwwwwwwwwwfwwwwwwwwwfffffffffffffffffffwwwwwwwwwwwfwwwwwwwwwfffffffffffffffffffwwwwwwwwwwwfwwwwwwwwwfffffffftffffffffffwwwwwwwwwwwfwwwwwwwwwffffffffffffffffffffffffwwwwwwfwwwwwwwwwfffffffffffffffffffwwwwfwwwwwwfwwwwwwwwwfffffffffffffffffffwwwwfwwwwwwfwwwwwwwwwfffffffffffffffffffwwwwfwwwwwwfwwwwwwwwwfffffffffffffffffffwwwwfwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwfwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwfwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwfwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwfwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwfwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwfwwwsfffwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwfwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwfffxwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwffffffffffffffwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwfffffffwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwfffffffwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwfffkfffwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwfffffffwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwfffffffwwwwwwwwffffffffffffffffffffffffffffffffwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"; //ARYA ADD THE MAZE HERE
let maze1Data = "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwewfffffffffffffffffffffffffffffffffffwwwfwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwswwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfwffffwwwwwwwwwwwwwwwwwwwwwwwwwwwwwffwwwfwffffwffffffffffffkffffffffffffffwffwWwfwffffwfwwwwwwwwwwwwwwwwwwwwwwwwwfwffwwwfwffffwfffffffffffffffffffffffffffwffwWwfwffffwfffffffffffffffffffffffffffwffwwwfwffffwfffffffffffffffffffffffffffwffwwwfwffffwfwffffwwwwwwwwwwfffffffffwfwffwwwfwwwwwwfwwwwwwffffffffwwwwwwwwwwwfwwwwwwfffffffffffffffffttffffffffffffffffffxwwfwwwwwwfwwwwwwffffffffwwwwwwwwwwwfwwwwwfffffffwfwffffwwwwwwwwwwfffffffffwfwffwwfffffffwfwfffffffffffffffffffffffwfwffwwfffffffwfwfffffffffffffffffffffffwfwffwwfffffffwfwfffffffffffffffffffffffwfwffwwfffffffwfwfffffffffffffffffffffffwfwffwwfffffffwfwwwwwwwwwwwwwwwwwwwwwwwwwfwffwwfffffffwffffffffffffffffffffffffffkwffwwfffffffwfffwwwwwwwwwwwwwwwwwwwwwwwwwffwwfffffffwfffwffffffffffffffffffffffffffwwfffffffwfffwwwwwwwwwwwwwwwwwffffffffffwwfffffffwfffffffffffffffffffwffffffffffwwfffffffwfwwwwwwwwwwwwwwwwffwffffffffffwwfffffffwfwffffffffffffffwffwffffffffffwwfffffffwfwffffffffffffffwffwffffffffffwwwwwwwwwwfwffffffffffffffwffwffffffffffwwfkfffffffwffffffffffffffwffwffffffffffwwfwwwwwwwwwwwwwwwwwwwwwwwwffwffffffffffwwfffffffffffffffffffffffffffwffffffffffwwfffffffffffffffffffffffffffwffffffffffwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
let maze2Data = "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwkfffffffffffffffffeffffwwwwwwwwwwwwwwwwwfffffffffffffffffffffffwwwwwwwwwwwwwwwwwffffffffffffffffffsffefwwwwwwwwwwwwwwwwwfffffffffffffffffffffffwwwwwwwwwwwwwwwwwfffffffffffffffffffffffwwwwwwwwwwwwwwwwwffwwwwwwwwwwwwwwfffffffwwwwwwwwwwwwwwwwwffwwwwwwwwwwwwwwfffffffwwwwwwwwwwwwwwwwwffwwwwwwwwwwwwwwfffffffwwwwwwwwwwwwwwwwwffwwwkfffffffffffffffffwwwwwwwwwwwwwwwwwffwwwfwwwwwwwwwwwwwwwffwwwwwwwwwwwwwwwwwffwwwfwwwwwwwwwwwwwwwffwwwwwwwwwwwwwwwwwffwwwfwwwwwwwwwwwwwwwffwfffffffffffffxwwffwwwfwwwffffffffffffffwfwwwwwwfwwwwwwwwffwwwfwwwffffffffffffffwfwwwwwwfwwwwwwwwffwwwfwwwffffffffffffffwfwwwwwwfwwwwwwwwffwwwfwwwffffffffffffffwfwwwwwwfwwwwwwwwffwwwfwwwffffffffffffffwfwwwwwwfwwwwwwwwfffffffffffffffffffffffwfwwwwwwfwwwwwwwwffffffffffffffwwwwwwwffwfwwwwwwfwwwwwwwwffwwwwwwwwwwwfwwwwwwwffwfwwwwwwfwwwwwwwwffwwwwwwwwwwwffffffffffwfwwwwwwfwwwwwwwwffwwwwwwwwwwwfwwwwwwwffwfwwwwwwfwwwwwwwwffffffffffffffwfffffwfffffffffffffffffwwfffffffffffffffffwffffffffffffffffffffwwffffffffffffffwfffffwfffffffffffffffffwwffffffffffffffffffffffffffffffffffffffwwffffffffffffffffffffffffffffffffffffffwwffwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfwwwwwfffwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfwwwwwfwffwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfwwwwwfwwffwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfwwwwwffwwffwwwwwwwwwwwwwwwwwwwwwwwwwwwwfwwwwwfffwwffwwwwwwwwwwwwwwwwwwwwwwwwwwwkwwwwwffffwwkfwwwwwwwwwwwwwwwwwwwwwwwwwwfwwwwwffffffffwwwwwwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwffffffffffffffffffffffffffffwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"

const levelSelector = {"1": new Maze(tutorialMazeData, 40, 1, 1), "2": new Maze(maze1Data, 40, 1, 3), "3": new Maze(maze2Data, 2, 4)};

function startGame(level) {

    currentLevel = levelSelector[level];

    player = new playerComponent(currentLevel.startPosX, currentLevel.startPosY, 50, 50, 10);

    blockingTile = new tileComponent("#FFFFFF", currentLevel.startPosX - 80, currentLevel.startPosY);


    world.camera = new camera(300, 300);
    world.camera.follow(player);

    world.start();

    //vignette = new Vignette(world.canvas);
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

function preShake() {
    ctx = world.context;

    ctx.save();
    var dx = Math.random()*10;
    var dy = Math.random()*10;
    ctx.translate(dx, dy);  
  }
  
  function postShake() {
    ctx = world.context;

    ctx.restore();
  }


function updateWorld() {
    // Update
    player.update(currentLevel);
    currentLevel.update(player);
    world.camera.update();
    
    // Draw
    if (shake) {
        preShake();

    }
    world.clear();
    currentLevel.draw(world.camera);
    //blockingTile.draw(world.camera);
    player.draw(world.camera);
    if (shake) {   
        postShake();
    }
    
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
