"use strict";

//Javascript for Hangman Game

var jazzSingers = [
  "ELLA",
  "BILLIE",
  "FRANK",
  "DINAH",
  "SAMMY",
  "ETTA",
  "NINA",
  "NAT",
  "LOUIS",
  "TONY",
  "SARAH",
  "BESSIE",
  "CARMEN",
  "PEGGY"
];

var numberOfGamesWon = 0;

var numberOfGamesLost = 0;

var letterGuessedElement = document.getElementById("listOfWrongLetters");

var gamesWonElement = document.getElementById("gamesWon");

var gamesLostElement = document.getElementById("gamesLost");

var numberOfGuessesElement = document.getElementById("guessesLeft");

var writingDiv = document.getElementById("lettersInWord");

var addToLettersGuessed = true;

var numberofGuessesLeft = 10;

var numberOfLetters = 0;

var numberOfCharacters = 0;

var selectedSinger = " ";

var guessedLetters = ["firstvalue", "second value"];

// started with some default values in the array above to get the for-loop working

var numberOfLettersGuessed = 0;

var gameOver = false;

prepareRound();

function prepareRound() {
  // Creating a random number to use for selecting a jazz singer from the array
  var randomNumber = Math.floor(Math.random() * 14);

  // logging the singer chosen by the random number for debug purposes

  console.log(jazzSingers[randomNumber]);

  //  creating a variable to hold the randomley selected jazz singer

  selectedSinger = jazzSingers[randomNumber];

  // figuring out the number of characters in the selected jazz singers name
  numberOfCharacters = selectedSinger.length;

  //creating a second variable that will track how many characters the user has left in the word

  numberOfLetters = numberOfCharacters;

  console.log(numberOfCharacters);
  console.log("Number of Letters:" + numberOfLetters);

  //set the number of blank underscores for the hangman game

  for (var n = 0; n < numberOfCharacters; n++) {
    var newDiv = document.createElement("p");
    newDiv.id = n;
    console.log(newDiv.id);
    newDiv.textContent = "_  ";
    // newDiv.classList.add("delete");
    // newDiv.classList.add("noBlock");
    writingDiv.appendChild(newDiv);
  }
}

//listens for a button press

document.addEventListener("keyup", function(event) {
  if (gameOver === false) {
    var eventKey = event.key;

    var key = eventKey.toUpperCase();
    console.log(key);

    if (event.keyCode >= 65 && event.keyCode <= 90) {
      //make sure the user hasn't already guessed that letter yet
      // for (var l = 0; l < guessedLetters.length; l++) {
      //   if (key == guessedLetters[l]) {
      //     alert(
      //       "You already guessed that letter! Please guess another one!"
      //     );
      //     return;
      //   } else {
      // testLetter(key) and see if it matches anything in the word

      for (var i = 0; i < numberOfCharacters; i++) {
        for (var l = 0; l < numberOfLettersGuessed + 1; l++) {
          if (key == guessedLetters[l]) {
            alert("You already guessed that letter! Please guess another one!");
            return;
          } else {
            console.log("All clear");
          }
        }
        if (key == selectedSinger[i]) {
          var newLetterReveal = document.getElementById(i);
          newLetterReveal.textContent = selectedSinger[i] + " ";
          numberOfLetters = numberOfLetters - 1;
          //if they guessed a letter that's in the word, we don't need to add this to the letters guessed section (b/c that section is just for wrong letters)
          addToLettersGuessed = false;
        } else {
          console.log("that letter isnt included");
        }
      }

      //keep track of all letters a user has guessed to make sure they don't double guess!
      //empty the array so that it can keep track of only user inputs

      guessedLetters[numberOfLettersGuessed] = key;
      numberOfLettersGuessed++;
      //increment the number of guesses down by one each round
      numberofGuessesLeft = numberofGuessesLeft - 1;

      //show users how many guesses are left
      numberOfGuessesElement.textContent =
        "Number of Guesses Left: " + numberofGuessesLeft;

      console.log(numberofGuessesLeft);

      if (addToLettersGuessed == true) {
        //if they guessed a wrong letter, add it to letters guessed
        console.log("we're going into the if statements and saying it's true");
        var newLetterGuessed = document.createElement("p");
        // newLetterGuessed.classList.add("noBlock");
        // newDiv.classList.add("delete");
        newLetterGuessed.textContent = key + " ";
        letterGuessedElement.appendChild(newLetterGuessed);
      } else {
        console.log("We went into if statements and said its' false");
      }

      //setting up the different win/lose conditions
      if (numberOfLetters == 0 && numberofGuessesLeft > 0) {
        alert("You won!");
        numberOfGamesWon++;
        gamesWonElement.textContent =
          "Number of Games Won: " + numberOfGamesWon;
        gameOver = true;
      } else if (numberofGuessesLeft == 0 && numberOfLetters > 0) {
        alert("You lost. The correct answer was " + selectedSinger);
        numberOfGamesLost++;
        gamesLostElement.textContent =
          "Number of Games Lost: " + numberOfGamesLost;
        gameOver = true;
      } else if (numberOfLetters == 0 && numberofGuessesLeft == 0) {
        alert("You won");
        numberOfGamesWon++;
        gamesWonElement.textContent =
          "Number of Games Won: " + numberOfGamesWon;
        gameOver = true;
      } else {
        console.log("Onto the next one!");
      }

      //resetting addToLettersGuessed to true to prepare for the next letter guessed in the loop

      addToLettersGuessed = true;
      //   }
      // }
    } else {
      alert("Please only type letters");
    }
  } else {
    alert("The game is over. Please press the button to play again");
  }
});

//   function testLetter(k) {
//     for (i = 0; i < numberOfCharacters.length; i++) {
//       console.log("We're in teh function!");
//       if (k == selectedSinger[i]) {
//         console.log("We're getting somewhere!");
//       } else {
//         console.log("We're getting nowhere");
//       }
//     }
//   }

var playAgainButton = document.getElementById("playAgain");

playAgainButton.addEventListener("click", function() {
  $("#listOfWrongLetters").empty();
  $("#lettersInWord").empty();
  numberOfGuessesElement.textContent = "Number of Guesses Left: 10";
  numberofGuessesLeft = 10;
  numberOfLetters = 0;
  numberOfLettersGuessed = 0;
  guessedLetters = [];
  gameOver = false;

  prepareRound();
});

//create a "game over" variable--if the user presses a key and the agme is over, they should jsut get an alert saying the game is over
//add formatting
