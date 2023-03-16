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
  event.preventDefault();
  const direction = getSwipeDirection(event.touches[0].clientX, event.touches[0].clientY);
  if (direction) {
    snake.changeDirection(direction);
  }
});

function getSwipeDirection(startX, startY) {
  let touchEndX;
  let touchEndY;

  function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
    touchEndY = event.touches[0].clientY;
  }

  function handleTouchEnd() {
    canvas.removeEventListener("touchmove", handleTouchMove);
    canvas.removeEventListener("touchend", handleTouchEnd);

    if (!touchEndX || !touchEndY) {
      return;
    }

    const deltaX = touchEndX - startX;
    const deltaY = touchEndY - startY;
    const swipeThreshold = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > swipeThreshold) {
        return "Right";
      } else if (deltaX < -swipeThreshold) {
        return "Left";
      }
    } else {
      if (deltaY > swipeThreshold) {
        return "Down";
      } else if (deltaY < -swipeThreshold) {
        return "Up";
      }
    }
  }

  canvas.addEventListener("touchmove", handleTouchMove);
  canvas.addEventListener("touchend", handleTouchEnd);
}

// ... (remaining code) ...
