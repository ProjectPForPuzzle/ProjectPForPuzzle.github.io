const bossState = { moving: "moving", pickingAttack: "pickingAttack", telegraph: "telegraph", midAttack: "midAttack", stagger: "stagger" };

function textComponent(fontSize, fontName, color, x, y) {
    this.fontSize = fontSize;
    this.fontName = fontName;
    this.color = color;
    this.x = x;
    this.y = y;

    this.draw = function() {
        ctx = world.context;
        ctx.font = this.fontSize + " " + this.fontName;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    }
}

function attack(name, frames, lagFrames, telegraphFrames) {
    this.name = name;
    this.frames = frames;
    this.lagFrames = lagFrames;
    this.telegraphFrames = telegraphFrames;
    this.telegraphRotations = new Array();

}

function weapon(position, size) {
    this.position = position;
    this.size = size;
    this.rotation = 315;
    this.defaultRotation = 315;

    this.update = function(rotationUpdate, reset) {
        this.rotation += rotationUpdate;
        if (reset) this.rotation = this.defaultRotation;
    }

    this.draw = function(owner) {
        ctx = world.context;
        ctx.save();

        ctx.translate(owner.position.x, owner.position.y);
        ctx.rotate((this.rotation * Math.PI) / 180);

    
        ctx.fillStyle = "purple";
        ctx.fillRect(this.position.x - this.size.x, this.position.y - this.size.y, this.size.x, this.size.y);

        ctx.restore();
    }
}


function boss(position, size) {
    this.position = position;
    this.size = size;
    this.dirX = 0;
    this.dirY = 0;
    this.state = bossState.moving;
    this.attacks = new Array();
    this.attacks[0] = new attack("hammer", 30, 120, 30);
    this.attacks[1] = new attack("aoe", 90, 300, 90);
    this.attacks[2] = new attack("fire", 30, 60, 30);
    this.currentAttack = null;
    this.attackFrame = 0;
    this.lagFrame = 0;
    this.telegraphFrame = 0;
    this.telegraphRotation = 0;
    this.attackRotation = 0;
    this.weapon = new weapon( new vector2D(0, 0), new vector2D(25, 300));

    this.stateText = new textComponent("30px", "Consolas", "white", 100, 100);
    this.stateText.text = "Boss state: " + this.state;

    this.attackText = new textComponent("30px", "Consolas", "white", 100, 200);
    this.attackText.text = "Boss is using attack: " + this.currentAttack;

    this.update = function(target) {
        if (this.state == bossState.moving) {
            this.dirX = 0;
            let targetXDist = Math.abs(target.x - this.position.x);
    
            this.dirY = 0;
            let targetYDist = Math.abs(target.y - this.position.y);
    
            if (targetXDist > 250) {
                if (target.x > this.position.x) this.dirX++;
                else if (target.x < this.position.x) this.dirX--;
            }
    
            else if (targetYDist > 300) {
                if (target.y > this.position.y) this.dirY++;
                else if (target.y < this.position.y) this.dirY--;
            }
    
            else {
                this.state = bossState.pickingAttack;
            }    
        } else if (this.state == bossState.pickingAttack) {
            let rng = Math.floor(Math.random() * 3);
            
            this.currentAttack = this.attacks[rng];
            this.state = bossState.telegraph;
            this.attackFrame = this.currentAttack.frames;
            this.lagFrame = this.currentAttack.lagFrames;
            this.telegraphFrame = this.currentAttack.telegraphFrames;
        } else if (this.state == bossState.telegraph) { 
            this.telegraphFrame--;
            this.weapon.update(this.telegraphRotation, false);
            if (this.telegraphFrame <= 0) {
                this.state = bossState.midAttack;
            }

            if (this.currentAttack.name == "hammer") {
                this.telegraphRotation = -1;
            }
            else if (this.currentAttack.name == "aoe") {
                this.telegraphRotation = 10;
            } else if (this.currentAttack.name == "fire") {
                this.telegraphRotation = 100;
            }

        } else if (this.state == bossState.midAttack) {
            this.attackFrame--;
            this.weapon.update(this.attackRotation, false);
            if (this.attackFrame <= 0) {
                this.state = bossState.stagger;
            }

            if (this.currentAttack.name == "hammer") {
                this.attackRotation = 10;
            }
            else if (this.currentAttack.name == "aoe") {
                this.telegraphRotation = 10;
            } else if (this.currentAttack.name == "fire") {
                this.telegraphRotation = 100;
            }
        } else if (this.state == bossState.stagger) {
            this.lagFrame--;
            this.weapon.update(0, true);
            if (this.lagFrame <= 0) {
                this.state = bossState.moving;
            }
        }
        


        this.position.x += this.dirX * 5;
        this.position.y += this.dirY * 5;
        

        this.position.clamp( new vector2D(0, 0), new vector2D(window.innerWidth - this.size.x, window.innerHeight - this.size.y) );

        this.stateText.text = "Boss state: " + this.state;
        if (this.state == bossState.midAttack || this.state == bossState.telegraph) {
            this.attackText.text = "Boss is using attack: " + this.currentAttack.name;
        }

        
        //this.weapon.update(this.position);
    }

    this.draw = function() {
        ctx = world.context;
        ctx.fillStyle = "blue";
        ctx.fillRect(this.position.x - this.size.x / 2, this.position.y - this.size.y / 2, this.size.x, this.size.y);

        this.weapon.draw(this);

        this.stateText.draw();
        if (this.state == bossState.midAttack || this.state == bossState.telegraph) {
            this.attackText.draw();
        }
    }
}
