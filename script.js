let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
};
let points = 0;
const SCORE = document.querySelector("#points");

snake[0] = {
  x: 8 * box,
  y: 8 * box
};

function createBG() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  for(i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "orange";
  context.fillRect(food.x, food.y, box, box);
}

function startGame() {
  if(snake[0].x > 15 * box &&
    (direction == "right" || direction == "up" || direction == "down")) 
    snake[0].x = 0;
  if(snake[0].x < 0 &&
    (direction == "left" || direction == "up" || direction == "down"))
    snake[0].x = 16 * box;
  if(snake[0].y > 15 * box &&
    (direction == "down" || direction == "right" || direction == "left"))
    snake[0].y = 0;
  if(snake[0].y < 0 &&
    (direction == "up"  || direction == "right" || direction == "left"))
    snake[0].y = 16 * box;

  for(i = 1; i < snake.length; i++) {
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game);
      alert("Game Over :(");
    }
  }

  createBG();
  createSnake();
  drawFood();
  
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(direction == "right") snakeX += box;
  if(direction == "left") snakeX -= box;
  if(direction == "up") snakeY -= box;
  if(direction == "down") snakeY += box;

  if(snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    points++;
    SCORE.innerText = points;
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  snake.unshift(newHead);
}

function update(event) {
  if(event.keyCode == 37 && direction != "right") direction = "left";
  if(event.keyCode == 38 && direction != "down") direction = "up";
  if(event.keyCode == 39 && direction != "left") direction = "right";
  if(event.keyCode == 40 && direction != "up") direction = "down";
}

let game = setInterval(startGame, 100);

document.addEventListener("keydown", update);