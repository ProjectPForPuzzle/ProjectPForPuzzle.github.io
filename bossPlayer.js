document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

const inputKey = { left: 37, up: 38, right: 39, down: 40 };

let rightDown = false;
let leftDown = false;
let upDown = false;
let downDown = false;

function fighter(position, size) {
    this.position = position;
    this.size = size;
    this.dirX = 0;
    this.dirY = 0;

    this.update = function() {
        this.dirX = 0;
        if (rightDown) this.dirX++;
        if (leftDown) this.dirX--;

        this.dirY = 0;
        if (downDown) this.dirY++;
        if (upDown) this.dirY--;

        this.position.x += this.dirX * 10;
        this.position.y += this.dirY * 10;

        this.position.clamp( new vector2D(0, 0), new vector2D(window.innerWidth - this.size.x, window.innerHeight - this.size.y) );
    }

    this.draw = function() {
        ctx = world.context;
        ctx.fillStyle = "white";
        ctx.fillRect(this.position.x - this.size.x / 2, this.position.y - this.size.y / 2, this.size.x, this.size.y);
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
