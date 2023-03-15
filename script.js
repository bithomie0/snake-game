const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

const tileSize = 20;
const snakeSpeed = 100;
const snake = [{ x: 200, y: 200 }];
let direction = "ArrowRight";
let food = createFood();

setInterval(main, snakeSpeed);

function main() {
    update();
    draw();
}

function update() {
    updateSnake();
    checkFoodCollision();
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawSnake();
    drawFood();
}

function updateSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case "ArrowUp":
            head.y -= tileSize;
            break;
        case "ArrowDown":
            head.y += tileSize;
            break;
        case "ArrowLeft":
            head.x -= tileSize;
            break;
        case "ArrowRight":
            head.x += tileSize;
            break;
    }

    snake.unshift(head);
    snake.pop();
}

function drawSnake() {
    ctx.fillStyle = "lime";

    for (const segment of snake) {
        ctx.fillRect(segment.x, segment.y, tileSize, tileSize);
    }
}

function createFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / tileSize)) * tileSize,
        y: Math.floor(Math.random() * (canvas.height / tileSize)) * tileSize,
    };
}

function checkFoodCollision() {
    const head = snake[0];

    if (head.x === food.x && head.y === food.y) {
        food = createFood();
        snake.push({ x: -tileSize, y: -tileSize });
    }
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, tileSize, tileSize);
}

document.addEventListener("keydown", (event) => {
    if (
        (event.key === "ArrowUp" && direction !== "ArrowDown") ||
        (event.key === "ArrowDown" && direction !== "ArrowUp") ||
        (event.key === "ArrowLeft" && direction !== "ArrowRight") ||
        (event.key === "ArrowRight" && direction !== "ArrowLeft")
    ) {
        direction = event.key;
    }
});
