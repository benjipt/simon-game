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

// COLOR ARRAYS - Index of 0 is default
const green = [`#06D6A0`, `#53FFED`];
const red = [`#EF476F`, `#FF94BC`];
const yellow = [`#FFD166`, `#FFFFB3`];
const blue = [`#118AB2`, `#5ED7FF`];

const playSound = color => {
    const tone = new Audio(`sounds/${color}-button.mp3`);
    tone.volume = 0.2;
    tone.play();
}

// BUTTON SELECTION UX
const greenBtn = document.querySelector('#green');
greenBtn.onmousedown = () => {
    greenBtn.style.backgroundColor = '#53FFED';
    playSound('green');
};
greenBtn.onmouseup = () => {
    greenBtn.style.backgroundColor = '#06D6A0';
}

const redBtn = document.querySelector('#red');
redBtn.onmousedown = () => {
    redBtn.style.backgroundColor = '#FF94BC';
    playSound('red');
};
redBtn.onmouseup = () => {
    redBtn.style.backgroundColor = '#EF476F';
}

const yellowBtn = document.querySelector('#yellow');
yellowBtn.onmousedown = () => {
    yellowBtn.style.backgroundColor = '#FFFFB3';
    playSound('yellow');
}
yellowBtn.onmouseup = () => {
    yellowBtn.style.backgroundColor = '#FFD166';
}

const blueBtn = document.querySelector('#blue');
blueBtn.onmousedown = () => {
    blueBtn.style.backgroundColor = '#5ED7FF';
    playSound('blue');
}
blueBtn.onmouseup = () => {
    blueBtn.style.backgroundColor = '#118AB2';
}

// GAME LOGIC~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>
let currentGame = false;
const buttons = [greenBtn, redBtn, yellowBtn, blueBtn];
let currentSequence = [];

const selectRandomBtn = () => {
    return buttons[Math.floor(Math.random() * buttons.length)];
};

const extendCurrentSequence = button => {
    currentSequence.push(button);
};

// const runButtonUX = button => {
//     const color = button.id;
//     button.style.backgroundColor = `${color[1]}`;
//     playSound(color);
//     setTimeout(() => {
//         button.style.backgroundColor = `${color[0]}`
//     }, 500);
// }

const pressButton = button => {
    switch (button.id) {
        case 'green':
            button.style.backgroundColor = green[1];
            playSound(button.id);
            setTimeout(() => {
                button.style.backgroundColor = green[0];
            }, 500);
            break;
        case 'red':
            button.style.backgroundColor = red[1];
            playSound(button.id);
            setTimeout(() => {
                button.style.backgroundColor = red[0];
            }, 500);
            break;
        case 'yellow':
            button.style.backgroundColor = yellow[1];
            playSound(button.id);
            setTimeout(() => {
                button.style.backgroundColor = yellow[0];
            }, 500);
            break;
        case 'blue':
            button.style.backgroundColor = blue[1];
            playSound(button.id);
            setTimeout(() => {
                button.style.backgroundColor = blue[0];
            }, 500);
            break;
    }
}

const runSequence = () => {
    let i = 1;
    for (let button of currentSequence) {
        // Delaying Arry Loop Iterations: https://travishorn.com/delaying-foreach-iterations-2ebd4b29ad30
        setTimeout(() => {
            pressButton(button);
        }, 700 * i);
        i++;
    }
}

// const playRound = () => {
//     extendCurrentSequence(selectRandomButton());

// }

const playBtn = document.querySelector('.play-button');
playBtn.onclick = () => {
    extendCurrentSequence(selectRandomBtn());
    console.log(currentSequence);
    runSequence();
};


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