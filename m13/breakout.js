/* ..:: B R E A K O U T   G A M E ::..
 *
 * breakout.js
 * Author: leonard verhave 
 * Date: 11-15-24 
 * Project for COSC 1350
 *
 */

// get the canvas element from the DOM.
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Game score numbers 
let score = 0;
let gameOver = false;

// Bricks 
const brickRows = 4;
const brickColumns = 6;
const brickWidth = 90;
const brickHeight = 25;
const brickPadding = 10;
const brickTopOffset = 40; 
const brickLeftOffset = 5; 
let bricks = [];

for (let r = 0; r < brickRows; r++) {
  bricks[r] = [];
  for (let c = 0; c < brickColumns; c++) {
    let brickX = brickLeftOffset + c * (brickWidth + brickPadding);
    let brickY = brickTopOffset + r * (brickHeight + brickPadding);
    bricks[r][c] = { x: brickX, y: brickY, width: brickWidth, height: brickHeight, hit: false };
  }
};


// Ball 
let ballRadius = 15;
let xPos = canvas.width / 2;
let yPos = canvas.height / 2;
let xMoveDist = 3;
let yMoveDist = 3;

// Paddle 
let paddleHeight = 15;
let paddleWidth = 100;
let xPaddle = (canvas.width - paddleWidth) / 2;
let paddleSpeed = 5;
let moveLeft = false;
let moveRight = false;

// Draw the ball 
ballRender=()=>{
  ctx.beginPath();
  ctx.arc(xPos, yPos, ballRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
};

// Draw the paddle 
paddleRender =()=>{
  ctx.beginPath();
  ctx.rect(xPaddle, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "White";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
};

// darw bricks 
brickRender = () => {
  for (let r = 0; r < brickRows; r++) {
    for (let c = 0; c < brickColumns; c++) {
      if (!bricks[r][c].hit) {
        let brick = bricks[r][c];
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brick.width, brick.height);
        ctx.fillStyle = "White";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

};


updateBallPosition = () =>{
  xPos += xMoveDist;
  yPos += yMoveDist;

  // if the ball Bounces off the left and the right wall 
  if ( xPos > canvas.width - ballRadius || xPos < ballRadius) {
    xMoveDist = -xMoveDist;
  }
 
  // if the ball bounces off the top wall
  if(yPos < ballRadius) {
    yMoveDist = -yMoveDist;
  }

  // if the ball bounces off the bottom or the paddle 

  if ( yPos > canvas.height - ballRadius) {
    if( xPos > xPaddle && xPos < xPaddle + paddleWidth) {
      yMoveDist = -yMoveDist;
    } else {
      endGame();
    }
  }
};

// reset the game once the button is clicked or when the ball hit the bottom, the points will reset once the ball has hit the bottom. 
function resetGame () {
  score = 0; 
  document.getElementById('score').textContent = score;
  xPos = canvas.width / 2;
  yPos = canvas.height / 2;
  xMoveDist = 3;
  yMoveDist = 3;
  xPaddle = (canvas.width - paddleWidth) / 2;

  for (let r = 0; r < brickRows; r++) {
    for (let c = 0; c < brickColumns; c++) {
      bricks[r][c].hit = false;

    }
   }
   ctx.clearRect (0, 0, canvas.width , canvas.height);
   draw();
   gameOver = false;
   if (intervalID) {
    clearInterval(intervalID);
   }
   intervalID = setInterval(draw, refreshRate);
};


// end the game and reset the bricks
function endGame() {
  gameOver = true;
  clearInterval(intervalID);
  alert ("Game Over!");
  const gameOverText = document.createElement("div");
  gameOverText.textContent = "game Over! Click 'reset' to restart";
  document.body.appendChild(gameOverText);
};

document.getElementById("resetButton").addEventListener("click", resetGame);

// if the ball hits the bricks add 10 points per brick 
checkBrickCollsions = () => {
  for (let r = 0; r < brickRows; r++) {
    for (let c = 0; c < brickColumns; c++) {
      let brick = bricks [r][c];
      if(!brick.hit) {
        if (xPos > brick.x && xPos < brick.x + brick.width && 
            yPos > brick.y && yPos < brick.y + brick.height) {
            yMoveDist = - yMoveDist;
            brick.hit = true;
            score += 10;
            document.getElementById("score").textContent = score;
          }
      }
    }
  }
};

// this part draws the ball, paddle, and position of the ball 

draw=()=> {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ballRender();
  paddleRender();
  updateBallPosition();
  PaddlePostion();
  brickRender();
  checkBrickCollsions();

};

// key up and down 

let keyUp = (event) => {
  if(event.key === "ArrowLeft") {
    moveLeft = false;
  } else if (event.key === "ArrowRight") {
    moveRight = false;
  }
};

let keyDown = (event) => {
  if(event.key === "ArrowLeft") {
    moveLeft = true;
  } else if (event.key === "ArrowRight") {
    moveRight = true;
  }
};


document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// update the paddle to move when the arrow keys are pressed 
 
let PaddlePostion = () => {
  if (moveLeft && xPaddle > 0) {
    xPaddle -= paddleSpeed; 
  }
  if (moveRight && xPaddle < canvas.width - paddleWidth) {
    xPaddle += paddleSpeed; 
  }
};

const refreshRate = 40;
let intervalID = setInterval(draw, refreshRate);