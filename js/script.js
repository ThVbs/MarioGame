document.addEventListener("DOMContentLoaded", () => {
    let score = 0;
    const mario = document.querySelector(".mario");
    const pipe = document.querySelector(".pipe");
    const gameOverImage = document.querySelector(".game-over");
    const restartButton = document.querySelector("#restart-button");
    const restartContainer = document.querySelector(".restart-container");
    const githubContainer = document.querySelector(".github-container");
    const linkedinContainer = document.querySelector(".linkedin-container");
    const emailContainer = document.querySelector(".email-container");
    const clouds = document.querySelector('.clouds')
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = score;




    if (pipe) {
        const jump = () => {
            mario.classList.add('jump');

            setTimeout(() => {
                mario.classList.remove('jump');
            }, 500);
        }

        const loop = setInterval(() => {
            console.log('loop')

            const pipePosition = pipe.offsetLeft;
            const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

            if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
                score++;
                pipe.style.animation = 'none';
                pipe.style.left = `${pipePosition}px`;

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
                clearInterval(loop);
            }
            else {
                gameOverImage.style.display = 'none';
                restartContainer.style.display = 'none';
                githubContainer.style.display = 'none';
                linkedinContainer.style.display = 'none';
                emailContainer.style.display = 'none';


            }
        }, 10);

        document.addEventListener('keydown', jump);

        restartButton.addEventListener('click', () => {
            // Redirecione ou reinicie o jogo como desejado
            // Você pode recarregar a página ou redefinir o estado do jogo aqui
            location.reload(); // Recarregar a página como exemplo simples
        });
    }
});
