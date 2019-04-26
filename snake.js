const canvasBorderColor = 'black';
const canvasBackgroundColor = 'white';

const snakeBackground = 'lightgreen';
const snakeBorder = 'darkgreen';

let snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 },
];

let dx = 10;
let dy = 0;

// grab the canvas element
var gameCanvas = document.getElementById("gameCanvas")

console.log(gameCanvas);

// return a two dimensional drawing context 
var ctx = gameCanvas.getContext('2d');





clearCanvas = () => {
    //color to fill the canvas
    ctx.fillstyle = canvasBackgroundColor;
    // color for the border of canvas
    ctx.strokestyle = canvasBorderColor;

    // draw a filled rectangle to cover the canvas
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    // draw a border around the entire canvas
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = snakeBackground;
    ctx.strokeStyle = snakeBorder;

    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

advanceSnake = () => {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy }

    snake.unshift(head);

    snake.pop();
}

main = () => {
    setTimeout(function onTick() {
        clearCanvas();
        advanceSnake();
        drawSnake();

        main();
    }, 100)
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingDown) {
        dx = 0;
        dy = 10;
    }
}

main();

document.addEventListener("keydown", changeDirection)