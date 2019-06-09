//Canvas variables
const screenWidth = 500; 
const onScreenMinWidth = 0; 
const onScreenMaxWidth = 400;
const onScreenMinHeight = 0;  
const onScreenMaxHeight = 400; 
const canvasSquareY = 85;
const canvasSquareX = 100; 
//Enemy variables
const enemyX = 0;  
const enemyY1 = 60;
const enemySpeed1 = 1+Math.random()*500;
const enemyY2 = 145;
const enemySpeed2 = 1+Math.random()*200;
const enemyY3 = 230;
const enemySpeed3 = 1+Math.random()*350; 
//Player variables
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

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    //If x-axys bug movement off-screen, put 'this.x = 0' else continue movement
    this.x = this.x>screenWidth?0:this.x;
    this.checkCollisions(this.x, player.x);
};



Enemy.prototype.checkCollisions = function() {
   let yPlayer = player.y;
   let yEnemy = this.y;
   let xPlayerMin = player.x - 50;
   let xPlayerMax = player.x + 50;
   let xEnemy = Math.floor(this.x);

   if ( yPlayer === yEnemy) {
    if (xEnemy.between(xPlayerMin, xPlayerMax )) {
        console.log(xEnemy);
        start();
    } 
   } 
};

Number.prototype.between  = function (a, b) {
    var min = Math.min.apply(Math, [a,b]),
        max = Math.max.apply(Math, [a,b]);
    return this > min && this < max;
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

Player.prototype.update = function() {
  //Don't apply 
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
    switch (keypressed) {
        case "up":
        if (this.y > onScreenMinHeight ){
           this.y -=canvasSquareY;
           if (this.y == -25) {
                wins(); 
           }
            //console.log("y up: "+this.y);
        }
        break;
        case "down":
        if (this.y < onScreenMaxHeight ){
            this.y +=canvasSquareY; 
            //console.log("y down: "+this.y);
        }
        break;
        case "left":
        if (this.x > onScreenMinWidth){
            this.x -=canvasSquareX;
            //console.log(this.x);
        }
        break;
        case "right":
        if (this.x < onScreenMaxWidth){
            this.x +=canvasSquareX; 
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
var player = new Player(playerX,playerY,playerSpeed);


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
        new Enemy(enemyX,enemyY1,enemySpeed1),
        new Enemy(enemyX,enemyY2,enemySpeed2),
        new Enemy(enemyX,enemyY3,enemySpeed3),
    );
}; 

function wins() {
    const containerList = document.getElementsByClassName("container__list");
    containerList[0].classList.add("wins");
    setTimeout(function() {
        containerList[0].classList.remove("wins");
    }, 3000); 
    
}


start();