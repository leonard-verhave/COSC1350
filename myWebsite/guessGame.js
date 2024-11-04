
let turns = 10;
let randomNumber;
let guesses = [];
// generate a random nuber from 1-100 
function startGame () {
    randomNumber = Math.floor(Math.random()*100)+1;
    turns = 10;
    guesses = [];
    document.getElementById("result").innerHTML = "";
    document.getElementById("previousGuesses").innerHTML = "";
};


// add a event listener to submit 
document.getElementById("guessform").addEventListener("submit", function(event) {
    event.preventDefault();
    const guessInput = document.getElementById("guessInput");
    const guess = parseInt(guessInput.value);

    if(!guess || guess < 1 || guess > 100 || guesses.includes(guess)) {
        alert ("Please enter a vaild number and a number you haven't geussed yet");
        guessInput.value=""
        return;
    }

    guesses.push(guess);
    turns--;

// display if the person guess is to low or high 
    let resultMessege = ""; 

    if( guess === randomNumber) {
        resultMessege = `Great job ${guess} is correct!`;

    } else if (turns === 0) {
        resultMessege = `Game over! The correct Number was ${randomNumber}.`;

    } else {
        resultMessege = `${guess} is too ${guess < randomNumber ? "low" : "high"}. ${turns} turns left,`;

    }
    document.getElementById ("result").innerHTML = resultMessege
    document.getElementById("previousGuesses").textContent = `Previous guesses: ${guesses.join(', ')}`;
    guessInput.value = "";
})
// event listener to restart button 
document.getElementById("restartButton").addEventListener("click", startGame);


startGame();





