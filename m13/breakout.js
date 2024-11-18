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
      // ball will reset in the cneter of the canvas when htting the bottom 
      xPos = canvas.width / 2;
      yPos = canvas.height / 2;
      xMoveDist = 3;
      yMoveDist = 3;
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
const intervalID = setInterval(draw, refreshRate);

