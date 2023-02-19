function textComponent(fontSize, fontName, color, x, y) {
    this.fontSize = fontSize;
    this.fontName = fontName;
    this.color = color;
    this.x = x;
    this.y = y;
    this.text = "e";

    this.draw = function() {
        ctx = world.context;
        ctx.font = this.fontSize + " " + this.fontName;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    }
}