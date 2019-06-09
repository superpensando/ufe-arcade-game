//Canvas variables
// to prevent any element of the game from appearing offscreen
const screenWidth = 500; 
const onScreenMinWidth = 0; 
const onScreenMaxWidth =400;
const onScreenMinHeight=0;  
const onScreenMaxHeight=400; 
const playerSpeed = 80;
const playerX = onScreenMaxWidth/2;
const playerY = onScreenMaxHeight;


// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    //If x-axys bug movement off-screen
    this.x = this.x>screenWidth?0:this.x;
    //this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {
   console.log("crash");
   start();
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function(x, y) {
 //Not Player update
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    //Player's initial position
    this.x = playerX;
    this.y = playerY;
    this.speed = playerSpeed;
};

Player.prototype.handleInput = function(keypressed) {
    console.log(keypressed);
    switch (keypressed) {
        case "up":
        if (this.y > onScreenMinHeight ){
           this.y -=90;
           if (this.y == -50) {
                wins(); 
           }
            console.log("y up: "+this.y);
        }
        break;
        case "down":
        if (this.y < onScreenMaxHeight ){
            this.y +=90; 
            //console.log("y down: "+this.y);
        }
        break;
        case "left":
        if (this.x > onScreenMinWidth){
            this.x -=100;
            //console.log(this.x);
        }
        break;
        case "right":
        if (this.x < onScreenMaxWidth){
            this.x +=100; 
            //console.log(this.x);
        }
        break;
        default:
        //Don't apply
        break; 
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();


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


function start() {
    player.reset();
    allEnemies = [];
    allEnemies.push(
        new Enemy(0,50, 1+Math.random()*500),
        new Enemy(0,150, 1+Math.random()*200),
        new Enemy(0,230, 1+Math.random()*300),
    );
}; 

function wins() {
    const heading1 = document.getElementsByClassName("container__list");
    heading1[0].classList.add("wins");
    setTimeout(function() {
        heading1[0].classList.remove("wins");
    }, 3000); 
    
}


start();