const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const scoreboard = document.getElementById("scoreboard");

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let fruit;
let highScore = 0;

(function setup() {
  snake = new Snake();
  fruit = new Fruit();
  fruit.pickLocation();

  if (localStorage.getItem('highScore')) {
    highScore = parseInt(localStorage.getItem('highScore'));
  } else {
    highScore = 0;
  }

  window.setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.update();
    snake.draw();

    if (snake.eat(fruit)) {
      do {
        fruit.pickLocation();
      } while (snake.tail.some(segment => segment.x === fruit.x && segment.y === fruit.y));
    }

    fruit.draw();
    snake.checkCollision();
  }, 250);

})();

document.addEventListener("keydown", (event) => {
  const direction = event.key.replace("Arrow", "");
  snake.changeDirection(direction);
});

canvas.addEventListener("touchstart", (event) => {
  event.preventDefault();
  const startX = event.touches[0].clientX;
  const startY = event.touches[0].clientY;

  const direction = getSwipeDirection(event, startX, startY); // Pass the event variable here
  if (direction) {
    snake.changeDirection(direction);
  }
});

function getSwipeDirection(event, startX, startY) { // Add event as an argument
  const endX = event.changedTouches[0].clientX;
  const endY = event.changedTouches[0].clientY;

  const deltaX = endX - startX;
  const deltaY = endY - startY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX > 0 ? "Right" : "Left";
  } else {
    return deltaY > 0 ? "Down" : "Up";
  }
}

function Snake() {
  this.x = Math.floor(columns / 2) * scale;
  this.y = Math.floor(rows / 2) * scale;
  this.xSpeed = scale;
  this.ySpeed = 0;
  this.total = 0;
  this.tail = [];

  this.draw = function () {
    context.fillStyle = "#FFFFFF";

    for (let i = 0; i < this.tail.length; i++) {
      context.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }

    context.fillRect(this.x, this.y, scale, scale);
  };

  this.update = function () {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    if (this.total >= 1) {
      this.tail[this.total - 1] = { x: this.x, y: this.y };
    }

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0) {
      this.x = canvas.width - scale;
    } else if (this.x > canvas.width - scale) {
      this.x = 0;
    }

    if (this.y < 0) {
      this.y = canvas.height - scale;
    } else if (this.y > canvas.height - scale) {
      this.y = 0;
    }

    if (this.eat(fruit)) {
      fruit.pickLocation();
    }
  };

  this.changeDirection = function (direction) {
    switch (direction) {
      case "Up":
        if (this.ySpeed === 0) {
          this.xSpeed = 0;
          this.ySpeed = -scale;
        }
        break;
      case "Down":
        if (this.ySpeed === 0) {
          this.xSpeed = 0;
          this.ySpeed = scale;
        }
        break;
      case "Left":
        if (this.xSpeed === 0) {
          this.xSpeed = -scale;
          this.ySpeed = 0;
        }
        break;
      case "Right":
        if (this.xSpeed === 0) {
          this.xSpeed = scale;
          this.ySpeed = 0;
        }
        break;
    }
  };

  this.eat = function (fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {
      this.total++;
      return true;
    }
    return false;
  };

  this.checkCollision = function () {
    for (let i = 1; i < this.tail.length; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        this.total = 0;
        this.tail = [];
      }
    }
  };
}

