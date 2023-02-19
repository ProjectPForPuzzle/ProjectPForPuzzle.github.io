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
    this.targetDir = compass.north;

    this.lastTargetX = x || 0;
    this.lastTargetY = y || 0;
    this.turnFrame = 0;
    this.moveFrame = 0;
    this.state = state.updatingTarget;

    this.update = function(target) {
        if (this.state == state.updatingTarget) {
            this.lastTargetX = target.x;
            this.lastTargetY = target.y;

            this.state = state.updatingDirection;
        }

        if (this.state == state.updatingDirection) {
            let xDist = Math.abs(this.x - this.lastTargetX);
            let yDist = Math.abs(this.y - this.lastTargetY);

            if (xDist > yDist) {
                if (this.x > this.lastTargetX) this.targetDir = compass.west;
                else this.targetDir = compass.east;


            } else {
                if (this.y > this.lastTargetY) this.targetDir = compass.north;
                else this.targetDir = compass.south;
            }

            if (this.targetDir != this.dir) this.turnFrame = 10;


            this.state = state.changingDirection;
        }

        if (this.state == state.changingDirection) {

            this.turnFrame--;

            if (this.turnFrame <= 0) {
                this.dir = this.targetDir
                this.turnFrame = 0;
                this.moveFrame = 0;
                this.state = state.moving;
            }
        }

        if (this.state == state.moving) {
            this.moveFrame++;

            let targetX = this.x;
            let targetY = this.y;

            if (this.dir == compass.south) this.y = this.y + this.speed;
            else if (this.dir == compass.north) this.y = this.y - this.speed;
            else if (this.dir == compass.east) this.x  = this.x + this.speed;
            else if (this.dir == compass.west) this.x  -= this.x - this.speed;
        

            let xDist = Math.abs(this.x - target.x);
            let yDist = Math.abs(this.y - target.y);

            let xFound = ((this.x >= this.lastTargetX && this.dir == compass.east) || (this.x <= this.lastTargetX && this.dir == compass.west));
            let yFound = ((this.y >= this.lastTargetY && this.dir == compass.south) || (this.y <= this.lastTargetY && this.dir == compass.north));
            if (xFound || yFound || this.moveFrame > 300)
                this.state = state.updatingTarget;
        }

        if (colliding(this.x, this.y, this.width, this.height, target)) {
            alert("you dead bitch");
            world.stop();
        }
    }

    this.draw = function(camera) {
        let cameraPositionX = camera.width / 2 + (this.x - camera.x);
        let cameraPositionY = camera.height / 2 + (this.y - camera.y);

        ctx = world.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(cameraPositionX, cameraPositionY, this.width, this.height);

        ctx.save()

        ctx.strokeStyle = "purple";
        ctx.translate(cameraPositionX + this.width / 2, cameraPositionY + this.height / 2);

        let degree = (this.dir - 1) * 90;
        let targetDegree = (this.targetDir - 1) * 90;

        if ((targetDegree > degree || (targetDegree == 0 && degree == 270)) && !(targetDegree == 270 && degree == 0)) degree += 9 * (10 - this.turnFrame);

        else if (targetDegree < degree || (targetDegree == 270 && degree == 0)) degree -= 9 * (10 - this.turnFrame);

        ctx.rotate((degree * Math.PI) / 180);
        ctx.beginPath();

        ctx.moveTo(-this.width / 2, -this.height / 2);
        ctx.lineTo(-this.width / 2 - 25, -this.height / 2 - 50);
        ctx.lineTo(this.width / 2 + 25, -this.height / 2 - 50);
        ctx.lineTo(this.width / 2, -this.height / 2);

        ctx.closePath();
        ctx.stroke();
        ctx.restore();


        let targetCameraX = camera.width / 2 + (this.lastTargetX - camera.x);
        let targetCameraY = camera.height / 2 + (this.lastTargetY - camera.y);

        ctx.fillStyle = "green";
        ctx.fillRect(targetCameraX, targetCameraY, 5, 5);
    }
}