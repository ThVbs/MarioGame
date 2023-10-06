document.addEventListener("DOMContentLoaded", () => {
    const mario = document.querySelector(".mario");
    const pipe = document.querySelector(".pipe");
    // const turtle = document.querySelector(".turtle");
    const gameOverImage = document.querySelector(".game-over");
    const restartButton = document.querySelector("#restart-button");
    const restartContainer = document.querySelector(".restart-container");
    const githubContainer = document.querySelector(".github-container");
    const linkedinContainer = document.querySelector(".linkedin-container");
    const emailContainer = document.querySelector(".email-container");
    const clouds = document.querySelector('.clouds');
    const scoreElement = document.getElementById('score');
    const jumpSound = new Audio('./images/mario_pulando.mp3');
    const GOSound = new Audio('./images/mario_gameover.mp3');
    const MoneySound = new Audio('./images/mario-money.mp3');
    const GameSound = new Audio('./images/Super Mario Bros. medley.mp3');
    const pauseButton = document.getElementById("pause-button");
    const pauseIcon = document.getElementById("pause-icon");

    let bonusImage = null;
    let score = 0;
    let isGamePaused = false; // Variável para controlar o estado de pausa do jogo

    // Função para atualizar a pontuação
    function updateScore() {
        if (!isGamePaused) {
            GameSound.play();
            score++;
            const formattedScore = String(score).padStart(5, '0');
            scoreElement.textContent = formattedScore;

            if (score % 100 === 0) {
                playMoneySoundAndDisplayBonusImage();
            }
        }
    }

    function playMoneySoundAndDisplayBonusImage() {
        MoneySound.play(); // Tocar o som de dinheiro
        bonusImage = document.createElement('img');
        bonusImage.src = './images/moneymario.gif'; // Caminho correto para a imagem de bônus
        bonusImage.className = 'bonus-image';

        // Posicione a imagem de bônus no topo do Mario
        const marioRect = mario.getBoundingClientRect();
        bonusImage.style.left = marioRect.left + 'px';
        bonusImage.style.bottom = mario.style.bottom;

        // Adicione a imagem de bônus acima do Mario
        const gameBoard = document.querySelector('.game-board');
        gameBoard.appendChild(bonusImage);

        // Defina um temporizador para remover a imagem de bônus após 2 segundos
        setTimeout(() => {
            gameBoard.removeChild(bonusImage);
        }, 2000);
    }

    if (pipe) {
        const jump = () => {
            mario.classList.add('jump');
            jumpSound.play(); // Reproduzir o som de pulo
            setTimeout(() => {
                mario.classList.remove('jump');
            }, 500);

        }

        const pauseButton = document.getElementById("pause-button");
        let isPaused = false;

        // Função para pausar ou retomar a animação e o contador de score
        function toggleAnimationPause() {
            if (isPaused) {

                // Se estiver pausado, retome a animação
                pipe.style.animationPlayState = "running";
                mario.style.animationPlayState = "running";
                scoreElement.style.animationPlayState = "running";
                clouds.style.animationPlayState = "running";
                isPaused = false;
                isGamePaused = false; // Retome o jogo
                mario.src = "./images/mario.gif";
                mario.style.width = '150px';

            } else {
                // Se não estiver pausado, pause a animação
                pipe.style.animationPlayState = "paused";
                mario.style.animationPlayState = "paused";
                scoreElement.style.animationPlayState = "paused";
                clouds.style.animationPlayState = "paused";
                isPaused = true;
                isGamePaused = true;
                mario.src = "./images/pause-mario.gif";
                mario.style.width = '150px';
            }
        }

        pauseButton.addEventListener("click", toggleAnimationPause);

        let gameOverSoundPlayed = false;

        const loop = setInterval(() => {

            const pipePosition = pipe.offsetLeft;
            // const turtlePosition = turtle.offsetLeft;
            const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

            if (pipePosition <= 130 && pipePosition > 0 && marioPosition < 80) {
                pipe.style.animation = 'none';
                pipe.style.left = `${pipePosition}px`;

                if (!gameOverSoundPlayed) {
                    GameSound.pause();
                    GOSound.play();
                    gameOverSoundPlayed = true;
                }
                mario.style.animation = 'none';
                mario.style.bottom = `${marioPosition}px`;

                mario.src = './images/game-over.png';
                mario.style.width = '75px';
                mario.style.marginLeft = '50px';

                gameOverImage.style.display = 'block';
                restartContainer.style.display = 'block';
                githubContainer.style.display = 'block';
                linkedinContainer.style.display = 'block';
                emailContainer.style.display = 'block';
                clouds.style.display = 'none';

                if (shouldDisplayBonusImage) {
                    playMoneySoundAndDisplayBonusImage();
                }
                clearInterval(loop);
            } else {
                updateScore();
                gameOverImage.style.display = 'none';
                restartContainer.style.display = 'none';
                githubContainer.style.display = 'none';
                linkedinContainer.style.display = 'none';
                emailContainer.style.display = 'none';

            }
        }, 100);

        document.addEventListener('keydown', jump);

        restartButton.addEventListener('click', () => {
            // Redirecione ou reinicie o jogo como desejado
            // Você pode recarregar a página ou redefinir o estado do jogo aqui
            location.reload(); // Recarregar a página como exemplo simples
        });
    }
});
