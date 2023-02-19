function vector2D(x, y) {
    this.x = x;
    this.y = y;

    this.clamp = function (topLeft, bottomRight) {
        if (this.x < topLeft.x) this.x = topLeft.x;
        else if (this.x > bottomRight.x) this.x = bottomRight.x;

        if (this.y < topLeft.y) this.y = topLeft.y;
        else if (this.y > bottomRight.y) this.y = bottomRight.y;
    }
}

var fighter;

function startGame() {

    fighter = new fighter(new vector2D(100, 100), new vector2D(50, 50));
    boss = new boss(new vector2D(600, 600), new vector2D(100, 200));

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
    fighter.update();
    boss.update(fighter.position);
    
    // Draw
    world.clear();
    
    boss.draw();
    fighter.draw();
}