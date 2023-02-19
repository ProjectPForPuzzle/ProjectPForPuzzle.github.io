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
    t_size = (window.innerHeight - 40) / size;

    // starting position for the tiles
    start_x = (maze.innerWidth / 2) - ( (window.innerHeight - 40) / 2 );
    start_y = window.innerHeight - 20;

    for (i = 0; i < num_tiles; i++) {
        if ( start_y <= 20) {
            start_x += t_size;
            start_y = window.innerHeight - 20;
        }
        tiles[i] = new tileComponent(t_size, start_x, start_y);
        start_y -= t_size;
    }

}