window.onload = function() {
  const canvas = document.getElementById("game");
  const context = canvas.getContext("2d");

  const scale = 20;
  const rows = canvas.height / scale;
  const columns = canvas.width / scale;

  let snake;
  let fruit;

  (function setup() {
    snake = new Snake();
    fruit = new Fruit();

    fruit.pickLocation();

    window.setInterval(() => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      fruit.draw();
      snake.update();
      snake.draw();

      if (snake.eat(fruit)) {
        fruit.pickLocation();
      }

      snake.checkCollision();
    }, 250);
  })();

  document.addEventListener("keydown", (event) => {
    const direction = event.key.replace("Arrow", "");
    snake.changeDirection(direction);
  });

  canvas.addEventListener("touchstart", (event) => {
    const startX = event.touches[0].clientX;
    const startY = event.touches[0].clientY;

    const direction = getSwipeDirection(startX, startY);
    if (direction) {
      snake.changeDirection(direction);
    }
  });

  function getSwipeDirection(startX, startY) {
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
    this.x = columns / 2 * scale;
    this.y = rows / 2 * scale;
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
      for (let i = 0; i < this.tail.length; i++) {
        if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
          this.total = 0;
          this.tail = [];
        }
      }
    };
  }

  function Fruit() {
    this.x;
    this.y;

    this.pickLocation = function () {
      this.x = (Math.floor(Math.random() * columns - 1) + 1) * scale;
      this.y = (Math.floor(Math.random() * rows - 1) + 1) * scale;
    };

    this.draw = function () {
      context.fillStyle = "#FF0000";
      context.fillRect(this.x, this.y, scale, scale);
    };
  }
 }; 
