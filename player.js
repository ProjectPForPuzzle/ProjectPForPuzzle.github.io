const inputKey = { left: 37, up: 38, right: 39, down: 40 };
tType = { "f": "#212121", "w": "#FFFFFF", "t": "#F3F322", "e": "#73F411", "s": "#FF00FF", "k": "#FFC0CB", "x": "#000000" };


function playerComponent(x, y, width, height, color, speed) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 50;
    this.height = height || 50;
    this.color = color || "red";
    this.dirX = 0;
    this.dirY = 0;
    this.speed = speed || 6;
    this.health = 3;

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
            for (let i = 0; i < maze.tileNum; i++) {
                //console.log(tType["w"])
                if (maze.tileSet[i].type === tType["w"]) {
                    //console.log("yo");
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