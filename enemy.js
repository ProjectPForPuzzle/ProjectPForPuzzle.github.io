function enemyComponent(x, y, width, height, color, speed) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 50;
    this.height = height || 50;
    this.color = color || "blue";
    this.dirX = 0;
    this.dirY = 0;
    this.speed = speed || 3;
    this.lastTargetX = x || 0;
    this.lastTargetY = y || 0;

    this.update = function(target) {
        if ((this.x === this.lastTargetX && this.y === this.lastTargetY) || Math.abs(target.x - this.lastTargetX) > 500 || Math.abs(target.y - this.lastTargetY) > 500) {
            this.lastTargetX = target.x;
            this.lastTargetY = target.y;
        }        

        this.dirX = 0;
        this.dirY = 0;

        if (this.x < this.lastTargetX) this.dirX = 1;
        else if (this.x > this.lastTargetX) this.dirX = -1;

        if (this.y < this.lastTargetY) this.dirY = 1;
        else if (this.y > this.lastTargetY) this.dirY = -1;

        this.x += this.dirX * this.speed;
        this.y += this.dirY * this.speed;

        if (colliding(this, target)) {
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

        ctx.strokeStyle = "purple";

        ctx.beginPath();
        ctx.moveTo(cameraPositionX + this.width / 2, cameraPositionY);
        ctx.lineTo(cameraPositionX, cameraPositionY - 25);
        ctx.lineTo(cameraPositionX + this.width, cameraPositionY - 25);
        ctx.closePath();
        ctx.stroke();

        let targetCameraX = camera.width / 2 + (this.lastTargetX - camera.x);
        let targetCameraY = camera.height / 2 + (this.lastTargetY - camera.y);

        ctx.fillStyle = "green";
        ctx.fillRect(targetCameraX, targetCameraY, 5, 5);
    }
}