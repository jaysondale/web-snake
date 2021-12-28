var y_step = 1;
var x_step = 0;
const STEP_SIZE = 20;
const GAME_DELAY = 50;
var snake = [[0, 0], [0, STEP_SIZE]]; // Stores coordinates of each body piece
var wnd_width = null;
var wnd_height = null;
var food = null;
var score = 0;

function getWindowSize() {
    wnd_width = $(window).width() - ($(window).width() % STEP_SIZE);
    wnd_height=  $(window).height() - ($(window).height() % STEP_SIZE);
}

$(function() {
    // Initially get window size and set listener to get window size on window reload
    getWindowSize();
    $(window).on('resize', getWindowSize);
    console.log(wnd_width);
    const $SNAKE = $("#snake");
    const $GAME_WND = $("#game-window");
    const $FOOD = $("#food");
    const $SCORE = $("#score");

    function spawnFood() {
        var rand_x = Math.floor(Math.random() * (wnd_width / STEP_SIZE)) * STEP_SIZE;
        var rand_y = Math.floor(Math.random() * (wnd_height / STEP_SIZE)) * STEP_SIZE;
        while ([rand_x, rand_y] in snake) {
            console.log(rand_x, rand_y);
            rand_x = Math.floor(Math.random() * (wnd_width / STEP_SIZE)) * STEP_SIZE;
            rand_y = Math.floor(Math.random() * (wnd_height / STEP_SIZE)) * STEP_SIZE;
        }
        food = [rand_x, rand_y]; // Save food coordinates
        console.log(food);
        $FOOD.css('transform', `translate(${rand_x}px, ${rand_y}px)`);
    }

    function getNextSquare() {
        var head = snake[snake.length - 1];
        var next_x = head[0] + (STEP_SIZE * x_step)
        var next_y = head[1] + (STEP_SIZE * y_step)
        var new_x = next_x >= wnd_width ? 0 : (next_x < 0 ? wnd_width - STEP_SIZE : next_x);
        var new_y = next_y >= wnd_height ? 0 : (next_y < 0 ? wnd_height - STEP_SIZE : next_y);
        return [new_x, new_y];
    }

    function drawSquare(coords) {
        var x = coords[0];
        var y = coords[1];
        $SNAKE.append(`<div x='${x}' y='${y}' style='transform: translate(${x}px, ${y}px);' class='game-block snake-body'></div>`); // Add element to DOM
        //$(`.snake-body[x='${x}'][y='${y}']`).css("transform", ``); // Place on the screen
    }

    function removeSquare(coords) {
        $(`.snake-body[x='${coords[0]}'][y='${coords[1]}']`).remove();
    }

    function gameLoop() {
        var newSquare = getNextSquare();
        snake.push(newSquare);
        removeSquare(snake[0]);
        if (newSquare[0] == food[0] && newSquare[1] == food[1]) {
            spawnFood();
            score += 1;
            $SCORE.text(`Score: ${score}`);
        } else {
            snake.shift(); // Remove first element (tail of snake)
        }
        drawSquare(newSquare);
        setTimeout(gameLoop, GAME_DELAY);
    }

    $(window).on('keydown', el => {
        switch(el.originalEvent.code) {
            case "ArrowUp":
                y_step = -1;
                x_step = 0;
                break;
            case "ArrowRight":
                y_step = 0;
                x_step = 1;
                break;
            case "ArrowDown":
                y_step = 1;
                x_step = 0;
                break;
            case "ArrowLeft":
                y_step = 0;
                x_step = -1;
        }
    });

    spawnFood(); // Spawn first food
    gameLoop();
});