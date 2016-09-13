/**
 * 
 */

var wordList = [ "pirate", "banana", "elephant", "abracadabra" ];

var word;
var wordInPlay;
var guessesMade;
var guessesLeft;

$(document).ready(function() {
	var checkButton = $("#checkGuess");
	var newGameButton = $("#newGame");
	var userGuess = $("#userGuess");
	var guessed = $("#alreadyGuessed");
	var left = $("#guessesLeft");
	var made = $("#guessesMade");
	var game = $("#wordInPlay");
	var gameStatus = $("#gameStatus");

	var guess = userGuess.val();
	var won = false;
	var lost = false;

	function saveGame() {
		localStorage.setItem("word", (word));
		localStorage.setItem("wordInPlay", JSON.stringify(wordInPlay))
		localStorage.setItem("guessesMade", JSON.stringify(guessesMade))
		localStorage.setItem("guessesLeft", (guessesLeft))
		localStorage.setItem("gameSaved", "yes");
		localStorage.setItem("won", JSON.stringify(won));
		localStorage.setItem("lost", JSON.stringify(lost));
	}

	function loadGame() {
		word = (localStorage.getItem("word"));
		wordInPlay = JSON.parse(localStorage.getItem("wordInPlay"));
		guessesMade = JSON.parse(localStorage.getItem("guessesMade"));
		guessesLeft = (localStorage.getItem("guessesLeft"));
		won = JSON.parse(localStorage.getItem("won"));
		lsot = JSON.parse(localStorage.getItem("lost"));
		
	}

	if (localStorage.getItem("gameSaved") != "yes") {
		console.log("new game");
		newGame();
	} else {
		loadGame();

		left.text(guessesLeft);
		made.text(guessesMade);
		game.text(wordInPlay.join(""));
	}

	newGameButton.click(function() {
		newGame();
	})

	checkButton.click(function() {
		if (!Boolean(won) && !Boolean(lost)) {
			guessed.hide();

			guess = userGuess.val().slice(0, 1);

			if (alreadyGuessed(guess.toLowerCase())) {
				guessed.text(guess + " has already been guessed");
				guessed.show();
			} else if (!checkGuess(guess.toLowerCase())) {
				guessesLeft -= 1;
			}


			userGuess.val("");
			left.text(guessesLeft);
			made.text(guessesMade);
			game.text(wordInPlay.join(""));
			checkGame();
			saveGame();
		}
	})


	function alreadyGuessed(guess) {
		var isGuessed = false;

		for (i = 0; i < guessesMade.length; i++) {
			if (guess.toLowerCase() == guessesMade[i].toLowerCase()) {
				isGuessed = true;
			}
		}

		return isGuessed;
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

	function newGame() {
		won = false;
		lost = false;
		gameStatus.hide();
		word = wordList[Math.floor(Math.random() * wordList.length)];
		console.log(word)
		localStorage.setItem("word", word)
		wordInPlay = [];
		for (i = 0; i < word.length; i++) {
			wordInPlay.push("_");
		}
		guessesMade = [];
		guessesLeft = 6;

		saveGame();

		left.text(guessesLeft);
		made.text(guessesMade);
		game.text(wordInPlay.join(""));
	}

	function checkGame() {
		checkWon();
		checkLost();
	}

	function checkWon() {
		won = true;
		for (i = 0; i < word.length; i++) {
			if (word[i] != wordInPlay[i]) {
				won = false;
			}
		}

		if (won == true) {
			gameStatus.text("You Won!");
			gameStatus.show();
		}
	}

	function checkLost() {
		if (guessesLeft <= 0) {
			lost = true;
		}

		if (lost == true) {
			gameStatus.text("You Lost!");
			gameStatus.show();
		}
	}
})