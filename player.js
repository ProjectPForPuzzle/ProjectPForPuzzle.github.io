const inputKey = { left: 37, up: 38, right: 39, down: 40 };


function playerComponent(x, y, width, height, color, speed) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 50;
    this.height = height || 50;
    this.color = color || "red";
    this.dirX = 0;
    this.dirY = 0;
    this.speed = speed || 6;

    this.update = function(maze) {
        this.dirX = 0;
        if (rightDown) this.dirX++;
        if (leftDown) this.dirX--;

        this.dirY = 0;
        if (downDown) this.dirY++;
        if (upDown) this.dirY--;

        let targetX = this.x + this.dirX * this.speed;
        let targetY = this.y + this.dirY * this.speed;
        
        if (targetX != this.x || targetY != this.y) {
            for (let i = 0; i < maze.num_tiles; i++) {
                if (maze.tileSet[i].type == 1) {
                    if (colliding(targetX, targetY, this.width, this.height, maze.tileSet[i])) {
                        let ret = intoWall(this.x, this.y, targetX, targetY, this.width, this.height, maze.tileSet[i]);
                        targetX = ret[0];
                        targetY = ret[1];
                    }
                    
                }
                
            }
            
        }

        this.x = targetX;
        this.y = targetY;
        
    }

    this.draw = function(camera) {
        let cameraPositionX = camera.width / 2 + (this.x - camera.x);
        let cameraPositionY = camera.height / 2 + (this.y - camera.y);
        
        ctx = world.context;

        ctx.fillStyle = this.color;

        ctx.fillRect(cameraPositionX, cameraPositionY, this.width, this.height);
    }
}