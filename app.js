/*
[] - Play button will initiate game
[] - Random color will light up and emit tone.
[] - Player will press button(s) to match the random sequence.
[] - After each successfull turn by player, game will add additional random button to sequence and replay entire sequence for the player.
[] - After game plays the updated sequence, player will attempt to match.
[] - This process will repeat until player makes a mistake and the game ends.
[] - When the game ends, the previous sequence will clear. Pressing play will start a new round, with a new button sequence.
[] - Game will keep track of longest sequence and display to player.


COLOR CHANGE ON SELECTION~>
green: 53FFED
red: FF94BC
yellow: FFFFB3
blue: 5ED7FF

NOTES PLAYED ON COLOR SELECTION~>
green: E (octave lower than blue)
red: A
yellow: C#/Db
blue: E

*/
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