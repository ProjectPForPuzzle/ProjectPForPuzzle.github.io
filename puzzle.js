function translator(x, y, keysN) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
    this.keysNeeded = keysN;
}

function key(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
    this.collected = false;
}

function Exit(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
}