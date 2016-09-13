/**
 * 
 */

var wordList = ["pirate", "banana", "elephant", "abracadabra"];

var word;
var wordInPlay = [];
for (i = 0; i < word.length; i++) {
	wordInPlay.push("_");
}
var guessesMade = [];
var guessesLeft = 6;

$(document).ready(function() {
	if(word == null) {
		word = localStorage.getItem("word");
	}
	
	
	
	var checkButton = $("#checkGuess");
	var newGameButton = $("#newGame");
	var userGuess = $("#userGuess");
	var guess = userGuess.val();
	var left = $("#guessesLeft");
	var made = $("#guessesMade");
	var game = $("#wordInPlay");

	left.text(guessesLeft);
	made.text(guessesMade);
	game.text(wordInPlay.join(""));

	newGameButton.click(function() {
		
		
		
	})
	

	checkButton.click(function() {

		guess = userGuess.val().slice(0, 1);

		if (alreadyGuessed(guess)) {
			alert(guess + " has already been guessed");
		} else {
			if (!checkGuess(guess)) {
				guessesLeft -= 1;
			}
		}

		left.text(guessesLeft);
		made.text(guessesMade);
		game.text(wordInPlay.join(""));

	})


	function alreadyGuessed(guess) {
		var guessed = false;

		for (i = 0; i < guessesMade.length; i++) {
			if (guess.toLowerCase() == guessesMade[i].toLowerCase()) {
				guessed = true;
			}
		}

		return guessed;
	}

	function checkGuess(guess) {
		var guessInWord = false;
		guessesMade = guessesMade.concat(guess)

		for (i = 0; i < word.length; i++) {
			if (guess == word[i]) {
				wordInPlay[i] = guess;
				guessInWord = true;
				console.log(guess + " is at position " + i)
			}
		}

		return guessInWord;
	}
})