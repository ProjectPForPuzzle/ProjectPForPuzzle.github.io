function camera(x, y) {
    this.x = x || 0;
    this.y = y || 0;

    this.width = window.innerWidth
    this.height = window.innerHeight;

    this.follow = null;

    this.follow = function(entity) {
        this.follow = entity;
    }

    this.update = function() {
        if (this.follow == null) return;

        this.x = this.follow.x;
        this.y = this.follow.y;
    }
}