var Word = require("./word");
var inquirer = require("inquirer");

// Array of letters to be used
var letterString = "abcdefghijklmnopqrstuvwxyz";

var wordsArray = [
  "lightsaber",
  "force",
  "vader",
  "luke skywalker",
  "wookie",
  "ewok",
  "death star",
  "han solo"
];

var randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];

console.log("Display the random word for example purposes:\n" + randomWord);

// Pass random word through Word constructor
var gameWord = new Word(randomWord);
// console.log(gameWord.objArray + "");

var requireNewWord = false;

// Array for guessed letters
var incorrectLetters = [];
var correctLetters = [];

// Guesses left
var guessesLeft = 10;

function gameLogic() {
  // Generates new word if constructor is true
  if (requireNewWord) {
    var randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];

    gameWord = new Word(randomWord);

    requireNewWord = false;
  }

  // Tests if a letter is correctly guessed
  var wordComplete = [];
  gameWord.objArray.forEach(completeCheck);

  // Letters remaining to be guessed
  if (wordComplete.includes(false)) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Guess a letter between A-Z!",
          name: "userinput"
        }
      ])
      .then(function(input) {
        if (
          !letterString.includes(input.userinput) ||
          input.userinput.length > 1
        ) {
          console.log("\nPlease try again!\n");
          gameLogic();
        } else {
          if (
            incorrectLetters.includes(input.userinput) ||
            correctLetters.includes(input.userinput) ||
            input.userinput === ""
          ) {
            console.log("\nAlready Guessed or Nothing Entered");
            gameLogic();
          } else {
            // Checks if guess is correct
            var wordCheckArray = [];
            gameWord.userGuess(input.userinput);
            gameWord.objArray.forEach(wordCheck);
            if (wordCheckArray.join("") === wordComplete.join("")) {
              console.log("\nIncorrect\n");
              incorrectLetters.push(input.userinput);
              guessesLeft--;
            } else {
              console.log("\nCorrect!\n");
              correctLetters.push(input.userinput);
            }

            gameWord.log();
            console.log("Guesses Left: " + guessesLeft + "\n");
            console.log(
              "Letters Guessed: " + incorrectLetters.join(" ") + "\n"
            );

            // Guesses Left
            if (guessesLeft > 0) {
              gameLogic();
            } else {
              console.log("Sorry, You Lose!\n");
              restartGame();
            }
            function wordCheck(key) {
              wordCheckArray.push(key.guessed);
            }
          }
        }
      });
  } else {
    console.log("YOU WIN!\n");
    restartGame();
  }
  function completeCheck(key) {
    wordComplete.push(key.guessed);
  }
}

function restartGame() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to:",
        choices: ["PLAY AGAIN", "EXIT"],
        name: "restart"
      }
    ])
    .then(function(input) {
      if (input.restart === "PLAY AGAIN") {
        requireNewWord = true;
        incorrectLetters = [];
        correctLetters = [];
        guessesLeft = 10;
        gameLogic();
      } else {
        return;
      }
    });
}

gameLogic();
