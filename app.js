/*
[x] - Play button will initiate game
[x] - Random color will light up and emit tone.
[x] - Player will press button(s) to match the random sequence.
[x] - After each successfull turn by player, game will add additional random button to sequence and replay entire sequence for the player.
[x] - After game plays the updated sequence, player will attempt to match.
[x] - This process will repeat until player makes a mistake and the game ends.
[x] - When the game ends, the previous sequence will clear. Pressing play will start a new round, with a new button sequence.
[x] - Display current round while game is being played.
[x] - Display 'refresh' icon after game over.

UX improvements:
[x] - Game Over is triggered at wrong button selection.
[x] - gameover-tone played on wrong button selection instead of normal button tone.

Edge cases:
[x] - User cannot click play and advance game cycle if current game.
[] - Regular button sounds trigger after game over.
[] - User cannot select buttons while current sequence is being played.

Bugs:
[] - Sound delay occurs on Safari desktop & mobile Chrome/Safari
*/

const greenBtn = document.querySelector('#green');
const redBtn = document.querySelector('#red');
const yellowBtn = document.querySelector('#yellow');
const blueBtn = document.querySelector('#blue');


// GAME BUTTON UX~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>
const colors = [
    {
        color: `green`,
        staticColor: `#06D6A0`,
        dynamicColor: `#53FFED`
    },
    {
        color: `red`,
        staticColor: `#EF476F`,
        dynamicColor: `#FF94BC`
    },
    {
        color: `yellow`,
        staticColor: `#FFD166`,
        dynamicColor: `#FFFFB3`
    },
    {
        color: `blue`,
        staticColor: `#118AB2`,
        dynamicColor: `#5ED7FF`
    }
];

const playSound = color => {
    if (currentGame) {
        const tone = new Audio(`sounds/${color}-button.mp3`);
        tone.volume = 0.2;
        tone.play();
    } else {
        const tone = new Audio('sounds/gameover-tone.mp3');
        tone.volume = 0.6;
        tone.play();
    }
};

const btnEffect = target => {
    // From MDN .find example on destructuring.
    const colorObj = colors.find( ({ color }) => color === target.id);
    target.style.backgroundColor = `${colorObj.dynamicColor}`;
    setTimeout(() => {
        target.style.backgroundColor = `${colorObj.staticColor}`;
    }, 500);
};

const gamePressesBtn = button => {
    const colorObj = colors.find( ({ color }) => color === button.id);
    button.style.backgroundColor = `${colorObj.dynamicColor}`;
    playSound(button.id);
    setTimeout(() => {
        button.style.backgroundColor = `${colorObj.staticColor}`;
    }, 500);
};

const pressButton = e => {
    const { target } = e;
    btnEffect(target);
    addToPlayerSequence(target);
    checkButtonMatch();
    playSound(target.id);
    checkFinishTurn();
};
// <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~GAME BUTTON UX



// APP BAR UX~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>

const scoreTracker = document.createElement('p');
scoreTracker.classList.add('score-tracker');
const footer = document.querySelector('.footer');

const refreshBtn = document.querySelector('.refresh-button');
const { style } = refreshBtn;
refreshBtn.onclick = () => {
    animateRefreshBtn();
    setTimeout(startGame, 200);
};

const getScore = () => scoreTracker.innerText = `${currentSequence.length - 1}`;


const displayScore = () => {
    hidePlayBtn();
    hideRefreshBtn();
    getScore();
    footer.append(scoreTracker);
};

const removeScore = () => {
    footer.removeChild(scoreTracker);
}

const displayRefreshBtn = () => {
    refreshBtn.style.display = 'block';
};

const hideRefreshBtn = () => {
    refreshBtn.style.display = 'none';
}

const animateRefreshBtn = () => {
    style.transform = `rotate(360deg)`;
    style.transition = `all 0.2s`;
}

const clearAnimation = () => {
    style.removeProperty(`transform`);
    style.removeProperty(`transition`);
}

const hidePlayBtn = () => startBtn.style.display = 'none';
// <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~APP BAR UX


// GAME LOGIC~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>
let currentGame = false;
let currentSequence = [];
let playerSequence = [];

const selectRandomBtn = () => {
    const buttons = [greenBtn, redBtn, yellowBtn, blueBtn];
    return buttons[Math.floor(Math.random() * buttons.length)];
};

const extendCurrentSequence = button => currentSequence.push(button);
const clearCurrentSequence = () => currentSequence = [];
const addToPlayerSequence = button => playerSequence.push(button);
const clearPlayerSequence = () => playerSequence = [];

const checkFinishTurn = () => {
    if (currentGame && (playerSequence.length === currentSequence.length)) {
        setTimeout(() => cycleGame(), 1000);
    }
};

const checkButtonMatch = () => {
    if (currentGame) {
        for (let i=0; i<playerSequence.length; i++) {
            if (playerSequence[i] !== currentSequence[i]) {
                gameOver();
            }
        }
    }
};

const runSequence = () => {
    clearPlayerSequence();
    let i = 0;
    for (let button of currentSequence) {
        // Delaying Array Loop Iterations: https://travishorn.com/delaying-foreach-iterations-2ebd4b29ad30
        setTimeout(() => {
            gamePressesBtn(button);
        }, 700 * i);
        i++;
    }
};

const cycleGame = () => {
    extendCurrentSequence(selectRandomBtn());
    getScore();
    runSequence();
};

const startGame = () => {
    if (!currentGame) {
        currentGame = true;
        extendCurrentSequence(selectRandomBtn());
        displayScore();
        runSequence();
    }
};

const gameOver = () => {
    // console.log('game over');
    currentGame = false;
    clearPlayerSequence();
    clearCurrentSequence();
    removeScore();
    displayRefreshBtn();
    clearAnimation();
};

const startBtn = document.querySelector('.play-button');
startBtn.onclick = startGame;

const buttonContainer = document.querySelector('.button-container');
buttonContainer.onclick = pressButton;
/*
         __                                       __      
   __   /\ \                       __  __        /\ \__   
  /'_`\_\ \ \____     __    ___   /\_\/\_\  _____\ \ ,_\  
 /'/'_` \\ \ '__`\  /'__`\/' _ `\ \/\ \/\ \/\ '__`\ \ \/  
/\ \ \L\ \\ \ \L\ \/\  __//\ \/\ \ \ \ \ \ \ \ \L\ \ \ \_ 
\ \ `\__,_\\ \_,__/\ \____\ \_\ \_\_\ \ \ \_\ \ ,__/\ \__\
 \ `\_____\ \/___/  \/____/\/_/\/_/\ \_\ \/_/\ \ \/  \/__/
  `\/_____/                       \ \____/    \ \_\       
                                   \/___/      \/_/                    
*/