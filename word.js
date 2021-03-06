var Letter = require("./letter");

function Word(answer) {
  // Letter object array
  this.objArray = [];

  for (var i = 0; i < answer.length; i++) {
    var letter = new Letter(answer[i]);
    this.objArray.push(letter);
  }

  this.log = function() {
    answerLog = "";
    for (var i = 0; i < this.objArray.length; i++) {
      answerLog += this.objArray[i] + " ";
    }
    console.log(answerLog + "\n====================================\n");
  };

  this.userGuess = function(input) {
    for (var i = 0; i < this.objArray.length; i++) {
      this.objArray[i].guess(input);
    }
  };
}

module.exports = Word;

// var werdz = new Word("onomatopoeia");
// console.log(werdz.objArray + "");

// REQUIREMENTS
// * An array of `new` Letter objects representing the letters of the underlying word
// * A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.
// * A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)
