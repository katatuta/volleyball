class ScoreBoard extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
            .scoreboard {
                display: flex;
                justify-content: space-around;
                align-items: center;
                background-color: #000;
                color: #fff;
                font-family: 'Orbitron', sans-serif;
                height: 100px;
                padding: 0 20px;
                border-bottom: 5px solid #ff00ff;
                text-shadow: 0 0 10px #ff00ff;
            }
            .team {
                font-size: 2em;
            }
            .score {
                font-size: 3em;
                color: #ffff00;
                letter-spacing: 5px;
            }
            .timer {
                font-size: 1.5em;
            }
        `;

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'scoreboard');

        const team1 = document.createElement('div');
        team1.setAttribute('class', 'team');
        team1.textContent = 'KOR';

        this.scoreDisplay = document.createElement('div');
        this.scoreDisplay.setAttribute('class', 'score');
        this.scoreDisplay.textContent = '0-0';

        const team2 = document.createElement('div');
        team2.setAttribute('class', 'team');
        team2.textContent = 'GER';

        const timer = document.createElement('div');
        timer.setAttribute('class', 'timer');
        timer.textContent = "Time 02'16\"";

        wrapper.appendChild(team1);
        wrapper.appendChild(this.scoreDisplay);
        wrapper.appendChild(team2);
        wrapper.appendChild(timer);

        this.shadow.appendChild(style);
        this.shadow.appendChild(wrapper);
    }

    updateScore(score1, score2) {
        this.scoreDisplay.textContent = `${score1}-${score2}`;
    }
}

customElements.define('score-board', ScoreBoard);

// Game Elements
const ball = document.querySelector('.ball');
const court = document.querySelector('.court');
const playerOne = document.querySelector('.player-one');
const playerTwo = document.querySelector('.player-two');
const scoreBoard = document.querySelector('score-board');

// Game State
let ballX = 100, ballY = 100, ballSpeedX = 0, ballSpeedY = 0;
let playerOneX = 150, playerOneY = 0, playerOneYSpeed = 0;
let playerTwoX = 600, playerTwoY = 0, playerTwoYSpeed = 0;
const playerSpeed = 10, gravity = 0.8, jumpPower = -15;
let score1 = 0, score2 = 0;
let serving = true, canSpike = false;

function serve() {
    ballX = playerOneX + (playerOne.clientWidth / 2);
    ballY = court.clientHeight - playerOne.clientHeight - ball.clientHeight;
    ballSpeedX = 4;
    ballSpeedY = -5;
    serving = false;
}

function gameLoop() {
    if (serving) {
        ballX = playerOneX + (playerOne.clientWidth / 2) - (ball.clientWidth / 2);
        ballY = court.clientHeight - playerOne.clientHeight - ball.clientHeight - 10 - playerOneY;
    } else {
        ballX += ballSpeedX;
        ballY += ballSpeedY;
    }

    // Player one physics
    playerOneY += playerOneYSpeed;
    playerOneYSpeed += gravity;
    if (playerOneY > 0) {
        playerOneY = 0;
        playerOneYSpeed = 0;
    }

    // Player two (AI) physics
    playerTwoY += playerTwoYSpeed;
    playerTwoYSpeed += gravity;
    if (playerTwoY > 0) {
        playerTwoY = 0;
        playerTwoYSpeed = 0;
    }

    // Ball collision with walls
    if (ballX > court.clientWidth - ball.clientWidth || ballX < 0) ballSpeedX *= -1;
    if (ballY < 0) ballSpeedY *= -1;

    // Ball collision with ground
    if (ballY > court.clientHeight - ball.clientHeight) {
        if (ballX < court.clientWidth / 2) score2++; else score1++;
        scoreBoard.updateScore(score1, score2);
        serving = true;
    }

    // Ball collision with players
    const p1Rect = { ...playerOne.getBoundingClientRect(), y: playerOne.getBoundingClientRect().y - playerOneY };
    if (isCollision(ball.getBoundingClientRect(), p1Rect)) {
        ballSpeedY *= -1;
        if (canSpike) {
            ballSpeedY = 15;
            ballSpeedX = (ballX < playerOneX + playerOne.clientWidth/2) ? -10: 10;
            canSpike = false;
        }
    }

    const p2Rect = { ...playerTwo.getBoundingClientRect(), y: playerTwo.getBoundingClientRect().y - playerTwoY };
    if (isCollision(ball.getBoundingClientRect(), p2Rect)) {
        ballSpeedY *= -1;
        if (playerTwoY < 0) { // AI Spike
            ballSpeedY = -15;
            ballSpeedX = (ballX < playerTwoX + playerTwo.clientWidth/2) ? 10: -10;
        }
    }

    // Opponent AI
    if (ballX > court.clientWidth / 2) {
        if (playerTwoX + playerTwo.clientWidth / 2 < ballX) playerTwoX += playerSpeed * 0.6;
        else playerTwoX -= playerSpeed * 0.6;

        if (ballY < court.clientHeight / 2 && playerTwoY === 0) { // AI Jump
            playerTwoYSpeed = jumpPower;
        }
    }

    // Update positions
    playerOne.style.transform = `translateY(${playerOneY}px)`;
    playerTwo.style.transform = `translateY(${playerTwoY}px)`;
    playerTwo.style.left = playerTwoX + 'px';
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    requestAnimationFrame(gameLoop);
}

function isCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') playerOneX -= playerSpeed;
    else if (e.key === 'ArrowRight') playerOneX += playerSpeed;
    else if (e.key === 'ArrowUp' && playerOneY === 0) {
        playerOneYSpeed = jumpPower;
        canSpike = true;
    }

    if (e.code === 'Space' && serving) serve();

    // Player bounds
    if (playerOneX < 0) playerOneX = 0;
    if (playerOneX > (court.clientWidth / 2) - playerOne.clientWidth) {
        playerOneX = (court.clientWidth / 2) - playerOne.clientWidth;
    }

    playerOne.style.left = playerOneX + 'px';
});

gameLoop();
