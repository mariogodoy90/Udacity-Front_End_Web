class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y + 55;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
        this.step = 101;
        this.offScreen =  this.step * 5;
        this.resetPosi = -this.step;
    }

    render(x, y){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(dt){
        if (this.x < this.offScreen) {
            this.x += this.speed * dt;
        } else {
            this.x = this.resetPosi;
        }
    }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png'
        this.step = 101;
        this.jump = 83;
        this.xStart = this.step * 2;
        this.yStart = (this.jump * 4) + 55;
        this.x = this.xStart;
        this.y = this.yStart;
        this.victory = false;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(input){
        switch (input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= this.jump;
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;
        }
    }

    update(){
        for(let enemy of allEnemies){
            if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x
                 && enemy.x < this.x + this.step/2)) {
                this.reset();
            }
        }

        if (this.y < 20) {
            this.victory = true
        }
    }


    reset(){
        this.x = this.xStart;
        this.y = this.yStart;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 300);
const bug3 = new Enemy((-101*4), 83, 300);
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3);
console.log(allEnemies);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
