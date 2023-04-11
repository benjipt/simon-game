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
[x] - User cannot select buttons while current sequence is being played.

Bugs:
[x] - Sound delay occurs on Safari desktop & mobile Chrome/Safari
*/

// GAME BUTTON UX~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>
let buttonsEnabled = true;

const greenBtn = document.querySelector('#green');
const redBtn = document.querySelector('#red');
const yellowBtn = document.querySelector('#yellow');
const blueBtn = document.querySelector('#blue');

const audioFiles = {
  green: new Howl({ src: ["sounds/green-button.mp3"], volume: 0.2 }),
  red: new Howl({ src: ["sounds/red-button.mp3"], volume: 0.2 }),
  yellow: new Howl({ src: ["sounds/yellow-button.mp3"], volume: 0.2 }),
  blue: new Howl({ src: ["sounds/blue-button.mp3"], volume: 0.2 }),
  gameover: new Howl({ src: ["sounds/gameover-tone.mp3"], volume: 0.6 }),
};

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
        audioFiles[color].play();
    } else {
        audioFiles.gameover.play();
    }
};

const btnEffect = button => {
    // From MDN .find example on destructuring.
    const colorObj = colors.find( ({ color }) => color === button.id);
    button.style.backgroundColor = `${colorObj.dynamicColor}`;
    playSound(button.id);
    setTimeout(() => {
        button.style.backgroundColor = `${colorObj.staticColor}`;
    }, 500);
};
// <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~GAME BUTTON UX

// APP BAR UX~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>
const scoreTracker = document.createElement('p');
scoreTracker.classList.add('score-tracker');
const footer = document.querySelector('.footer');

const refreshBtn = document.querySelector('.refresh-button');
refreshBtn.onclick = () => {
    animateRefreshBtn();
    setTimeout(startGame, 200);
};

const getScore = () => scoreTracker.innerText = `${currentSequence.length}`;

const hidePlayBtn = () => startBtn.style.display = 'none';

const displayScore = () => {
    hidePlayBtn();
    hideRefreshBtn();
    getScore();
    footer.append(scoreTracker);
};

const removeScore = () => footer.removeChild(scoreTracker);
const displayRefreshBtn = () => refreshBtn.style.display = 'block';
const hideRefreshBtn = () => refreshBtn.style.display = 'none';

const animateRefreshBtn = () => {
    refreshBtn.style.transform = `rotate(360deg)`;
    refreshBtn.style.transition = `all 0.2s`;
}

const clearAnimation = () => {
    refreshBtn.style.removeProperty(`transform`);
    refreshBtn.style.removeProperty(`transition`);
}
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
    buttonsEnabled = false;
    let i = 0;
    for (let button of currentSequence) {
        // Delaying Array Loop Iterations: https://travishorn.com/delaying-foreach-iterations-2ebd4b29ad30
        setTimeout(() => {
            btnEffect(button);
        }, 700 * i);
        i++;
    }
    setTimeout(() => {
      buttonsEnabled = true;
    }, 700 * currentSequence.length);
};

const cycleGame = () => {
    extendCurrentSequence(selectRandomBtn());
    getScore();
    runSequence();
};

const pressButton = e => {
    if (!buttonsEnabled) return;

    const { target } = e;
    addToPlayerSequence(target);
    checkButtonMatch();
    btnEffect(target);
    checkFinishTurn();
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
// <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~GAME LOGIC

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
