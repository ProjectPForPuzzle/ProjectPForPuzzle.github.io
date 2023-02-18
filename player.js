const inputKey = { left: 37, up: 38, right: 39, down: 40 };


function playerComponent(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.dirX = 0;
    this.dirY = 0;
    this.speed = 10;

    this.update = function() {
        this.dirX = 0;
        if (rightDown) this.dirX++;
        if (leftDown) this.dirX--;

        this.dirY = 0;
        if (downDown) this.dirY++;
        if (upDown) this.dirY--;

        this.x += this.dirX * this.speed;
        this.y += this.dirY * this.speed;
    }

    this.draw = function() {
        ctx = world.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}