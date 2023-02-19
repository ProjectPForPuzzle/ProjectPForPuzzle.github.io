function tileComponent(size, color, x, y) {
    this.size = size;
    this.color = color;
    this.x = x;
    this.y = y;

    this.draw = function() {
        ctx = world.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// Maze is a size x size square of tiles
function Maze(size) {

    this.size = size;

    // number of tiles in the maze
    num_tiles = size ** 2;

    this.tiles = new Array(num_tiles);

    // size of each tile
    t_size = (window.innerHeight - 160) / size;

    // starting position for the tiles
    start_x = (window.innerWidth / 2) - ( (window.innerHeight - 40) / 2 );
    
    start_y = 80;

    for (i = 0; i < num_tiles; i++) {
        if ( start_y >= window.innerHeight - 80) {
            start_x += t_size;
            start_y = 80;
        }
        this.tiles[i] = new tileComponent(t_size, "pink", start_x, start_y);
        start_y += t_size;
    }

    this.draw = function() {
        for (i = 0; i < num_tiles; i++) {
            this.tiles[i].draw();
        }
    }

}