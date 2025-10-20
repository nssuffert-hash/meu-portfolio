// script-snake.js (atualizado)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreElement = document.getElementById('finalScore');
const tryAgainBtn = document.getElementById('tryAgainBtn');

const gridSize = 20;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;

let snake;
let food;
let direction;
let score;
let gameLoopInterval; // Para controlar o loop do jogo
let gameOver;

// Função para iniciar/reiniciar o jogo
function startGame() {
    snake = [{ x: Math.floor(gridWidth / 2), y: Math.floor(gridHeight / 2) }]; // Começa no meio
    direction = 'right';
    score = 0;
    scoreElement.textContent = score;
    gameOver = false;
    gameOverScreen.classList.add('hidden'); // Esconde a tela de Game Over
    generateFood();

    // Limpa o intervalo anterior se existir e inicia um novo
    if (gameLoopInterval) clearInterval(gameLoopInterval);
    gameLoopInterval = setInterval(update, 100);
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * gridWidth),
        y: Math.floor(Math.random() * gridHeight)
    };
    // Garante que a comida não apareça em cima da cobra
    snake.forEach(segment => {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'lime';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 1, gridSize - 1); // -1 para ver a grade
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 1, gridSize - 1);
}

function update() {
    if (gameOver) return;

    const head = { x: snake[0].x, y: snake[0].y };
    if (direction === 'right') head.x++;
    if (direction === 'left') head.x--;
    if (direction === 'up') head.y--;
    if (direction === 'down') head.y++;

    // Colisão com parede
    if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
        endGame();
        return;
    }

    // Colisão consigo mesma
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
            return;
        }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = score;
        generateFood();
        // Não remove a cauda (a cobra cresce)
    } else {
        snake.pop();
    }

    draw();
}

// Função para finalizar o jogo
function endGame() {
    gameOver = true;
    clearInterval(gameLoopInterval); // Para o loop do jogo
    finalScoreElement.textContent = score;
    gameOverScreen.classList.remove('hidden'); // Mostra a tela de Game Over
}

// Controla a direção
document.addEventListener('keydown', e => {
    // Evita mudar para a direção oposta
    if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    else if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    else if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    else if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
});

// Event listener para o botão "Tentar Novamente"
tryAgainBtn.addEventListener('click', startGame);

// Inicia o jogo pela primeira vez
startGame();