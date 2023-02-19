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

        let updateX = targetX;
        let updateY = targetY;
        
        if (targetX != this.x || targetY != this.y) {
            for (let i = 0; i < maze.num_tiles; i++) {
                if (maze.tileSet[i].type == 1) {
                    if (colliding(targetX, this.y, this.width, this.height, maze.tileSet[i])) {
                        if (updateX + this.width > maze.tileSet[i].x && this.x + this.width < maze.tileSet[i].x) updateX = maze.tileSet[i].x - this.width - 1;
                        else if (updateX < maze.tileSet[i].x + maze.tileSet[i].width && this.x > maze.tileSet[i].x + maze.tileSet[i].width) updateX = maze.tileSet[i].x + maze.tileSet[i].width + 1;

                    }
                    if (colliding(this.x, targetY, this.width, this.height, maze.tileSet[i])) {
                        if (updateY + this.width > maze.tileSet[i].y && this.y + this.width < maze.tileSet[i].y) updateY = maze.tileSet[i].y - this.width - 1;
                        else if (updateY < maze.tileSet[i].y + maze.tileSet[i].width && this.y > maze.tileSet[i].y + maze.tileSet[i].width) updateY = maze.tileSet[i].y + maze.tileSet[i].width + 1;

                    }
                    
                }
                
            }
            
        }

        this.x = updateX;
        this.y = updateY;
        
    }

    this.draw = function(camera) {
        let cameraPositionX = camera.width / 2 + (this.x - camera.x);
        let cameraPositionY = camera.height / 2 + (this.y - camera.y);
        
        ctx = world.context;

        ctx.fillStyle = this.color;

        ctx.fillRect(cameraPositionX, cameraPositionY, this.width, this.height);
    }
}