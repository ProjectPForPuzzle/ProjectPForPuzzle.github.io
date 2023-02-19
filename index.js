document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var player;
var tutorial;

let rightDown = false;
let leftDown = false;
let upDown = false;
let downDown = false;

function startGame() {
    player = new playerComponent(50, 50, "red", 300, 300);

    let tutorialMazeData = "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwewwwwwwwwwfffffffffffffffffffwwwwwwwwwwwfwwwwwwwwwfffffffffffffffffffwwwwwwwwwwwfwwwwwwwwwfffffffffffffffffffwwwwwwwwwwwfwwwwwwwwwfffffffffffffffffffwwwwwwwwwwwfwwwwwwwwwfffffffftffffffffffwwwwwwwwwwwfwwwwwwwwwffffffffffffffffffffffffwwwwwwfwwwwwwwwwfffffffffffffffffffwwwwfwwwwwwfwwwwwwwwwfffffffffffffffffffwwwwfwwwwwwfwwwwwwwwwfffffffffffffffffffwwwwfwwwwwwfwwwwwwwwwfffffffffffffffffffwwwwfwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwfwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwfwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwfwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwfwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwfwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwfwwwsfffwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwfwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwfffxwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwwwwwwwwwwffffffffffffffwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwfffffffwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwfffffffwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwfffkfffwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwfffffffwwwwwwwwfwwwwwwwwwwwwwwwwwwwwwwwwfffffffwwwwwwwwffffffffffffffffffffffffffffffffwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"; //ARYA ADD THE MAZE HERE
    tutorial = new Maze(tutorialMazeData, 40, 1, 1);

    world.camera = new camera(300, 300);
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


function updateWorld() {
    // Update
    player.update(tutorial);
    tutorial.update(player);
    world.camera.update();
    
    // Draw
    world.clear();
    tutorial.draw(world.camera);
    player.draw(world.camera);
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
