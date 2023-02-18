function startGame() {
    world.start();
}

//hello

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

let testText = new textComponent("30px", "Consolas", "white", 100, 100);
testText.text = "Time: 0";

let counter = 0;

function updateWorld() {
    world.clear();
    testText.update();
    counter++;
    testText.text = "Time: " + counter;
}

function textComponent(fontSize, fontName, color, x, y) {
    this.fontSize = fontSize;
    this.fontName = fontName;
    this.color = color;
    this.x = x;
    this.y = y;

    this.update = function() {
        ctx = world.context;
        ctx.font = this.fontSize + " " + this.fontName;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
    }
}