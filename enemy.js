const state = { updatingTarget: 0, updatingDirection: 1, changingDirection: 2, moving: 3};
const compass = { north: 1, east: 2, south: 3, west: 4 };

function enemyComponent(x, y, width, height, color, speed) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 50;
    this.height = height || 50;
    this.color = color || "blue";
    this.speed = speed || 3;

    this.dir = compass.north;
    this.dirX = 0;
    this.dirY = 0;
    this.targetDir = compass.north;
    this.facingLeft = false;

    this.lastTargetX = x || 0;
    this.lastTargetY = y || 0;
    this.turnFrame = 0;
    this.moveFrame = 0;
    this.state = state.updatingTarget;

    this.image = new Image();
    this.image.src = "Enemy.png";

    this.update = function(target, maze) {
        if (this.x - target.x > 5) {
            this.facingLeft = true;
            this.dirX = -1;
        }
        else if (this.x - target.x < -5) {
            this.dirX = 1;
            this.facingLeft = false;
        }
        else this.dirX = 0;

        if (this.y - target.y > 5) this.dirY = -1;
        else if (this.y - target.y < -5) this.dirY = 1;
        else this.dirY = 0;

        this.speed = 5;
        for (let i = 0; i < maze.tileNum; i++) {
            if (maze.tileSet[i].type === tType["w"]) {
                
                if (colliding(this.x, this.y, this.width, this.height, maze.tileSet[i])) {
                    this.speed = 3;
                }
                
            }
            
        }

        this.y += this.dirY * this.speed;
        this.x += this.dirX * this.speed;
        

        if (colliding(this.x, this.y, this.width, this.height, target) && target.hitFrame == 0) {
            target.health--;
            target.hitFrame = 30;
            target.hpText.text = "HP: " + target.health + "/3"
            target.shakeFrames = 30;
            shake = true;
            if (target.health <= 0) {
                if (score > highscore) highscore = score;
                let playerDets = new PlayerDetails(username, highscore, 0, 0);
                world.stop();
                window.location.href = 'index.html';
            }
        }
    }

    this.draw = function(camera) {
        let cameraPositionX = camera.width / 2 + (this.x - camera.x);
        let cameraPositionY = camera.height / 2 + (this.y - camera.y);

        ctx = world.context;
        ctx.save();  
        let horizontal = !this.facingLeft;

        
        if (horizontal) {
            ctx.translate(cameraPositionX + this.width, cameraPositionY);
            ctx.scale(-1, 1);
            ctx.drawImage(this.image, 0, 0, this.width, this.height);

        } else ctx.drawImage(this.image, cameraPositionX, cameraPositionY, this.width, this.height);
        ctx.restore();
    }
}