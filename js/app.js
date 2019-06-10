//Canvas variables
const screenWidth = 500; 
const onScreenMinWidth = 0; 
const onScreenMaxWidth = 400;
const onScreenMinHeight = 0;  
const onScreenMaxHeight = 400; 
const canvasSquareY = 85;
const canvasSquareX = 100; 
const canvasWinnerPositionY = -25; 
//Enemy variables
const enemyX = 0;  
const enemyY1 = 60;
const enemySpeed1 = 1+Math.random()*600;
const enemyY2 = 145;
const enemySpeed2 = 1+Math.random()*400;
const enemyY3 = 230;
const enemySpeed3 = 1+Math.random()*550; 
//Player variables
const playerSpeed = 80;
const playerX = onScreenMaxWidth/2;
const playerY = onScreenMaxHeight;
//Auxiliar variables
let winCounts = 0;
let collisionCounts = 0; 
const totallifes = 3; 


// Enemies our player must avoid
class Enemy {
    constructor (x,y,speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed*dt;
        //If x-axys bug movement off-screen, put 'this.x = 0' else continue movement
        this.x = this.x>screenWidth?0:this.x;
        this.checkCollisions(this.x, player.x);
    }

    checkCollisions() {
        let yPlayer = player.y;
        let yEnemy = this.y;
        let xPlayerMin = player.x - 50;
        let xPlayerMax = player.x + 50;
        let xEnemy = Math.floor(this.x);

        if ( yPlayer === yEnemy) {
            if (xEnemy.between(xPlayerMin, xPlayerMax )) {
                collision(); 
                start();
            }
        }  
    }

}

Number.prototype.between  = function (a, b) {
    var min = Math.min.apply(Math, [a,b]),
        max = Math.max.apply(Math, [a,b]);
    return this > min && this < max;
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor (x,y,speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/char-horn-girl.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    reset() {
        //Player's initial position
        this.x = playerX;
        this.y = playerY;
        this.speed = playerSpeed;
    }

    update() {} 

    handleInput(keypressed) {
        switch (keypressed) {
            case "up":
            if (this.y > onScreenMinHeight ){
               this.y -=canvasSquareY;
               if (this.y == canvasWinnerPositionY ) { 
                    win(); 
               }
            }
            break;
            case "down":
            if (this.y < onScreenMaxHeight ){
                this.y +=canvasSquareY; 
            }
            break;
            case "left":
            if (this.x > onScreenMinWidth){
                this.x -=canvasSquareX;
            }
            break;
            case "right":
            if (this.x < onScreenMaxWidth){
                this.x +=canvasSquareX; 
            }
            break;
            default:// Do nothing;
            break; 
        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(
    new Enemy(enemyX,enemyY1,enemySpeed1),
    new Enemy(enemyX,enemyY2,enemySpeed2),
    new Enemy(enemyX,enemyY3,enemySpeed3),
);
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


//Restart Button
const restart = document.getElementById("restart");
restart.addEventListener("click", function(){
    //Close Modal
    const modal = document.getElementsByClassName("modal-content");
    modal[0].classList.add("hide");
    //Reset Collision
    collisionCounts = 0;
    const lifesCounter = document.getElementsByClassName("container__lifesCounts");
    lifesCounter[0].textContent = totallifes;
    const life1 = document.querySelector(".life1");
    const life2 = document.querySelector(".life2");
    const life3 = document.querySelector(".life3");
    life1.classList.remove("hide");
    life2.classList.remove("hide");
    life3.classList.remove("hide"); 
    //Reset Win
    winCounts = 0; 
    const wins = document.getElementsByClassName("container__winsText");
    wins[0].classList.add("hide");
    //Reset Player
    player.reset();  
});


function start() {
    player.reset();
}; 

function win() {
    winCounts += 1;
    //WinText Show -When users wins, appears the number of win games. 
    const wins = document.getElementsByClassName("container__winsText");
    wins[0].classList.remove("hide");
    const winsCounter = document.getElementsByClassName("container__winsCounts");
    winsCounter[0].textContent = winCounts; 
    //Start Game to continue gaming
    setTimeout(()=> {
        start();
    }, 1000); 
    //WinEffects - When users wins, the canvas are happy!
    const canvas = document.getElementsByTagName("canvas");
    canvas[0].classList.add("wins");
    setTimeout(()=> {
        canvas[0].classList.remove("wins");
    }, 1000);     
}

function collision() {
    collisionCounts += 1; 
    //CollisionEffects -When user collides, a life disappears (a heart)
    switch (collisionCounts) {
        case 1: 
            const life1 = document.querySelector(".life1");
            life1.classList.add("hide");
        break;
        case 2:
            const life2 = document.querySelector(".life2");
            life2.classList.add("hide");
        break;
        case 3:
            const life3 = document.querySelector(".life3");
            life3.classList.add("hide");
        break;
        default://Do Nothing
        break; 
    }
    //CollisionEffects - When users collides, the canvas are  is afraid!
    const canvas = document.getElementsByTagName("canvas");
    canvas[0].classList.add("collision");
    setTimeout(()=> {
        canvas[0].classList.remove("collision");
    }, 1000); 
    //CollisionText Show -When users collides, appears the number of the number of lives that are left .
    let lifes = (totallifes-collisionCounts);
    const lifesCounter = document.getElementsByClassName("container__lifesCounts");
    lifesCounter[0].textContent = (totallifes-collisionCounts); 
    //When the lifes is 0, the game is over 
    //Open Modal
    if (lifes === 0 ) {
        //Open Modal
        const modal = document.getElementsByClassName("modal-content");
        modal[0].classList.remove("hide");
    }
  
}


start();