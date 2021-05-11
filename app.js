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

// BUTTON SELECTION UX
const greenBtn = document.querySelector('#green');
greenBtn.onmousedown = () => {
    greenBtn.style.backgroundColor = '#53FFED';
    const greenTone = new Audio('sounds/green-button.mp3');
    greenTone.volume = 0.2;
    greenTone.play();
};
greenBtn.onmouseup = () => {
    greenBtn.style.backgroundColor = '#06D6A0';
}

const redBtn = document.querySelector('#red');
redBtn.onmousedown = () => {
    redBtn.style.backgroundColor = '#FF94BC';
    const redTone = new Audio('sounds/red-button.mp3');
    redTone.volume = 0.2;
    redTone.play();
};
redBtn.onmouseup = () => {
    redBtn.style.backgroundColor = '#EF476F';
}

const yellowBtn = document.querySelector('#yellow');
yellowBtn.onmousedown = () => {
    yellowBtn.style.backgroundColor = '#FFFFB3';
    const yellowTone = new Audio('sounds/yellow-button.mp3');
    yellowTone.volume = 0.2;
    yellowTone.play();
}
yellowBtn.onmouseup = () => {
    yellowBtn.style.backgroundColor = '#FFD166';
}

const blueBtn = document.querySelector('#blue');
blueBtn.onmousedown = () => {
    blueBtn.style.backgroundColor = '#5ED7FF';
    const blueTone = new Audio('sounds/blue-button.mp3');
    blueTone.volume = 0.2;
    blueTone.play();
}
blueBtn.onmouseup = () => {
    blueBtn.style.backgroundColor = '#118AB2';
}