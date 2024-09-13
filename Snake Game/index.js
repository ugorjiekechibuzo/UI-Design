const playBorder = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.high-score');
const controls = document.querySelectorAll('.controls i');


let gameOver = false;
let score = 0;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;

// To get the high score from the local storage
// let highScore = localStorage.getItem('high-score') ? localStorage.getItem('high-score') : 0;
let highScore = localStorage.getItem("high-score") || 0;

highScoreElement.textContent = `High Score: ${highScore}`;


// To generate the food at random position between 1 and 30

function generateFoodPosition() {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;

}

// Handle the game over

function gameOverHandler() {
  clearInterval(setIntervalId);
  alert('Game Over! Press Ok to Play Again');
  location.reload();
}

//Change the velocity of the snake based on the key pressed

function changeDirection(e) {
  switch (e.key) {

    case 'ArrowUp':
      if(velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;

      }
      break;
    case 'ArrowDown':
      if(velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
      }
      break;
    case 'ArrowLeft':
      if(velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
      }
      break;
    case 'ArrowRight':
      if(velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
      }
      break;
  }


  // if (e.key === "ArrowUp" && velocityY != 1) {
  //     velocityX = 0;
  //     velocityY = -1;
  // } else if (e.key === "ArrowDown" && velocityY != -1) {
  //     velocityX = 0;
  //     velocityY = 1;
  // } else if (e.key === "ArrowLeft" && velocityX != 1) {
  //     velocityX = -1;
  //     velocityY = 0;
  // } else if (e.key === "ArrowRight" && velocityX != -1) {
  //     velocityX = 1;
  //     velocityY = 0;
  // }
}

//Change the velocity of the snake based on the control clicked

controls.forEach(control =>

  control.addEventListener('click', () => {

  changeDirection({key: control.dataset.key});

})
);

// To start the game

function startGame() {
  if(gameOver) {
    return gameOverHandler();
  }

  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  //When the snake eats the food
  if(snakeX === foodX && snakeY === foodY){

    generateFoodPosition();
    snakeBody.push([foodY, foodX]); // Add the food to the snake body
    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem('high-score', highScore);
    scoreElement.textContent = `Score: ${score}`;
    highScoreElement.textContent = `High Score: ${highScore}`;
  }

  //Updating snake head

  snakeX = snakeX + velocityX;
  snakeY = snakeY + velocityY;

  //Shifting the forward value of elements in the snake body by one

  for(let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];

  }

  snakeBody[0] = [snakeY, snakeX];

  //Checking if the snake hits the wall

  if(snakeX <= 0 || snakeX >= 30 || snakeY <= 0 || snakeY >= 30 ) {
    gameOver = true;
  }

  //Adding div for each part of the snake body

  for(let i = 0; i < snakeBody.length; i++) {
    html += `<div class="head" style="grid-area: ${snakeBody[i][0]} / ${snakeBody[i][1]}"></div>`;

    //Checking if the snake hits itself
    if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
      gameOver = true;
    }
  }
  console.log(html);
  playBorder.innerHTML = html;
}



generateFoodPosition()
setIntervalId = setInterval(startGame, 100);
document.addEventListener('keyup', changeDirection);
