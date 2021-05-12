/*
[x] - Play button will initiate game
[x] - Random color will light up and emit tone.
[] - Player will press button(s) to match the random sequence.
[] - After each successfull turn by player, game will add additional random button to sequence and replay entire sequence for the player.
[] - After game plays the updated sequence, player will attempt to match.
[] - This process will repeat until player makes a mistake and the game ends.
[] - When the game ends, the previous sequence will clear. Pressing play will start a new round, with a new button sequence.
[] - Game will keep track of longest sequence and display to player.

*/

// BUTTON SELECTION UX
// greenBtn.onmousedown = () => {
//     greenBtn.style.backgroundColor = '#53FFED';
//     playSound('green');
// };
// greenBtn.onmouseup = () => {
//     greenBtn.style.backgroundColor = '#06D6A0';
// }

// redBtn.onmousedown = () => {
//     redBtn.style.backgroundColor = '#FF94BC';
//     playSound('red');
// };
// redBtn.onmouseup = () => {
//     redBtn.style.backgroundColor = '#EF476F';
// }

// yellowBtn.onmousedown = () => {
//     yellowBtn.style.backgroundColor = '#FFFFB3';
//     playSound('yellow');
// }
// yellowBtn.onmouseup = () => {
//     yellowBtn.style.backgroundColor = '#FFD166';
// }

// blueBtn.onmousedown = () => {
//     blueBtn.style.backgroundColor = '#5ED7FF';
//     playSound('blue');
// }
// blueBtn.onmouseup = () => {
//     blueBtn.style.backgroundColor = '#118AB2';
// }

const greenBtn = document.querySelector('#green');
const redBtn = document.querySelector('#red');
const yellowBtn = document.querySelector('#yellow');
const blueBtn = document.querySelector('#blue');

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
    const tone = new Audio(`sounds/${color}-button.mp3`);
    tone.volume = 0.2;
    tone.play();
}

// GAME LOGIC~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>
let currentGame = false;

const selectRandomBtn = () => {
    const buttons = [greenBtn, redBtn, yellowBtn, blueBtn];
    return buttons[Math.floor(Math.random() * buttons.length)];
};

let currentSequence = [];
const extendCurrentSequence = button => {
    currentSequence.push(button);
};

const playButton = button => {
    const colorObj = colors.find( ({ color }) => color === button.id);
    button.style.backgroundColor = `${colorObj.dynamicColor}`;
    playSound(button.id);
    setTimeout(() => {
        button.style.backgroundColor = `${colorObj.staticColor}`;
    }, 500);
}

const pressButton = e => {
    // console.log(e);
    const { target } = e;
    const colorObj = colors.find( ({ color }) => color === target.id);
    target.style.backgroundColor = `${colorObj.dynamicColor}`;
    playSound(target.id);
    setTimeout(() => {
        target.style.backgroundColor = `${colorObj.staticColor}`;
    }, 500);
}

const runSequence = async () => {
    let i = 1;
    console.log(`Sequence has started`);
    for (let button of currentSequence) {
        // Delaying Array Loop Iterations: https://travishorn.com/delaying-foreach-iterations-2ebd4b29ad30
        setTimeout(() => {
            playButton(button);
        }, 700 * i);
        i++;
    }
}

const matchSequence = async () => {

}

// Async and Await in JavaScript: https://itnext.io/async-and-await-in-javascript-the-extension-to-a-promise-f4e0048964ac
const playRound = async () => {
    await runSequence();
    await matchSequence();

}

const playBtn = document.querySelector('.play-button');
playBtn.onclick = async () => {
    extendCurrentSequence(selectRandomBtn());
    const result = await runSequence();
    console.log(result);
};

const buttons = document.querySelector('.button-container');
buttons.addEventListener('click', pressButton);

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